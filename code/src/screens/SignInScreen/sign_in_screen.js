import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import logo from '../../../../assets/images/logo.png'
import CustomInput from '../../components/CustomInput/custom_input';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native'
import firebase_app from '../../../firebase/firebase_config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithCredential 
} from "firebase/auth";

const getLoginToken = async () => {
  try {
    AsyncStorage.getItem('user').then((value) => token=value)
    return JSON.parse(token)
  } catch (e) {
    console.log('Error retrieving login token', e);
  }
};

auth = getAuth(firebase_app)

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldShow, setShouldShow] = useState(false);



  const navigation = useNavigation();

  const onSignInPress = () => {
    auth = getAuth(firebase_app);
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
        setShouldShow(false)
        navigation.navigate("Home")
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setShouldShow(true);
    });
  }
  const onForgotPasswordPress = () => {
    console.warn("Forgot Password")
  }
  const onSignInGoogle = () => {
    promptAsync()
    // console.warn("Apple")
  }
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2))
      } else {
        console.log("else")
      }
    })

    if (getLoginToken()._j!="logged out" && getLoginToken()._j!=null){
      navigation.navigate("Home")
    }
    
    return () => unsub();
  }, [])
  const onSignInApple = () => {
    console.warn("Apple")
  }
  const onSignUpPress = () => {
    navigation.navigate('SignUp')
  }

  const {height} = useWindowDimensions();

  return(
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image source={logo} styles={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />        
      {shouldShow ? (
        <Text style={{marginBottom:2, color:"red"}}>Email or Password is Incorrect</Text>
      ) : null}
      <CustomInput placeholder="Email" value={username} setValue={setUsername}/>
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
      <CustomButton text = "Log In" onPress = {onSignInPress} />
      <CustomButton text = "Forgot Password" onPress = {onForgotPasswordPress} type="TERTIARY"/>
      <CustomButton text = "Sign In With Google" onPress = {onSignInGoogle} bgColor='#FAE9EA' fgColor='#DD4D44'/>
      <CustomButton text = "Sign In With Apple" onPress = {onSignInApple} bgColor='#E3E3E3' fgColor='#363636'/>
      <CustomButton text = "Don't have an account? Sign Up" onPress = {onSignUpPress} type="TERTIARY"/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo:{
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
