'use strict';

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Registerform1 from './Registerform1.js'
class Register1 extends Component {
	static navigationOptions = {
   	header: null};
  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.logoContainer}>
			<Image
			  style={styles.logo}
			  source={require('../../../images/logo.png')}/>
			<Text style={styles.title}>
			   You are almost there
			</Text>
	  	</View>
	  	<Registerform1 navigator = {this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		padding:10,
		backgroundColor: '#FFA67E',
	},
	logoContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
	},
	formContainer:{

	},
	logo:{
		width: 59.9,
		height: 95
	},
	title:{
		color: 'white',
		fontSize: 13,
		textAlign: 'center',
		opacity: 0.9,
		paddingHorizontal: 90

	}
});


export default Register1;