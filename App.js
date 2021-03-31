import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { firebase } from './src/firebase/config';
// import firebase from '@react-native-firebase/app'
// import auth from 'firebase/auth';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// const firebaseConfig = {
//   apiKey: "AIzaSyDdn3QeUB2ysx_C0lLGe9WQfmQHAPQq2NA",
//   authDomain: "micard-testing.firebaseapp.com",
//   projectId: "micard-testing",
//   storageBucket: "micard-testing.appspot.com",
//   messagingSenderId: "320882491783",
//   appId: "1:320882491783:web:341a50ab585a41ed3f5322",
//   measurementId: "G-CBP408EQB5"
// };

// firebase.initializeApp(firebaseConfig)


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './src/shared/Header';

// Auth Screens
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
// Main Screen function
import MainScreen from './components/Main';

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return (
        <LinearGradient
            colors={['#733BC3', '#C4346C', '#C64156']}
            style={styles.container}
          >
            <Header />
            <Text style={styles.title}>Loading...</Text>
        </LinearGradient>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer style={styles.container}>
          <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>  
      )
    }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 12,
    paddingTop: 60,
}
});

export default App
