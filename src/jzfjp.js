 var ListRow = React.createClass({

 	render: function() {
 		var me = this;
 		var tds = [];
 		this.props.price.forEach(function(price, key) {
 			tds.push(<td className='lrow'>{price}</td> );
 		});
 		return (
 			<tr> 
				<td className='lrow'>{this.props.name}</td> 
				{tds}
			</tr>
 		);
 	}
 });

 var HeadRow = React.createClass({

 	render: function() {
 		var me = this;
 		var tds = [];
 		config.priceType.forEach(function(price, key) {
 			tds.push(<th className='head'>{price}</th> );
 		});
 		return (
 			<thead> 
				<th className='head'>房型</th> 
				{tds}
			</thead>
 		);
 	}
 });

 var LeftList = React.createClass({

 	render: function() {
 		var me = this;
 		var rows = [],heads=[];
 		config.roomType.forEach(function(room, key) {
 			rows.push(<ListRow name={room.name} price={room.price} />);
 		});
 		var span = config.roomType.length+1;
 		console.log(span);
 		rows.push(<tr><td colSpan ={span}><marquee style={{'color':config.ruleColor,'font-size':config.rulefontSize}}  >{config.hotelRule}</marquee></td></tr>);
 		
 		return (
 			<table className='col-md-12 table table-striped'>
 			 	<HeadRow/>
				{rows} 
 			</table> 
 		);
 	}
 });

 var RightList = React.createClass({

 	changeImg: function() {
 		var me = this;
 		var index = 0;
 		setInterval(function() {
 			index++;
 			if (index >= config.images.length) {
 				index = 0;
 			};
 			$(me.refs.image).fadeOut({
 				duration: 1000,
 				easing: 'swing',
 				complete: function() {
 					$(this).attr('src', config.images[index]);
 				}
 			}).fadeIn({
 				duration: 1000
 			});
 		}, config.timeInterval);
 	},
 	componentDidMount: function() {
 		var me = this;
 		me.changeImg();
 	},
 	render: function() {
 		return (
 			<div>
				<img src='images/1.jpg' ref='image' className="img-responsive" alt="Responsive image" />
			</div>
 		);
 	}
 });


 var JzFjp = React.createClass({
 	getWeek: function() {
 		let date = new Date();
 		let day = date.getDay();
 		if (day == 0) return "星期日";
 		if (day == 1) return "星期一";
 		if (day == 2) return "星期二";
 		if (day == 3) return "星期三";
 		if (day == 4) return "星期四";
 		if (day == 5) return "星期五";
 		if (day == 6) return "星期六";
 		return 'no week';
 	},
 	preZeroFill: function(num, size) {
 		if (num >= Math.pow(10, size)) { //如果num本身位数不小于size位
 			return num.toString();
 		} else {
 			var _str = Array(size + 1).join('0') + num;
 			return _str.slice(_str.length - size);
 		}
 	},

 	getDateTime: function() {
 		let me = this;
 		let now = new Date();
 		let year = now.getFullYear();
 		let month = now.getMonth() + 1;
 		let day = now.getDate();
 		let hours = now.getHours();
 		let minutes = now.getMinutes();
 		let seconds = now.getSeconds();
 		//"" + year + "年" +
 		let str = month + "月" + day + "日 " + me.preZeroFill(hours, 2) + ":" + me.preZeroFill(minutes, 2) + ":" + me.preZeroFill(seconds, 2) + "";
 		let week = me.getWeek();
 		return str + '       ' + week;

 	},
 	componentDidMount: function() {
 		var me = this;
 		//一秒刷新一次显示时间
 		setInterval(function() {
 			me.setState({
 				datetime: me.getDateTime()
 			});
 		}, 1000);
 	},
 	getInitialState: function() {
 		return {
 			datetime: this.getDateTime()
 		};
 	},
 	render: function() {
 		return (

 			<div className='row' style={{'background-color':config.bodyColor}}>
				<div className='col-md-6 hotel' style={{color:config.fontColor,'font-size':config.fontSize}}>
				<img src='log.jpg' ref='image'  style={{'width':'50px','height':'50px'}} alt={config.hotelName} />{config.hotelName}
				</div>
				<div className="col-md-6" style={{'font-size':config.fontSize}}>
				  {this.state.datetime}	 
				</div>
				<div className="clearfix"></div>
				<div className='col-md-6 leftList'>
					<LeftList/>
				</div>
				<div className='col-md-6 rightList'>
					<RightList/>
				</div>
				<div className="clearfix"></div>
				<div className="col-md-12">
					<marquee className='col-md-6 telephone' style={{'color':config.ruleColor}}  >{config.hotelMsg}</marquee>
					<div className="col-md-6 telephone">预订电话: {config.hotelTel}</div>
				</div>
			 </div>
 		);
 	}
 });


 $(function() {
 	ReactDOM.render(
 		<JzFjp />,
 		$('body').get(0)
 	);

 	$('body').css({
 		'background-color': config.bodyColor
 	});
 });