import React, { Component } from 'react';

import { Layout} from 'antd';
import Nav from './Nav';
import Wheel from './Wheel';
import ContentTheme from './Content';
import Bottom from './Buttom';
import '../../css/App.css';

class Index extends Component {
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


export default Index;