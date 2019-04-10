import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    PersonInfo, PersonMessage, PersonAudit, PersonEdit, PersonJoinClub, PersonQuitClub, PersonManage
        } from './Person';
import history from '../global/history';


class PersonRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="person_nav">
                    <Switch>
                        <Route exact path='/person' component={(match) => {
                            return <PersonInfo match={match}/>
                        }} />
                        <Route exact path='/person/message' component={(match) => {
                            return <PersonMessage match={match}/>
                        }} />
                        <Route exact path='/person/audit' component={(match) => {
                            return <PersonAudit match={match}/>
                        }} />
                        <Route exact path='/person/edit' component={(match) => {
                            return <PersonEdit match={match}/>
                        }} />
                        <Route exact path='/person/join_club' component={(match) => {
                            return <PersonJoinClub match={match}/>
                        }} />
                        <Route exact path='/person/quit_club' component={(match) => {
                            return <PersonQuitClub match={match}/>
                        }} />
                        <Route exact path='/person/manage' component={(match) => {
                            return <PersonManage match={match}/>
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