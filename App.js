import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';

import { Provider as StoreProvider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


import Main from "./app/screens/Main";
import Login from './app/screens/Login'

// firebase
import firebase from './app/services/firebase';

// redux
import { store, persistor } from "./app/services/store";
import {differenceInMinutes} from "date-fns";
import {addToast} from "./app/helpers/actions";
import {logout} from "./app/helpers/auth";


class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      registered: false,
      id: '',
      email: '',
      lastSignAt: '',
      displayName: '',
    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName)
        if (user.emailVerified) {
          this.setState({
            authenticated: true,
            loading: false,
            registered: false,
            id: user.uid,
            email: user.email,
            lastSignAt: user.metadata.lastSignInTime,
            displayName: user.displayName
          });
        } else {
          if (differenceInMinutes(new Date(), new Date(user.metadata.lastSignInTime)) > 30 ){
            firebase.auth().currentUser.sendEmailVerification().then(() => {
            })
                .catch(error => console.log(error))
          }
          /*                    firebase.auth().signOut()
                                  .then(() => Alert.alert('hi','hello'))
                                  .catch(e => console.log(e))*/


          // todo: worked make sure to fetch the data from the auth call and state it within the app



        }

      } else {

        console.log('user logged out ')

        this.setState({
          authenticated: false,
          loading: false,
          registered: false,

        });
      }
    })
  }


  render() {
    return (
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <NavigationContainer>
                <Main displayName={this.state.displayName} id={this.state.id} email={this.state.email} lastSignAt={this.state.lastSignAt} authenticated={this.state.authenticated} registered={this.state.registered}/>

              </NavigationContainer>
            </PaperProvider>
          </PersistGate>
        </StoreProvider>




    );
  }


}



export default App;
