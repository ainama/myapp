import React from 'react';

import HotTopItem from './hotTopItem';
import HotItem from './hotItem';

class HotList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className = 'title'>热门文章</div>
        {
          this.props.data &&
          this.props.data.map((item, index) => {
            if (index < 2) {
              return (
                <React.Fragment key = { index }>
                  <HotTopItem data = { item } index = { index } />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key = { index }>
                  <HotItem data = { item } index = { index } />
                </React.Fragment>
              );
            }

          })
        }
      </React.Fragment>
    );
  }
}

module.exports = HotList;
