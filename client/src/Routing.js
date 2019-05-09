import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Connectform from './components/connectform';
import Payment from './components/payment';
import Bankinfo from './components/bankinfo';

const Routing = () => (
    <Router>
        <Route exact path="/" component={Connectform}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/bankinfo" component={Bankinfo}/>
        {/* <Route path="/git" component={Git}/> */}
    </Router>
  )
  export default Routing