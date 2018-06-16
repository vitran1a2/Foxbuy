'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  NavigationActions
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Product from 'PS05384_ASIGNMENT/src/components/Main/Product/Product.js';
import Product2 from 'PS05384_ASIGNMENT/src/components/Main/Product/Product2.js';

const images = [
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
];
const images2 = [
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
];
const images3 = [
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
'https://www.babiesbloomstore.com/media/catalog/category/Nuvita_Banner_2_1.jpg',
];
const link1 = [
'https://www.vatgia.com/hoidap/4245/650168/cac-dong-tivi-lg-oled-moi-nhat-tren-thi-truong-nam-2018.html',
'https://www.gsmarena.com/motorola_moto_z3_play-9003.php',
'https://www.gsmarena.com/xiaomi_redmi_note_5_pro-8893.php',
];
const link2 = [
'https://vnn-imgs-f.vgcloud.vn/2018/03/27/10/ai-vua-mua-iphone-x-se-soc-vi-muc-gia-iphone-x-2018.jpg',
'http://media.kinhtedothi.vn//2017/11/09/GALA.jpg',
'http://infotpoint.com/wp-content/uploads/2016/09/Apple-iPhone-7-release-date.jpg',
];
const link3 = [
'https://1.bp.blogspot.com/-GFpali_vPSM/Wgpe_1SnJXI/AAAAAAAAE_0/2YcStL9Avgc1LVKpOI5_ThnO9--UiRMSQCLcBGAs/s640/Black%2BFriday%2BPhone%2BDeals.jpg',
'https://i2.wp.com/trydiscountcoupons.com/wp-content/uploads/2017/07/a46a39.jpg?resize=600%2C233',
'https://i-cdn.phonearena.com/images/articles/307868-thumb/walmart-black-friday.jpg',
];
const Navigations = TabNavigator({
  New: { screen:({navigation, screenProps}) => <Product2 navigator = {screenProps.navigator}  drawer = {screenProps.drawer} link = {link1} type = 'new' title = 'New Products'  imagess = {images}/> },
  Hot: { screen:({navigation, screenProps}) => <Product2 navigator = {screenProps.navigator} drawer = {screenProps.drawer}  link = {link2} type = 'hot' title = 'Hot Products' imagess = {images2}/>},
  Discount:{ screen:({navigation, screenProps}) => <Product2 navigator = {screenProps.navigator} drawer = {screenProps.drawer} link = {link3} type = 'discount' title = 'Sales'  imagess = {images3}/>},
},
{
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: 'white',
    inactiveTintColor: '#ffcfbc' ,
    activeBackgroundColor: 'red',
    inactiveBackgroundColor:'white',
    style: {
      backgroundColor: '#ffad89',
      elevation: 0,
    },
    tabStyle: {
      height: 35,
    },
    labelStyle :{
      fontSize: 11,
      fontWeight: '500'
    },

    indicatorStyle: {
      backgroundColor: 'transparent',
    },
  }});
  export default class HomeContent extends Component {
    render() {
      return (
      <View style={styles.container}>
      <Navigations 
      screenProps={{navigator:this.props.navigator, drawer: this.props.drawer}} 
      style={styles.container} />
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'white'
    }
  });

