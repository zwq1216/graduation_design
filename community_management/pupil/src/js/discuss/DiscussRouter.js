import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    PublicDiscuss, MyDiscuss, PubDiscuss, CommuntyDiscuss, ManagerDiscuss
} from './Discuss';
import history from '../own/history';
import DiscussIndex from './Index';
import DiscussDetail from './Detail';


class DiscussRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/app/discuss' component={(match) => {
                            return <DiscussIndex match={match}/>
                        }} />
                        <Route path='/app/discuss/all' component={(match) => {
                            return <PublicDiscuss match={match}/>
                        }} />
                        <Route path='/app/discuss/detail/:id' component={(match) => {
                            return <DiscussDetail match={match}/>
                        }} />
                        <Route path='/app/discuss/my' component={(match) => {
                            return <MyDiscuss match={match}/>
                        }} />
                        <Route path='/app/discuss/pub' component={(match) => {
                            return <PubDiscuss match={match}/>
                        }} />
                        <Route path='/app/discuss/community' component={(match) => {
                            return <CommuntyDiscuss match={match}/>
                        }} />
                        <Route path='/app/discuss/manager' component={(match) => {
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