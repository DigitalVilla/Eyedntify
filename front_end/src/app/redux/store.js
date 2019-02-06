import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk]; 

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // eslint-disable-next-line 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window .__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store; 
// https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5