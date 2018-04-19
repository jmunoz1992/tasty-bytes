import axios from 'axios'

const MESSAGE = 'MESSAGE'

export const getMessage = authMessage => ({
  type: MESSAGE,
  authMessage
})

export default function (state = '', action) {
  switch (action.type) {
    case MESSAGE:
      return action.authMessage
    default:
      return state
  }
}
