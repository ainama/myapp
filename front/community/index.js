import React from 'react';

import Header from './container/header';
import Footer from './container/footer';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Header />

        <div className = 'container'>
          { this.props.children }
        </div>

        <Footer />

      </div>
    );
  }
}

export default Index;
