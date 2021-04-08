import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, Modal, Text, Portal} from 'react-native-paper';
import {FlatList, SafeAreaView, StyleSheet, StatusBar, View, Platform} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import Picker from "react-native-picker-select";

import RadioForm from 'react-native-simple-radio-button';
import CounterInput from "react-native-counter-input";
import TextArea from "@thang2162/react-native-text-area";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const content = [
    {
        id: '1',
        title: 'test 1',
        subtitle: 'subtitle for test 1',
        Cardtitle: 'random image for test 1',
        Cardparagraph: 'paragraph for test 1',
        image: 'https://picsum.photos/700',
    },

    // {
    //     id: '2',
    //     title: 'test 2',
    //     subtitle: 'subtitle for test 2',
    //     Cardtitle: 'random image for test 2',
    //     Cardparagraph: 'paragraph for test 2',
    //     image: 'https://picsum.photos/700',
    //
    // },
    //
    // {
    //     id: '3',
    //     title: 'test 3',
    //     subtitle: 'subtitle for test 3',
    //     Cardtitle: 'random image for test 3',
    //     Cardparagraph: 'paragraph for test 3',
    //     image: 'https://picsum.photos/700',
    //
    // }
]

const wayPints = [
    {
        location: {
            latitude: 120.0165,
            longitude: -24.45
        },
        name: 'Abu Dhabi - or something',
        key: '1'

    },

    {
        location: {
            latitude: 120.0165,
            longitude: -24.45
        },
        name: 'Abu Dhabi - or something',
        key: '2'
    },

    {
        location: {
            latitude: 120.0165,
            longitude: -24.45
        },
        name: 'Abu Dhabi - or something',
        key: '3'
    }

];

const tempDrivers = [
    {
        label: 'Ahmed Hasan',
        key: '1',
        value: 1
    },
    {
        label: 'Ali Hasan',
        key: '2',
        value: 2
    },
    {
        label: 'Nasar Hasan',
        key: '3',
        value: 3
    },
    {
        label: 'Reem Hasan',
        key: '4',
        value: 4
    },
    {
        label: 'Reem Hasan',
        key: '5',
        value: 4
    },
    {
        label: 'Reem Hasan',
        key: '6',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '7',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '8',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '9',
        value: 4
    },
    {
        label: 'Reem Hasan',
        key: '10',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '11',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '12',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '13',
        value: 4
    },
    {
        label: 'Reem Hasan',
        key: '014',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '15',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '16',
        value: 4
    },{
        label: 'Reem Hasan',
        key: '17',
        value: 4
    },



]

const radio_props = [
    {label: 'Oneway', value: 0, disabled: false },
    {label: 'RoundTrip', value: 1, disabled: false },
    {label: 'MultiTrip', value: 2, disabled: true }
];

