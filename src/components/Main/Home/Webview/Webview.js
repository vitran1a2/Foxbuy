'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { WebView } from 'react-native';
class Webview extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
  render() {
    return (
    	<View style={styles.container}>
    	<View style={styles.headerStyle}>
         <TouchableOpacity
          onPress={() => this.props.screenProps.drawerNavigation.navigate('DrawerOpen')}
          style={{padding: 10}}>
            <Text style={{fontFamily: 'ionicons', fontSize: 20, color: 'white'}}>&#xf394;</Text>
        </TouchableOpacity>
    <Text style={styles.title}> 
        Fox Buy
    </Text>
    <TouchableOpacity
          onPress={() => this.props.navigator.navigate('Cart')}
          style={{padding: 10}}>
            <Text style={{fontFamily: 'ionicons', fontSize: 20, color: 'white'}}>&#xf370;</Text>
        </TouchableOpacity>
    </View>
      <WebView
        source={{uri: this.props.screenProps.drawerNavigation.state.params.link,}}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	 container:{
    flex: 1,	
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
    headerStyle:{backgroundColor: '#FFA67E',height: 40, flexDirection: 'row'}});


export default Webview;