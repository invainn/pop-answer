import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game/Game';
import fourohfour from './components/404/404';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import history from './history';

import { 
    Router, 
    Switch, 
    Route 
} from 'react-router-dom';

ReactDOM.render((
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/:gameid" component={Game} />
            <Route path="*" component={fourohfour} />
        </Switch>
    </Router>
)
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
