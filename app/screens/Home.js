import React from 'react';

import firebase from '../services/firebase'

import {logout, userInfo, getUserRoomIds} from '../helpers/auth'

import TabBars from "../components/TabBars";

import { connect } from 'react-redux'


// fix it
import { LogBox } from 'react-native';
import {updateUserInfo, UserLogOut, updateRoom} from "../helpers/actions";
import {differenceInMinutes} from "date-fns";


LogBox.ignoreLogs(['Animated: `useNativeDriver` '])




class Home extends React.Component {

    constructor(props) {
        super(props);
        //
        // console.log(this.props)
        this.state = {
            connections: []
        }

    }


    componentDidMount() {
        // await AsyncStorage.removeItem('persist:root');
        // console.log(await AsyncStorage.getAllKeys())
        // await logout()


        // realRoomInfo(this.props.UpdateRoom).then(connections => {
        //     this.setState({connections: connections})
        //     console.log('done')
        // })

        // Listener 1  {user info}
        userInfo(this.props.UpdateUserInfo).then(r => this.state.connections.push(r))

        // Listener 2 {rooms}
        getUserRoomIds(this.props.UpdateRoom, this.props.setting.accountType).then(r => this.state.connections.push(...r))


        // Listener 3 {roomMembers}



    }

    componentWillUnmount() {
        for (let i = 0; i< this.state.connections.length; i++) {
            this.state.connections[i].snap()
        }

    }

    render() {

        return (


            <>

                <TabBars />


            </>


        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // userLogOut: () => UserLogOut()

        UpdateUserInfo: value => dispatch(updateUserInfo(value)),

        // room
        UpdateRoom: value => dispatch(updateRoom(value))
    }
}

const mapStateToProps = state => {
    return {
        // Settings
        setting: state.settingConf,
        room: state.roomConf

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
