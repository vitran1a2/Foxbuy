'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	AsyncStorage

} from 'react-native';
import Slide from 'PS05384_ASIGNMENT/src/components/Main/Home/Slide/ImageSlide.js';
import Storage from 'PS05384_ASIGNMENT/src/components/Main/Cart/store.js';
const ACCESS_ID = 'access_id';
const ACCESS_TOKEN = 'key4';

class ProductDetail extends Component {
	constructor (props) {

		super(props);

		this.state = {
			id: '',
		}
	} 

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Product Detail',
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

	getDate(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		var today = dd+'/'+mm+'/'+yyyy;
		return today
	}

	async getId(){
		try{
			let token = await AsyncStorage.getItem(ACCESS_ID);
			this.setState({
				id : token
			});
		}catch(error){ 
			alert(error);
		}
	}

	async addToCart(){
		try{
			let token = await AsyncStorage.getItem(this.state.id);
			this.checkData(token);
		}catch(error){ 
			alert(error);
		}
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

	showData(data){
		var newData = JSON.parse(data);
		alert(data);
	}
	checkData(token){
		var data = JSON.parse(token);
		if(token == null || token == "[null]"){
			var obj =  [{"Image": this.props.navigation.state.params.image, "Name": this.props.navigation.state.params.name,"ProductId": this.props.navigation.state.params.id, "UserId":this.state.id, "Count": 1 , "Date": this.getDate(), "Price": this.props.navigation.state.params.price}];
			this.setData(obj);
			alert("Add to cart successfully!");
		}
		else{
			var data = JSON.parse(token);
			Object.size = function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};
			var size = Object.size(data);
			var i;
			var isExist = false;

			for (i = 0; i < size; i++) {
				if(data[i] == undefined){
					size++
				}else{
				if(data[i]["ProductId"] == this.props.navigation.state.params.id){
	   		 		// increase product
	   		 		data[i]["Count"]++;
	   		 		isExist = true;
	   		 	}
	   		 }
	   		 }

	   		 if(!isExist){
	   		 	var obj =  {"Image": this.props.navigation.state.params.image, "Name": this.props.navigation.state.params.name,"ProductId": this.props.navigation.state.params.id, "UserId":this.state.id, "Count": 1 , "Date": this.getDate(), "Price": this.props.navigation.state.params.price};
	   		 	var newObj = new Object();
	   		 	for (i = 0; i < size; i++) {
	   		 		if(data[i] == undefined){
				}
	   		 		newObj[i] = data[i];
	   		 	}
	   		 	newObj[size] = obj;
	   		 	try{
	   		 		this.setData(newObj);
	   		 		alert("Add to cart successfully!");
	   		 	}catch(error){
	   		 		alert(error)
	   		 	}	
	   		 }else{
	   		 	try{
	   		 		this.setData(data);
	   		 		alert("Add to cart successfully!");
	   		 	}catch(error){
	   		 		alert(error)
	   		 	}
	   		 }
	   		}
	   	}
	   	componentDidMount(){
	   		this.getId();
	   	}
	   	render() {
	   		const images = [
	   		this.props.navigation.state.params.image,
	   		this.props.navigation.state.params.image2,
	   		this.props.navigation.state.params.image3,
	   		];
	   		return (
	   			<ScrollView style={styles.container}>
	   			<Slide images = {images}/>
	   			<View style={styles.textContainer}>
	   			<Text style={styles.productName}>
	   			{this.props.navigation.state.params.name} 
	   			</Text>
	   			<View style={styles.desBox}>
	   			<View style={styles.des}>
	   			<Text style={styles.text}>
	   			{this.props.navigation.state.params.des1}
	   			</Text>
	   			<Text style={styles.text}>
	   			{this.props.navigation.state.params.des2}
	   			</Text>
	   			</View>
	   			</View>
	   			</View>

	   			<View style={styles.bottom}>
	   			<Text style={styles.price}>
	   			$ {this.props.navigation.state.params.price}
	   			</Text>
	   			<TouchableOpacity 
	   			onPress={() => this.addToCart()}
	   			style={styles.button}>
	   			<Text style={styles.bottomText}>
	   			ADD TO CART
	   			</Text>
	   			</TouchableOpacity>
	   			</View>
	   			</ScrollView>
	   			);
	   	}
	   }

	   const styles = StyleSheet.create({
	   	container:{
	   		flex: 1,
	   		backgroundColor: 'white',
	   	},
	   	top:{
	   		flex: 1,
	   		backgroundColor: 'white',
	   		marginBottom: 15
	   	},
	   	bottom:{
	   		flex: 1,
	   		backgroundColor: 'white',
	   		flexDirection: 'row',
	   		margin: 15
	   	},
	   	imageContainer:{	
	   		height: 200,
	   		paddingTop: 20,
	   	},
	   	customImage:{
	   		width: null,
	   		height: null,
	   		flex: 1
	   	},
	   	productName:{
	   		textAlign: 'center',
	   		fontSize: 18,
	   		fontWeight: 'bold',
	   		padding: 5,
	   		marginVertical: 10
	   	},
	   	detaiText:{
	   		fontSize: 18,
	   		flex: 2
	   	},
	   	detaiTextLeft:{
	   		fontSize: 18,
	   		flex: 1	
	   	},
	   	detailBox:{
	   		flexDirection: 'row',
	   		backgroundColor: '#fffbf9',
	   		padding: 15
	   	},
	   	text: {
	   		paddingHorizontal: 20,
	   		marginBottom: 10,
	   		lineHeight: 25
	   	},
	   	bottomText:{
	   		textAlignVertical: 'center',
	   		textAlign:'center',
	   		color: 'white',
	   		fontWeight: 'bold',
	   		padding: 10
	   	},
	   	price:{
	   		textAlignVertical: 'center',
	   		padding: 5,
	   		fontSize: 15,
	   		fontWeight: 'bold',
	   		flex: 1,
	   		textAlign:'left',
	   		paddingLeft: 10
	   	},
	   	button:{
	   		backgroundColor: '#FFA67E',
	   		flex: 1,
	   		justifyContent: 'center'
	   	}
	   });
	   export default ProductDetail;