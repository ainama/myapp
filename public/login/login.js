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

})
