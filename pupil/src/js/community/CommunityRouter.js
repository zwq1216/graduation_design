import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllCommunty, ApplyCommunty, ManageCommunty, MonitCommunty, PushMessage
} from './Community';
import history from '../global/history';


class CommunityRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/community' component={(match) => {
                            return <AllCommunty match={match}/>
                        }} />
                        <Route exact path='/community/apply' component={(match) => {
                            return <ApplyCommunty match={match}/>
                        }} />
                        <Route exact path='/community/manage' component={(match) => {
                            return <ManageCommunty match={match}/>
                        }} />
                        <Route exact path='/community/monit' component={(match) => {
                            return <MonitCommunty match={match}/>
                        }} />
                        <Route exact path='/community/pushmessage' component={(match) => {
                            return <PushMessage match={match}/>
                        }} />
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default CommunityRouter;