import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import {
    AllNews, PubNews, ManagerNews
} from './News';
import NewsIndex from './Index';
import history from '../own/history';
import NewsDetail from './detail';


class NewsRouter extends Component {

    render() {
        return (
            <React.Fragment>
            <Router history={history}>
                <div className="community_nav">
                    <Switch>
                        <Route exact path='/app/news' component={(match) => {
                            return <NewsIndex match={match}/>
                        }} />
                        <Route path='/app/news/all' component={(match) => {
                            return <AllNews match={match}/>
                        }} />
                        <Route path='/app/news/detail/:id' component={(match) => {
                            return <NewsDetail match={match}/>
                        }} />
                        <Route path='/app/news/pub' component={(match) => {
                            return <PubNews match={match}/>
                        }} />
                        <Route path='/app/news/manager' component={(match) => {
                            return <ManagerNews match={match}/>
                        }} />
                    </Switch>
                </div>
            </Router>
            </React.Fragment>
        );
    }
  }

export default NewsRouter;