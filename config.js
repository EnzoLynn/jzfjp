//配置
var config = {
    hotelName: '锦至主题酒店', //酒店名
    hotelTel:'02884434952',//电话
    fontSize: 4+'rem', //酒店名字体大小 1=10px
    fontColor: 'blue', //酒店名字体颜色'
    bodyColor:'#D42121',//背景颜色
    hotelRule: '宾客退房时间为中午14：00，超过时间加收半天房费，超过18:00加收全天房费。', //酒店退房规定
    hotelMsg:'锦至主题酒店全体员工热忱欢迎您的光临，您的满意是我们最大的追求！',//酒店公告
    ruleColor:'red',//规则字体颜色
    rulefontSize:  3+'rem', //酒店名字体大小 
    freeService:{
        wifi:true,//WiFi true为开放，false为不开放
        adapter:true,//多功能插座
        hairDrier:true,//电吹风
        ironBoard:true,//电熨斗
        sewingKit:true,//针线包
        umbrella:true,//雨伞        
    }, //免费项目
    priceType: ['体验特价', '周末价'], //价格类型
    timeInterval:5000,//图片轮播间隔 毫秒
    roomInterval:2000,//房型切换间隔
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
    images: ['images/标间.jpg', 'images/丛林套房.jpg', 'images/黄沙01.jpg', 
            'images/日式主题.jpg', 'images/水蓝套房.jpg', 'images/水蓝主题.jpg'
            , 'images/阳光花园.jpg', 'images/中式01.jpg', 'images/中式02.jpg'
            , 'images/中式套房.jpg'] //图片列表

};
