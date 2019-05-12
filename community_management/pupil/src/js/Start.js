import React, { Component } from 'react';
import { Router, Route, Redirect, Switch} from 'react-router-dom';
import history from './own/history';

import Login from './Login';
import Changepassword from './global/Changepassword';
import App from '../js/App';
import NotFound from './global/NotPage';


class Start extends Component {
    render() {
        
        return (
            <Router history={history}>
                <div className="start">
                    <Switch>
                        <Route exact path="/" component={(match) => {
                            return <Login match={match}/>
                        }} />
                        <Route path="/app" component={(match) => {
                            return <App match={match}/>
                        }} />
                        <Route path="/changepassword" component={(match) => {
                            return <Changepassword match={match}/>
                        }} />
                        <Route path='/404' component={NotFound} />
                        <Redirect from='*' to='/404' /> 
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Start;