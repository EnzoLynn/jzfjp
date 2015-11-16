//配置
var config = {
    hotelName: '锦至主题酒店', //酒店名
    fontSize: 43, //酒店名字体大小
    fontColor: 'blue', //酒店名字体颜色'
    bodyColor:'#E4E4E4',//背景颜色
    hotelRule: '宾客退房时间为中午14：00，超过时间加收半天房费，超过18:00加收全天房费。', //规则
    freeService: ['WIFI', '吹风', '插座', '雨伞'], //免费项目
    priceType: ['体验特价', '周末价'], //价格类型
    timeInterval:3000,//轮播间隔
    roomType: [{ //房型房价设置
        name: '商务标间',
        price: [138, 138] //顺序对应priceType
    }, {
        name: '中式单间',
        price: [208, 208]
    }, {
        name: '中式套房',
        price: [238, 268]
    }, {
        name: '水蓝单间',
        price: [208, 238]
    }, {
        name: '水蓝套房',
        price: [268, 298]
    }, {
        name: '黄沙单间',
        price: [208, 238]
    }, {
        name: '日式单间',
        price: [208, 238]
    }, {
        name: '藤蔓单间',
        price: [208, 238]
    }, {
        name: '丛林套房',
        price: [268, 308]

    }],
    images: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg'] //图片列表

};
