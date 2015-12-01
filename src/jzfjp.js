 var index = 0;
 var ListRow = React.createClass({

 	render: function() {
 		var me = this;
 		var tds = [];
 		this.props.price.forEach(function(price, key) {
 			tds.push(<td className='lrow' key={key}>{price}</td>);
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
 			tds.push(<th className='head'  key={key}>{price}</th>);
 		});
 		var span = config.priceType.length;
 		return (
 			<thead> 
 				<tr>
	 				<th>
	 			 	 	<img src='log.jpg' ref='image'  style={{'width':'50px','height':'50px'}} alt={config.hotelName} />
	 			 	</th>
					<th colSpan ={span} className='hotel'  style={{color:config.fontColor,'fontSize':config.fontSize}}>
						{config.hotelName} 
					</th>
				</tr>
 				<tr  className='headTr'>
					<th className='head'>房型</th> 
					{tds}
				</tr>
			</thead>
 		);
 	}
 });

 var LeftList = React.createClass({

 	render: function() {
 		var me = this;
 		var rows = [],
 			heads = [];
 		var span = config.priceType.length + 1;
 		rows.push(<tr><td className='noborder' colSpan ={span} style={{ background: config.bodyColor}}></td></tr>);
 		this.props.roomType.forEach(function(room, key) {
 			rows.push(<ListRow name={room.name} price={room.price}  key={key}/>); 

						
 			rows.push(<tr><td className='noborder' colSpan ={span} style={{ backgroundColor: config.bodyColor}}></td></tr>);
 		}); 
 		if (rows.length < 10) {
 			var add = [];
 			for (var i = 0; i < 10 - rows.length; i++) {
 				var nk = 'lr' + i;
 				add.push(<tr><td className='lrow' colSpan ={span} key={nk}> - </td></tr>);
 			};
 			rows = rows.concat(add);
 			rows.push(<tr><td className='noborder' colSpan ={span} style={{ backgroundColor: config.bodyColor}}></td></tr>);
 		};
 		
 		rows.push(<tr><td className='ms_marquee' colSpan ={span} ><marquee style={{'color':config.ruleColor,'fontSize':config.rulefontSize}}  >{config.hotelRule}</marquee></td></tr>);

 		return (
 			<table className='col-md-12 table' cellPadding={0} cellSpacing={0} >
 			 	<HeadRow/>
 			 	<tbody> 			 
				{rows} 
				</tbody>
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
 			<div style={{'text-algin':'center'}}>
				<img src='images/1.jpg' ref='image' className="img-responsive" alt="Responsive image" />
			</div>
 		);
 	}
 });


 var JzFjp = React.createClass({
 	getWeek: function() {
 		let date = new Date();
 		let day = date.getDay();
 		if (day == 0) return "日";
 		if (day == 1) return "一";
 		if (day == 2) return "二";
 		if (day == 3) return "三";
 		if (day == 4) return "四";
 		if (day == 5) return "五";
 		if (day == 6) return "六";
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
 		let arr = [];
 		arr.push(me.preZeroFill(hours, 2));
 		arr.push(me.preZeroFill(minutes, 2));
 		arr.push(week);
 		return  arr;

 	},
 	componentDidMount: function() {

 		var me = this;
 		//一秒刷新一次显示时间
 		setInterval(function() {
 			me.setState({
 				datetime: me.getDateTime()
 			});
 		},10000);
 		setInterval(function() {
 			index++;
 			if (index > me.state.totalpage - 1) {
 				index = 0;
 			};
 			me.setState({
 				leftArr: me.state.leftSrc[index]
 			});
 		}, config.roomInterval);
 	},

 	getInitialState: function() {
 		var leftArr = [];
 		var total = config.roomType.length;
 		var pageSize = 5;
 		var page = total % 5 == 0 ? total / 5 : Math.floor(total / 5) + 1;
 		for (var i = 0; i < page; i++) {
 			var end = i == page - 1 ? total : (i + 1) * pageSize;

 			var temp = config.roomType.slice(i * pageSize, end);

 			leftArr.push(<LeftList roomType={temp}/>);
 		};

 		return {
 			datetime: this.getDateTime(), 			
 			leftArr: leftArr[index],
 			leftSrc: leftArr,
 			totalpage: page,
 			curpage: 0
 		};
 	},
 	render: function() {
 		let freeService = [];
 		if (config.freeService.wifi) {
 			freeService.push(<span className='freeService'><img src="/icons/wifi.png"/></span>);
 		};
 		if (config.freeService.adapter) {
 			freeService.push(<span className='freeService'><img src="/icons/adapter.png"/></span>);
 		};
 		if (config.freeService.hairDrier) {
 			freeService.push(<span className='freeService'><img src="/icons/hairdrier.png"/></span>);
 		};
 		if (config.freeService.ironBoard) {
 			freeService.push(<span className='freeService'><img src="/icons/ironBoard.png"/></span>);
 		};
 		if (config.freeService.sewingKit) {
 			freeService.push(<span className='freeService'><img src="/icons/sewingKit.png"/></span>);
 		};
 		if (config.freeService.umbrella) {
 			freeService.push(<span className='freeService'><img src="/icons/umbrella.png"/></span>);
 		};
 		 
 		return (

 			<div className='row' style={{'backgroundColor':config.bodyColor}}>
				
				<div className='col-md-6 leftList'>
					{this.state.leftArr}
				</div>
				<div className='col-md-6 rightList'>
					<RightList/>
				</div>
				<div className="clearfix"></div>	
				<div className="col-md-6" style={{'fontSize':config.fontSize}}>
				   <div className='bg_servers_item_bj'>
				   			{freeService}
				   </div> 
				</div>  			 
				<div className="col-md-6" style={{'fontSize':config.fontSize}}> 
				  <div className='bg_time_bj'>
				  		<span className="houers">{this.state.datetime[0]}</span>
				  		<span className="minutes">{this.state.datetime[1]}</span>
				  		<span className="weekTitle">星期</span>
				  		<span className="week">{this.state.datetime[2]}</span>
				  </div> 
				</div>  
				<div className="clearfix"></div>
				<div className="col-md-12 bottomMsg">
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