$(document).ready(function(){
	initialState();

	/*
	 * 登录／注册页面初始化
	 * @detail 根据本地存储判断默认显示登录或注册
	 */
	function initialState() {
		var type = localStorage.getItem('login');
		if (type != undefined) {
			tabClick(type);
		}
	}

	/*
	 * 验证输入是否正确公共方法
	 * @props value和reg,分别是需要验证的内容和验证的正则表达式
	 * @detail 验证通过返回true，验证未通过返回false
	 */
	function validate(value, reg) {
		var bool = reg.test(value);
		if (!bool) {
			return false;
		} else {
			return true;
		}
	}

	/*
	 * 登录时电话输入框获取焦点事件
	 * @detail 获取焦点时，若有报错信息，则置空
	 */
	$('#login-tel').focus(function(){
		$('#login-tel-error').text('');
	});

	/*
	 * 登录时电话输入框失去焦点事件
	 * @detail 进行电话号码验证，电话号码有误时，显示对应的报错信息，否则，报错信息置空
	 */
	$('#login-tel').blur(function(e){
		var phoneNum = e.target.value;
		var reg = /^1[3|4|5|7|8][0-9]{9}$/;
		var bool = validate(phoneNum, reg);
		var errorMsg = '电话格式号码有误';
		if (bool) {
			$('#login-tel-error').text('');
		} else {
			$('#login-tel-error').text(errorMsg);
		}
	});

	/*
	 * 登录时密码输入框获取焦点事件
	 * @detail 获取焦点时，若有报错信息，则置空
	 */
	$('#login-pwd').focus(function(){
		$('#login-pwd-error').text('');
	})

	/*
	 * 登录时密码输入框失去焦点事件
	 * @detail 进行密码验证，若不是8-16位密码，显示对应的报错信息，否则，报错信息置空
	 */
	$('#login-pwd').blur(function(e){
		var pwd = e.target.value;
		var reg = /^[0-9A-Za-z]{8,16}$/;
		var bool = validate(pwd, reg);
		var errorMsg = '请输入8-16位密码';
		if (bool) {
			$('#login-pwd-error').text('');
		} else {
			$('#login-pwd-error').text(errorMsg);
		}
	})

	/*
	 * 登录tab按钮点击事件
	 * @detail 登录按钮显示选中态，注册按钮显示普通态，登录表单显示，注册表单隐藏
	 */
	$('#loginBtn').click(function(){
		tabClick('login');
	});

	/*
	 * 注册tab按钮点击事件
	 * @detail 注册按钮显示选中态，登录按钮显示普通态，注册表单显示，登录表单隐藏
	 */
	$('#registerBtn').click(function(){
		tabClick('register');
	});

	/*
	 * 登录／注册tab按钮点击事件公共方法
	 */
	function tabClick(type){
		if (type == 'login') {
			$('#loginBtn').addClass('active-btn');
			$('#registerBtn').removeClass('active-btn');
			$('#index-login-login').css('display', 'block');
			$('#index-login-register').css('display', 'none');
		} else {
			$('#loginBtn').removeClass('active-btn');
			$('#registerBtn').addClass('active-btn');
			$('#index-login-login').css('display', 'none');
			$('#index-login-register').css('display', 'block');
		}
	}

	/*
	 * 登录提交按钮点击事件
	 * @detail 判断各项表单是否正确输入，若都正确提交表单，否则，给出相应提示
	 */
  $('#index-login-button').click(function() {
  	var phoneNum = $('#login-tel').val();
  	var pwd = $('#login-pwd').val();
  	var phoneErr = $('#login-tel-error').text();
  	var pwdErr = $('#login-pwd-error').text();
  	if (phoneNum!=''&&pwd!=''&&phoneErr==''&&pwdErr=='') {
	  	$('#login-tel').val('');
			$('#login-pwd').val('');
			$('#login-tel-error').text('');
			$('#login-pwd-error').text('');
	  	var data = { tel: phoneNum, pwd: pwd};
		  // 登录接口
		  $.ajax({
		    url: '/api/community/login',
		    type: 'post',
		    data: data,
		    success: function(res) {
		      console.log('00000', res);
		      if (res.code == 10000) {	
	  				location.href = '/community/home';
		      } else if (res.code == 10002){
		      	alert('账号或密码错误,请重新输入!');
		      }
		    }
		  });
  	} else {
  		alert('请按要求正确输入!');
  	}
  })

	/*
	 * 注册时名字输入框获取焦点事件
	 * @detail 获取焦点时，若有报错信息，则置空
	 */
	$('#register-name').focus(function(){
		$('#register-name-error').text('');
	});

	/*
	 * 注册时名字输入框失去焦点事件
	 * @detail 进行电话号码验证，电话号码有误时，显示对应的报错信息，否则，报错信息置空
	 */
	$('#register-name').blur(function(e){
		var name = e.target.value;
		var errorMsg = '姓名不能为空';
		if (name.length != 0) {
			$('#register-name-error').text('');
		} else {
			$('#register-name-error').text(errorMsg);
		}
	});

	/*
	 * 注册时电话输入框获取焦点事件
	 * @detail 获取焦点时，若有报错信息，则置空
	 */
	$('#register-tel').focus(function(){
		$('#register-tel-error').text('');
	});

	/*
	 * 注册时电话输入框失去焦点事件
	 * @detail 进行电话号码验证，电话号码有误时，显示对应的报错信息，否则，报错信息置空
	 */
	$('#register-tel').blur(function(e){
		var phoneNum = e.target.value;
		var reg = /^1[3|4|5|7|8][0-9]{9}$/;
		var bool = validate(phoneNum, reg);
		var errorMsg = '电话格式号码有误';
		if (bool) {
			$('#register-tel-error').text('');
		} else {
			$('#register-tel-error').text(errorMsg);
		}
	});

	/*
	 * 注册时密码输入框获取焦点事件
	 * @detail 获取焦点时，若有报错信息，则置空
	 */
	$('#register-pwd').focus(function(){
		$('#register-pwd-error').text('');
	});

	/*
	 * 注册时密码输入框失去焦点事件
	 * @detail 进行电话号码验证，电话号码有误时，显示对应的报错信息，否则，报错信息置空
	 */
	$('#register-pwd').blur(function(e){
		var pwd = e.target.value;
		var reg = /^[0-9A-Za-z]{8,16}$/;
		var bool = validate(pwd, reg);
		var errorMsg = '请输入8-16位密码';
		if (bool) {
			$('#register-pwd-error').text('');
		} else {
			$('#register-pwd-error').text(errorMsg);
		}

	});

	/*
	 * 注册提交按钮点击事件
	 * @detail 判断各项表单是否正确输入，若都正确提交表单，否则，给出相应提示
	 */
  $('#index-register-button').click(function() {
  	var name = $('#register-name').val();
  	var phoneNum = $('#register-tel').val();
  	var pwd = $('#register-pwd').val();
  	var nameErr = $('#register-name-error').text();
  	var phoneErr = $('#register-tel-error').text();
  	var pwdErr = $('#register-pwd-error').text();
  	if (name!=''&&phoneNum!=''&&pwd!=''&&nameErr==''&&phoneErr==''&&pwdErr=='') {
	  	var data = { name: name, tel: phoneNum, pwd: pwd};
	    $.ajax({
		    url: '/api/community/register',
		    type: 'post',
		    data: data,
		    success: function(res) {
		      console.log('00000', res);
		      if (res.code == 10000) {	
	  				location.href = '/login';
		      } else if (res.code == 10001){
	    	  	alert('注册失败！');
		      } else if (res.code == 10002){
	    	  	alert('电话号码已存在！');
		      }
    	  	$('#register-name').val('');
    	  	$('#register-tel').val('');
  				$('#register-pwd').val('');
  				$('#register-name-error').text('');
  				$('#register-tel-error').text('');
  				$('#register-pwd-error').text('');
		    }
		  });
  	} else {
  		alert('请按要求正确输入!');
  	}
  })




// "use strict";

// var canvas = document.getElementById('canvas'),
//   ctx = canvas.getContext('2d'),
//   w = canvas.width = window.innerWidth,
//   h = canvas.height = window.innerHeight,

//   hue = 217,
//   stars = [],
//   count = 0,
//   maxStars = 1200;

// var canvas2 = document.createElement('canvas'),
//   ctx2 = canvas2.getContext('2d');
// canvas2.width = 100;
// canvas2.height = 100;
// var half = canvas2.width / 2,
// gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
// gradient2.addColorStop(0.025, '#0f88eb');
// gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 5%)');
// gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
// gradient2.addColorStop(1, 'transparent');

// ctx2.fillStyle = gradient2;
// ctx2.beginPath();
// ctx2.arc(half, half, half, 0, Math.PI * 2);
// ctx2.fill();

// // End cache

// function random(min, max) {
//   if (arguments.length < 2) {
//     max = min;
//     min = 0;
//   }

//   if (min > max) {
//     var hold = max;
//     max = min;
//     min = hold;
//   }

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function maxOrbit(x, y) {
//   var max = Math.max(x, y),
//     diameter = Math.round(Math.sqrt(max * max + max * max));
//   return diameter / 2;
// }

// var Star = function() {

//   this.orbitRadius = random(maxOrbit(w, h));
//   this.radius = random(60, this.orbitRadius) / 12;
//   this.orbitX = w / 2;
//   this.orbitY = h / 2;
//   this.timePassed = random(0, maxStars);
//   this.speed = random(this.orbitRadius) / 900000;
//   this.alpha = random(2, 10) / 10;

//   count++;
//   stars[count] = this;
// }

// Star.prototype.draw = function() {
//   var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
//     y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
//     twinkle = random(10);

//   if (twinkle === 1 && this.alpha > 0) {
//     this.alpha -= 0.05;
//   } else if (twinkle === 2 && this.alpha < 1) {
//     this.alpha += 0.05;
//   }

//   ctx.globalAlpha = this.alpha;
//   ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
//   this.timePassed += this.speed;
// }

// for (var i = 0; i < maxStars; i++) {
//   new Star();
// }

// function animation() {
//   ctx.globalCompositeOperation = 'source-over';
//   ctx.globalAlpha = 0.8;
//   ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
//   ctx.fillRect(0, 0, w, h)

//   ctx.globalCompositeOperation = 'lighter';
//   for (var i = 1, l = stars.length; i < l; i++) {
//     stars[i].draw();
//   };

//   window.requestAnimationFrame(animation);
// }

// animation();





// $(function(){
//   var canvas = document.querySelector('canvas'),
//       ctx = canvas.getContext('2d')
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   ctx.lineWidth = .3;
//   ctx.strokeStyle = (new Color(150)).style;

//   var mousePosition = {
//     x: 30 * canvas.width / 100,
//     y: 30 * canvas.height / 100
//   };

//   var dots = {
//     nb: 750,
//     distance: 50,
//     d_radius: 100,
//     array: []
//   };

//   function colorValue(min) {
//     return Math.floor(Math.random() * 255 + min);
//   }
  
//   function createColorStyle(r,g,b) {
//     return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
//   }
  
//   function mixComponents(comp1, weight1, comp2, weight2) {
//     return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
//   }
  
//   function averageColorStyles(dot1, dot2) {
//     var color1 = dot1.color,
//         color2 = dot2.color;
    
//     var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
//         g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
//         b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
//     return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
//   }
  
//   function Color(min) {
//     min = min || 0;
//     this.r = colorValue(min);
//     this.g = colorValue(min);
//     this.b = colorValue(min);
//     this.style = createColorStyle(this.r, this.g, this.b);
//   }

//   function Dot(){
//     this.x = Math.random() * canvas.width;
//     this.y = Math.random() * canvas.height;

//     this.vx = -.5 + Math.random();
//     this.vy = -.5 + Math.random();

//     this.radius = Math.random() * 2;

//     this.color = new Color();
//     console.log(this);
//   }

//   Dot.prototype = {
//     draw: function(){
//       ctx.beginPath();
//       ctx.fillStyle = this.color.style;
//       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//       ctx.fill();
//     }
//   };

//   function createDots(){
//     for(i = 0; i < dots.nb; i++){
//       dots.array.push(new Dot());
//     }
//   }

//   function moveDots() {
//     for(i = 0; i < dots.nb; i++){

//       var dot = dots.array[i];

//       if(dot.y < 0 || dot.y > canvas.height){
//         dot.vx = dot.vx;
//         dot.vy = - dot.vy;
//       }
//       else if(dot.x < 0 || dot.x > canvas.width){
//         dot.vx = - dot.vx;
//         dot.vy = dot.vy;
//       }
//       dot.x += dot.vx;
//       dot.y += dot.vy;
//     }
//   }

//   function connectDots() {
//     for(i = 0; i < dots.nb; i++){
//       for(j = 0; j < dots.nb; j++){
//         i_dot = dots.array[i];
//         j_dot = dots.array[j];

//         if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
//           if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
//             ctx.beginPath();
//             ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
//             ctx.moveTo(i_dot.x, i_dot.y);
//             ctx.lineTo(j_dot.x, j_dot.y);
//             ctx.stroke();
//             ctx.closePath();
//           }
//         }
//       }
//     }
//   }

//   function drawDots() {
//     for(i = 0; i < dots.nb; i++){
//       var dot = dots.array[i];
//       dot.draw();
//     }
//   }

//   function animateDots() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     moveDots();
//     connectDots();
//     drawDots();

//     requestAnimationFrame(animateDots);	
//   }

//   $('canvas').on('mousemove', function(e){
//     mousePosition.x = e.pageX;
//     mousePosition.y = e.pageY;
//   });

//   $('canvas').on('mouseleave', function(e){
//     mousePosition.x = canvas.width / 2;
//     mousePosition.y = canvas.height / 2;
//   });

//   createDots();
//   requestAnimationFrame(animateDots);	
// });





	class Circle {
    //创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = Math.random() * 5;
      this._mx = Math.random();
      this._my = Math.random();

    }

    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆
    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
    drawCircle(ctx) {
      ctx.beginPath();
      //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
      ctx.arc(this.x, this.y, this.r, 0, 360)
      ctx.closePath();
      ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
      ctx.fill();
    }

    drawLine(ctx, _circle) {
      let dx = this.x - _circle.x;
      let dy = this.y - _circle.y;
      let d = Math.sqrt(dx * dx + dy * dy)
      if (d < 100) {
        ctx.beginPath();
        //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
        ctx.moveTo(this.x, this.y); //起始点
        ctx.lineTo(_circle.x, _circle.y); //终点
        ctx.closePath();
        ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.stroke();
      }
    }

    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
      this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
      this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
      this.x += this._mx / 2;
      this.y += this._my / 2;
    }
  }

  //鼠标点画圆闪烁变动
  class currentCirle extends Circle {
    constructor(x, y) {
      super(x, y)
    }

    drawCircle(ctx) {
      ctx.beginPath();
      //注释内容为鼠标焦点的地方圆圈半径变化
      //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
      this.r = 8;
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath();
      //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
      ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
      ctx.fill();

    }
  }

  //更新页面用requestAnimationFrame替代setTimeout
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let circles = [];
  let current_circle = new currentCirle(0, 0)

  let draw = function() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
      circles[i].move(w, h);
      circles[i].drawCircle(ctx);
      for (j = i + 1; j < circles.length; j++) {
        circles[i].drawLine(ctx, circles[j])
      }
    }
    if (current_circle.x) {
      current_circle.drawCircle(ctx);
      for (var k = 1; k < circles.length; k++) {
        current_circle.drawLine(ctx, circles[k])
      }
    }
    requestAnimationFrame(draw)
  }

  let init = function(num) {
    for (var i = 0; i < num; i++) {
      circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
  }

  window.addEventListener('load', init(60));

  window.onmousemove = function(e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
  }

  window.onmouseout = function() {
    current_circle.x = null;
    current_circle.y = null;
  }

})