const MyComponent = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Java');
    const [option, setOption] = useState(0)


    const [showDriversAndroid, setShowDriversAndroid] = useState(false)



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };



    useEffect(() => {
        // showDatepicker()
        // showTimepicker()



    }, [])






    return (
        <KeyboardAwareScrollView>





            <SafeAreaView style={styles.container}
                >

                {showDriversAndroid &&
                <Portal>
                    <Modal visible={showDriversAndroid} onDismiss={() => setShowDriversAndroid(false)} contentContainerStyle={{backgroundColor: 'white', marginLeft: 20, marginRight: 20}} >
                        {/*<DropDownPicker*/}
                        {/*    placeholder={'Choose a driver'}*/}

                        {/*    items={[*/}
                        {/*        {label: 'USA', value: 'usa'},*/}
                        {/*        {label: 'UK', value: 'uk'},*/}
                        {/*        {label: 'France', value: 'france'},*/}
                        {/*        {label: 'France2', value: 'france2'},*/}
                        {/*        {label: 'France3', value: 'france3'},*/}
                        {/*        {label: 'France4', value: 'france4'},*/}
                        {/*        {label: 'France5', value: 'france5'},*/}
                        {/*        {label: 'France6', value: 'france6'},*/}

                        {/*    ]}*/}
                        {/*    defaultValue={'france6'}*/}
                        {/*    containerStyle={{height: 40}}*/}
                        {/*    style={{backgroundColor: '#fafafa', width: 350}}*/}
                        {/*    itemStyle={{*/}
                        {/*        justifyContent: 'flex-start',*/}
                        {/*    }}*/}
                        {/*    dropDownStyle={{backgroundColor: '#fafafa', zIndex: 110000}}*/}
                        {/*    onChangeItem={item => setValue(item.value)}*/}
                        {/*    dropDownMaxHeight={200}*/}
                        {/*    // scrollViewProps={{scrollToOverflowEnabled: true}}*/}
                        {/*/>*/}
                        <Picker
                            placeholder={{
                                label: 'Choose a Driver',
                                key: '0',
                                value: 0
                            }}
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex ) => {
                                console.log(itemValue, itemIndex)
                                // setSelectedValue(itemValue)
                            }}
                            items={tempDrivers}
                        />


                    </Modal>
                </Portal>


                }

                    {/*<Card>*/}
                    {/*    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />*/}
                    {/*    <Card.Content>*/}
                    {/*        <Title>Card title</Title>*/}
                    {/*        <Paragraph>Card content</Paragraph>*/}
                    {/*    </Card.Content>*/}
                    {/*    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
                    {/*    <Card.Actions>*/}
                    {/*        <Button>Cancel</Button>*/}
                    {/*        <Button>Ok</Button>*/}
                    {/*    </Card.Actions>*/}
                    {/*</Card>*/}

                    <FlatList //todo: change this to viewlist as no need to safe performance ignored for now
                        data={content}
                        renderItem={() => {

                            return (
                                <>


                                    <Card style={styles.card}>
                                        <Card.Title title='Direction' subtitle='Select your ride type and destinatoins'
                                                    left={LeftContent}/>
                                        <Card.Content>
                                            {/*<Grid>*/}
                                            {/*    <Row>*/}
                                            <Sae
                                                inputStyle={{color: 'black'}}
                                                label={'Source'}
                                                iconClass={FontAwesomeIcon}
                                                iconName={'long-arrow-down'}
                                                iconColor={'black'}
                                                inputPadding={16}
                                                labelHeight={24}
                                                // active border height
                                                borderHeight={2}
                                                // TextInput props
                                                autoCapitalize={'none'}
                                                autoCorrect={false}
                                                editable={false} // disable input
                                            />


                                            {/*<FlatList*/}
                                            {/*    style={styles.flatList}*/}
                                            {/*    data={wayPints}*/}
                                            {/*    keyExtractor={location => location.key}*/}

                                            {/*    renderItem={() => {*/}


                                            {/*        return (*/}
                                            {/*            <Sae*/}
                                            {/*                inputStyle={{ color: 'black' }}*/}
                                            {/*                label={'Source'}*/}
                                            {/*                iconClass={FontAwesomeIcon}*/}
                                            {/*                iconName={'arrows-v'}*/}
                                            {/*                iconColor={'black'}*/}
                                            {/*                inputPadding={16}*/}
                                            {/*                labelHeight={24}*/}
                                            {/*                // active border height*/}
                                            {/*                borderHeight={2}*/}
                                            {/*                // TextInput props*/}
                                            {/*                autoCapitalize={'none'}*/}
                                            {/*                autoCorrect={false}*/}
                                            {/*            />*/}
                                            {/*        )*/}
                                            {/*    }}*/}

                                            {/*/>*/}

                                            {/*<ScrollView>*/}
                                            {/*    {wayPints.map(point => (*/}

                                            {/*        <Sae*/}
                                            {/*            key={point.key}*/}
                                            {/*            inputStyle={{ color: 'black' }}*/}
                                            {/*            label={'Source'}*/}
                                            {/*            iconClass={FontAwesomeIcon}*/}
                                            {/*            iconName={'arrows-v'}*/}
                                            {/*            iconColor={'black'}*/}
                                            {/*            inputPadding={16}*/}
                                            {/*            labelHeight={24}*/}
                                            {/*            // active border height*/}
                                            {/*            borderHeight={2}*/}
                                            {/*            // TextInput props*/}
                                            {/*            autoCapitalize={'none'}*/}
                                            {/*            autoCorrect={false}*/}
                                            {/*        />*/}
                                            {/*    ))}*/}
                                            {/*</ScrollView>*/}


                                            <Sae
                                                inputStyle={{color: 'black'}}
                                                style={styles.destination}
                                                label={'Destination'}
                                                iconClass={FontAwesomeIcon}
                                                iconName={'location-arrow'}
                                                iconColor={'black'}
                                                inputPadding={16}
                                                labelHeight={24}
                                                // active border height
                                                borderHeight={2}
                                                // TextInput props
                                                autoCapitalize={'none'}
                                                autoCorrect={false}
                                                editable={false} // disable input

                                            />
                                            {/*    </Row>*/}
                                            {/*</Grid>*/}

                                            <View>
                                                <RadioForm
                                                    style={{marginTop: 20}}
                                                    radio_props={radio_props}
                                                    initial={0}
                                                    onPress={(value) => setOption(value)}
                                                    animation={true}
                                                    buttonColor={'#2196f3'}
                                                    // labelHorizontal={true}
                                                    formHorizontal={true}

                                                />
                                            </View>


                                        </Card.Content>
                                        {/*<Card.Actions>*/}
                                        {/*    <Button>Cancel</Button>*/}
                                        {/*    <Button>Ok</Button>*/}
                                        {/*</Card.Actions>*/}
                                    </Card>

                                    <Card style={styles.card}>
                                        <Card.Title title='Reservation Information' subtitle='Your ride details'
                                                    left={LeftContent}/>
                                        <Card.Content>



                                            <Grid>



                                                <Row style={{height: 100}}>


                                                    <Row style={{backgroundColor: ''}}>

                                                            <Button onPress={ showDatepicker }> Date </Button>

                                                            <Button onPress={showTimepicker}> Time </Button>



                                                    </Row>

                                                </Row>

                                                <Row style={{backgroundColor: '', height: 100}}>
                                                    <View style={{ ...(Platform.OS !== 'android' && {
                                                        zIndex: 10
                                                    })}}>

                                                        {Platform.OS === 'android' ?


                                                            <Button onPress={() => setShowDriversAndroid(true)}>
                                                                Show Drivers
                                                            </Button>
                                                            // <DropDownPicker
                                                            //     placeholder={'Choose a driver'}
                                                            //
                                                            //     items={[
                                                            //         {label: 'USA', value: 'usa'},
                                                            //         {label: 'UK', value: 'uk'},
                                                            //         {label: 'France', value: 'france'},
                                                            //         {label: 'France2', value: 'france2'},
                                                            //         {label: 'France3', value: 'france3'},
                                                            //         {label: 'France4', value: 'france4'},
                                                            //         {label: 'France5', value: 'france5'},
                                                            //         {label: 'France6', value: 'france6'},
                                                            //
                                                            //     ]}
                                                            //     defaultValue={'france6'}
                                                            //     containerStyle={{height: 40}}
                                                            //     style={{backgroundColor: '#fafafa', width: 350}}
                                                            //     itemStyle={{
                                                            //         justifyContent: 'flex-start',
                                                            //     }}
                                                            //     dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            //     onChangeItem={item => setValue(item.value)}
                                                            //     dropDownMaxHeight={100}
                                                            //     // scrollViewProps={{scrollToOverflowEnabled: true}}
                                                            // />


                                                        :

                                                            <Picker
                                                                placeholder={{
                                                                    label: 'Choose a Driver',
                                                                    key: '0',
                                                                    value: 0
                                                                }}
                                                                selectedValue={selectedValue}
                                                                style={{ height: 50, width: 150 }}
                                                                onValueChange={(itemValue, itemIndex ) => {
                                                                    console.log(itemValue, itemIndex)
                                                                    setSelectedValue(itemValue)
                                                                }}
                                                                items={tempDrivers}
                                                            >


                                                            </Picker>
                                                        }

                                                    </View>







                                                </Row>



                                                <Row>

                                                    {/*Adults*/}
                                                    <Col>
                                                        <Text>{'\t\t'}Adults (+18){'\n'}</Text>
                                                        <CounterInput
                                                            onChange={(counter) => {
                                                                console.log("onChange Counter:", counter);
                                                            }}
                                                            horizontal={true}
                                                        />

                                                    </Col>

                                                    {/*Children*/}
                                                    <Col>

                                                        <Text>{'\t\t'}Children (0 - 17){'\n'}</Text>
                                                        <CounterInput
                                                            onChange={(counter) => {
                                                                console.log("onChange Counter:", counter);
                                                            }}
                                                            horizontal={true}
                                                        />

                                                    </Col>
                                                </Row>

                                                <Row style={{marginTop: 10}}>


                                                    <TextArea
                                                        style={{}}
                                                        maxCharLimit={200}
                                                        placeholderTextColor="black"
                                                        exceedCharCountColor="#990606"
                                                        placeholder={"Write your Description ..."}
                                                    />


                                                </Row>



                                                {show ?
                                                    Platform.OS === 'android' ?
                                                        (
                                                            <View style={{backgroundColor: '', height: 200, width: 300}}>

                                                                <DateTimePicker
                                                                    testID="dateTimePicker"
                                                                    value={date}
                                                                    mode={mode}
                                                                    is24Hour={true}
                                                                    display="default"
                                                                    onChange={onChange}
                                                                />
                                                            </View>

                                                        )
                                                        :
                                                        (
                                                            <Portal>
                                                                <Modal visible={show} onDismiss={() => setShow(false)} contentContainerStyle={{backgroundColor: 'white', height: 200, width: 300, marginLeft: 35}} >
                                                                    <DateTimePicker
                                                                        testID="dateTimePicker"
                                                                        value={date}
                                                                        mode={mode}
                                                                        is24Hour={true}
                                                                        display="default"
                                                                        onChange={onChange}
                                                                    />
                                                                </Modal>
                                                            </Portal>
                                                        )
                                                    : null
                                                }

                                            </Grid>


                                        </Card.Content>
                                    </Card>


                                </>


                            )
                        }}
                        keyExtractor={card => card.id}


                    />


                </SafeAreaView>
        </KeyboardAwareScrollView>

    )

};

export default MyComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight-10 || 0,
        marginBottom: 100
    },

    card: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },

    flatList: {
        height: 100
    },

    source: {

    },

    destination: {
        marginTop: 20
    }

})
