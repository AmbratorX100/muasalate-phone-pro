import TabBar from "@mindinventory/react-native-tab-bar-interaction";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Map from "./Map";
import SearchBox from './SearchBox'
import Toasts from "./Toasts";
import ReservationForm from "./TmpReservationForm";
// import Lottie from './Lottieview'
import {useSelector, useDispatch} from "react-redux";
import { Dimensions} from "react-native";
import DrawerContent from '../screens/DrawerContent'
import SideMenu from  'react-native-side-menu-updated';
import {createStackNavigator} from "@react-navigation/stack";
import Options from "./Options";
import OptionOne from "./Options/OptionOne";
// import {updateIsOpen} from "../helpers/actions";


const Stack = createStackNavigator();

const {height, width} = Dimensions.get('screen')
//
// console.log(height, width)

function TabBars({navigation}) {
    const reservation = useSelector(state => state.reservationConf)
    const markers = useSelector(state => state.Markers)
    const isOpened = useSelector(state => state.tabBarConf.isOpen)

    const dispatch = useDispatch()

    const menu = <DrawerContent navigator={navigator}/>





    let done = false
    if ((reservation.adults + reservation.children > 0)
        && reservation.date !== ''
        && reservation.driverid !== ''
        && markers.length > 1
        && ! (reservation.adults < 0 || reservation.children < 0)
        && reservation.description.length <= 50 // make this static variable
    ) {
        console.log('Ready to reserve')
        done = true;

    } else {
        console.log('reservation details are not ready ')
        done = false;
    }



    return (


        <TabBar bgNavBar="blue" bgNavBarSelector="red" stroke="green" >
            <TabBar.Item
                icon={require('../../assets/map.png')}
                selectedIcon={require('../../assets/map.png')}
                title="Tab1"
                screenBackgroundColor={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}

            >
                <>
                    <View>
                        <Toasts />
                    </View>
                    <Map />
                    <SearchBox />

                </>

            </TabBar.Item>
            <TabBar.Item
                icon={require('../../assets/reservations.png')}
                selectedIcon={require(`../../assets/reservations.png`)}
                title="Tab2"
                screenBackgroundColor={{ backgroundColor: '' }}
            >


                    <SideMenu
                        menu={menu}
                    >
                        <View style={{flex: 1, backgroundColor: 'white'}}>

                            {done &&

                            <View style={styles.forwardReservation}>
                                <TouchableOpacity
                                    onPress={() => console.log('hi')}
                                >

                                    <Image
                                        source={require('../../assets/forwardReservation.png')}
                                        style={{height: 50, width: 50}}

                                    />
                                </TouchableOpacity>

                            </View>

                            }


                            <ReservationForm />
                        </View>


                    </SideMenu>





            </TabBar.Item>
            <TabBar.Item
                icon={require('../../assets/newRoom.png')}
                selectedIcon={require('../../assets/newRoom.png')}
                title="Tab3"
                screenBackgroundColor={{ backgroundColor: '' }}
            >

                <Stack.Navigator
                    screenOptions={{
                    }}
                    initialRouteName="Options"
                >
                    <Stack.Screen name={'Options'} component={Options} />
                    <Stack.Screen name={'OptionOne'} component={OptionOne} />
                    {/*<Stack.Screen name={'SignUp'}  component={SignUp} />*/}

                </Stack.Navigator>

            </TabBar.Item>
        </TabBar>
    )

}

export default TabBars;

const styles = StyleSheet.create({


    forwardReservation: {
        position: "absolute",
        backgroundColor: 'green',
        width: 60,
        height: 50,
        top: height / 2,
        left: (width / 3.40) * 3 - 5,
        zIndex: 1000,

    }
})
