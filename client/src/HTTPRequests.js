
import qs from 'qs';
import axios from 'axios';

const url = 'localhost:8080';

export function getList() {

  axios.get(url + "/jobs")
    .then(res => {
      console.log(res)
      return res;
    }).catch(err => {
    console.log(err)
  })
}

export function postJob(id) {

  axios.post(url + "/jobs/:id", qs.stringify(id))
    .then(res => {
      this.setState({
        response: res
      })
    }).catch(err => {
    console.log(err)
  })
}