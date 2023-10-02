import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLoginToken = async () => {
  try {
    AsyncStorage.getItem('user').then((value) => token=value)
    return JSON.parse(token)
  } catch (e) {
    console.log('Error retrieving login token', e);
  }
};

const Home = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.setItem('user', "logged_out").then(() => {
      console.warn(getLoginToken())
      navigation.navigate("SignIn")
    })
  }
  
  const onScreenLoad = () => {
    if (getLoginToken()._j == "logged_out" || getLoginToken()._j === undefined){
      navigation.navigate("SignIn")
    }
  }
  
  useEffect(() => {
    onScreenLoad();
  }, [])

  return (
    <View style={{alignItems:"center", justifyContent:"center"}}>
      <Text style = {{fontWeight:"bold", fontSize:50}}>Hi</Text>
      <CustomButton onPress={logout}>Logout</CustomButton>
    </View>
  );
};

export default Home