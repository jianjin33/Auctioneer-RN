import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TabNavigator,
  TouchableOpacity,
  Navigator,
  ScrollView,
  RefreshControl
} from 'react-native';

var THUMBS = ['http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg',
 'http://img05.tooopen.com/images/20140919/sy_71272488121.jpg',
 'http://img03.tooopen.com/images/20130530/tooopen_13124227.jpg',
 'http://img05.tooopen.com/images/20140919/sy_71272488121.jpg',
 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png',
 'http://img03.tooopen.com/images/20130530/tooopen_13124227.jpg',
 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png',
 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png',
  'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png',
  'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png',
   'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png',
   'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS);
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
}


export default class Network extends Component {
  constructor(props) {
         super(props);
         this.state = {
           isRefreshing:false
         }
     }

     _onRefresh() {
        //  this.setState({
        //    isRefreshing: true
        //  });
         setTimeout(() => {
          //  // prepend 10 items
          //  const rowData = Array.from(new Array(10))
          //  .map((val, i) => ({
          //    text: 'Loaded row ' + (+this.state.loaded + i),
          //    clicks: 0,
          //  }))
          //  .concat(this.state.rowData);
           this.setState({
            //  loaded: this.state.loaded + 10,
             isRefreshing: false,
            // rowData: rowData,
           });
         }, 5000);
       }

  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({y: 0}); }}>
          <Text>Scroll to top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to bottom</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    flex:1
  },
  horizontalScrollView: {
    height: 150,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 220,
    height: 80,
  }
});
