import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import logo from '../../../../assets/images/logo.png'
import CustomInput from '../../components/CustomInput/custom_input';
import CustomButton from '../../components/CustomButton';
import { log_in, google_sign_in } from '../../../firebase/authentication.js'
import {useNavigation} from '@react-navigation/native'


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onSignInPress = () => {
    const verified = log_in(username, password)
    if (verified){
      navigation.navigate("Home")
    }
  }
  const onForgotPasswordPress = () => {
    console.warn("Forgot Password")
  }
  const onSignInGoogle = () => {
    google_sign_in()
  }
  const onSignInApple = () => {
    console.warn("Apple")
  }
  const onSignUpPress = () => {
    navigation.navigate('SignUp')
  }

  const {height} = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image source={logo} styles={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <CustomInput placeholder="Email" value={username} setValue={setUsername}/>
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
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
