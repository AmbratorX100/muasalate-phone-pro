import React, { Component } from "react";
import {Avatar, Button, Card, Text, Title} from 'react-native-paper';
import { SafeAreaView, StyleSheet, StatusBar, View, Platform, ScrollView, Picker} from "react-native";
import { connect } from "react-redux";
import {
    addToast,
    clearToast,
    updateAdults,
    updateChildren,
    updateDate,
    updateDescription, updateDriverId,
    updateType
} from "../helpers/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { Sae, Hideo, Madoka  } from 'react-native-textinput-effects';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import RadioForm from "react-native-simple-radio-button";
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import CounterInput from "react-native-counter-input";
import {
    addMinutes,
    addMonths,
    addSeconds,
    format,
    differenceInMinutes
} from 'date-fns'
import Toasts from "./Toasts";
import RNTextArea from "@freakycoder/react-native-text-area";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const radio_props = [
    {label: 'Oneway', value: 0, disabled: false },
    {label: 'Round-Trip', value: 1, disabled: false },
    // {label: 'Multi-Trip', value: 2, disabled: true }
];
class ReservationForm extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.Members)

        this.state = {
            showDateTimePickerModal: false,
            dateHolder: format(addMinutes(new Date(), 30), 'yyyy-MM-dd hh:mm:ss a'),
            dateColor: this.props.reservation.date === '' ? '#e4181e' : '#6200EE'
        }

        this.showDatePicker = this.showDatePicker.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.hideDatePicker = this.hideDatePicker.bind(this)

    }

    showDatePicker() {
        this.setState({ showDateTimePickerModal: true})

    }

    handleConfirm(date) {
         if (differenceInMinutes(date, addMinutes(new Date(), 30)) <= -1) { // check if date is 30m form now
             this.props.AddToast(`Make sure the date/time is no less then: ${this.state.dateHolder}` )
         } else {

             this.props.UpdateDate(new Date(date))
             this.setState({dateColor: '#6200EE'})
         }
        this.hideDatePicker();

    }

    hideDatePicker() {
        this.setState({ showDateTimePickerModal: false})
    }

    componentDidMount() {

        // console.log(this.props.Members.Leader)
        // console.log(this.props.Setting)



        if (this.props.reservation.date !== '' && differenceInMinutes(new Date(this.props.reservation.date), addMinutes(new Date(), 30)) < 0 ) {
            this.props.UpdateDate('')
            this.setState({dateColor: '#e4181e'})

        }

        // this.timer = setInterval(() => {
        //     if (this.props.reservation.date !== '' && differenceInMinutes(new Date(this.props.reservation.date), addMinutes(new Date(), 30)) < 0 ) {
        //         this.props.UpdateDate('')
        //         this.setState({dateColor: '#e4181e'})
        //
        //     }
        //
        //     // this.setState({
        //     //     dateHolder: format(addSeconds(addMinutes(new Date(), 30), 1), 'yyyy-MM-dd hh:mm:ss a')
        //     // })
        // }, 1000)
    }

    componentWillUnmount() {
        // clearInterval(this.timer)
    }
    render() {
        return (
            <KeyboardAwareScrollView>

                <SafeAreaView style={styles.container}>
                    <>
                        <View>
                            <Toasts />
                        </View>

                        <View >

                            <DateTimePickerModal
                                isVisible={this.state.showDateTimePickerModal}
                                mode="datetime"
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                                // date={new Date(addMinutes(new Date(), 30))} // working fine with IoS but not in android
                                minimumDate={addMinutes(new Date(), 30)}
                                maximumDate={addMonths(new Date(), 6)}
                            />


                        </View>
                        <ScrollView
                            bounces={false}

                            contentContainerStyle={{
                                margin: 10,
                                // backgroundColor: 'white'
                            }}

                        >
                            <Card>
                                <Card.Title title='Direction' subtitle='Select your ride type and destinatoins'
                                            left={LeftContent}/>
                                <Card.Content>

                                    <View>
                                        <RadioForm

                                            style={{marginTop: 20}}
                                            radio_props={radio_props}
                                            initial={this.props.reservation.type}
                                            onPress={(value) => this.props.UpdateType(value)}
                                            animation={true}
                                            buttonColor={'#2196f3'}
                                            // labelHorizontal={true}
                                            formHorizontal={true}

                                        />
                                    </View>

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
                                        value={this.props.marker.length > 0 ? this.props.marker[0].label : ''}
                                    />

                                    {this.props.marker.length > 2 &&
                                    <View style={{ marginTop: 25, height: 75}}>
                                        <ScrollView
                                            // style={{height: 300}}
                                            horizontal
                                            bounces={false}
                                        >

                                            {this.props.marker.slice(1, -1).map((coordinate, index) => (

                                                <Hideo
                                                    key={`${coordinate.location.latitude}_${coordinate.location.longitude}`}
                                                    iconClass={FontAwesomeIcon}
                                                    iconName={'arrows-h'}
                                                    iconColor={'deepskyblue'}
                                                    // this is used as backgroundColor of icon container view.
                                                    iconBackgroundColor={'lightgray'}
                                                    inputStyle={{ color: '#464949'}}

                                                    editable={false} // disable input
                                                    value={coordinate.label}

                                                />
                                            ))
                                            }


                                        </ScrollView>
                                    </View>

                                    }

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
                                        value={this.props.marker.length > 1 ? this.props.marker[this.props.marker.length - 1].label : ''}


                                    />

                                </Card.Content>


                            </Card>


                            <Card style={{marginTop: 20, height: 550}}>
                                <Card.Title title='Reservation Information' subtitle='Your ride details'
                                            left={LeftContent}/>

                                <Card.Content  style={{backgroundColor: '', height: 400}}>

                                    <Grid>
                                        {/*date and time*/}
                                        <Row style={{height: 65,}}>
                                            <Button
                                                icon={'calendar-range'}
                                                mode={'contained'}
                                                onPress={this.showDatePicker}
                                                style={{width: 300, marginLeft: 12, backgroundColor: this.state.dateColor}}

                                            >

                                                {this.props.reservation.date === ''?
                                                    this.state.dateHolder
                                                :
                                                    format(new Date(this.props.reservation.date), 'yyyy-MM-dd hh:mm:ss a')
                                                }

                                            </Button>

                                        </Row>

                                        {/*driver selection*/}
                                        {/*Todo: you are here everything is working fine in the DrawerContent just make sure to set the drivers here and update the leave room command */}

                                        <Row style={{height: 100, backgroundColor: '', marginTop: 10}}>

                                            <View style={{zIndex: 1000}}>


                                                <Title>Choose A driver  {!(this.props.Members.hasOwnProperty('Room')) && `(Join Room!!)`}</Title>
                                                {this.props.Members.hasOwnProperty('Members') &&

                                                <>



                                                    {Platform.OS === 'android' ? // todo: make a custom dropdown picker


                                                        <Picker
                                                            mode={'dropdown'}
                                                            selectedValue={this.props.reservation.driverid}
                                                            style={{ height: 50, width: 350 }}
                                                            onValueChange={value => this.props.UpdateDriverId(value)}
                                                        >
                                                            {/*{this.props.room.members.map(driver => (*/}
                                                            {/*    <Picker.Item key={driver.value} label={driver.label} value={driver.value} />*/}
                                                            {/*))}*/}

                                                            <Picker.Item key={null} label={`Select Driver`} value={null} />
                                                            {this.props.Members.Members.map((driver, i) => {
                                                                if (driver.accountType && driver.id !== this.props.Members.Leader.id && driver.id !== this.props.Setting.id) {
                                                                    return <Picker.Item key={driver.id} label={`${++i} - ${driver.name}`} value={driver.id} />
                                                                }

                                                            })}

                                                        </Picker>
                                                        :

                                                        <RNPickerSelect
                                                            style={{viewContainer: {borderWidth: 1, width: 280, marginLeft: 10}}}
                                                            onValueChange={value => this.props.UpdateDriverId(value)}
                                                            items={
                                                                this.props.Members.Members.map((driver, i) => {
                                                                    if (driver.accountType && driver.id !== this.props.Members.Leader.id && driver.id !== this.props.Setting.id) {
                                                                        return {
                                                                            label: `${++i} - ${driver.name}`,
                                                                            value: driver.id

                                                                        }
                                                                    }

                                                                })                                                            }
                                                            value={this.props.reservation.driverid}
                                                            // placeholder={{}} // none
                                                        />



                                                    }

                                                </>

                                                }



                                            </View>




                                        </Row>

                                        {/*adults / children*/}

                                        <Row>


                                            <Col>
                                                <Text>{'\t\t'}Adults (+18){'\n'}</Text>
                                                <CounterInput
                                                    initial={this.props.reservation.adults}
                                                    width={150}
                                                    onChange={(counter) => {
                                                        this.props.UpdateAdults(counter);
                                                    }}
                                                    horizontal={true}
                                                />

                                            </Col>

                                            {/*Children*/}
                                            <Col>

                                                <Text>{'\t'}Children (0 - 17){'\n'}</Text>
                                                <CounterInput
                                                    width={150}
                                                    initial={this.props.reservation.children}

                                                    onChange={(counter) => {
                                                        this.props.UpdateChildren(counter);
                                                    }}
                                                    horizontal={true}
                                                />

                                            </Col>



                                        </Row>

                                        {/*Description*/}
                                        <Row >


                                            <View>
                                                <Title>Choose A driver</Title>

                                                <RNTextArea
                                                    maxCharLimit={200}
                                                    style={{height: 150, borderWidth: 1, width: 330}}

                                                    placeholderTextColor="black"
                                                    exceedCharCountColor="#990606"
                                                    placeholder={"Write your review..."}
                                                    onChangeText={(text) => this.props.UpdateDescription(text.trim())}
                                                />
                                            </View>





                                        </Row>

                                    </Grid>




                                </Card.Content>


                            </Card>





                        </ScrollView>

                    </>



                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

// connect

const mapStateToProps = state => {

    // console.log(state.roomMembersConf)
    return {
        // All
        marker: state.Markers,



        // Card # 2
        reservation: {
            type: state.reservationConf.type,
            date: state.reservationConf.date,
            driverid: state.reservationConf.driverid,
            adults: parseInt(state.reservationConf.adults),
            children: parseInt(state.reservationConf.children),
            description: state.reservationConf.description
        },
        // Room Members
        Members: state.roomMembersConf,

        // Settings
        Setting: state.settingConf



    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Toast
        AddToast: msg => dispatch(addToast(msg)),
        ClearToast: () => dispatch(clearToast()),


        // Reservation
        UpdateType: value => dispatch(updateType(value)),
        UpdateDate: value => dispatch(updateDate(value)),
        UpdateAdults: value => dispatch(updateAdults(value)),
        UpdateChildren: value => dispatch(updateChildren(value)),
        UpdateDescription: value => dispatch(updateDescription(value)),
        UpdateDriverId: value => dispatch(updateDriverId(value))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
