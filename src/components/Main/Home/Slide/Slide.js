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
  ActivityIndicator,
  TouchableOpacity

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
         activeDotColor={'#FFA67E'} 
         height={170} horizontal={true} 
         loop={true} bounces={true} 
         autoplay={true}
         removeClippedSubviews={false}>
         <TouchableOpacity style={styles.slide1}
         onPress = {() => this.props.drawer.navigate('WebView',{link : this.props.link[0], })}
         activeOpacity={1}>
         	 <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[0],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}

		    		resizeMode={FastImage.resizeMode.stretch}
  					/>

  				
         </TouchableOpacity>
         <TouchableOpacity style={styles.slide1}
         onPress = {() => this.props.drawer.navigate('WebView',{link : this.props.link[1], })}
         activeOpacity={1}>
            <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[1],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}
		    		resizeMode={FastImage.resizeMode.stretch}
  					/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.slide1}
         onPress = {() => this.props.drawer.navigate('WebView',{link : this.props.link[2], })}
         activeOpacity={1}>
          <FastImage
		        style={styles.imageCustom}
		        source={{
		          uri: this.props.images[2],
		          headers:{ Authorization: 'someAuthToken' },
		          priority: FastImage.priority.normal,
		          }}
		    		resizeMode={FastImage.resizeMode.stretch}
  					/>
         </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
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
    flex: 1,
	width: Dimensions.get('window').width,
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
   }
});


export default Slide;