import React, {Component}from 'react';
import {Layout, Carousel} from 'antd';

import '../../css/home/wheel.css';
import image1 from '../../test/images/1.png';
import image2 from '../../test/images/2.png';
import image3 from '../../test/images/3.png';
import image4 from '../../test/images/4.png';
import image5 from '../../test/images/5.png';

const {Content} = Layout;

class Wheel extends Component {
    render(){
        return(
            <Layout>
                <Content className='wheel'>
                    <Carousel effect="fade" autoplay={true}>
                        <div><img src={image1}/></div>
                        <div><img src={image2}/></div>
                        <div><img src={image3}/></div>
                        <div><img src={image4}/></div>
                        <div><img src={image5}/></div>
                    </Carousel>
                </Content>
            </Layout>
        )
    }
}

export default Wheel;