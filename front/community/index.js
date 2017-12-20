// import React from 'react';


// class Index extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <div>11111</div>
//         {this.props.children}
//         <div>22222</div>
//       </div>
//     );
//   }
// }


// export default Index;



import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className = 'head'>header</div>

        <div className = 'container'>
          { this.props.children }
        </div>

        <div className = 'foot'>footer</div>

      </div>
    );
  }
}

export default Index;
