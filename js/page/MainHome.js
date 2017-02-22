import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  Image,
  ScrollView,
  Text,
  ListView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Swiper from 'react-native-swiper';

var APIS = require('../common/service')
var util = require('../common/util')

var dimensions = require('Dimensions');
var {width} = dimensions.get('window');
var {height} = dimensions.get('window');

var banners = [];
var categroy = [];

export default class MainHome extends Component {
  constructor(props){
      super(props);

      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow)=>oldRow != newRow});

      this.state={
        bannerLoaded:false,
        cateLoaded:false,
        dataSource:ds,
        recomDataSource:ds,
        likeDataSource:ds
      };
  }

  componentDidMount(){
    //加载轮播图
    this.getBannerData();
    //首页拍卖会
    this.getHomeAuctionData();
    //首页今日锐减
    this.getHomeRecomData();
    //首页分类列表
    this.getCategoryData();
    //猜你喜欢
    this.getLikeData();
  }

  getBannerData(){
    util.getRequest(APIS.homeBanner, (responseData)=>{
      //获取到数据后 得到banner数组
      banners = responseData.banners;
      this.setState({
        bannerLoaded:true,
      });
    }, ()=>{});
  }

  getHomeAuctionData(){
    util.getRequest(APIS.homeAuction,(responseData)=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(responseData.auctions)
      });
    }, ()=>{});
  }

  getHomeRecomData(){
    util.getRequest(APIS.homeQualityGoods,(responseData)=>{
      this.setState({
        recomDataSource:this.state.recomDataSource.cloneWithRows(responseData.goods)
      });
    }, ()=>{});
  }

  getCategoryData(){
    util.getRequest(APIS.homeCategory,(responseData)=>{
        categroy= responseData.goodsKinds;
        this.setState({
          cateLoaded:true,
      });
    }, ()=>{});
  }

  getLikeData(){
    util.getRequest(APIS.popGoods,(responseData)=>{
      this.setState({
        likeDataSource:this.state.likeDataSource.cloneWithRows(responseData.goods)
      });
    }, ()=>{});
  }

  renderImg(){
    var imageViews=[];
    for(var i=0;i<banners.length;i++){
        imageViews.push(
            <Image
                key={i}
                style={{flex:1}}
                source={{uri:banners[i].picUrl}}
                />
        );
    }

    imageViews.push(<View
      sytle={{width,height:280,justifyContent:'center',alignItems:'center'}}
      key={i}>
      <Text style={{flex:1,textAlign:"center"}}>请稍后，正在加载中</Text>
    </View>);
    return imageViews;
  }

  /**
   * 拍卖会item的格式
   */
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

  onItemPress(auctions){
    Alert.alert('ProductId',auctions.pkId);
  }

  /**
   * 渲染分割线
   */
  _renderSeperator(sectionID:number,rowID:number){
    var style={
      width:10,
      backgroundColor:'#FFF'
    };
    return (
      <View style={style} key={sectionID+rowID}></View>
    );
  }

  //今日推荐 item的格式
  _renderRecomRow(goods){
    return(
      <TouchableOpacity>
        <View style={styles.recomContainer}>
          <Image
            resizeMode = {'contain'}
            style={styles.recomThumbnail}
            source={{uri: goods.thumbnailUrl}}/>
          <View style={styles.recomTextContainer}>
            <Text style={styles.goodsName} numberOfLines={1}>{goods.goodsName}</Text>
            <Text style={styles.goodsPrice}>起拍价:{goods.priceUnit}{goods.startPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderLoadingView(){
    return(
      <View style={styles.loadingContainer}>
        <Text>正在加载中...</Text>
      </View>
    );
  }


  //首页分类
  renderCategory(){
    if (!this.state.cateLoaded) {
      return this.renderLoadingView();
    }

    var categoryRow = [];
    for(var j = 0; j < categroy.length; j++) {
      var row = (
        <View style={{width,height:230}} key={j}>
          <Image
            resizeMode = {'cover'}
            style={{flex:1}}
            source={{uri: categroy[j].picPhone}}/>
          <Text style={styles.cateTextContainer}>{categroy[j].kindDesc}</Text>
      </View>);
      categoryRow.push(row)
    }
    return categoryRow;
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#FFF'}}>
        {/*标题栏*/}
        <View style={styles.actionBar}>
          <View style={styles.titleView}>
            <Text style={styles.title}>拍库网</Text>
          </View>
          <View style={styles.searchView}>
            <Image
              source={require('../../res/images/search_img.png')}/>
          </View>
        </View>

        <ScrollView style={{flex:1}}>
          {/*banner轮播:http://blog.csdn.net/jing85432373/article/details/52702274*/}
          <View>
            <Swiper height={280}
                    loop={true}
                    // showsButtons={true}
                    index={0}
                    autoplay={true}
                    autoplayTimeout={3}
                    horizontal={true}
                    activeDot={(<View style={{backgroundColor: '#007aff', width: 6, height: 6, borderRadius: 4, marginLeft: 1, marginRight: 1, marginTop: 1, marginBottom: 1,}} />)}
                    dot={( 	<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 4, marginLeft: 1, marginRight: 1, marginTop: 1, marginBottom: 1,}} />)}
                    >
                 {this.renderImg()}
             </Swiper>
          </View>
          {/*竞拍拍卖会标题*/}
          <View style={styles.smallTitle}>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginRight:10}}/>
            <Text style={styles.titleText}>精选拍卖会</Text>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginLeft:10}}/>
          </View>

          {/*竞拍拍卖会*/}
          <ListView
            style={styles.acutionListView}
            showsHorizontalScrollIndicator = {false}
            horizontal = {true}
            dataSource={this.state.dataSource}
            initialListSize={10}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />

          {/*20px的间隙*/}
          <View style={{width,height:10,backgroundColor:'#EFEFF5',marginTop:15}}></View>

          {/*今日推荐标题*/}
          <View style={styles.smallTitle}>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginRight:10}}/>
            <Text style={styles.titleText}>今日推荐</Text>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginLeft:10}}/>
          </View>

          {/*今日推荐内容*/}
          <ListView
            style={styles.recomListView}
            showsHorizontalScrollIndicator = {false}
            horizontal = {true}
            dataSource={this.state.recomDataSource}
            initialListSize={10}
            renderRow={this._renderRecomRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />

          {/*20px的间隙*/}
          <View style={{width,height:10,backgroundColor:'#EFEFF5',marginTop:15}}/>


          {/*首页分类*/}
          {this.renderCategory()}

          {/*20px的间隙*/}
          <View style={{width,height:10,backgroundColor:'#EFEFF5',marginTop:15}}></View>

          {/*猜你喜欢标题*/}
          <View style={styles.smallTitle}>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginRight:10}}/>
            <Text style={styles.titleText}>猜你喜欢</Text>
            <View style={{width:45,height:0.5,backgroundColor:'#333333',marginLeft:10}}/>
          </View>

          {/*猜你喜欢内容*/}
          <ListView
            style={styles.recomListView}
            showsHorizontalScrollIndicator = {false}
            horizontal = {true}
            dataSource={this.state.likeDataSource}
            initialListSize={10}
            renderRow={this._renderRecomRow.bind(this)}
            renderSeparator={this._renderSeperator.bind(this)}
          />

          {/*20px的间隙*/}
          <View style={{width,height:10,backgroundColor:'#EFEFF5',marginTop:15}}></View>

        </ScrollView>
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
  searchView:{
    width:44,
    height:44,
    position:'absolute',
    right:0,
    justifyContent:'center',
  },
  smallTitle:{
    width,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  titleText:{
    fontSize:15,
    color:'#333333'
  },
  acutionListView:{
    height:90,

  },
  rowContainer:{
    flexDirection:'row',
    width:300,
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
  recomListView:{
    marginLeft:10,
    height:203
  },
  recomContainer:{
    width:142,
    height:203,

  },
  recomThumbnail:{
    width:142,
    height:142,
    borderWidth:0.5,
    borderColor:'gray',
  },
  recomTextContainer:{
    flex:1,
    padding:15,
    borderWidth:0.25,
    borderColor:'gray',
  },
  goodsName:{
    fontSize:15,
    color:'gray'
  },
  goodsPrice:{
    fontSize:12,
    color:'gray'
  },
  cateTextContainer:{
    width,
    height:50,
    position:'absolute',
    backgroundColor:'rgba(255,255,255,0.5)',
    bottom:0,
    fontSize:16,
    color:'black',
    textAlign:'center',
    paddingTop:12
  }
});
