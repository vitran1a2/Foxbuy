'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ListView,
  AsyncStorage,
  ScrollView,
  ActivityIndicator
} from 'react-native';
const ACCESS_TOKEN = 'key4';
const GLOBAL = require('PS05384_ASIGNMENT/src/varible/Global.js');
var URL = 'http://'+GLOBAL.URL+'/ReactNative/Asignment_PHP/Product/pushToOrder.php';
const ACCESS_ID = 'access_id'
class cart extends Component {
	constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      sl: '',
      subTotal: 0,
      shippingCost: 10,
      array: '',
      id: '',
      size: 0,
      index: -1,
      newData: '',
      total: 0
    };
  }
  async setData(json){
   try{
     const value = JSON.stringify(json);
     return AsyncStorage.setItem(this.state.id, value);
   }catch(error){
    alert(error);
  }
}
async remove(){
  try{
    return AsyncStorage.removeItem(this.state.id);
  }catch(error){
    alert(error);
  }
}

async getId(){
  try{
    let token = await AsyncStorage.getItem(ACCESS_ID);
    this.setState({
      id : token
    });
    this.setSize();
  }catch(error){ 
    alert(error);
  }
}

async getData2(productId){
  try{
    let token = await AsyncStorage.getItem(this.state.id);
  }catch(error){ 
    alert(error);
  }
}

async setSize(){
  try{
    let token = await AsyncStorage.getItem(this.state.id);
    var newData = JSON.parse(token);
    this.setState({
      newData: newData
    })
    if(token == null || token == "[null]"){

    }else{
      this.showData();
    }
  }catch(error){ 
    alert(error);
  }
}

showData(){
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var size = Object.size(this.state.newData);
  var i;

  if(this.state.newData == null){

  }
  {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.newData)
    })
  }
  this.tinhTotal();
}



tinhTotal(){
    // id => count => price
    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
    var size = Object.size(this.state.newData);
    var i;
    var subTotal = 0;
    var total;
    for(i = 0; i < size; i++){
      if(this.state.newData[i] == undefined){
        size++;
      }else{
        subTotal = subTotal + this.state.newData[i]["Count"]*this.state.newData[i]["Price"];
      }
    }
    if(subTotal >= 1000){
      this.setState({
        shippingCost: 0
      })
      total = subTotal;
    }else{
     this.setState({
      shippingCost: 10
    })
     total = subTotal + 10;
   }
   this.setState({
    subTotal: subTotal,
    total : total
  });
 }
 async setData(json){
  try{
    const value = JSON.stringify(json);
    return AsyncStorage.setItem(this.state.id, value);
  }catch(error){ 
    alert(error);
  }
}

subCart(id){
  var i;
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var size = Object.size(this.state.newData);
  var count;
  var index;
  for(i = 0; i < size; i++){
    if(this.state.newData[i] == undefined){
      size++
    }else{
      if(this.state.newData[i]["ProductId"] == id){
        count = this.state.newData[i]["Count"];
        index = i;
      }
    }
  }

  if(count <= 1){
   delete this.state.newData[index];
 }else{
  count--;
  this.state.newData[index]["Count"] = count;
}
this.setData(this.state.newData);
this.tinhTotal();
}

plusCart(id){
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var size = Object.size(this.state.newData);
  var i;
  var count;
  var index;

  for(i = 0; i < size; i++){
    if(this.state.newData[i] == undefined){
      size++
    }else{
      if(this.state.newData[i]["ProductId"] == id){
        count = this.state.newData[i]["Count"];
        index = i;
      }
    }
  }
  count++;
  this.state.newData[index]["Count"] = count;

  this.setData(this.state.newData);
  this.tinhTotal();
}

deleteCart(){
  this.remove();
  var obj = [];
  this.setState({
    dataSource: this.state.dataSource.cloneWithRows(obj)
  })
  this.setState({
    subTotal: 0,
    total : 0
  });
}

pushToSql(){
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var size = Object.size(this.state.newData);

  if(JSON.stringify(this.state.newData) == "{}"){
    alert("Please buy something before checking out!")
  }else{
    fetch(URL,
      {method: 'POST',
      header:{
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      Size: size,
      ObjProduct: JSON.stringify(this.state.newData)
    })
   })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson);
      this.deleteCart();  
    })
    .done();
  }
}
_renderRow(rowData){
  if(rowData == null){
    return <View></View>
  }
  return (
    <View style={styles.itemContainer}>
    <View
    style={{flex: 4, alignItems: 'center', justifyContent: 'center', padding:20}}>
    <Image
    resizeMode="contain"
    style={styles.imageCustom}
    source={{uri: rowData.Image}}/>
    </View>

    <View style={styles.textContainer}>
    <Text style={[styles.itemText, styles.itemName]}>
    {rowData.Name}
    </Text>
    <View style={styles.textContainerBottom}>
    <Text style={[styles.itemText, styles.itemPrice]}>
    ${rowData.Price}
    </Text>
    <View style={styles.dauContainer}>
    <TouchableOpacity 
    onPress = {() => this.subCart(rowData.ProductId)}
    style={styles.dau}>
    <Text style={styles.textDau}>
    -
    </Text>
    </TouchableOpacity>
    <Text style={styles.sl}>
    {rowData.Count}
    </Text>
    <TouchableOpacity 
    onPress = {() => this.plusCart(rowData.ProductId)}
    style={styles.dau}>
    <Text style={styles.textDau}>
    +
    </Text>
    </TouchableOpacity>
    </View>
    </View>

    </View>
    </View>
    );
}

