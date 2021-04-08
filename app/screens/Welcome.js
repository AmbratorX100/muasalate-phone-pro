import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable'
// import BootstrapStyleSheet from 'react-native-bootstrap-styles';
// import {ActivityIndicator, Colors} from "react-native-paper";
// const bootstrapStyleSheet = new BootstrapStyleSheet();
// const { s, c } = bootstrapStyleSheet;

import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Welcome = ({navigation}) => {


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation={'bounceIn'}
                    duraton={1500}

                    source={require('../Images/logo.png')}
                    style={styles.logo}
                    resizeMode={'stretch'}
                />
            </View>

            <Animatable.View
                style={styles.footer}
                animation={'fadeInUpBig'}
            >
                <Text style={styles.title}>Arrive in time With Moasalate </Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </Animatable.View>



        </View>





    );

}


export default Welcome;


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        // width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});


