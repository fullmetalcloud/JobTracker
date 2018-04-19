/*

Homepage Component for client application

*/

import React, { Component }from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

 const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '25%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '50px'
  }
};

function JobDescriptionModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.show}
        onAfterOpen={props.handleAfterOpen}
        onRequestClose={props.handleClose}
        style={modalStyles}
        contentLabel="Job Description Modal"
      >
      <div>
        <h2>Full Job Description</h2>
        <h3>{props.jobName} - {props.jobCompany}</h3>
        <p>{props.jobDescription}</p>
        <button type="button" className="btn" onClick={props.handleClose}>Close</button>
        </div>
        
      </Modal>
    </div>
  );
}

class Home extends Component {
	render() {
    var joblist = this.props.info.jobList;
    var job;
    return (
      <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Job Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {joblist.map((jobinfo, i) => {
                job = JSON.parse(jobinfo);
                return (
                  <tr key={job._id}>
                    <td><input id={job._id} type="checkbox"/></td>
                    <td>{job.Name}</td>
                    <td>{job.Company}</td>
                    <td>{job.Status}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-primary buttonstyle" 
                        onClick={() => this.props.handleShow(i)}>
                        More Info
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <JobDescriptionModal
            show={this.props.info.showDescription}
            handleClose={() => this.props.handleClose()}
            handleAfterOpen={() => this.props.handleAfterOpen()}
            jobName={this.props.info.jobName}
            jobDescription={this.props.info.jobDescription}
            jobCompany={this.props.info.jobCompany}
          />
          <button className="btn btn-default" type="submit" onClick= {() => this.props.postJob()}> New Job </button>
          <button className="btn btn-default" type="submit" onClick= {() => this.props.logout()}> Logout </button>
        </div>
    );
   }
}
export default Home;