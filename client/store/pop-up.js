import axios from 'axios'

const ERROR_MESSAGE = 'ERROR_MESSAGE'

export const newErrorMessage = errorMessage => ({
  type: ERROR_MESSAGE,
  errorMessage
})

export default function (state = '', action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.errorMessage
    default:
      return state
  }
}
