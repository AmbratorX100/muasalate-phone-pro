import React from 'react';
import LottieView from 'lottie-react-native';



function Lottie(props) {

    // 48898-uae-family.json not working on android
    return <LottieView source={props.source} autoPlay loop />;

}

export default Lottie;
