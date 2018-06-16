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

class Registerform1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      password:'',
      passwordComfirm:'',
      password2:'',
    }
  }
  checkValidation(){
  	if(this.state.password == '' || this.state.passwordComfirm == '' ||this.state.password2 == '' ){
  		alert('Please finish the form')
  	}else if(this.state.password != this.state.passwordComfirm){
  		alert('password and password Comfirm need to be the same');
  	}else{
  		this.props.navigator.navigate('Register3',{ 
  			username: this.props.navigator.state.params.username,
  			password: this.state.password,
  			password2: this.state.password2
  		});
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
			secureTextEntry
			onChangeText={(password) => this.setState({password})}
			placeholder= 'Enter your password'
			placeholderTextColor='white'
			returnKeyType='next'
			onSubmitEditing={()=>this.passwordInput.focus()}
			keybordType = 'email-address'
			style ={styles.input}></TextInput>

		<TextInput 
			placeholder='Confirm your password'
			secureTextEntry
			onChangeText={(passwordComfirm) => this.setState({passwordComfirm})}
			returnKeyType='go'
			underlineColorAndroid='transparent'
			placeholderTextColor='white'
			style ={styles.input}>
		</TextInput>
		<TextInput 
			placeholder='Enter your second password'
			secureTextEntry
			onChangeText={(password2) => this.setState({password2})}
			returnKeyType='go'
			underlineColorAndroid='transparent'
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
			onPress = {() => this.checkValidation()}
			style = {[styles.buttonContainer, styles.button2]}>
				<Text style={styles.buttonText}>
				  Next
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
		color: 'white',
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