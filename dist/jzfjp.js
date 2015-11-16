'use strict';

var LeftList = React.createClass({
	displayName: 'LeftList',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'col-md-12 hotel', style: { color: config.fontColor, 'font-size': config.fontSize } },
				config.hotelName
			),
			React.createElement(
				'div',
				{ className: 'col-md-4 head' },
				'房型'
			),
			React.createElement(
				'div',
				{ className: 'col-md-4 head' },
				'优惠价格'
			),
			React.createElement(
				'div',
				{ className: 'col-md-4 head' },
				'周末价格'
			),
			React.createElement(
				'div',
				{ className: 'col-md-4' },
				'dddd'
			),
			React.createElement(
				'div',
				{ className: 'col-md-4' },
				'2222'
			),
			React.createElement(
				'div',
				{ className: 'col-md-4' },
				'3333'
			)
		);
	}
});

var RightList = React.createClass({
	displayName: 'RightList',

	getZhou: function getZhou() {
		var week;
		if (new Date().getDay() == 0) week = "星期日";
		if (new Date().getDay() == 1) week = "星期一";
		if (new Date().getDay() == 2) week = "星期二";
		if (new Date().getDay() == 3) week = "星期三";
		if (new Date().getDay() == 4) week = "星期四";
		if (new Date().getDay() == 5) week = "星期五";
		if (new Date().getDay() == 6) week = "星期六";
		return week;
	},
	componentDidMount: function componentDidMount() {
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

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'row', style: { 'background-color': config.bodyColor } },
			React.createElement(
				'div',
				{ className: 'col-md-6 leftList' },
				React.createElement(LeftList, null)
			),
			React.createElement(
				'div',
				{ className: 'col-md-6 rightList' },
				React.createElement(RightList, null)
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