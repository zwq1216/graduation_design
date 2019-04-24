import React, {Component} from 'react';
import { Table } from 'antd';
import history from '../own/history';

import '../../css/global/table.css';

class IndexTable extends Component {
    render(){
        return (
            <Table 
            onRow={(record) => {
                return {
                    onClick: (event) => {
                       
                        if(this.props.herf){
                            history.push(this.props.herf+record.id);
                        }
                        
                    }      
                };
            }} 
            columns={this.props.columns} dataSource={this.props.data} pagination={true} />
        )
    }
}

export default IndexTable;