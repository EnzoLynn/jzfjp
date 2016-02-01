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
    var span = config.priceType.length;
    return React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          React.createElement('img', { src: 'log.jpg', ref: 'image', style: { 'width': '50px', 'height': '50px' }, alt: config.hotelName })
        ),
        React.createElement(
          'th',
          { colSpan: span, className: 'hotel', style: { color: config.fontColor, 'fontSize': config.fontSize } },
          config.hotelName
        )
      ),
      React.createElement(
        'tr',
        { className: 'headTr' },
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
    var span = config.priceType.length + 1;
    rows.push(React.createElement(
      'tr',
      null,
      React.createElement('td', { className: 'noborder', colSpan: span, style: { background: config.bodyColor } })
    ));
    this.props.roomType.forEach(function (room, key) {
      rows.push(React.createElement(ListRow, { name: room.name, price: room.price, key: key }));

      rows.push(React.createElement(
        'tr',
        null,
        React.createElement('td', { className: 'noborder', colSpan: span, style: { backgroundColor: config.bodyColor } })
      ));
    });
    if (rows.length < 10) {
      var add = [];
      for (var i = 0; i < 10 - rows.length; i++) {
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
      rows.push(React.createElement(
        'tr',
        null,
        React.createElement('td', { className: 'noborder', colSpan: span, style: { backgroundColor: config.bodyColor } })
      ));
    };

    rows.push(React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'ms_marquee', colSpan: span },
        React.createElement(
          'marquee',
          { style: { 'color': config.ruleColor, 'fontSize': config.rulefontSize } },
          config.hotelRule
        )
      )
    ));

    return React.createElement(
      'table',
      { className: 'col-md-12 table', cellPadding: 0, cellSpacing: 0 },
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
      { style: { 'text-algin': 'center' } },
      React.createElement('img', { src: config.images[0], ref: 'image', alt: 'Responsive image' })
    );
  }
});

var JzFjp = React.createClass({
  displayName: 'JzFjp',

  getWeek: function getWeek() {
    var date = new Date();
    var day = date.getDay();
    if (day == 0) return "日";
    if (day == 1) return "一";
    if (day == 2) return "二";
    if (day == 3) return "三";
    if (day == 4) return "四";
    if (day == 5) return "五";
    if (day == 6) return "六";
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
    var arr = [];
    arr.push(me.preZeroFill(hours, 2));
    arr.push(me.preZeroFill(minutes, 2));
    arr.push(week);
    return arr;
  },
  componentDidMount: function componentDidMount() {

    var me = this;
    //一秒刷新一次显示时间
    setInterval(function () {
      me.setState({
        datetime: me.getDateTime()
      });
    }, 10000);
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
    var freeService = [];
    if (config.freeService.wifi) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/wifi.png' })
      ));
    };
    if (config.freeService.adapter) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/adapter.png' })
      ));
    };
    if (config.freeService.hairDrier) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/hairdrier.png' })
      ));
    };
    if (config.freeService.ironBoard) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/ironBoard.png' })
      ));
    };
    if (config.freeService.sewingKit) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/sewingKit.png' })
      ));
    };
    if (config.freeService.umbrella) {
      freeService.push(React.createElement(
        'span',
        { className: 'freeService' },
        React.createElement('img', { src: 'icons/umbrella.png' })
      ));
    };

    return React.createElement(
      'div',
      { className: 'row', style: { 'backgroundColor': config.bodyColor } },
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
        { className: 'col-md-6', style: { 'fontSize': config.fontSize } },
        React.createElement(
          'div',
          { className: 'bg_servers_item_bj' },
          freeService
        )
      ),
      React.createElement(
        'div',
        { className: 'col-md-6', style: { 'fontSize': config.fontSize } },
        React.createElement(
          'div',
          { className: 'bg_time_bj' },
          React.createElement(
            'span',
            { className: 'houers' },
            this.state.datetime[0]
          ),
          React.createElement(
            'span',
            { className: 'minutes' },
            this.state.datetime[1]
          ),
          React.createElement(
            'span',
            { className: 'weekTitle' },
            '星期'
          ),
          React.createElement(
            'span',
            { className: 'week' },
            this.state.datetime[2]
          )
        )
      ),
      React.createElement('div', { className: 'clearfix' }),
      React.createElement(
        'div',
        { className: 'col-md-12 bottomMsg' },
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