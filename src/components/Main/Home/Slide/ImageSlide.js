'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator

} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'
class Slide extends Component {



constructor(props) {
   super(props);
   this.state = {
      visibleSwiper: false,
      animating: true
   };
}
closeActivityIndicator(){
	this.setState({ 
      animating: false })
}
componentDidMount() {
   setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
   }, 100);

   ()=> this.closeActivityIndicator();
}

render() {
let swiper = null;
   if (this.state.visibleSwiper) {
      swiper = <Swiper dotColor={'white'} 
         activeDotColor={'#d6d6d6'} 
         height={170} horizontal={true} 
         loop={true} bounces={true} 
         autoplay={false}
         removeClippedSubviews={false}
         style={styles.container}>
         <View style={styles.slide1}>
         	 <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[0],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}
		    		resizeMode={FastImage.resizeMode.contain}
  					/>

  				
         </View>
         <View style={styles.slide1}>
            <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[1],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}
		    		resizeMode={FastImage.resizeMode.contain}
  					/>
         </View>
         <View style={styles.slide1}>
          <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[2],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}
		    		resizeMode={FastImage.resizeMode.contain}
  					/>
         </View>
      </Swiper>;
   } else {
      swiper = <View></View>;
   }
   return (
   	<View>
   		{swiper}
   	</View>
   );
}
}

const styles = StyleSheet.create({
	 wrapper: {
	 	position: 'relative'
  	},
  slide1: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
   imageCustom:{
    width:  Dimensions.get('window').width,
    height: 170,
    alignItems:'center',
    justifyContent:'center',
  },
   activityIndicator: {
   		position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   container:{
    marginTop: 20
   }
});


export default Slide;