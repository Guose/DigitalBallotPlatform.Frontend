import { createStore } from 'redux'

const initialState = {
  formData: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FORM_DATA':
      return {
        ...state,
        formData: action.payload,
      }
      default:
        return state
  }
}

const store = createStore(reducer)

export default store