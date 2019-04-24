import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import Nav from '../home/Nav';
import Wheel from '../home/Wheel';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;



class DataIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
          models: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/data/')
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
        <Wheel/>
        <div>
        <div style={{width:300, marginTop:10, marginLeft:20, float: "left"}}>
        <Search
          placeholder="社团名称"
          // onSearch={value => console.log(value)}
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
          <Button type="primary" href='#/data/all/'>我的资料</Button>
        </div>
        </div>
        <div className='body'>
                {
                    model.map(function(val, index, array){
                        return <CommunityCard
                        key={"key" + index}
                        data={val.name}
                        img={val.image}
                        />
                    })
                }
        </div>
        <Bottom/>
      </Layout>
    );
  }
}


export default DataIndex;