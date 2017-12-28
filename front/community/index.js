import React from 'react';

import Header from './container/header';
import Footer from './container/footer';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className = 'container'>
          <div className = 'body'>
            { this.props.children }
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Index;
