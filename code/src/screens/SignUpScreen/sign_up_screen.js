import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/custom_input';
import CustomButton from '../../components/CustomButton';
import { sign_up, google_sign_in } from '../../../firebase/authentication.js'
import {useNavigation} from '@react-navigation/native'


const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  navigation = useNavigation()

  const onNextPress = () => {
    sign_up (username, password)
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style = {styles.title}>Create an Account</Text>
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
