import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllProject, ApplyProject, PubProject, ManagerProject
} from './Project';
import history from '../own/history';
import ProjectsIndex from './Index';


class ProjectRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/app/project' component={(match) => {
                            return <ProjectsIndex match={match}/>
                        }} />
                        <Route exact path='/app/project/all' component={(match) => {
                            return <AllProject match={match}/>
                        }} />
                        {/* <Route exact path='/app/project/apply' component={(match) => {
                            return <ApplyProject match={match}/>
                        }} /> */}
                         <Route exact path='/app/project/pub' component={(match) => {
                            return <PubProject match={match}/>
                        }} />
                        <Route exact path='/app/project/manager' component={(match) => {
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