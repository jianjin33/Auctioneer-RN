import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  InteractionManager,
  Button
} from 'react-native';
import MainPage from './MainPage'

var dimensions = require('Dimensions');
var {width} = dimensions.get('window');
var {height} = dimensions.get('window');
//创建组件
export default class WelcomePage extends Component{
  constructor(props) {
     super(props);
     this.state = {};
   }
   onButtonPress() {
     const { navigator } = this.props;
     //为什么这里可以取得 props.navigator?请看上文:
     //<Component {...route.params} navigator={navigator} />
     //这里传递了navigator作为props
     if(navigator) {
         navigator.push({
             name: 'MainPage',
             component: MainPage,
         })
     }
   }

   componentDidMount() {
       const {navigator} = this.props;
       this.timer = setTimeout(() => {
           InteractionManager.runAfterInteractions(() => {
               navigator.resetTo({
                   component: MainPage,
                   name: 'MainPage'
               });
           });
       }, 2000);
   }
   componentWillUnmount() {
       this.timer && clearTimeout(this.timer);
   }

  render(){
    return (
      <View style={styles.flex}>
        <View style={styles.flex}>
          <Image
            style={[styles.flex,styles.image]}
            resizeMethod ={'scale'}
            source={require('../../res/images/splash@3x.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Copyright©拍库技术2017|www.pecoo.com</Text>
          </View>
      </View>
    );
  }
}

//创建样式
var styles = StyleSheet.create({
  flex:{
    flex:1
  },
  image:{
    width,
    height
  },
  text:{
    fontSize:10,
    color:'white',
  },
  //backgroundColor:'rgba(0,0,0,0.5)',
  textContainer:{
    width,
    height:30,
    position:'absolute',
    bottom:0,
    alignItems:'center'
  }
});
