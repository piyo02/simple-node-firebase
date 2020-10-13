import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// import logo from '../../../assets/img/logo/logo.svg';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import { store } from '../../../config/redux';

import './App.css';



// const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div> 
          <Route path="/" exact component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
