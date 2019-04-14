import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllProject, ApplyProject, PubProject, ManagerProject
} from './Project';
import history from '../own/history';


class ProjectRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/project' component={(match) => {
                            return <AllProject match={match}/>
                        }} />
                        <Route exact path='/project/apply' component={(match) => {
                            return <ApplyProject match={match}/>
                        }} />
                         <Route exact path='/project/pub' component={(match) => {
                            return <PubProject match={match}/>
                        }} />
                        <Route exact path='/project/manager' component={(match) => {
                            return <ManagerProject match={match}/>
                        }} />
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default ProjectRouter;