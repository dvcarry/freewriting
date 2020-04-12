import React from 'react';
import './App.css';
import Paper from './component/Paper/Paper';
import Questions from './component/Questions/Questions';
import Menu from './component/Layout/Menu';
import Day from './component/Day/Day';
import { Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">

      <Menu />
      <div className='wrapper'>
        <Switch>
          <Route exact path='/tasks/:date' render={() => <Day />} />
          <Route path='/questions' render={() => <Questions />} />
          <Route exact path='/tasks/:date/:type' render={() => <Paper />} />

        </Switch>
      </div>
    </div>
  );
}

export default App;
