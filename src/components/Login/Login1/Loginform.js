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
import Hr from 'react-native-hr-component'
class Loginform extends React.Component<Props> {
	 constructor(props) {
    super(props);}
	
  render() {
    return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
    	<StatusBar
    		backgroundColor = '#FFA67E'
			barStyle = 'light-content'>	
    	</StatusBar>
    	<TouchableOpacity 
		onPress = {() => this.props.navigator.navigate('Login2')}
		style = {styles.buttonContainer}>
			<Text style={styles.buttonText}>
			  Login
			</Text>
		</TouchableOpacity>
		<Hr lineColor='white'
			textPadding={15}
			hrStyles={{paddingHorizontal: 20,
			paddingVertical: 5,
			opacity: 0.5}}
			textStyles={{textAlign: 'center',
			color: 'white',
			fontSize: 13,
			fontWeight: '500',}}
			text="Or" />
		<TouchableOpacity 
		 onPress = {() => this.props.navigator.navigate('Home')}
		 style = {styles.buttonContainer}>
			<Text style={styles.buttonText}>
			  Buy products without logining in
			</Text>
		</TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		padding: 15,
		marginBottom: 10
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
		opacity: 0.9
	}
});


export default Loginform;