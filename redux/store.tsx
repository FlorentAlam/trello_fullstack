import { createStore } from 'redux';
import listReducer from './listReducer';

const store = createStore(listReducer);

export default store;