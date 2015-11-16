Jz Hotel 房价牌 Version 1.0
==== 
###Example:  <br>
```javascript
//下载后，执行index.html
//修改目录下config.js 配置后 个配置请参考事例的样式添加，不限制个数
//请先备份原始配置,保存配置刷新网站即可见效果

//配置
var config = {
    hotelName: '锦至主题酒店', //酒店名
    hotelTel:'02884434952',//电话
    fontSize: 4+'rem', //酒店名字体大小 1=10px
    fontColor: 'blue', //酒店名字体颜色'
    bodyColor:'#E4E4E4',//背景颜色
    hotelRule: '宾客退房时间为中午14：00，超过时间加收半天房费，超过18:00加收全天房费。', //酒店退房规定
    hotelMsg:'锦至主题酒店全体员工热忱欢迎您的光临，您的满意是我们最大的追求！',//酒店公告
    ruleColor:'red',//规则字体颜色
    rulefontSize:  3+'rem', //酒店名字体大小 
    freeService: ['WIFI', '吹风', '插座', '雨伞'], //免费项目
    priceType: ['体验特价', '周末价'], //价格类型
    timeInterval:3000,//图片轮播间隔 毫秒
    roomInterval:2000,//房型切换间隔
    roomType: [{ //房型房价设置
        name: '商务标间',
        price: [138, 138] //顺序对应priceType 个数跟priceType一致
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
