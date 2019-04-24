import React, { Component } from 'react';

import { Layout, Input} from 'antd';
import Nav from '../home/Nav';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';
import Dashboard from '../dashboard/Dashboard';


class CommunityDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: {}
        }
      }
      componentDidMount(){
        const id = this.props.match.match.params.id;
        Fetch.get('/api/news/detail/'+id)
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
     
  
      render(){
        const data = this.state.data;
        return (
            <Layout className="App">
                <Nav/>
                <Dashboard/>
                <Bottom/>
            </Layout>
        );
    }
}


export default CommunityDetail;