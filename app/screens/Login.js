import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { signIn } from '../helpers/auth'

import Toasts from "../components/Toasts";
import {addToast, clearToast} from "../helpers/actions";
import { connect } from 'react-redux';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            check_textInputChange: false,
            secureTextEntry: true,
            error: '',

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this);
    }


    handleChange(val) {

    }

    async handleLogin() {

        this.setState({ error: '' });
        console.log('[?')

        try {
            await signIn(this.state.email, this.state.password)
        } catch (error) {
            this.setState({error: error.message})
            // console.log(this.state.error)
            // console.log(this.props)
            this.props.AddToast(error.message)
        }

    }

    componentDidMount() {
        // this.props.ClearToast()

    }


    render() {
        return (
            <>

                <View style={styles.container}>
                    <StatusBar backgroundColor={'#009387'} barStyle={'light-contenet'}/>
                    <View style={styles.header}>
                        <Toasts />
                        <Animatable.Text
                            style={styles.text_header}
                            animation={'fadeInLeftBig'}
                        > Welcome!
                        </Animatable.Text>
                    </View>
                    <Animatable.View
                        animation={'fadeInUpBig'}
                        style={styles.footer}

                    >
                        <Text style={styles.text_footer}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name={'user-o'}
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder={'Your Email'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) =>this.setState({email: val})}
                            />
                            <Feather
                                name={'check-circle'}
                                color={'green'}
                                size={20}
                            />
                        </View>

                        <Text
                            style={[styles.text_footer, {
                                marginTop: 35
                            }]}
                        >
                            Password
                        </Text>

                        <View style={styles.action}>
                            <FontAwesome
                                name={'lock'}
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder={'Your Password'}
                                secureTextEntry={true}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) =>this.setState({password: val})}
                            />
                            <Feather
                                name={this.secureTextEntry ? 'eye-off' : 'eye'}
                                color={'grey'}
                                size={20}
                            />
                        </View>

                        <View style={styles.button}>
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>
                                    <TouchableOpacity
                                        onPress={this.handleLogin}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingHorizontal: 142
                                        }}
                                    >
                                        <Text style={styles.textSign}>Login</Text>
                                    </TouchableOpacity>

                                </Text>

                            </LinearGradient>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignUp')}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text
                                    style={[styles.textSign, {
                                        color: '#009387'
                                    }]}
                                >
                                    Sign Up
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </>
        );
    }
}

// connect
const mapDispatchToProps = dispatch => {
    return {
        AddToast: msg => dispatch(addToast(msg)),
        ClearToast: () => dispatch(clearToast())

    }
}

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
