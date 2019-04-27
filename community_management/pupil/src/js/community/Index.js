import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import {CommunityCardB} from '../global/Card';
import Nav from '../home/Nav';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;



class CommunityIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      models: []
    }
  }
  
  componentDidMount(){
    Fetch.get('/api/community/')
    .then((data) => {
        this.setState({
          models: data
        })
    }).catch(err=>{
      console.log(err)
    })
  }
  
  render(){
      const model = this.state.models;
    return (
      <Layout className="App">
        <Nav/>
        <div>
        <div style={{width:300, marginTop:10, marginLeft:20, float: "left"}}>
        <Search
          placeholder="社团名称"
          onSearch={value => {
            Fetch.get('/api/data/?name='+value)
            .then((data) => {
                this.setState({
                  data: data
                })
            }).catch(err=>{
              console.log(err)
            })
          }}
          enterButton
        />
        </div>
        <div style={{marginTop:10, marginRight:10, float:"right"}}>
          <Button type="primary" href='#/app/data/all/'>我的社团</Button>
        </div>
        </div>
        <div>
                {
                    model.map(function(val, index, array){
                        return <CommunityCardB
                        key={val.id}
                        id={val.id}
                        data={val.name}
                        img={val.image}
                        score={val.score}
                        />
                    })
                }
        </div>
        <Bottom/>
      </Layout>
    );
  }
}


export default CommunityIndex;