import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    PublicDiscuss, MyDiscuss, PubDiscuss, CommuntyDiscuss, ManagerDiscuss
} from './Discuss';
import history from '../own/history';


class DiscussRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/discuss' component={(match) => {
                            return <PublicDiscuss match={match}/>
                        }} />
                        <Route exact path='/discuss/my' component={(match) => {
                            return <MyDiscuss match={match}/>
                        }} />
                        <Route exact path='/discuss/pub' component={(match) => {
                            return <PubDiscuss match={match}/>
                        }} />
                        <Route exact path='/discuss/community' component={(match) => {
                            return <CommuntyDiscuss match={match}/>
                        }} />
                        <Route exact path='/discuss/manager' component={(match) => {
                            return <ManagerDiscuss match={match}/>
                        }} />
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default DiscussRouter;