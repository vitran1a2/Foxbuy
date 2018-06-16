'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/User/forgetPassword.php'
class ForgetPassword extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username: '',
	  	password2:'',
	  	newpassword:''
	  };
	}
	static navigationOptions = {
   	header: null
  };

  resetPassword(){
  	 fetch(URL, {
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Username: this.state.username,
        Password2: this.state.password2,
        Newpassword: this.state.newpassword
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      alert(responseData);
    })
    .catch((error)=>{
      console.error(error);
    })
    .done()
  }
  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.logoContainer}>
			<Image
			  style={styles.logo}
			  source={require('../../images/logo.png')}
			/>
			<Text style={styles.title}>
			  Please complete the form to reset your password
			</Text>
	  	</View>
	  	<KeyboardAvoidingView behavior='padding' style={styles.formcontainer}>
	    	<StatusBar
	    		backgroundColor = '#FFA67E'
				barStyle = 'light-content'>	
	    	</StatusBar>
			<TextInput 
				underlineColorAndroid='transparent'
				placeholder= 'Enter your username'
				onChangeText = {(username) => this.setState({username})}
				placeholderTextColor='white'
				returnKeyType='next'
				onSubmitEditing={()=>this.passwordInput.focus()}
				keybordType = 'email-address'
				style ={styles.input}></TextInput>

			<TextInput 
				placeholder='Enter your second password'
				secureTextEntry
				returnKeyType='next'
				onChangeText = {(password2) => this.setState({password2})}
				underlineColorAndroid= 'transparent'
				placeholderTextColor='white'
				ref={(input) => this.passwordInput = input}
				style ={styles.input}>
			</TextInput>
			<TextInput 
				placeholder='Enter your new password'
				secureTextEntry
				returnKeyType='go'
				onChangeText = {(newpassword) => this.setState({newpassword})}
				underlineColorAndroid='transparent'
				placeholderTextColor='white'
				ref={(input) => this.passwordInput = input}
				style ={styles.input}>
			</TextInput>
			<TouchableOpacity 
			 onPress = {() => this.resetPassword()}
			 style = {styles.buttonContainer}>
				<Text style={styles.buttonText}>
				  Reset your password
				</Text>
			</TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		padding: 15,
		backgroundColor: '#FFA67E',
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
	title:{
		color: 'white',
		fontSize: 13,
		textAlign: 'center',
		opacity: 0.9,
		paddingHorizontal: 80
	},
	logoContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
	},
	logo:{
		width: 59.9,
		height: 95
	},
});


export default ForgetPassword;