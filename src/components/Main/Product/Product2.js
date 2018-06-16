'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  NavigationActions
} from 'react-native';
import {StackNavigator, } from 'react-navigation';
import Slide from 'PS05384_ASIGNMENT/src/components/Main/Home/Slide/Slide.js';
import FastImage from 'react-native-fast-image'
import ProductDetail from 'PS05384_ASIGNMENT/src/components/Main/Product/ProductDetail.js'
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/Product/getData.php';
class Product extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    };
  }
  GoToProductDetail(id,image,image2,image3, des1, des2, name, price){
    this.props.navigator.navigate('ProductDetail', {id: id,name: name, des1: des1, des2: des2, price: price, image: image, image2: image2, image3: image3});
  }
  _renderRow(rowData){
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={()=> {
        this.GoToProductDetail(rowData.Id,rowData.Image,rowData.Image2,rowData.Image3,rowData.Des1, rowData.Des2, rowData.Name, rowData.Price);
      }}>
      <View style={{alignItems: 'center', padding: 10}}>
      <FastImage
      style={styles.imageCustom}
      source={{
        uri: rowData.Image,
        headers:{ Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
      />
      </View>
      <View style={styles.textContainer}>
      <Text style={[styles.itemText, styles.itemName]}>
      {rowData.Name}
      </Text>
      <Text style={[styles.itemText, styles.itemPrice]}>
      $ {rowData.Price}
      </Text>
      </View>
      </TouchableOpacity>
      );
  }
  
  componentDidMount(){
    this.fetchData(); 
  }

  fetchData(){
   fetch(URL, {
    method:'POST',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      Type: this.props.type,
    })
  })
   .then((response) => response.json())
   .then((responseData) => {
     this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData)
    })
   })
   .catch((error)=>{
    console.error(error);
  })
   .done()
 }

 render() {
  return (
   <ScrollView style={styles.container}>
   <Slide drawer = {this.props.drawer} images = {this.props.imagess} link = {this.props.link}/>
   <View style={styles.test}>
   <ListView
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}>
   </ListView>
   </View>
   </ScrollView>
   );
}
}

const styles = StyleSheet.create({
  test:{
    flex: 1
  },
  container:{
    flex: 1
  },
  title:{
    color: 'red'
  },
  imageCustom:{
    padding: 30,
    width: 100,
    height: 50,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
  },
  imageCustom2:{
    width: null,
    height: null ,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  itemContainer:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor:'rgba(0,0,0,0.1)',
    borderStyle: 'solid',
    flex: 1,
    flexDirection: 'row'
  },
  itemText:{
    
  },
  itemName:{
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  itemDescription:{
    fontSize: 11,
  },
  textContainer:{
    padding: 5,
    flex: 1,
  },
  top:{
    height: 180,
  },
  itemPrice:{
    padding: 5,
    fontSize: 15,
  },
  newTitle:{
    textAlign:'center',
    fontSize: 18,
    padding: 10,
    color: 'white',
    backgroundColor: '#ffad89'
  }
});

export default Product;