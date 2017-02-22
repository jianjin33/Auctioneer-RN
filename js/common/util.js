/*工具类*/
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';

var Util = {
  windowSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  //基于fetch的get方法
  getRequest(url, successCallback, failCallback){
    fetch(url)
      .then((response) => {return response.json()})
      .then((responseData) => {return successCallback(responseData);})
      .catch((error) => {return failCallback(error);});
  },

  loading: <ActivityIndicator style={{marginTop: 200}}/>
}

module.exports = Util;
