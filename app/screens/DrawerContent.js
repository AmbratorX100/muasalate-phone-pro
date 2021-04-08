import React, {useEffect, useState, useRef} from 'react';
// import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image, TouchableOpacity, FlatList, Alert,
} from 'react-native';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch, Button
} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Sae, Hideo, Madoka  } from 'react-native-textinput-effects';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Input, Badge, ListItem} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {joinRoom, logout, roomExists} from "../helpers/auth";
import {
    leaveRoom,
    resetMap,
    resetMarker,
    resetOrder,
    resetReservation,
    resetRoom,
    resetRoomMembers,
    resetSettings,
    resetTabBar,
    resetToasts,
    updateJoin,
    updateMembersReference,
    updateRoom,
    updateRoomMembers
} from "../helpers/actions";


const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';


const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Vice President',
        id: '1'
    },
    {
        name: 'Chris Jackson',
        subtitle: 'Vice Chairman',
        id: "2"
    },
    {
        name: 'aa Jackson',
        subtitle: 'xx Chairman',
        id: '3'
    },

    {
        name: 'Chris gg',
        subtitle: 'Vice ss',
        id: "4"
    },
    {
        name: 'Chris gg',
        subtitle: 'Vice ss',
        id: "5"
    },
]

const members = [
    {
        name: 'aa Jackson',
        subtitle: 'xx Chairman'

    },

    {
        name: 'aa Jackson',
        subtitle: 'xx Chairman'

    },

    {
        name: 'aa Jackson',
        subtitle: 'xx Chairman'

    },
]

