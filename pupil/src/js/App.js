import React, { Component } from 'react';
import { Router, Route, Redirect, Switch} from 'react-router-dom';
import history from 'history/createHashHistory';

import { Layout} from 'antd';
import Nav from './home/Nav';
import Wheel from './home/Wheel';
import ContentTheme from './home/Content';
import Bottom from './home/Buttom';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <Layout className="App">
        <Nav/>
        <Wheel/>
        <ContentTheme/>
        <Bottom/>
      </Layout>
    );
  }
}

const hashHistory = history();

// class App extends Comment {
//   render(){
//     return(
//       <Router history={hashHistory}>
//       <div className="start">
//           <Switch>
//               <Route exact path="/app" component={(match) => {
//                   return <Index match={match}/>
//               }} />
            

//               {/* <Route path='/404' component={NotFoundPage} />
//               <Redirect from='*' to='/404' />  */}
//           </Switch>
//           {/* <Disappear/> */}
//       </div>
//     </Router>
//     )
//   }
// }

export default App;


