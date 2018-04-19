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

export const deleteUser = (userId) => {
  console.log('USER ID - ', userId)
  return dispatch => {
    return axios.put(`/api/admin/users/${userId}/delete`)
        .then(res => res.data)
        .then(message => {
          console.log(message)
            dispatch(fetchUsers())
        })
        .catch(error => console.log(error))
  }
}

export const updateUser = (userId, updates) => {
  return dispatch => {
    return axios.put(`/api/admin/users/${userId}`, updates)
        .then(res => res.data)
        .then(message => {
          console.log(message)
            dispatch(fetchUsers())
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
