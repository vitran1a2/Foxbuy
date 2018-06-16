'use strict';

import React, { Component } from 'react';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Loginform from './Loginform';
class Login extends Component {
	static navigationOptions = {
   	header: null
  };
  render() {
	const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
	  	<View style={styles.logoContainer}>
			<Image
			  style={styles.logo}
			  source={require('../../../images/logo.png')}
			/>
			<Text style={styles.title}>
			  Please enter username and password to login
			</Text>
	  	</View>
	  	<View style={styles.formContainer}>
			<Loginform
				navigator = {this.props.navigation}>
			</Loginform>
	  	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
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
		width: 69.9,
		height: 105
	},
	title:{
		color: 'white',
		fontSize: 13,
		textAlign: 'center',
		opacity: 0.9,
		paddingHorizontal: 90
	}
});


export default Login;