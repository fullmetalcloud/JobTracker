/*

Header Component for client application

*/

import React, { Component }from 'react';
class Header extends Component {
  render() {
      return (
        <div className="jumbotron text-center">
          <h1 className="slide-left">Job Tracker</h1>
          <h3>{this.props.loginname ? "Hello " + this.props.loginname : ""}</h3>
        </div>
      );
   }
}
export default Header;