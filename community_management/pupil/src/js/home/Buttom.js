import React, {Component}from 'react';
import {Layout} from 'antd';

import '../../css/home/footer.css';

const {Footer} = Layout;

class Buttom extends Component {
    render(){
        return(
            <Layout>
                <Footer className='footer'>
                    <div style={{textAlign: 'center'}}>
                        2019@高校社团管理系统<br/>
                        2019@南阳理工学院<br/>
                        2019@软件学院<br/>
                        2019@毕业设计<br/>
                        2019@张卫强<br/>
                    </div>
                </Footer>
            </Layout>
        )
    }
}

export default Buttom;