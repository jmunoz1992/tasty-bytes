import axios from 'axios'
import { getMessage, newErrorMessage } from './index'

const GET_CATEGORIES = 'GET_CATEGORIES'
const NEW_CATEGORY = 'NEW_CATEGORY'

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const newCategory = category => ({
  type: NEW_CATEGORY,
  category
})

export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
        .then(res => res.data)
        .then(categories => {
          console.log('categories in store ', categories);
          if (typeof categories === 'string') {
            return dispatch(getMessage(categories))
          } else {
            return dispatch(getCategories(categories))
          }
        })
        .catch(error => console.log(error))
  }
}

export const addCategory = (category) => {
  return dispatch => {
    return axios.post('/api/admin/categories', category)
        .then(res => res.data)
        .then(createdCategory => {
            dispatch(newCategory(createdCategory))
        })
        .catch(error => {
          let message = error.response.data
            if (message.indexOf("name must be unique") > -1) {
              message = "Category name must be unique; please enter a different category name"
            }
            dispatch(newErrorMessage(message))
          console.error(error)
        })
  }
}

export const deleteCategory = (categoryId) => {
  return dispatch => {
    return axios.put(`/api/admin/categories/${categoryId}/delete`)
        .then(res => res.data)
        .then(message => {
          console.log(message)
            dispatch(fetchCategories())
        })
        .catch(error => console.log(error))
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

      case NEW_CATEGORY:
      return [...state, action.category];

    default:
      return state
  }
}
