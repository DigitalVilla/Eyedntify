import React from 'react';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import { Provider } from './Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/camera" component={Camera} />
            <Route exact path="/profile" component={Profile} />
            <Route  component={Error404} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
