import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import CustomInput from '../../components/CustomInput/custom_input';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native'
import firebase_app from '../../../firebase/firebase_config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

import {
  getDatabase, 
  get, 
  ref, 
  child, 
  set
} from "firebase/database";

const getLoginToken = async () => {
  try {
    AsyncStorage.getItem('user').then((value) => token=value)
    return JSON.parse(token)
  } catch (e) {
    console.log('Error retrieving login token', e);
  }
};

const PostSignUpScreen = () => {
  const db = getDatabase(firebase_app);

  const [names, setNames] = useState({
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
  });
  const textFunction = (number, text) => {
    temp_names = names
    temp_names[number.number] = text
    setNames(temp_names)
  }
  
  const CustomPerson = (number) => {
  
      return (
          <View style = {{backgroundColor:'white', padding: 10, borderRadius: 5, marginVertical: 5, flexDirection:'row'}}>
              <View style={{width:'20%', height: '100%', backgroundColor:'#ACACAC', marginRight:'1%'}}><Text>{number.number}</Text></View>
              <View style={{width:'78%', height: '100%', marginLeft: '1%'}}><CustomInput placeholder="Name" setValue={(text) => textFunction(number, text)} max = {10}/></View>
          </View>
      )
  }

  const [people, setPeople] = useState(1);
  const [peopleList, setPeopleList] = useState([<CustomPerson number ={1}></CustomPerson>]);
  const [shouldShow, setShouldShow] = useState(false);
  const [warningText, setWarningText] = useState(false);


  navigation = useNavigation()

  const onAddPress = () => {
    let options = {
      storageOptions: {
        path: "image"
      }
    }
    launchImageLibrary(options, response=>{
      console.warn(response)
    })

    if (people == 10){
      setWarningText("Limit Reached")
      setShouldShow(true);
    } else {
      new_number = people+1;
      setPeople(new_number);
      setPeopleList(peopleList.concat(<CustomPerson number ={people+1}></CustomPerson>));
    }
  }
  const onNextPress = () => {
    works = true;
    for (let i =1; i <= people; i++){
      currentName = names[i];
      if (currentName == ''){
        works = false;
        break;
      } else {
        for (let y = 1; y < i; y++){
          if (names[y] == currentName){
            works = false;
            break
          }
        }
      }

      if (!works){
        break
      }
    }
    if (!works){
      setWarningText("Must include distinct names")
      setShouldShow(true);
    }
    else {
      // console.warn(getLoginToken())
      return set(ref(db, '/users/' + getLoginToken()._j.uid), {
        people: names,
        previously_typed:''
      }).then(() =>{
        setShouldShow(false)
        navigation.navigate("Home");
      })
    }
  }
  const onSkipPress = () => {
    navigation.navigate("Home")
  }
  
  const onScreenLoad = () => {
    // console.warn(getLoginToken())
    if (getLoginToken()._j == "logged_out" || getLoginToken._j === undefined){
      navigation.navigate("SignIn")
    }
  }
  
  useEffect(() => {
    onScreenLoad();
  }, [])


  return (
    <View showsVerticalScrollIndicator={false} style = {{height: '100%', backgroundColor: '#F9FBFC'}}>
        <View style={styles.titlebox}>
            <Text style = {styles.title}>List Important People</Text>
          {shouldShow ? (
            <Text style={{marginBottom:2, color:"red"}}>{warningText}</Text>
          ) : null}
        </View>
        <View style={styles.root}>
            <ScrollView style={{padding: 20}} id='peopleList'>
                {peopleList}
            </ScrollView>
        </View>
          <View style={styles.bottomView}>
              <View style={{width:'100%'}}><CustomButton text = "Add" onPress = {onAddPress}  bgColor='#D9DDDC'  fgColor='#88807B'/></View>
              <View style={styles.nextButtons}>
                  <View style={{width:'49%', marginRight:'1%'}}><CustomButton text = "Skip" onPress = {onSkipPress} bgColor='#dbe1e4' fgColor='black'/></View>
                  <View style={{width:'49%', marginLeft:'1%'}}><CustomButton text = "Confirm" onPress = {onNextPress}/></View>
              </View >
          </View>
    </View>
  )
};

const styles = StyleSheet.create({
  root: {
    height:'100%',
    flex: 1,
    position: "relative",
  },
  titlebox: {
    alignItems:'center',
    width:'100%'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginTop: 30,
  },
  bottomView: {
    padding:10,
    width: '100%',
    // backgroundColor: '#F9FBFC',
    // position: 'absolute',
    bottom: 0, 
  },
  nextButtons: {
    flexDirection: 'row',
  }
});
export default PostSignUpScreen;
