/*

Main Component for client application

*/

//import libs and components
import React, { Component } from 'react';
import Header from './Header';
import Login from './Login';
import Home from './Home';
import qs from 'qs';
import axios from 'axios';

//import styles
import './styles/style.css';
import './styles/animations.css'

/*--------------------------------*/

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login : {
      //Login.js state
        loginname: "",
        password: "", 
        isAuth: false,
        attemptLogin: false
      },
      home: {
      //Home.js state
        jobList: [],
        showDescriptionModal: false,
        showNewJobModal: false,
        jobName: "",
        jobDescription: "",
        jobCompany: ""
      }
    };
  }

  verification() {
    //make http.post
    return true;
  }

  handleDescModalClose() {
    let homeInfo = this.state.home;
    homeInfo.showDescription = false;
    homeInfo.jobName = "";
    homeInfo.jobDescription = "";
    homeInfo.jobCompany = "";
    this.setState({home: homeInfo});
  }

  handleDescModalAfterOpen() {

  }

  handleDescModalShow(num) {
    let homeInfo = this.state.home;
    let info = JSON.parse(homeInfo.jobList[num]);
    homeInfo.showDescription = true;
    homeInfo.jobName = info.Name;
    homeInfo.jobDescription = info.Description;
    homeInfo.jobCompany = info.Company;
    this.setState({home: homeInfo});
  }

  postJob(info) {

    axios.post('/jobs', qs.stringify(info))
      .then(res => {
        this.setState({
          response: res
        })
      }).catch(err => {
      console.log(err)
    })
  }

  login() {
    let loginInfo = this.state.login;
    let homeInfo = this.state.home;
    loginInfo.isAuth = this.verification();
    if(loginInfo.isAuth) {
      axios.get('/jobs')
        .then(res => {
          homeInfo.jobList = res.data;
          this.setState({ home: homeInfo } );
        }).catch(err => {
        console.log(err)
      })
    }
    loginInfo.attemptLogin = true;
    this.setState({ login: loginInfo });
  }

  logout() {
    let loginInfo = this.state.login;
    let homeInfo = this.state.home;
    loginInfo.loginname = "";
    loginInfo.isAuth = false;
    loginInfo.attemptLogin = false;
    homeInfo.jobList = [];
    this.setState({login: loginInfo});
  }

  render() {
    let home = this.state.home;
    let login = this.state.login;
    return (
      <div>
        <Header loginname={login.loginname} />
        {login.isAuth ? (
          <Home 
            info={home} 
            logout={() => this.logout()}
            handleShow={(i) => this.handleDescModalShow(i)}
            handleAfterOpen={() => this.handleDescModalAfterOpen()}
            handleClose={() => this.handleDescModalClose()}
            postJob={() => this.postJob()}
          />
        ) : (
          <Login 
            info={login} 
            login={() => this.login()}
          />
        )}
      </div>
    )
  }
}

export default Main;