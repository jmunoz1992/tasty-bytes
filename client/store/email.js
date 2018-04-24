import axios from 'axios';


export function sendConformationEmail(email) {
  return function thunk() {
    axios.post(`/api/email/sendConformation`, {email})
    .then(res => {
      console.log(res.data)
      return res.data})
    .catch(err => console.error(err));
  };
}
