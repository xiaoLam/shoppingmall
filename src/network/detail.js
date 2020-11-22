import {request} from "./request"

// 请求详情页数据
export function getDetail(iid) {
  return request({
    url : "/detail",
    params : {
      iid
    }
  })
}

// 创建一个class 传入一些杂乱的数据, 返回一个筛选过的有序的数据对象
// 返回的是商品详情页中的GoodsInfo数据
export class GoodsInfo {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.bgcDiscount = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
  }
}

// 返回的是商品详情页中的ShopInfo数据
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells =shopInfo.cSells
    this.goods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

// 这里返回的是商品详情页中的商品参数数据
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : "";
    this.infokey = info.key;
    this.infos = info.set;
    this.sizekey = rule.key;
    this.sizes = rule.tables;
  }
}