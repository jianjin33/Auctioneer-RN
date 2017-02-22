import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

export default class MainCategory extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>Copyright©拍库技术2017|www.pecoo.com</Text>
      </View>
    );
  }
}
