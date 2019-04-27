import React, { Component } from 'react';
import { Router, Route, Redirect, Switch} from 'react-router-dom';
import history from './own/history';

import PersonRouter from './person/PersonRouter';
import CommunityRouter from './community/CommunityRouter';
import DiscussRouter from './discuss/DiscussRouter';
import DataRouter from './data/DataRouter';
import NewsRouter from './news/NewsRouter';
import ProjectRouter from './project/ProjectRouter';
import Index from './home/Index';


class Start extends Component {
    render() {
        
        return (
            <Router history={history}>
                <div className="start">
                    <Switch>
                        <Route exact path="/app" component={(match) => {
                            return <Index match={match}/>
                        }} />
                        <Route path="/app/person" component={(match) => {
                            return <PersonRouter match={match}/>
                        }} />
                        <Route path="/app/community" component={(match) => {
                            return <CommunityRouter match={match}/>
                        }} />
                        <Route path="/app/discuss" component={(match) => {
                            return <DiscussRouter match={match}/>
                        }} />
                        <Route path="/app/data" component={(match) => {
                            return <DataRouter match={match}/>
                        }} />
                        <Route path="/app/news" component={(match) => {
                            return <NewsRouter match={match}/>
                        }} /> 
                        <Route path="/app/project" component={(match) => {
                            return <ProjectRouter match={match}/>
                        }} />
{/* 
                        <Route path='/404' component={NotFoundPage} />
                        <Redirect from='*' to='/404' />  */}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Start;


