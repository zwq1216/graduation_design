import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    PersonInfo, PersonMessage, PersonAudit, PersonEdit, PersonJoinClub, PersonQuitClub, PersonManage
        } from './Person';
import history from '../own/history';
import Local from '../own/Local';

const role = Local.get('role');

class PersonRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="person_nav">
                    <Switch>
                        <Route exact path='/app/person' component={(match) => {
                            return <PersonInfo match={match}/>
                        }} />
                        {/* <Route exact path='/app/person/message' component={(match) => {
                            return <PersonMessage match={match}/>
                        }} /> */}
                        {(role == 2 || role == 3 || role == 4) &&
                            <div>
                                <Route exact path='/app/person/audit' component={(match) => {
                                    return <PersonAudit match={match}/>
                                }} />
                                <Route exact path='/app/person/manage' component={(match) => {
                                    return <PersonManage match={match}/>
                                }} />
                            </div>
                        }
                        <Route exact path='/app/person/edit' component={(match) => {
                            return <PersonEdit match={match}/>
                        }} />
                        <Route exact path='/app/person/join_club' component={(match) => {
                            return <PersonJoinClub match={match}/>
                        }} />
                        <Route exact path='/app/person/quit_club' component={(match) => {
                            return <PersonQuitClub match={match}/>
                        }} />
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default PersonRouter;