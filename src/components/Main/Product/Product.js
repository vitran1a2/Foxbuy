'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/Product/getData.php';
class Product extends Component {

  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
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
   <View style={styles.container}>
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
   <ListView
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}>
   </ListView>
   </View>
   );
}
}

const styles = StyleSheet.create({
  test:{
    flex: 1
  },
  container:{
    backgroundColor: 'white',
    flex: 1
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


export default Product;