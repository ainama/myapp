$(document).ready(function(){

	  $('#index-login-button').click(function() {
	  	console.log('99999');

		  // 登录接口
		  $.ajax({
		    url: '/api/community/login',
		    type: 'post',
		    data: {tel: '13325412543', pwd: '12345678'},
		    success: function(res) {
		      console.log('00000', res);
	  			location.href = '/community/personal';
		    }
		  });
	  })

    // 注册接口
    // $.ajax({
    //   url: '/api/community/user/register',
    //   type: 'post',
    //   data: {name: 'hello', tel: '13325412543', pwd: '12345678'},
    //   success: function(res) {
    //     console.log('00000', res);
    //   }
    // });
})
