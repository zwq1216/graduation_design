import React, { Component } from 'react';

import { Layout, Input} from 'antd';
import Nav from '../home/Nav';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';
import Banner from '../home/Banner';


class NewsDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: {}
        }
      }
      componentDidMount(){
        const id = this.props.match.match.params.id;
        Fetch.get(`/api/news/detail/${id}/`)
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
                <Banner data={data.images}/>
                <div>
                  <div>
                    <div style={{fontSize:20, textAlign:'center', marginTop:10}}>{data.name}</div>
                    <div style={{fontSize:13, textAlign:'center', marginTop:5}}>发布者：{data.user}</div>
                  </div>
                  <div style={{fontSize:18, textAlign:'left', marginTop:2}}>
                    {data.desc}
                  </div>
                </div>

                <Bottom/>
            </Layout>
        );
    }
}


export default NewsDetail;