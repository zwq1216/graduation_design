import React, {Component} from 'react';
import { Table } from 'antd';

import '../../css/global/table.css';

class IndexTable extends Component {
    render(){
        return (
            <Table columns={this.props.columns} dataSource={this.props.data} pagination={false} />
        )
    }
}

export default IndexTable;