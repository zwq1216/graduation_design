import React, { Component } from 'react';
import { Router, Route, Redirect, Switch} from 'react-router-dom';
import history from 'history/createHashHistory';

import Login from './global/Login';
import Register from './global/Register';
import PersonRouter from './person/PersonRouter';
import CommunityRouter from './community/CommunityRouter';
import DiscussRouter from './discuss/DiscussRouter';
import DataRouter from './data/DataRouter';
import NewsRouter from './news/NewsRouter';
import ProjectRouter from './project/ProjectRouter';
import Changepassword from './global/Changepassword';
import App from '../js/App';

const hashHistory = history();

class Start extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <div className="start">
                    <Switch>
                        <Route exact path="/" component={(match) => {
                            return <Login match={match}/>
                        }} />
                        <Route exact path="/register" component={(match) => {
                            return <Register match={match}/>
                        }} />
                        <Route exact path="/app" component={(match) => {
                            return <App match={match}/>
                        }} />
                        <Route path="/person" component={(match) => {
                            return <PersonRouter match={match}/>
                        }} />
                        <Route path="/community" component={(match) => {
                            return <CommunityRouter match={match}/>
                        }} />
                        <Route path="/discuss" component={(match) => {
                            return <DiscussRouter match={match}/>
                        }} />
                        <Route path="/data" component={(match) => {
                            return <DataRouter match={match}/>
                        }} />
                        <Route path="/news" component={(match) => {
                            return <NewsRouter match={match}/>
                        }} />
                        <Route path="/project" component={(match) => {
                            return <ProjectRouter match={match}/>
                        }} />
                        <Route exact path="/changepassword" component={(match) => {
                            return <Changepassword match={match}/>
                        }} />

                        {/* <Route path='/404' component={NotFoundPage} />
                        <Redirect from='*' to='/404' /> */}
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
        );
    }
}

export default Start;