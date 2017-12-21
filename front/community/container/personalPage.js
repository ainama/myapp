import React from 'react';
import PropTypes from 'prop-types';


class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {

    // 获取用户信息
    $.ajax({
      url: '/api/community/user/userInfo',
      type: 'get',
      data: {id: 8},
      success: function(res) {
        console.log('00000', res);
      }
    });
    
  }

  render() {
    return (
      <div className = 'personal-page'>
          <div>
            <img
            src = 'http://res.frogshealth.com/images/detail/46ebf885838b0bb571d7ac951d6bb7b56'
            style = {{width: '1000px', height: '240px', objectFit: 'cover'}}/>
            <div className = 'personal-info'>
              <div className = 'personal-info-img'>
                <img
                  src = 'http://res.frogshealth.com/images/detail/3fb64fe002dd286ce07faea32f3327aa6'
                  style = {{width: '160px', height: '160px', objectFit: 'cover'}}/>             
              </div>
              <div className = 'personal-info-msg'>
                <p>敏敏</p>
                <div>13325236523</div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

module.exports = PersonalPage;
