'use strict';

var index = 0;
var ListRow = React.createClass({
  displayName: 'ListRow',

  render: function render() {
    var me = this;
    var tds = [];
    this.props.price.forEach(function (price, key) {
      tds.push(React.createElement(
        'td',
        { className: 'lrow', key: key },
        price
      ));
    });
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'lrow' },
        this.props.name
      ),
      tds
    );
  }
});

var HeadRow = React.createClass({
  displayName: 'HeadRow',

  render: function render() {
    var me = this;
    var tds = [];
    config.priceType.forEach(function (price, key) {
      tds.push(React.createElement(
        'th',
        { className: 'head', key: key },
        price
      ));
    });
    return React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          { className: 'head' },
          '房型'
        ),
        tds
      )
    );
  }
});

var LeftList = React.createClass({
  displayName: 'LeftList',

  render: function render() {
    var me = this;
    var rows = [],
        heads = [];
    this.props.roomType.forEach(function (room, key) {
      rows.push(React.createElement(ListRow, { name: room.name, price: room.price, key: key }));
    });

    var span = config.priceType.length + 1;
    if (rows.length < 5) {
      var add = [];
      for (var i = 0; i < 5 - rows.length; i++) {
        var nk = 'lr' + i;
        add.push(React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { className: 'lrow', colSpan: span, key: nk },
            ' - '
          )
        ));
      };
      rows = rows.concat(add);
    };
    rows.push(React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { colSpan: span },
        React.createElement(
          'marquee',
          { style: { 'color': config.ruleColor, 'fontSize': config.rulefontSize } },
          config.hotelRule
        )
      )
    ));

    return React.createElement(
      'table',
      { className: 'col-md-12 table table-striped' },
      React.createElement(HeadRow, null),
      React.createElement(
        'tbody',
        null,
        rows
      )
    );
  }
});

var RightList = React.createClass({
  displayName: 'RightList',

  changeImg: function changeImg() {
    var me = this;
    var index = 0;
    setInterval(function () {
      index++;
      if (index >= config.images.length) {
        index = 0;
      };
      $(me.refs.image).fadeOut({
        duration: 1000,
        easing: 'swing',
        complete: function complete() {
          $(this).attr('src', config.images[index]);
        }
      }).fadeIn({
        duration: 1000
      });
    }, config.timeInterval);
  },
  componentDidMount: function componentDidMount() {
    var me = this;
    me.changeImg();
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('img', { src: 'images/1.jpg', ref: 'image', className: 'img-responsive', alt: 'Responsive image' })
    );
  }
});

var JzFjp = React.createClass({
  displayName: 'JzFjp',

  getWeek: function getWeek() {
    var date = new Date();
    var day = date.getDay();
    if (day == 0) return "星期日";
    if (day == 1) return "星期一";
    if (day == 2) return "星期二";
    if (day == 3) return "星期三";
    if (day == 4) return "星期四";
    if (day == 5) return "星期五";
    if (day == 6) return "星期六";
    return 'no week';
  },
  preZeroFill: function preZeroFill(num, size) {
    if (num >= Math.pow(10, size)) {
      //如果num本身位数不小于size位
      return num.toString();
    } else {
      var _str = Array(size + 1).join('0') + num;
      return _str.slice(_str.length - size);
    }
  },

  getDateTime: function getDateTime() {
    var me = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    //"" + year + "年" +
    var str = month + "月" + day + "日 " + me.preZeroFill(hours, 2) + ":" + me.preZeroFill(minutes, 2) + ":" + me.preZeroFill(seconds, 2) + "";
    var week = me.getWeek();
    return str + '       ' + week;
  },
  componentDidMount: function componentDidMount() {

    var me = this;
    //一秒刷新一次显示时间
    setInterval(function () {
      me.setState({
        datetime: me.getDateTime()
      });
    }, 1000);
    setInterval(function () {
      index++;
      if (index > me.state.totalpage - 1) {
        index = 0;
      };
      me.setState({
        leftArr: me.state.leftSrc[index]
      });
    }, config.roomInterval);
  },

  getInitialState: function getInitialState() {
    var leftArr = [];
    var total = config.roomType.length;
    var pageSize = 5;
    var page = total % 5 == 0 ? total / 5 : Math.floor(total / 5) + 1;
    for (var i = 0; i < page; i++) {
      var end = i == page - 1 ? total : (i + 1) * pageSize;

      var temp = config.roomType.slice(i * pageSize, end);

      leftArr.push(React.createElement(LeftList, { roomType: temp }));
    };

    return {
      datetime: this.getDateTime(),
      leftArr: leftArr[index],
      leftSrc: leftArr,
      totalpage: page,
      curpage: 0
    };
  },
  render: function render() {

    return React.createElement(
      'div',
      { className: 'row', style: { 'backgroundColor': config.bodyColor } },
      React.createElement(
        'div',
        { className: 'col-md-6 hotel', style: { color: config.fontColor, 'fontSize': config.fontSize } },
        React.createElement('img', { src: 'log.jpg', ref: 'image', style: { 'width': '50px', 'height': '50px', 'margin-top': '-10px' }, alt: config.hotelName }),
        config.hotelName
      ),
      React.createElement(
        'div',
        { className: 'col-md-6', style: { 'fontSize': config.fontSize } },
        this.state.datetime
      ),
      React.createElement('div', { className: 'clearfix' }),
      React.createElement(
        'div',
        { className: 'col-md-6 leftList' },
        this.state.leftArr
      ),
      React.createElement(
        'div',
        { className: 'col-md-6 rightList' },
        React.createElement(RightList, null)
      ),
      React.createElement('div', { className: 'clearfix' }),
      React.createElement(
        'div',
        { className: 'col-md-12' },
        React.createElement(
          'marquee',
          { className: 'col-md-6 telephone', style: { 'color': config.ruleColor } },
          config.hotelMsg
        ),
        React.createElement(
          'div',
          { className: 'col-md-6 telephone' },
          '预订电话: ',
          config.hotelTel
        )
      )
    );
  }
});

$(function () {
  ReactDOM.render(React.createElement(JzFjp, null), $('body').get(0));

  $('body').css({
    'background-color': config.bodyColor
  });
});