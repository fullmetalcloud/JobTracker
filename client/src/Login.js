/*

Login page Component for client application

*/

import React, { Component }from 'react';

class Login extends Component {
  handleLoginChange(event) {
    this.props.info.loginname = event.target.value
  }
  handlePasswordChange(event) {
    this.props.info.password = event.target.value
  }
  render() {
    return (
      <div>
        <div className="container slide-expand">
          <div>
            <label><b>Name: </b></label> 
            <input type="text" name="name" placeholder="Enter Name" onChange={(event) => this.handleLoginChange(event)} />
          </div>
          <div>
            <label><b>Password: </b></label>
            <input type="password" name="password" placeholder="Enter Password" onChange={(event) => this.handlePasswordChange(event)} />
          </div>
          <button className="btn btn-default" type="submit" value="Submit" onClick={()=> this.props.login()}> Login </button>
          <h2 className="invalidlogin">{this.props.info.attemptLogin ? "Invalid Login" : ""}</h2>
        </div>
          
      </div> 
    );
  }
}

export default Login;