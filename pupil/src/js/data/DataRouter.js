import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllData, ShareData, ManagerData
} from './Data';
import history from '../global/history';


class DiscussRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/data' component={(match) => {
                            return <AllData match={match}/>
                        }} />
                        <Route exact path='/data/share' component={(match) => {
                            return <ShareData match={match}/>
                        }} />
                        <Route exact path='/data/manager' component={(match) => {
                            return <ManagerData match={match}/>
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