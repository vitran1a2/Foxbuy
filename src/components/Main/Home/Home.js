'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import HomeContent from './HomeContent.js';
import { DrawerNavigator } from 'react-navigation';
import Drawer from 'PS05384_ASIGNMENT/src/components/Main/Home/Menu/Drawer'
import SideMenu from 'PS05384_ASIGNMENT/src/components/Main/Home/Menu/SideMenu.js';
class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.headerStyle}>
         <TouchableOpacity
          onPress={() => this.props.screenProps.drawerNavigation.navigate('DrawerOpen')}
          style={{padding: 10}}>
            <Text style={{fontFamily: 'ionicons', fontSize: 20, color: 'white'}}>&#xf394;</Text>
        </TouchableOpacity>
    <Text style={styles.title}> 
        Baby Shop
    </Text>
    <TouchableOpacity
          onPress={() => this.props.navigator.navigate('Cart')}
          style={{padding: 10}}>
            <Text style={{fontFamily: 'ionicons', fontSize: 20, color: 'white'}}>&#xf370;</Text>
        </TouchableOpacity>
    </View>
       <HomeContent
       navigator = {this.props.navigator}
       drawer = {this.props.screenProps.drawerNavigation}
       style={styles.container}/>
      
      </View>
    
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'red'
  },
	iconsStyle:{
		fontFamily: 'ionicons',
		fontSize: 20
	},
	viewPager:{
		flex: 1
	},
  asdf:{
    backgroundColor: 'white'
  },
  title:{
     fontFamily: 'tahu',
      textAlign: 'center',
      flex: 1,
      fontWeight: '200',
      fontSize: 22,
      color: 'white',
      textAlignVertical:'center' 
    },
    headerStyle:{backgroundColor: '#FFA67E',height: 40, flexDirection: 'row'}
});
export default Home;