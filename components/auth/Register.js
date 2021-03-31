import React, { Component } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from '@firebase/app';

import Header from '../../src/shared/Header';
import FlatButton from '../../src/shared/Button';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
        this.onRegister = this.onRegister.bind(this);
    }

    onRegister() {
        const { firstName, lastName, email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        firstName,
                        lastName,
                        email,
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <LinearGradient
                colors={['#733BC3', '#C4346C', '#C64156']}  
                style={styles.container}
            >
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                    >
                    <Header />
                    <Text style={styles.title}>Please Sign Up</Text>

                    <TextInput
                        placeholder="First Name"
                        onChangeText={(firstName) => this.setState({ firstName })}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput.focus() }}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        style={styles.inputs}
                    />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        onChangeText={(lastName) => this.setState({ lastName })}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.thirdTextInput.focus() }}
                        style={styles.inputs}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        onChangeText={(email) => this.setState({ email })}
                        ref={(input) => { this.thirdTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.fourthTextInput.focus() }}
                        style={styles.inputs}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        onChangeText={(password) => this.setState({ password })}
                        ref={(input) => { this.fourthTextInput = input; }}
                        secureTextEntry={true}
                        style={styles.inputs}
                    />

                    <FlatButton 
                        text="Register"
                        onPress={() => {this.onRegister()}}
                    />
                    <Text 
                        style={styles.goBack}
                        onPress={() => { this.props.navigation.goBack("Landing")}}
                    >
                        back
                    </Text>
                   
                    </KeyboardAwareScrollView>
                
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 12,
        paddingTop: 20,
    },
    inputs: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginTop: 8,
        marginBottom: 8,
    },
    goBack: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 12,
        paddingTop: 20,
    },
});

export default Register
