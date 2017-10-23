import registerServiceWorker from './registerServiceWorker';

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { App } from './components/App';
import { Participant } from './components/Participant';
import { Team } from './components/Team';

import './style.css';

render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/participant/:id' component={Participant}/>
      <Route path='/team/:id' component={Team}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
