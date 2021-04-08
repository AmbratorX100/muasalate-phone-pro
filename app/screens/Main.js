import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {StatusBar} from "expo-status-bar";
import Onboarding from 'react-native-onboarding-swiper';

import { ActivityIndicator, Colors } from 'react-native-paper';
import Login from "./Login";
import Welcome from './Welcome';
import Home from './Home';

import {createStackNavigator} from "@react-navigation/stack";
import SignUp from "./SignUp";


const Stack = createStackNavigator();





const firstLunched = async () => {
    try {
        await AsyncStorage.setItem(
            'fistLunch',
            'true'
        );
        console.log('key stored');
    } catch (error) {
        // Error saving data
    }
};

const notFirstLunched = async () => {
    try {
        await AsyncStorage.setItem(
            'fistLunch',
            'false'
        );
        console.log('key stored');
    } catch (error) {
        console.log(error)
    }
};



class Main extends Component {
    constructor(props) {
        super(props);

        // console.log(this.props.email)


        this.state = {
            firstLunch: null,
        }

        this.handleDone = this.handleDone.bind(this)
    };

    handleDone() {
        console.log('Clicked done ')
        this.setState({
            firstLunch: false
        })
    }



    async componentDidMount() {

        // console.log(this.props.id)


        // console.log(await AsyncStorage.getItem('persist:root'))

        // await AsyncStorage.clear()
        // console.log(await AsyncStorage.getItem('msg'))
        // await AsyncStorage.removeItem('toast')
        // to start the first lunch uncomment below command
        // await AsyncStorage.removeItem('fistLunch')
        //
        const value = await AsyncStorage.getItem('fistLunch')
        if (value === null) {
            await firstLunched();
            this.setState({
                firstLunch: true
            })


        } else if (value === true) {
            await notFirstLunched();

            this.setState({
                firstLunch: false
            });
        }
        else {
            this.setState({
                firstLunch: false
            });
        }
        // console.log(value)
        // console.log(this.state.firstLunch)



    }


    render() {
        if (this.state.firstLunch === null) {
            return (
                <ActivityIndicator animating={true} color={Colors.red800} />
            )
        } else if (this.state.firstLunch === true) {
            return (
                <Onboarding
                    onDone={this.handleDone}
                    onSkip={this.handleDone}

                    pages={[

                        {
                            backgroundColor: '#fff',
                            image: <Image source={require('../Images/Frame.png')} />,
                            title: 'Moasalate',
                            subtitle: 'Manage your Transportation in a better way ',
                        },
                        {
                            backgroundColor: '#fe6e58',
                            image: <Image source={require('../Images/Frame2.png')} />,
                            title: 'The Title',
                            subtitle: 'This is the subtitle that sumplements the title.',
                        },
                        {
                            backgroundColor: '#999',
                            image: <Image source={require('../Images/Frame3.png')} />,
                            title: 'Explore',
                            subtitle: "Beautiful, isn't it?",
                        },
                    ]}
                />
                // <View style={styles.container}>
                //     <Text>First Lunch ?</Text>
                //     <StatusBar style="auto" />
                // </View>
            )
        }



        // if logged

        if (this.props.authenticated) {
            return (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName="Home"
                >
                    <Stack.Screen initialParams={{id: this.props.id, email: this.props.email, lastSignAt: this.props.lastSignAt, displayName: this.props.displayName}} name={'Home'} component={Home} />

                </Stack.Navigator>
            )
        }



        return (



            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Welcome"
            >
                <Stack.Screen name={'Welcome'}  component={Welcome} />
                <Stack.Screen name={'Login'} component={Login} />
                <Stack.Screen name={'SignUp'}  component={SignUp} />

            </Stack.Navigator>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Main;
// <a href='https://www.freepik.com/vectors/technology'>Technology vector created by pikisuperstar - www.freepik.com</a>
// <a href='https://www.freepik.com/vectors/technology'>Technology vector created by pikisuperstar - www.freepik.com</a>
