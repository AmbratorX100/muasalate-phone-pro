import React, {useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Alert} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Button, CheckBox, Input} from "react-native-elements";
import CounterInput from "react-native-counter-input";
import {Title} from "react-native-paper";
import RNTextArea from "@freakycoder/react-native-text-area";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import validate from "react-native-web/dist/exports/StyleSheet/validate";
import {newRoom, roomExist} from "../../helpers/auth";


function OptionOne() {
    const [roomNameError, setRoomNameError] = useState('')
    const [roomName, setRoomName] = useState('')
    const [roomLimit, setRoomLimit] = useState(0)
    const [roomLocation, setRoomLocation] = useState('')
    const [roomPrivate, setRoomPrivate] = useState(true)
    const [roomDescription, setRoomDescription] = useState('')
    const [roomKey, setRoomKey] = useState(Math.random().toString(16).substr(2, 8))
    const [isLoading, setIsLoading] = useState(false)



    const handleSubmit = async () => {
        setIsLoading(true)

        let Valid = true;
        const FLName = /^[a-zA-Z \u0600-\u06FF]+$/

        // room name
        if (!roomName.match(FLName)) {
            Valid = false;
        }


        // room limit
        if (!(0 < roomLimit && roomLimit <= 100)) {
            Valid = false
        }


        // room location

        if (!roomLocation.match(FLName)) {
            Valid = false
        }

        // room Description
        if (!(roomDescription.trim().length <= 200)) {
            Valid = false
        }

        if (Valid) {
            try {
                if (await roomExist(roomName, roomPrivate)) {
                    await newRoom({
                        name: roomName,
                        description: roomDescription.trim(),
                        location: roomLocation.trim(),
                        roomType: roomPrivate,
                        key: roomKey,
                        limit: roomLimit,
                    })
                    Alert.alert('Room Created Successfully', `${roomName} Created, Main key = ${roomKey}`)

                    setRoomName('')
                    setRoomDescription('')
                    setRoomLocation('')
                    setRoomKey(Math.random().toString(16).substr(2, 8))
                    setRoomLimit(0)



                } else {

                    Alert.alert('Create room ', roomPrivate ? 'You already own a room with the same name!!'
                        : 'This public name is already in use ')

                }

            } catch (e) {
                console.log(e)
            }

        } else {
            Alert.alert('Create room ','Some of the values are wrong!!')
        }
        setIsLoading(false)





    }

    return(


        <KeyboardAwareScrollView>

            <ScrollView bounces={true}>
                <View style={styles.container}>
                    <Grid style={styles.container}>
                        <View style={styles.card}>

                            <Row style={styles.row}>
                                <Input
                                    placeholder={'e.g. UAE'}
                                    label={'Room Name'}
                                    onChangeText={value => setRoomName(value)}
                                    errorMessage={roomNameError}
                                    value={roomName}
                                />
                            </Row>


                            <Row style={[styles.row, {height: 30, marginTop: 15}]}>
                                <Title> Limit & Room Location</Title>
                            </Row>

                            <Row style={[styles.row]}>
                                <CounterInput
                                    initial={roomLimit}
                                    width={150}

                                    onChange={(counter) => {
                                        setRoomLimit(counter);
                                    }}
                                    horizontal={true}

                                />

                                <Input
                                    containerStyle={{width: 180}}
                                    placeholder={'e.g. Abu Dhabi'}
                                    label={'Location'}
                                    onChangeText={value => setRoomLocation(value)}
                                    value={roomLocation}

                                />

                            </Row>

                            <Row style={[styles.row, {height: 60}]}>

                                <CheckBox
                                    title={'Private ?'}
                                    disabled={true}
                                    checked={roomPrivate}
                                    onPress={() => setRoomPrivate(!roomPrivate)}

                                />

                            </Row>

                            <RNTextArea
                                maxCharLimit={200}
                                style={{height: 150, borderWidth: 1, width: 330, marginLeft: 10}}

                                placeholderTextColor="black"
                                exceedCharCountColor="#990606"
                                placeholder={"Write your Description..."}
                                onChangeText={(text) => setRoomDescription(text.trimStart())}
                                value={roomDescription}
                            />

                            <Row style={[styles.row]}>
                                <Button
                                    title={`Key = ${roomKey}`}
                                    type={'outline'}
                                    buttonStyle={{width: 150, marginRight: 15}}
                                    onPress={() => setRoomKey(Math.random().toString(16).substr(2, 8))}

                                />

                                <Button
                                    loading={isLoading}
                                    title={'Create '}
                                    type={'solid'}
                                    buttonStyle={{width: 150}}
                                    onPress={handleSubmit}

                                />
                            </Row>

                        </View>

                    </Grid>
                </View>




            </ScrollView>

        </KeyboardAwareScrollView>

    )

}


export default OptionOne;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center'
    },
    card: {
        // backgroundColor: '',
        width: 350,
        height: 510,
        marginTop: 20,
        borderRadius: 25,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 100,
        shadowRadius: 5,
    },
    row: {
        height: 50,
        width: 300,
        margin: 10
    }
})
