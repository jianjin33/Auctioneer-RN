/**
 * 接口
 */
const BASE_SERVER = "http://www.pecoo.com/pecooservice/";

var APIS={
    //版本
   checkVersion : BASE_SERVER + "api/pecooAppVersion/queryAppVersion",

    //首页banner
    homeBanner : BASE_SERVER + "api/indexPage/queryBanner?sourceMode=android",

    //首页拍卖会
    homeAuction : BASE_SERVER + "api/indexPage/queryQualityAuction",

    //首页精选拍平
    homeQualityGoods : BASE_SERVER + "api/indexPage/queryQualityGoods",

    //首页分类
    homeCategory : BASE_SERVER + "api/indexPage/queryMobileIndexKinds",

    //首页猜你喜欢
    popGoods : BASE_SERVER + "api/indexPage/queryPopularGoods",

}

module.exports= APIS;