componentDidMount(){
  this.getId();
}

static navigationOptions = ({ navigation, screenProps }) => ({
  title: 'Shopping Cart',
  headerTitleStyle: {
   fontFamily: 'tahu',
   textAlign: 'center',
   flex: 1,
   fontWeight: '200',
   fontSize: 22,
   color: 'white',},
   headerStyle:{backgroundColor: '#FFA67E',height: 40, elevation: 0
 },
 headerLeft:<View><TouchableOpacity
 onPress={() => navigation.goBack()}
 style={{padding: 15}}>
 <Text style={{fontFamily: 'ionicons', fontSize: 20, color: 'white'}}>&#xf3bf;</Text>
 </TouchableOpacity></View>,
});

render() {
  return (
   <View style={styles.container}>
   <View style={styles.top}>
   <ListView
   enableEmptySections={true}
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}>
   </ListView>
   </View>
   <View style={styles.bottom}>
   <View style={styles.bottomTop}>
   <View style={styles.bottomTextContainer}>
   <Text style={styles.textLeft}>
   SubTotal
   </Text>
   <Text style={styles.textRight}>
   $ {this.state.subTotal}
   </Text>
   </View>
   <View style={styles.bottomTextContainer}>
   <Text style={styles.textLeft}>
   Shipping Cost
   </Text>
   <Text style={styles.textRight}>
   $ {this.state.shippingCost}
   </Text>
   </View>
   <View style={{flexDirection: 'row',flex: 1, }}>
   <Text style={[styles.textLeft, styles.weight]}>
   Total
   </Text>
   <Text style={[styles.textRight,  styles.weight]}>
   $ {this.state.total}
   </Text>
   </View>
   </View>

   <TouchableOpacity 
   onPress={()=> this.pushToSql()}
   style = {styles.buttonContainer}>
   <Text style={styles.bottomText}>
   CHECKOUT
   </Text>
   </TouchableOpacity>

   <TouchableOpacity 
   onPress={() => this.deleteCart()}
   style = {styles.buttonContainer}>
   <Text style={styles.bottomText}>
   DELETE CART
   </Text>
   </TouchableOpacity>
   </View>
   </View>
   );
}
}

const styles = StyleSheet.create({
 container:{
  flex: 1,
  backgroundColor: '#f2f2f2',
  padding: 15
},
top:{
  height: 300,
  backgroundColor: 'white',
  marginBottom: 10,
  paddingHorizontal:10
},
bottom:{
  justifyContent: 'center',
  flex: 1,
},
title:{
  color: 'red'
},
imageCustom:{
 width: 120,
 height: 80
},
itemContainer:{
 flexDirection: 'row',
 borderBottomWidth: 1,
 borderBottomColor:'#ededed',
 borderStyle: 'solid',
 flex: 1,
},
itemText:{
 padding: 5
},
itemName:{
  fontSize: 14,
},
itemPrice:{
  fontSize: 16,
  color: '#b7b7b7',
  flex: 1.5
},
textContainer:{
  padding: 4,
  flex: 8
},
textContainerBottom:{
 flexDirection: 'row',
 marginTop: 5
},
dauContainer:{
 flex: 1,
 flexDirection: 'row',
 borderColor: '#d1d1d1',
 borderWidth: 1,
 borderStyle: 'solid',
},
dau:{
 backgroundColor: '#d1d1d1',
 flex: 1,
 justifyContent: 'center',
 paddingHorizontal: 2
},
textDau:{
 textAlign: 'center',
 color: 'white', 
},
sl:{
 flex: 1.5,
 textAlign: 'center',
 textAlignVertical:'center' 
},
buttonContainer:{
 flex: 1,
 backgroundColor: '#FFA67E',
 marginVertical: 5,
 padding: 5
},
bottomTop:{
 flex: 4,
 backgroundColor: 'white',
 marginBottom: 10,
 paddingVertical: 5,
 paddingHorizontal: 15
},
bottomTextContainer:{
 flexDirection: 'row',
 flex: 1,
 borderColor: '#ededed',
 borderBottomWidth: 1,
 borderStyle: 'solid',
},
textLeft:{
 flex: 1,
 fontSize: 15,
 textAlign:'left',
 textAlignVertical:'center',
},
textRight:{
 flex: 1,
 fontSize: 15,
 textAlign: 'right',
 textAlignVertical:'center' 
},
bottomText:{
 color: 'white',
 textAlign: 'center',
 textAlignVertical:'center', 
 flex: 1
},
weight:{
 fontWeight:'bold'
},
});


export default cart;