import React from 'react';
import Navbar from './components/navbar';
import Home from './components/Home';
import { Provider } from './Context'

const App = () => {
return (
  <Provider>
    <div className="App">
      <Navbar />
      <Home />
    </div>
  </Provider>
)
}

export default App;
