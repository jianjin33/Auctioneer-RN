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


var dimensions = require('Dimensions');
var {width} = dimensions.get('window');
var {height} = dimensions.get('window');
var HOME_BANNER_URL='https://test.pecoo.cn/pecooservice/api/indexPage/queryBanner'
var HOME_AUCTION_URL='https://test.pecoo.cn/pecooservice/api/indexPage/queryQualityAuction'
var HOME_RECOM_URL='https://test.pecoo.cn/pecooservice/api/indexPage/queryQualityGoods'
var HOME_CATEGORY_URL='https://test.pecoo.cn/pecooservice/api/indexPage/queryMobileIndexKinds'




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
        recomDataSource:ds
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
  }

  getBannerData(){
    fetch(HOME_BANNER_URL)
    .then((response)=>{
      return response.json();
    })
    .then((responseData)=>{
      //获取到数据后 得到banner数组
      banners = responseData.banners;
      this.setState({
        bannerLoaded:true,
      });
    })
    .catch((error)=>{

    })
  }

  getHomeAuctionData(){
    fetch(HOME_AUCTION_URL)
    .then((response)=>{
      return response.json();
    })
    .then((responseData)=>{
      //获取到数据后 得到banner数组
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(responseData.auctions)
      });
    })
    .catch((error)=>{

    })
  }

  getHomeRecomData(){
    fetch(HOME_RECOM_URL)
    .then((response)=>{
      return response.json();
    })
    .then((responseData)=>{
      //获取到数据后
      this.setState({
        recomDataSource:this.state.recomDataSource.cloneWithRows(responseData.goods)
      });
    })
    .catch((error)=>{

    })
  }

  getCategoryData(){
    fetch(HOME_CATEGORY_URL)
    .then((response)=>{
      return response.json();
    })
    .then((responseData)=>{
      //获取到数据后
      categroy= responseData.goodsKinds;
      this.setState({
        cateLoaded:true,
      });
    })
    .catch((error)=>{

    })
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
          imageViews.push(<View sytle={{width,height:280,justifyContent:'center',alignItems:'center'}}>
            <Text>请稍后，正在努力加载中。。。</Text>
          </View>);
          return imageViews;
      }

  /*
    加载过程中的提示
  */
  renderLoadingView(){
    return(
      <View style={flex=1}>
        <Text>正在加载中...</Text>
      </View>
    );
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

  onItemPress(auctions){
    Alert.alert('ProductId',auctions.pkId);
  }


  //渲染分割线
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

    return (
    //  for(var j = 0; j < categroy.length; j++) {
        <View style={{width,height:230}}>
          <Image
            resizeMode = {'contain'}
            style={{flex:1}}
            source={{uri: categroy[1].picPhone}}/>
          <Text style={styles.cateTextContainer}>{categroy[1].kindDesc}</Text>
        </View>
    //  }
    );
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
              sytle={styles.searchIcon}
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
  searchIcon:{
    width:10,
    height:10,
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
  //backgroundColor:'rgba(0,0,0,0.5)',
    cateTextContainer:{
      width,
      height:50,
      position:'absolute',
      backgroundColor:'rgba(0,0,0,0.2)',
      bottom:0,
      alignItems:'center',
      justifyContent:'center'
    }
});
