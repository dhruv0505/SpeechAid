import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/custom_input';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native'
import firebase_app from '../../../firebase/firebase_config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getDatabase, 
  get, 
  ref, 
  child, 
  set
} from "firebase/database";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
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

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldShow, setShouldShow] = useState('');

  navigation = useNavigation()

  const onNextPress = () => {
    const auth = getAuth(firebase_app);
    const db = getDatabase(firebase_app);
    createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
              return set(ref(db, '/users/' + user.uid), {
                people: {
                  1:'',
                  2:'',
                  3:'',
                  4:'',
                  5:'',
                  6:'',
                  7:'',
                  8:'',
                  9:'',
                  10:''
                },
                previously_typed:''
              }).then(() =>{
                setShouldShow(false)
                navigation.navigate("PostSignUp");
              })
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setShouldShow(true);
        });
  }
  const onSignInGoogle = () => {
    google_sign_in()
  }
  const onSignInApple = () => {
    console.warn("Apple")
  }
  const onSignInPress = () => {
    navigation.navigate("SignIn")
  }

  const onScreenLoad = () => {
    console.warn("signuP" + JSON.stringify(getLoginToken()._j))
    if (getLoginToken()._j!="logged_out" && getLoginToken()._j!==undefined){
      navigation.navigate("Home")
    }
  }
  useEffect(() => {
    onScreenLoad();
  }, [])
  // 
  return(
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style = {styles.title}>Create an Account</Text>
        {shouldShow ? (
          <Text style={{marginBottom:2, color:"red"}}>Invalid Email/Password</Text>
        ) : null}
        <CustomInput placeholder="Email" value={username} setValue={setUsername}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomButton text = "Next" onPress = {onNextPress} />
        <CustomButton text = "Sign Up With Google" onPress = {onSignInGoogle} bgColor='#FAE9EA' fgColor='#DD4D44'/>
        <CustomButton text = "Sign Up With Apple" onPress = {onSignInApple} bgColor='#E3E3E3' fgColor='#363636'/>
        <CustomButton text = "Already have an account? Log In" onPress = {onSignInPress} type="TERTIARY"/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 20,
  }
});

export default SignUpScreen;
