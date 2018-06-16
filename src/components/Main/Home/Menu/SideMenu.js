'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {NavigationActions} from 'react-navigation';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/User/checkToken.php'
const ACCESS_TOKEN ='access_token';
const ACCESS_ID = 'access_id'
const ACCESS_USERNAME = 'access_username';
class SideMenu extends Component {
	static navigationOptions = {
   	header: null
  };
   navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.screenProps.drawerNavigation.dispatch(navigateAction);
  }
  constructor(props) {
    super(props);
  
    this.state = {
      token: '',
      username: ''
    };
  }

  async storeToken(accessToken){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
    }catch(error){

    }
  }
  async removeId(){
    try{
      await AsyncStorage.removeItem(ACCESS_ID);
    }catch(error){ 

    }
  }

   async removeUserName(){
    try{
      await AsyncStorage.removeItem(ACCESS_USERNAME);
    }catch(error){ 

    }
  }
  async getToken(){
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.fetchData(token);
      this.getUserName();
    }catch(error){ 
     
    }
  }

   async removeToken(navigator){
    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.removeId();
      this.removeUserName();
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken){
        this.reset(navigator);
      }else{
        this.getToken(accessToken);
      }
    }catch(error){ 

    }
  }


  reset(navigator){
    return navigator
               .dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Login2'})
                    ]
                  }));
  }

  async getUserName(){
  try{
    let token = await AsyncStorage.getItem(ACCESS_USERNAME);
    this.setState({
      username: token
    })
  }catch(error){ 

  }
}
  componentWillMount(){
    this.getToken();
  }
  fetchData(token){
     fetch(URL, {
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Token: token,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
       this.setState({
        token : token
       });
    })
    .catch((error)=>{
      console.error(error);
    })
    .done()
  }

   render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View 
          style={styles.sectionContainer}>
            <Text style={styles.icon}>&#xf3a0;</Text>
            <Text style={styles.sectionHeadingStyle}>
              User: { this.props.screenProps.userName}
            </Text>
          </View>
           <View>
          <View style={[styles.categoryContainer, styles.homeContainer]}>
          	<TouchableOpacity style={styles.sectionRight}
          	onPress={this.navigateToScreen('Home')}>
          		<Text style={[styles.icon, {padding: 5,color: '#FFA67E'}]}>
          		  &#xf38f;
          		</Text>
          		<Text style = {styles.productName}>
          		  Home
          		</Text>
          	</TouchableOpacity>
          </View>
          </View>



           <View>
          <View style={styles.categoryContainer}>
          	<TouchableOpacity 
          	onPress={this.navigateToScreen('Laptop')}
          	style={styles.sectionLeft}>
              <Text style={[styles.icon, {padding: 5,color: '#FFA67E'}]}>
                &#xf25b;
              </Text>
          		<Text style = {styles.productName}>
          		  Toiletries
          		</Text>
          	</TouchableOpacity>
          	<TouchableOpacity style={styles.sectionRight}
          	onPress={this.navigateToScreen('Phone')}>
            
             <Text style={[styles.icon, {padding: 5,color: '#FFA67E'}]}>
               &#xf2b4;
              </Text>
          		<Text style = {styles.productName}>
          		  Baby feeding
          		</Text>
          	</TouchableOpacity>
          </View>
          </View>

          <View>
          <View style={styles.categoryContainer}>
          	<TouchableOpacity style={styles.sectionLeft}
          	onPress={this.navigateToScreen('Phukien')}>
              <Text style={[styles.icon, {padding: 5,color: '#FFA67E'}]}>
                &#xf3bb;
              </Text>
          		<Text style = {styles.productName}>
          		  Baby Carrier
          		</Text>
          	</TouchableOpacity>
          	<TouchableOpacity style={styles.sectionRight}
          	onPress={this.navigateToScreen('Tv')}>
              <Text style={[styles.icon, {padding: 5,color: '#FFA67E'}]}>
                &#xf3cc;
              </Text>
          		<Text style = {styles.productName}>
          		  Toys
          		</Text>
          	</TouchableOpacity>
          </View>
          </View>


          <View>
          <TouchableOpacity 
          onPress={() => this.removeToken(this.props.navigator)}
          style={styles.sectionContainer}>
            <Text style={styles.icon}>&#xf385;</Text>
            <Text style={styles.sectionHeadingStyle}>
              Log out
            </Text>
          </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		backgroundColor: 'white',
		flex: 1
	},
	inputContainer:{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: '#ffbca0',
	},
	sectionContainer:{
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: '#ffbca0',
	},
	sectionHeadingStyle:{
		flex: 1,
		color: 'white',
		textAlign: 'left',
	},
	input:{
		backgroundColor: '#ffc9b5',
		flex: 1,
		color: 'white',
		textAlignVertical:'center',
		paddingVertical: 11
	},
	icon:{fontFamily: 'ionicons', 
	textAlign: 'center',
	fontSize: 25, color: 'white', 
	padding: 8, 
	textAlignVertical:'center',
	},
	categoryContainer:{
		flexDirection: 'row',
		paddingHorizontal: 5,
		paddingTop: 5,
	},
	homeContainer:{
		backgroundColor: 'white'
	},
	sectionLeft:{
		marginBottom: 20,
		flex: 1,
		margin: 2,
		padding: 5,
		marginRight: 2.5,

	},
	sectionRight:{
		marginBottom: 20,
		padding: 5,
		margin: 2,
		flex: 1,
		marginLeft: 2.5,
	},
	productName:{
		color: '#FFA67E',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});


export default SideMenu;