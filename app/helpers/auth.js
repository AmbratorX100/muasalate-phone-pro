import firebase from "../services/firebase";
import axios from "axios";

const Auth = firebase.auth();
const Firestore = firebase.firestore();

// const user = {name: Auth.currentUser.displayName, id: Auth.currentUser.uid.toString()}

export function signUp(email, password, first, last) {
    return Auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            return result.user.updateProfile({
                displayName: `${first} ${last}`,

            })
        }) .catch((error) => {
            console.log(error)
        });


}

export async function emailVerification() {
    await Auth.currentUser.sendEmailVerification();
}

export function signIn(email, password) {
    return Auth.signInWithEmailAndPassword(email, password);
}


export function logout() {
    return Auth.signOut();
}


export async function usernameExists(username) {
    // a reference to the users collection
    const usersnamesRef = Firestore.collection("users");

    // a query against the collection
    const existusername = await usersnamesRef.where('username', '==', username).get();
    return !existusername.empty;


}


export async function newUserDB(Uinfo) {
    // console.log(Uinfo)
    await firebase.firestore().collection('users').doc(Auth.currentUser.uid.toString()).set({
        accountType: Uinfo.accountType,
        firstName: Uinfo.firstName,
        lastName: Uinfo.lastName,
        phone: Uinfo.phone,
        username: Uinfo.username,
        avatar: '',
        CountryInfo: Uinfo.CountryInfo,
        CreatedOrModified: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log('Document Successfully written!')
        })

        .catch((err) => {
            console.log(err)
        })
    // console.log(Uinfo)

}

// Rooms
export async function roomExist(roomName, type ) {
    const roomsRef = Firestore.collection("rooms");
    let existRoom;
    if (type === true) {
        existRoom = await roomsRef.where('name', '==', roomName)
            .where('roomType', '==', type).where('Owner', '==',
                {name: Auth.currentUser.displayName, id: Auth.currentUser.uid.toString()}).get();
    } else {
        existRoom = await roomsRef.where('name', '==', roomName).get()
    }

    return existRoom.empty;
}

