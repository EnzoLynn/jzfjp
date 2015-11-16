 

var LeftList = React.createClass({
	render: function() {
		return (
			<div>
				<div className='col-md-12 hotel' style={{color:config.fontColor,'font-size':config.fontSize}}>{config.hotelName}</div>
				<div className='col-md-4 head'>房型</div>
				<div className='col-md-4 head'>优惠价格</div>
				<div className='col-md-4 head'>周末价格</div>
				<div className='col-md-4'>dddd</div>
				<div className='col-md-4'>2222</div>
				<div className='col-md-4'>3333</div>
			</div>
		);
	}
});

var RightList = React.createClass({
	getZhou: function() {
		var week;
		if (new Date().getDay() == 0) week = "星期日"
		if (new Date().getDay() == 1) week = "星期一"
		if (new Date().getDay() == 2) week = "星期二"
		if (new Date().getDay() == 3) week = "星期三"
		if (new Date().getDay() == 4) week = "星期四"
		if (new Date().getDay() == 5) week = "星期五"
		if (new Date().getDay() == 6) week = "星期六"
		return week;
	},
	componentDidMount: function() {
		var me = this;
		var index = 0;
		setInterval(function() {
			index++;
			if (index >= config.images.length) {
				index = 0;
			};
			$(me.refs.image).fadeOut({
				duration: 1000 ,
				easing: 'swing',    
    			complete:function(){
    				$(this).attr('src', config.images[index]);
    			} 
			}).fadeIn({
				duration: 1000 
			});
		}, config.timeInterval);
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
	render: function() {
		return (

			<div className='row' style={{'background-color':config.bodyColor}}>
				<div className='col-md-6 leftList'>
					<LeftList/>
				</div>
				<div className='col-md-6 rightList'>
					<RightList/>
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