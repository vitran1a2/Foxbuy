'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,


} from 'react-native';
const ACCESS_TOKEN ='access_token';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/User/taoToken.php'
const GLOBAL2 = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL2 = 'http://'+GLOBAL2.URL+'/ReactNative/Asignment_PHP/User/checkSignin.php'
const ACCESS_ID = 'access_id'
class Loginform extends React.Component<Props> {
 constructor(props) {
	    super(props);
		this.state = {
			username: '',
			password:'',
		}
	}
  componentDidMount(){
  	
  }

  async storeToken(accessToken){
  	try{
  		await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  	}catch(error){

  	}
  }
 async storeId(accessId){
    try{
      await AsyncStorage.setItem(ACCESS_ID, accessId);
    }catch(error){

    }
  }
  async getToken(){
  	try{
  		let token = await AsyncStorage.getItem(ACCESS_TOKEN);
  		this.checkToken(token);
  	}catch(error){ 

  	}
  }

   async removeToken(){
  	try{
  		await AsyncStorage.removeItem(ACCESS_TOKEN);
  	}catch(error){ 

  	}
  }

 checkToken(accessToken){
    fetch(URL2,
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
        this.props.navigator.navigate('Home');
      }
    })
    .done();
  }


  render() {

    return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
    	<StatusBar
    		backgroundColor = '#FFA67E'
			barStyle = 'light-content'>	
    	</StatusBar>
		<TextInput 
			underlineColorAndroid='transparent'
			placeholder= 'Username'
			placeholderTextColor='white'
			returnKeyType='next'
			onChangeText = {(username) => this.setState({username})}
			onSubmitEditing={()=>this.passwordInput.focus()}
			keybordType = 'email-address'
			style ={styles.input}></TextInput>

		<TextInput 
			placeholder='Password'
			secureTextEntry
			returnKeyType='go'
			onChangeText = {(password) => this.setState({password})}
			underlineColorAndroid='transparent'
			placeholderTextColor='white'
			ref={(input) => this.passwordInput = input}
			style ={styles.input}>
		</TextInput>

		<View style={styles.bottomContainer}>
			<TouchableOpacity 
			onPress = {this.login}
			style = {[styles.buttonContainer, styles.button2]}>
				<Text style={styles.buttonText}>
				  Login
				</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.bottomTextContainer}>
			<Text 
			onPress = {() => this.props.navigator.navigate('ForgetPassword')}
			style={styles.register}>
			  Forget your password?
			</Text>
			<Text 
			onPress = {() => this.props.navigator.navigate('Register1')}
			style={styles.register}>
			  Create a new account
			</Text>
		</View>
      </KeyboardAvoidingView>
    );
  }

  login = () => {
	fetch(URL,
		{method: 'POST',
		header:{
			 'Accept': 'application/json',
			 'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			//gửi data về server :v 
			Username: this.state.username,
			Password: this.state.password,
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson["token"] === "ERROR"){
				alert("Your username or Password is wrong!");
			}else{
				this.storeToken(responseJson["token"]);
				this.getToken();
			}
			
		})
		.done();
}
}



const styles = StyleSheet.create({
	container:{
		padding: 15,
	},
	input:{
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		marginBottom: 10,
		color: 'white',
		fontSize: 13,
		padding: 8
	},
	buttonContainer:{
		backgroundColor: '#ff9866',
		padding: 8,
	},
	buttonText:{
		fontSize: 13,
		fontWeight: '500',
		textAlign: 'center',
		color: 'white'
	},
	register:{
		color: 'white',
		fontSize: 12,
		padding: 5,
		opacity: 0.8
	},
	bottomTextContainer:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 5
	},
	bottomContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	button1:{
		flex: 1,
		marginRight: 5
	},
	button2:{
		flex: 5
	}
});


export default Loginform;