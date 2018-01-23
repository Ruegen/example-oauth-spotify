import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Songs from './components/Songs'
import Login from './components/Login'
import './App.css';

class App extends Component {

  state = {
    songs: []
  }
  render() {
    console.log(this.state.songs)
    return (
      <div className="App">
         <Router>
           <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/songs" component={Songs}/>
           </Switch>
         </Router>
      </div>
    );
  }
}


export default App;