export default function DrawerContent() {
    const [roomName, setRoomName] = useState('')
    const [roomKey, setRoomKey] = useState('')
    const [showRooms, setShowRooms] = useState(false)
    const [joined, setJoined] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [roomMembers, setRoomMembers] = useState(undefined)

    const scrollRef = useRef()

    const setting = useSelector(state => state.settingConf)
    const room = useSelector(state => state.roomConf)

    // console.log(room)


    const dispatch = useDispatch();


    const handleJoinRoom = async () => {

        setIsLoading(true)

        let Valid = true;
        const FLName = /^[a-zA-Z \u0600-\u06FF]+$/

        if (roomName.match(FLName) !== null) {

            try {

                if (await roomExists(roomName, roomKey, updateRoom, room.map(room => room.id), setting.accountType, dispatch)) {

                    // const roomMembersConnection = await joinRoom(roomMembersId.roomMembersId, updateJoin, dispatch)
                    // dispatch(updateMembersReference({roomId: roomMembersId.roomId, membersConnection: roomMembersConnection.snap}))

                } else {
                    Alert.alert('Wrong input', "this room doesn't exist")
                }







            } catch (e) {
                console.log(e)
            }

        } else {
            Alert.alert('Join New Room', 'Some of the values you entered are wrongs!!')
        }

        setIsLoading(false)

    }
    // console.log(joined[0].roomMembers)


    useEffect(() => {
        setJoined(room.filter(room => room.joined))

        const tmpJoined = room.filter(room => room.joined)

        // console.log(tmpJoined[0])
        if (tmpJoined.length > 0) {

            // console.log(tmpJoined)
            // Todo: switch case with two types one of the member id exists and another if not
            joinRoom(tmpJoined[0].id, dispatch, updateRoomMembers)
                .then(r => {
                    setRoomMembers(r)
                })




        } else if (roomMembers !== undefined) {
            // console.log(roomMembers)
            roomMembers.snap()
            setRoomMembers(undefined);
            dispatch(updateRoomMembers({}))
        }

        // console.log(room.filter(room => room.joined))
        // if (room.filter(room => room.joined).length > 0) {
        //     console.log(joined[0].scrollTo)
        //     scrollRef.current.scrollTo({
        //         y: (joined[0].scrollTo),
        //         animated: true,
        //     })
        // }


        return () => {
            if (roomMembers !== undefined) {
                roomMembers.snap()
                setRoomMembers(undefined);
                dispatch(updateRoomMembers({}))

            }
        }


    }, [room])







    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row',marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri: uri
                        }}
                        size={50}
                    />
                    <View style={{marginLeft:15, flexDirection:'column'}}>
                        <Title style={styles.title}>{setting.firstName} {setting.lastName}</Title>
                        <Caption style={styles.caption}>{setting.username}</Caption>
                    </View>

                </View>

                <View style={styles.row}>
                    <View style={styles.section}>
                        <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                        <Caption style={styles.caption}>Reservations</Caption>
                    </View>
                    {setting.accountType &&
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                            <Caption style={styles.caption}>Orders</Caption>
                        </View>
                    }


                </View>


                <Grid>

                    {joined.length > 0 &&
                        <Row
                            style={{backgroundColor: '', height: 40, width: 200, paddingTop: 5}}
                            onPress={() => dispatch(leaveRoom(joined[0].id))}
                        >
                            <Text>Leave Room : {joined[0].name}</Text>
                        {/*    room name */}
                        </Row>
                    }
                    {/*todo: while if no room joined */}





                    {joined.length === 0 ?

                        <>
                            <Row style={{backgroundColor: '', height: 50, width: 220,}}>
                                <Input
                                    placeholder='Room Name'
                                    leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                                    onChangeText={value => setRoomName(value)}
                                />

                            </Row>


                            <Row style={{backgroundColor: '', height: 50, width: 220}}>
                                <Input
                                    placeholder='Room Key'
                                    leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                                    secureTextEntry={true}
                                    onChangeText={value => setRoomKey(value)}

                                />
                            </Row>

                            <Row style={{backgroundColor: '', height: 40, width: 220, marginLeft: 140, marginTop: 10}}>


                                <Button
                                    title="Solid Button"
                                    mode={'contained'}
                                    onPress={handleJoinRoom}
                                    disabled={isLoading}
                                >
                                    Join
                                </Button>
                            </Row>
                        </>

                        :

                            <>



                            </>

                    }






                    {(room.length > 0 && joined.length === 0)&&


                        <>

                            <Title >
                                Rooms
                                {/*<Badge*/}
                                {/*    status="success"*/}
                                {/*    containerStyle={{ position: 'relative', marginLeft: 10 }}*/}
                                {/*    value={10}*/}
                                {/*/>*/}
                            </Title>
                            <Row style={styles.bottomDrawerSection}>


                                <View style={{width: 225, marginTop: 10}}>

                                    <ScrollView
                                        style={{ maxHeight: 180, borderWidth: 2, backgroundColor: 'white', borderRadius: 10}}
                                        scrollEnabled={true}
                                        ref={scrollRef}
                                    >

                                        {room.map(room => {
                                            return (
                                                <View key={room.id} style={{height: 50, width: 200, marginBottom: 5, marginTop: 5, marginLeft: 11, borderRadius: 10, borderWidth: 1}}>

                                                    <Grid>

                                                        <Row>

                                                            <Col style={{backgroundColor: 'yellow', alignItems: 'center', alignContent: 'center', borderRadius: 10}}>

                                                                <ScrollView horizontal={true}>

                                                                    <Text style={{marginTop: 10, maxHeight: 40}}>
                                                                        Room: {room.name}

                                                                    </Text>

                                                                </ScrollView>
                                                            </Col>


                                                            <Col style={{backgroundColor: joined.length === 1 ? joined[0].id === room.id ? 'red' : 'purple': 'green', borderRadius: 10, marginLeft: 5}}>
                                                                <TouchableOpacity
                                                                    style={{ paddingBottom: 21, borderRadius: 10}}
                                                                    disabled={joined.length === 1 && joined[0].id !== room.id}
                                                                    onPress={() => {
                                                                        dispatch(updateJoin(room.id))

                                                                        // scrollRef.current.scrollTo({
                                                                        //     y: (room.scrollTo),
                                                                        //     animated: true,
                                                                        //     })
                                                                        //
                                                                        }
                                                                    }
                                                                >
                                                                    <Text style={{marginTop: 10, marginLeft: 30, }}>
                                                                        {room.joined ? 'Leave' : 'Join'}

                                                                    </Text>

                                                                </TouchableOpacity>


                                                            </Col>

                                                        </Row>

                                                    </Grid>


                                                </View>
                                            )
                                        })}
                                    </ScrollView>

                                </View>



                            </Row>


                        </>
                    }


                    <Row style={styles.bottomDrawerSection}>
                        <Title style={{width: 200}} >
                            Notifications
                            <Badge
                                status="success"
                                containerStyle={{ position: 'relative', top: 10 }}
                                value={100}
                            />

                        </Title>



                    </Row>





                </Grid>
            </View>




            <View style={[styles.bottomDrawerSection, {marginLeft: 18}]}>
                <TouchableOpacity
                    onPress={() => {


                        logout().then(() => {
                            dispatch(resetReservation())
                            dispatch(resetRoom())
                            dispatch(resetMap())
                            dispatch(resetMarker())
                            dispatch(resetOrder())
                            dispatch(resetRoomMembers())
                            dispatch(resetSettings())
                            dispatch(resetToasts())
                            dispatch(resetTabBar())

                        })


                    }}
                >
                    <Icon
                        name={'exit-to-app'}
                        color={'white'}
                        size={25}
                    >
                        <Text style={{fontSize: 22, color: 'white'}}>{`  Sign Out`}</Text>


                    </Icon>

                </TouchableOpacity>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'deepskyblue',
        paddingTop: 30,

    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginTop: 10,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

