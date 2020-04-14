import React from 'react';
import './App.css';
import Paper from './component/Paper/Paper';
import Questions from './component/Questions/Questions';
import Menu from './component/Layout/Menu';
import Day from './component/Day/Day';
import { Route, Switch, Redirect } from 'react-router-dom'
import Description from './component/Questions/Description';
import Dashboard from './component/Dashboard/Dashboard';
import Auth from './component/Auth/Auth';
import Admin from './component/Admin/Admin';


function App() {
  return (
    <div className="App">

      <Menu />
      <div className='wrapper'>
        <Switch>
        <Route exact path='/' render={() => <Dashboard />} />
          <Route exact path='/tasks/:date' render={() => <Day />} />
          <Route exact path='/questions' render={() => <Questions />} />
          <Route exact path='/questions/:type' render={() => <Description />} />
          <Route exact path='/tasks/:date/:type' render={() => <Paper />} />
          <Route exact path='/admin' render={() => <Admin />} />
          <Route exact path='/auth' render={() => <Auth />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
