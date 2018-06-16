'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/User/register2.php'
class Registerform1 extends Component {
	constructor(props){
    super(props);
    this.state = {
      phoneNumber:'',
      address: ''
    }
  }

  userRegister(){
  	if(this.state.phoneNumber == '' || this.state.address ==''){
  		alert('Please finish the form');
  	}else{
    fetch(URL, {
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Username: this.props.navigator.state.params.username,
        Password: this.props.navigator.state.params.password,
        Password2: this.props.navigator.state.params.password2,
        PhoneNumber: this.state.phoneNumber,
        Address: this.state.address
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData === 'User Registered Successfully'){
      	this.props.navigator.navigate('Login2');
      }else{ 
      	alert(responseData);
      }
    })
    .catch((error)=>{
      console.error(error);
    })
    .done()
  }
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
			placeholder= 'Enter your address'
			placeholderTextColor='white'
			onChangeText={(address) => this.setState({address})}
			returnKeyType='next'
			onSubmitEditing={()=>this.passwordInput.focus()}
			keybordType = 'email-address'
			style ={styles.input}></TextInput>
		<TextInput 
			placeholder='Enter your phone number'
			returnKeyType='go'
			underlineColorAndroid='transparent'
			onChangeText={(phoneNumber) => this.setState({phoneNumber})}
			placeholderTextColor='white'
			style ={styles.input}>
		</TextInput>
			<View style={styles.bottomContainer}>
			<TouchableOpacity 
			onPress = {() => this.props.navigator.goBack()}
			style = {[styles.buttonContainer, styles.button1]}>
				<Text style={styles.buttonText}>
				  Back
				</Text>
			</TouchableOpacity>
			<TouchableOpacity 
			onPress = {() => this.userRegister()}
			style = {[styles.buttonContainer, styles.button2]}>
				<Text style={styles.buttonText}>
				  Comfirm
				</Text>
			</TouchableOpacity>
		</View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
container:{
		
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
		fontSize: 13,
		padding: 5,
		opacity: 0.8
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


export default Registerform1;