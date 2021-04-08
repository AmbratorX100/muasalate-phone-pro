import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ScrollView,
    Modal,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box'
import IntlPhoneInput from 'react-native-intl-phone-input';

import { signUp, usernameExists, newUserDB, emailVerification, logout } from '../helpers/auth';

import Toasts from "../components/Toasts";
import {addToast} from "../helpers/actions";
import { connect } from 'react-redux';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);




class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: false,

            error: ''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        // phone
        this.renderCustomModal = this.renderCustomModal.bind(this);
    }

    // phone

    renderCustomModal=(modalVisible, countries, onCountryChange) => (
        <Modal visible={modalVisible}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View>
                        <TextInput placeholder="Search" />
                        <Text>🔍</Text>
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        data={countries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => onCountryChange(item.code)}>
                                <Text>{item['EN']}</Text>
                            </TouchableWithoutFeedback>
                        )}
                    />
                </View>
                <TouchableOpacity onPress={() => this.phoneInput.hideModal()}>
                    <Text>CLOSE</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    )


    handleInput(event) {
        this.setState({
            phone: event
        });

    }

    async handleSubmit() {
        let Valid = true;
        let infoErrors = [];
        const FLName = /^[a-zA-Z \u0600-\u06FF]+$/

        // First - last name
        let first = this.state.firstName.trim();
        let last = this.state.lastName.trim();
        let username = this.state.username.trim();
        let email = this.state.email.trim();
        let phone = this.state.phone
        let password = this.state.password;
        let passwordConf = this.state.confirmPassword;



        if (!first.match(FLName) || first.length > 40 || first.length <= 0) {
            Valid = false;
            infoErrors.push(
                'First Name : Wrong Syntax'
            )
        }
        if (!last.match(FLName) || last.length > 40 || last.length <= 0) {
            Valid = false;
            infoErrors.push(
                'Last Name : Wrong Syntax'
            )
        }
        // Username
        if (await usernameExists(username)) {
            infoErrors.push('Username: Username Exists')
        }
        if (!username.match(/^[a-z0-9]+$/i) || username.length > 40 || username.length <= 0) {

            Valid = false;

            infoErrors.push('Username : Wrong Syntax')



        }

        // Email

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            email.length > 80 || email.length <= 0 ) {
            Valid = false;
            infoErrors.push(
                'Email: Wrong Syntax'
            )
        }

        // Phone
        // console.log(phone)
        if ( phone !== undefined && !phone.isVerified ) {
            Valid = false;
            infoErrors.push(
                'Phone Number: Wrong Syntax'
            )
        }

        // password

        if (password.length < 6 || password !== passwordConf) {
            Valid = false;
            infoErrors.push(
                'Password: Wrong Syntax || do not match'
            )

        }

        this.setState({ error: '' })

        if (Valid) {
            try {
                await signUp(email, password, first, last)
                await newUserDB({
                    accountType: this.state.accountType,
                    firstName: first,
                    lastName: last,
                    phone: phone.phoneNumber,
                    username: username,
                    email: email,
                    avatar: '',
                    CountryInfo: {
                        code: phone.selectedCountry.code,
                        name: phone.selectedCountry.en,
                        phoneCode: phone.dialCode

                    }
                })
                await emailVerification()

                await logout()
                this.props.navigation.navigate('Login')
                this.props.AddToast('Please check your Email for the Verification Link')

            } catch (error) {
                this.setState( { error: error.message} )
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.props.AddToast('Email already in use')
                        break
                    default:
                        Alert.alert('error.code')
                        console.log(error)
                }
            }
        } else {
            infoErrors.forEach(msg => {
                // Alert.alert(msg)
                this.props.AddToast(msg)
            })
        }


    }




    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#009387'} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <Toasts />

                    <Animatable.Text
                        style={styles.text_header}
                        animation={'fadeInLeftBig'}
                    >Sign UP!</Animatable.Text>
                </View>
                <Animatable.View
                    animation={'fadeInUpBig'}
                    style={styles.footer}

                >

                    <ScrollView>
                        <Text style={styles.text_footer}>First Name</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name={'user-o'}
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder={'First Name'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) => this.setState({firstName: val})}
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
                            Last Name
                        </Text>

                        <View style={styles.action}>
                            <FontAwesome
                                name={'user-o'}
                                color={'#05375a'}
                                size={20}

                            />
                            <TextInput
                                placeholder={'Last Name'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) => this.setState({lastName: val})}
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
                            Username
                        </Text>

                        <View style={styles.action}>
                            <FontAwesome
                                name={'user-o'}
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder={'Username'}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) => this.setState({username: val})}
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
                            Email
                        </Text>

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
                                onChangeText={(val) => this.setState({email: val})}
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
                            Phone number
                        </Text>

                        {/*<View style={styles.action}>*/}
                            {/*<FontAwesome*/}
                            {/*    name={'user-o'}*/}
                            {/*    color={'#05375a'}*/}
                            {/*    size={20}*/}
                            {/*/>*/}
                            {/*<TextInput*/}
                            {/*    placeholder={'Phone number'}*/}
                            {/*    style={styles.textInput}*/}
                            {/*    autoCapitalize={'none'}*/}
                            {/*    onChangeText={(val) => this.setState({phone: val})}*/}
                            {/*/>*/}
                            {/*<Feather*/}
                            {/*    name={'check-circle'}*/}
                            {/*    color={'green'}*/}
                            {/*    size={20}*/}
                            {/*/>*/}

                            {/*<PhoneInput*/}
                            {/*    ref={ref => {*/}
                            {/*        this.phone = ref;*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<TextInput*/}
                            {/*    placeholder={'Phone number'}*/}
                            {/*    style={styles.button}*/}
                            {/*    autoCapitalize={'none'}*/}
                            {/*    onChangeText={(val) => this.setState({phone: val})}*/}
                            {/*/>*/}

                            <IntlPhoneInput
                                ref={(ref) => this.phoneInput = ref}
                                customModal={this.renderCustomModal}
                                defaultCountry="AE"
                                lang="EN"
                                onChangeText={(val) => this.setState({phone: val})}
                            />



                        {/*</View>*/}


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
                                onChangeText={(val) => this.setState({password: val})}

                            />
                            <Feather
                                name={this.secureTextEntry ? 'eye-off' : 'eye'}
                                color={'grey'}
                                size={20}
                            />
                        </View>

                        <Text
                            style={[styles.text_footer, {
                                marginTop: 35
                            }]}
                        >
                            Confirm Password
                        </Text>


                        <View style={styles.action}>
                            <FontAwesome
                                name={'lock'}
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder={'Confirm Password'}
                                secureTextEntry={true}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={(val) => this.setState({confirmPassword: val})}

                            />
                            <Feather
                                name={this.secureTextEntry ? 'eye-off' : 'eye'}
                                color={'grey'}
                                size={20}
                            />
                        </View>

                        <CheckBox
                            style={{flex: 1, padding: 10}}
                            onClick={()=>{
                                this.setState({
                                    accountType: !this.state.accountType
                                })
                            }}
                            isChecked={this.state.accountType}
                            leftText={"I Am Driver"}
                        />
                    </ScrollView>




                    <View style={styles.button}>

                        {/*<LinearGradient*/}
                        {/*    colors={['#08d4c4', '#01ab9d']}*/}
                        {/*    style={styles.signIn}*/}
                        {/*    onPress={() => this.handleSubmit()}*/}
                        {/*>*/}
                        {/*    <Text style={[styles.textSign, {*/}
                        {/*        color: '#fff'*/}
                        {/*    }]}>*/}
                        {/*        Sign Up*/}

                        {/*    </Text>*/}

                        {/*</LinearGradient>*/}

                        <TouchableOpacity
                            onPress={() => this.handleSubmit()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                                onPress={() => this.handleSubmit()}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>
                                    Sign Up

                                </Text>

                            </LinearGradient>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
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
                                Login
                            </Text>

                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        );
    }
}

// connect
const mapDispatchToProps = dispatch => {
    return {
        AddToast: msg => dispatch(addToast(msg))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);

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
    },

});
