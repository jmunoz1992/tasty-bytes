import axios from 'axios'
import history from '../history'

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
    return axios.get('/api/admin/categories')
        .then(res => res.data)
        .then(categories => {
            dispatch(getCategories(categories))
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
        .catch(error => console.log(error))
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
