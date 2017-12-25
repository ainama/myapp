import React from 'react';

import RecentItem from './recentItem';

class RecentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    return (
      <React.Fragment>
        {
          data.map((item, index) => {
            return (
              <React.Fragment key = { index }>
                <RecentItem data = { item } />
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}

module.exports = RecentList;
