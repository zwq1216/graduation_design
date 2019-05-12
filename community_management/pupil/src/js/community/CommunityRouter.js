import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllCommunty, ApplyCommunty, ManageCommunty, MonitCommunty, PushMessage, EditCommunty
} from './Community';
import history from '../own/history';
import CommunityDetail from './Detail';
import CommunityIndex from './Index'
import Local from '../own/Local'

const role = Local.get('role');

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
                        { (role == 3 || role == 4) &&
                            <div>
                            <Route exact path='/app/community/manage' component={(match) => {
                                return <ManageCommunty match={match}/>
                            }} />
                            <Route exact path='/app/community/edit/:id' component={(match) => {
                                return <EditCommunty match={match}/>
                            }} />
                            <Route exact path='/app/community/monit' component={(match) => {
                                return <MonitCommunty match={match}/>
                            }} />
                            <Route exact path='/app/community/pushmessage' component={(match) => {
                                return <PushMessage match={match}/>
                            }} />
                            </div>
                        }
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default CommunityRouter;