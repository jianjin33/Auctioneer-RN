import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import MainHome from './MainHome'
import MainAuction from './MainAuction'
import MainCategory from './MainCategory'
import MainFS from './MainFS'
import MainMine from './MainMine'

const TabNavigatorItem =TabNavigator.Item;

const TAB_NORMAL_HOME=require('../../res/images/home.png');
const TAB_NORMAL_AUCTION=require('../../res/images/auction.png');
const TAB_NORMAL_CATEGORY=require('../../res/images/category.png');
const TAB_NORMAL_FS=require('../../res/images/fastshopping.png');
const TAB_NORMAL_MINE=require('../../res/images/mine.png');

const TAB_PRESS_HOME=require('../../res/images/home_true.png');
const TAB_PRESS_AUCTION=require('../../res/images/auction_true.png');
const TAB_PRESS_CATEGORY=require('../../res/images/category_true.png');
const TAB_PRESS_FS=require('../../res/images/fastshopping_true.png');
const TAB_PRESS_MINE=require('../../res/images/mine_true.png');

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'Home',
    }
  }

  onPress(tabName){
    if (tabName) {
      this.setState({
        selectedTab:tabName,
      })
    }
  }


 renderTabView(title,tabName,page,isBadge){
      var tabNomal;
      var tabPress;
      switch (tabName) {
        case 'Home':
          tabNomal=TAB_NORMAL_HOME;
          tabPress=TAB_PRESS_HOME;
          break;
        case 'Auction':
          tabNomal=TAB_NORMAL_AUCTION;
          tabPress=TAB_PRESS_AUCTION;
          break;
        case 'Category':
          tabNomal=TAB_NORMAL_CATEGORY;
          tabPress=TAB_PRESS_CATEGORY;
          break;
        case 'FS':
          tabNomal=TAB_NORMAL_FS;
          tabPress=TAB_PRESS_FS;
          break;
        case 'Mine':
          tabNomal=TAB_NORMAL_MINE;
          tabPress=TAB_PRESS_MINE;
          break;
          default:

      }
      // renderBadge={()=>isBadge?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null}
      return(
        <TabNavigatorItem
         title={title}
         renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
         renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
         selected={this.state.selectedTab===tabName}
         selectedTitleStyle={{color:'#000000'}}
         onPress={()=>this.onPress(tabName)}
        >
         {page}
        </TabNavigatorItem>
      );
    }

  /**
  自定义tabbar
  **/
 tabBarView(){
   return (
    <View style={{flex:1}}>
       <TabNavigator
        tabBarStyle={styles.tab}
       >
       {this.renderTabView('首页','Home',<MainHome/>,true)}
       {this.renderTabView('拍卖会','Auction',<MainAuction/>,false)}
       {this.renderTabView('分类','Category',<MainCategory/>,false)}
       {this.renderTabView('闪购','FS',<MainFS/>,false)}
       {this.renderTabView('我的','Mine',<MainMine/>,false)}
       </TabNavigator>
      </View>
   );
 }


  render() {
    var tabBarView=this.tabBarView();
    return (
      <View style={styles.container}>
        {tabBarView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tab:{
    height: 50,
    alignItems:'center',
    backgroundColor:'#f4f5f6',
  },
  tabIcon:{
    width:25,
    height:25,
  },
  badgeView:{
    width:22,
    height:14 ,
    backgroundColor:'#f85959',
    borderWidth:1,
    marginLeft:10,
    marginTop:3,
    borderColor:'#FFF',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8,
  },
  badgeText:{
    color:'#fff',
    fontSize:8,
  }
});
