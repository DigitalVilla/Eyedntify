import React from 'react'
import {getToken} from '../redux/actions/act_authorize' 
import {Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
  let validToken = getToken().indexOf('Bearer') === 0 ? true : false; 
  
  return (
      <Route {...rest } render = { (props) => (
        validToken ? < Component {...props }/>
        : <Redirect to='/' />
      )} />
  )
}

export default PrivateRoute

// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   let validToken = getToken().indexOf('Bearer') === 0 ? true : false; 
//   return (
//     <Route {...rest } render = { (props) => (
//       validToken ? < Component {...props }/>
//         : <Redirect to='/' />
//     )} />
//   )
// };
