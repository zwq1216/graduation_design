import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllCommunty, ApplyCommunty, ManageCommunty, MonitCommunty, PushMessage
} from './Community';
import history from '../own/history';
import CommunityDetail from './Detail';
import CommunityIndex from './Index'


class CommunityRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/app/community' component={(match) => {
                            return <CommunityIndex match={match}/>
                        }} />
                        <Route exact path='/app/community/all' component={(match) => {
                            return <AllCommunty match={match}/>
                        }} />
                        <Route exact path='/app/community/detail/:id' component={(match) => {
                            return <CommunityDetail match={match}/>
                        }} />
                        <Route exact path='/app/community/apply' component={(match) => {
                            return <ApplyCommunty match={match}/>
                        }} />
                        <Route exact path='/app/community/manage' component={(match) => {
                            return <ManageCommunty match={match}/>
                        }} />
                        <Route exact path='/app/community/monit' component={(match) => {
                            return <MonitCommunty match={match}/>
                        }} />
                        <Route exact path='/app/community/pushmessage' component={(match) => {
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