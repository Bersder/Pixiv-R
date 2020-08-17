import { createStore } from 'redux'
import reducer from './reducer.js'

const defaultState = {
  count: 1
}
const store = createStore(reducer, defaultState)
export default store