import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

var AUCTION_URL = 'http://www.pecoo.com/pecooservice/api/auction/pageAuction'

var dimensions = require('Dimensions');
var {width} = dimensions.get('window');
var {height} = dimensions.get('window');
var auctions = [];


export default class MainAuction extends Component {
  constructor(props){
      super(props);

      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow)=>oldRow != newRow});
      this.state={
        dataLoaded:false,
        dataSource:ds,
      };
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch(AUCTION_URL)
    .then((response)=>{
      return response.json();
    })
    .then((responseData)=>{
      //获取到数据后
      auctions= responseData.auctions;
      this.setState({
        dataLoaded:true,
        dataSource:this.state.dataSource.cloneWithRows(responseData.auctions)
      });
    })
    .catch((error)=>{

    })
  }

  onItemPress(auctions){
    Alert.alert('ProductId',auctions.pkId);
  }

  //拍卖会item的格式
  _renderRow(auctions){
    return(
      <TouchableOpacity
        onPress={()=>{
          this.onItemPress(auctions);
        }}>
        <View style={styles.rowContainer}>
            <Image
              resizeMode = {'contain'}
              style={styles.thumbnail}
              source={{uri: auctions.auctionThumPic}}/>
            <View style={styles.textContainer}>
              <Text style={styles.auctionTitle}>{auctions.name}</Text>
              <Text style={styles.time}>{auctions.startTime}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }

    //渲染分割线
    _renderSeperator(sectionID:number,rowID:number){
      var style={
        height:10,
        backgroundColor:'#EFEFF5'
      };
      return (
        <View style={style} key={sectionID+rowID}></View>
      );
    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#FFF'}}>
        {/*标题栏*/}
        <View style={styles.actionBar}>
          <View style={styles.titleView}>
            <Text style={styles.title}>拍卖会</Text>
          </View>
        </View>

          {/*竞拍拍卖会*/}
          <ListView
            style={styles.acutionListView}
            horizontal = {false}
            dataSource={this.state.dataSource}
            initialListSize={10}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  actionBar:{
    height:44,
    width,
    flexDirection:'row',
    backgroundColor:'black',
  },
  titleView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
  ,
  title:{
    fontSize:16,
    color:'white',
  },
  acutionListView:{
    flex:1
  },
  rowContainer:{
    flexDirection:'row',
    height:100,
    width,
    padding:5,
    paddingLeft:10,
    alignItems:'center',
  },
  thumbnail:{
    borderWidth:0.15,
    borderColor:'gray',
    width:90,
    height:90,
  },
  textContainer:{
    flex:1,
    marginLeft:10
  },
  auctionTitle:{
    textAlign:'left'
  },
  time:{
    textAlign:'left',
    color:'red'
  },
});
