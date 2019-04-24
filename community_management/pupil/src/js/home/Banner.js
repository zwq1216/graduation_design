import React, {Component}from 'react';
import {Layout, Carousel} from 'antd';

import '../../css/home/wheel.css';

const {Content} = Layout;

class Wheel extends Component {

    render(){
        const data = this.props.data;

        return(
            <Layout>
                <Content className='wheel'>
                    <Carousel effect="fade" autoplay={true}>
                    {
                        (data || []).map((d) => {
                            return <div><img src={d.file}/></div>
                        })
                    }
                    </Carousel>

                </Content>
            </Layout>
        )
    }
}

export default Wheel;