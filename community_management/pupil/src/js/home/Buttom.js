import React, {Component}from 'react';
import {Layout} from 'antd';

import '../../css/home/footer.css';

const {Footer} = Layout;

class Buttom extends Component {
    render(){
        return(
            <Layout>
                <Footer className='footer'>
                    {/* 这是内容部分 */}
                </Footer>
            </Layout>
        )
    }
}

export default Buttom;