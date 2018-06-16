'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  AsyncStorage

} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { DrawerNavigator } from 'react-navigation';
import SideMenu from './SideMenu.js';
import Home from 'PS05384_ASIGNMENT/src/components/Main/Home/Home.js';
import Product from 'PS05384_ASIGNMENT/src/components/Main/Product/Product.js';
import ProductDetail from 'PS05384_ASIGNMENT/src/components/Main/Product/ProductDetail.js'
import WebView from 'PS05384_ASIGNMENT/src/components/Main/Home/Webview/Webview'
const ACCESS_USERNAME = 'access_username'
const MyDrawerNavigator = DrawerNavigator({
  Home:{
    screen: ({navigation, screenProps}) => <Home  type = 'tv' navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
  Laptop: {
     screen: ({navigation, screenProps}) => <Product  type = 'laptop' navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
  Phone: {
     screen: ({navigation, screenProps}) => <Product  type = 'phone' navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
  Phukien: {
     screen: ({navigation, screenProps}) => <Product  type = 'phukien'  navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
  Tv: {
     screen: ({navigation, screenProps}) => <Product  type = 'tv' navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
   WebView: {
     screen: ({navigation, screenProps}) => <WebView  navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : "???" }}/>
  },
},
{
  contentComponent: ({navigation, screenProps}) => <SideMenu  navigator = {screenProps.navigator} screenProps={{drawerNavigation:navigation, userName : screenProps.username }}/>,
  drawerWidth: Dimensions.get('window').width*2/3,
  navigationOptions:{
    header: null
  }
});
class Drawer extends Component {
static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle:{backgroundColor: '#FFA67E',height: 0, elevation: 0}
  });
  constructor(props) {
    super(props);
    this.state = {
      actualwidth : 0,
      username: ''
    };
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
    this.getUserName();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MyDrawerNavigator  screenProps={{navigator:this.props.navigation, username: this.state.username}}  />
      </View>
    );
  }

}

const styles = StyleSheet.create({

});




export default Drawer;
