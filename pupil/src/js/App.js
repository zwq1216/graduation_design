import React, { Component } from 'react';
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

export default App;

