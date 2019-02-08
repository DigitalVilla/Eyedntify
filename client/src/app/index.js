import React from 'react';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Login from './pages/Login';
import Profile from './pages/Profile'; 
import Error404 from './pages/Error404';
import { Provider } from 'react-redux';
import {getLS} from './redux/utils/persistance';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {validateTokenAsynch, PrivateRoute} from './redux/actions/act_authorize';
import  store  from './redux/store';


const App = () => {
  validateTokenAsynch();

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={()=> (
              getLS("jwtToken") 
              ? <Redirect to="/home" />
              : <Login />
            )}/>
            
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/logout" component={Login} />
            <PrivateRoute exact path="/camera" component={Camera} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
export default App;
