import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllNews, PubNews, ManagerNews
} from './News';
import history from '../own/history';


class NewsRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/news' component={(match) => {
                            return <AllNews match={match}/>
                        }} />
                        <Route exact path='/news/pub' component={(match) => {
                            return <PubNews match={match}/>
                        }} />
                        <Route exact path='/news/manager' component={(match) => {
                            return <ManagerNews match={match}/>
                        }} />
                    </Switch>
                    {/* <Disappear/> */}
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default NewsRouter;