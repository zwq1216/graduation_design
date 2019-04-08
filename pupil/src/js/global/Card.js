import React, {Component}from 'react';

import '../../css/global/card.css';


class CommunityCard extends Component {
    render(){
        return(
           <div className='com-div1-style'>
                <div>
                    <img src={this.props.img} className='com-div1-avatar'/>
                </div>
                <div className='com-div1-p'>
                    <p>{this.props.data}</p>
                    <p>积分：89</p>
                </div>
           </div>
        )
    }
}

export default CommunityCard;