export async function newRoom(RInfo) {

    // new Room
    const DocRefId = Firestore.collection('rooms').doc().id;
    await Firestore.collection('rooms').doc(DocRefId).set({
        name: RInfo.name,
        description: RInfo.description,
        location: RInfo.location,
        Owner: {
            name: Auth.currentUser.displayName,
            id: Auth.currentUser.uid
        },
        roomType: RInfo.roomType,
        key: RInfo.key,
        limit: RInfo.limit,
        CreatedOrModified: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(success => console.log('New Room Created'))
        .catch(err => console.log(err))



    // new RoomMembers
    await Firestore.collection('roomMembers').doc().set({
        Leader: {
            name: Auth.currentUser.displayName,
            id: Auth.currentUser.uid
        },
        Room: {
            id: DocRefId
        },
        Members: [],
        CreatedOrModified: firebase.firestore.FieldValue.serverTimestamp()

    })
        .then(success => console.log('New RoomMember Created'))
        .catch(err => console.log(err))


}


// (listener) todo: check if the user is a leader of a room he don't own
export const getUserRoomIds = async (updateHandler, type) => {
    const roomRef = Firestore.collection('rooms')
    const roomMemberRef = Firestore.collection('roomMembers')
    const roomsRef = await roomRef
        .where('Owner', '==',
            {name: Auth.currentUser.displayName, id: Auth.currentUser.uid.toString()}).get()
        // .orderBy('CreatedOrModified', 'desc')
        // .orderBy('name', 'asc');

    const roomMembersRef = await roomMemberRef
        .where('Members', 'array-contains', {name: Auth.currentUser.displayName, id: Auth.currentUser.uid.toString(), accountType: type}).get()


    let array = []

    for (let i = 0; i < roomMembersRef.docs.length; i++) {
        array.push(await roomRef.doc(roomMembersRef.docs[i].data().Room.id).get())
    }

    const ownConnections = roomsRef.docs.map(doc => {

        return {
            id: doc.id,
            snap: roomRef.doc(doc.id).onSnapshot(snapshot => {
                console.log('Received query snapshot from ' + doc.id)
                updateHandler({
                    ...snapshot.data(),
                    joined: false,
                    roomMembers: {},
                    CreatedOrModified: snapshot.data().CreatedOrModified.toDate().toUTCString(),
                    id: doc.id
                })
            }, err => {
                console.log(err)
            })
        }
    })

    const membersConnections = array.map(doc => {
        return {
            id: doc.id,
            snap: roomRef.doc(doc.id).onSnapshot(snapshot => {
                console.log('Received query snapshot from ' + doc.id)
                updateHandler({
                    ...snapshot.data(),
                    joined: false,
                    roomMembers: {},
                    CreatedOrModified: snapshot.data().CreatedOrModified.toDate().toUTCString(),
                    id: doc.id
                })
            }, err => {
                console.log(err)
            })
        }
    })

    return [...ownConnections, ...membersConnections]

    // const observer = roomsRef.onSnapshot(snapshot => {
    //     console.log(`Received query snapshot of size ${snapshot.size}`);
    //     console.log(snapshot.docs.map(doc => doc.data()));
    // }, err => {
    //     console.log(`Encountered error: ${err}`);
    // });
}

// room Exists

export const roomExists = async (name, key, updateHandler, rooms, type, dispatch) => {
    // Todo: show a msg that we know if they tried to join to their room
    // todo: get the rooms ids and check if they new one is already there.
    const roomRef = Firestore.collection('rooms')
    const roomMembersRef = Firestore.collection('roomMembers')

    const room = await roomRef
        .where('name', '==', name)
        .where('key', '==', key)
        // .where('Owner', '!=', {name: user.name, id: user.id})
        .get()

    const isRoom = room.docs.filter(room => room.data().Owner.id !== Auth.currentUser.uid && !rooms.includes(room.id))

    if (isRoom.length === 1) {

        const roomMembers = await roomMembersRef.where('Room.id', '==', isRoom[0].id).get()
        const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

        // for (let i = 0; i < 300; i++) {
        //     console.log(i)
        //     await roomMembersRef.doc(roomMembers.docs[0].id).update({
        //         Members: arrayUnion({
        //             name: Auth.currentUser.displayName+i,
        //             id: Auth.currentUser.uid.toString()+i,
        //             accountType: type,
        //             CreatedOrModified: new Date()
        //         })
        //     })
        // }
        await roomMembersRef.doc(roomMembers.docs[0].id).update({
            Members: arrayUnion({
                name: Auth.currentUser.displayName,
                id: Auth.currentUser.uid.toString(),
                accountType: type,
            })
        })


        const doc = isRoom[0]
        // Long Comment: below I have to choices either to treat this case as a special one which occur once the user
        // join new room or treat it as a normal joining and wait tell the component mount ??
        const roomConnection =  {

            id: doc.id,
            snap: roomRef.doc(doc.id).onSnapshot(snapshot => {
                console.log('Received query snapshot from ' + doc.id)
                dispatch(updateHandler({
                    ...snapshot.data(),
                    joined: true,
                    roomMembers: {},
                    CreatedOrModified: snapshot.data().CreatedOrModified.toDate().toUTCString(),
                    id: doc.id
                }))
            }, err => {
                console.log(err)
            })
        }

        return true


    }
    return false;
}

// Join room


export const joinRoom = async (roomId, dispatch, updateHandler) => {
    const roomMembersRef = Firestore.collection('roomMembers')
    const roomMembers = await roomMembersRef.where('Room.id', '==', roomId).get()



    console.log(roomMembers.docs[0].id)
    return {
        snap: roomMembersRef.doc(roomMembers.docs[0].id).onSnapshot(snapshot => {
                console.log(`Received query snapshot from roomMembers:  ${roomMembers.docs[0].id}`)
                // console.log(Buffer.byteLength(JSON.stringify({...snapshot.data()})))
                // const size = encodeURI(JSON.stringify({...snapshot})).split(/%..|./).length - 1;
                // const kiloBytes = size / 1024;
                // const megaBytes = kiloBytes / 1024;
                // console.log(size)
                // console.log(kiloBytes)
                // console.log(megaBytes)
                dispatch(updateHandler({...snapshot.data(), CreatedOrModified: snapshot.data().CreatedOrModified.toDate()}))
            }, error => {
                console.log(error)
            })
    }




    // return roomId;

    // const roomMembersRef = Firestore.collection('roomMembers')
    // //
    // console.log(1)
    // return {
    //     id: roomMembersId,
    //     snap: roomMembersRef.doc(roomMembersId).onSnapshot(snapshot => {
    //         console.log(`Received query snapshot from roomMembers:  ${roomMembersId}`)
    //         dispatch(updateHandler({...snapshot.data(), CreatedOrModified: snapshot.data().CreatedOrModified.toDate()}))
    //
    //     }, error => {
    //         console.log(error)
    //     })
    //     //
    // }


}






// Settings  (listener)
export async function userInfo(userInfoHandler) {
    try {
        return {
            snap: Firestore.collection('users').doc(Auth.currentUser.uid.toString()).onSnapshot(docSnapshot => {
                console.log(`user info updated`)
                userInfoHandler({...docSnapshot.data(), id: Auth.currentUser.uid.toString()})
            }, error => {
                console.log(`Encountered error with updating user info`)
            })
        }
    } catch (e) {
        console.log(e)
    }

}




// Services
export async function geoInfo(location) {
    // Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_LEY );
    // Geocode.setLanguage("en");
    // Geocode.setRegion("AE");
    // let info = 'undefined ';
    // // todo: handle error
    // await Geocode.fromLatLng(location.latitude, location.longitude).then(
    //     response => {
    //         info = response.results[0].formatted_address;
    //
    //     },
    //     error => {
    //         console.error(error);
    //     }
    // );
    // return info;

    // free option up to 25K per month if done switch to google UP
    const test = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=a1cb57ef5562cb454344c43ccca9c584&query=${location.latitude},${location.longitude}&country=AE&&limit=1`)
    return test.data.data[0].label.trim()


}
