import React, { Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView
} from "react-native";

import ReservationForm from "./ReservationForm";




class Stepper extends Component {




    render() {


        return (
            // <SafeAreaView style={styles.container}>
                <ReservationForm />




        )
    }
}

export default Stepper;


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});





















































//
//
//
// // idea {https://www.youtube.com/watch?v=ZiSN9uik6OY&t=217s}
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     Dimensions,
//     FlatList,
//     Animated,
//     Image
// } from 'react-native';
// import Lottie from "./Lottieview";
// import LottieView from "lottie-react-native";
//
// const { width, height } = Dimensions.get('screen')
//
// const images = {
//     man: '../../assets/LottieJSON/receipt.json',
//         // 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     // women:
//     //     'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     // kids:
//     //     'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     // skullcandy:
//     //     'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     // help:
//     //     'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
// };
// const data = Object.keys(images).map((i) => ({
//     key: i,
//     title: i,
//     image: images[i],
// }));
//
// function Stepper() {
//
//
// }
// export default Stepper;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
//
