import axios from 'axios'
import history from '../history'

const GET_USERS = 'GET_USERS'

const getUsers = users => ({
  type: GET_USERS,
  users
})

export const fetchUsers = () => {
  return dispatch => {
    return axios.get('/api/admin/users')
        .then(res => res.data)
        .then(users => {
            dispatch(getUsers(users))
        })
        .catch(error => console.log(error))
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
