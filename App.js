/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/User/checkSignin.php'
import {StackNavigator, } from 'react-navigation';
import Login2 from './src/components/Login/Login2/Login.js';
import Login1 from './src/components/Login/Login1/Login.js';
import Drawer from './src/components/Main/Home/Menu/Drawer.js';
import ForgetPassword from './src/components/ForgetPassword/ForgetPassword.js';
import Register1 from './src/components/Register/Register1/Register1.js'
import Register2 from './src/components/Register/Register2/Register1.js'
import Register3 from './src/components/Register/Register3/Register1.js'
import Cart from './src/components/Main/Cart/cart.js'
import SideMenu from './src/components/Main/Home/Menu/SideMenu'
import Slide from 'PS05384_ASIGNMENT/src/components/Main/Home/Slide/Slide.js';
import ProductDetail from './src/components/Main/Product/ProductDetail'
const ACCESS_TOKEN ='access_token';
const ACCESS_ID = 'access_id';
const ACCESS_USERNAME = 'access_username';
type Props = {};
class App extends Component<Props> {
 static navigationOptions = {

 };
 constructor(props) {
  super(props);
  
  this.state = {};
}
componentWillMount(){
  this.getToken();
}

async removeToken(){
  try{
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    alert("Token Removed");
  }catch(error){ 

  }
}

async getToken(){
  try{
    let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    if(!accessToken){
      this.props.screenProps.navigator.navigate('Login2');
    }else{
      this.checkToken(accessToken);
    }
  }catch(error){

  }
}

async storeId(accessId){
  try{
    await AsyncStorage.setItem(ACCESS_ID, accessId);
  }catch(error){

  }
}

async storeUserName(userName){
  try{
    await AsyncStorage.setItem(ACCESS_USERNAME, userName);
  }catch(error){

  }
}


async getId(){
  try{
    let token = await AsyncStorage.getItem(ACCESS_ID);

  }catch(error){ 

  }
}

async removeId(){
  try{
    await AsyncStorage.removeItem(ACCESS_ID);
    alert("Id removed");
  }catch(error){ 

  }
}

checkToken(accessToken){
  fetch(URL,
    {method: 'POST',
    header:{
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    Token: accessToken,
  })
 })
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson["token"] === 'ok'){
      this.storeId(responseJson["id"]);
      this.storeUserName(responseJson["username"]);
      this.props.screenProps.navigator.navigate('Home');
    }else{
      this.props.screenProps.navigator.navigate('Login2');
    }
  })
  .done();
}

render() {
  return (
   <View style={styles.container}></View>
   );
}
}

const Navigations = StackNavigator({
  Root: {screen: ({navigation, screenProps}) => <App screenProps={{navigator:navigation}}/>},
  Login1: { screen: Login1 },
  Login2: { screen: Login2 },
  Home: {screen: Drawer},
  ForgetPassword: {screen: ForgetPassword},
  Register1:{screen: Register1},
  Register2:{screen: Register2},
  Register3:{screen: Register3},
  Cart: {screen: Cart},
  SideMenu: {screen: SideMenu},
  ProductDetail: {screen: ProductDetail},
},
{
  navigationOptions:{
   headerStyle:{backgroundColor: '#FFA67E',height: 0, elevation: 0}
 }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});
export default Navigations;
