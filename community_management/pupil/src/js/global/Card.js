import React, {Component}from 'react';
import history from '../own/history';
import '../../css/global/card.css';


class CommunityCardA extends Component {
    handleClick(id){
        history.push('/app/community/detail/'+id);
    }
    render(){
        return(
           <div className='com-div1-style' onClick={() => this.handleClick(this.props.id) }>
                <div>
                    <img src={this.props.img} className='com-div1-avatar'/>
                </div>
                <div className='com-div1-p'>
                    <p>{this.props.data}</p>
                    <p>积分：{this.props.score}</p>
                </div>
           </div>
        )
    }
}

class CommunityCardB extends Component {
    handleClick(id){
        history.push('/app/community/detail/'+id);
    }
    render(){
        return(
           <div className='com-div2-style' onClick={() => this.handleClick(this.props.id) }>
                <div>
                    <img src={this.props.img} className='com-div1-avatar'/>
                </div>
                <div className='com-div1-p'>
                    <p>{this.props.data}</p>
                    <p>积分：{this.props.score}</p>
                </div>
           </div>
        )
    }
}
export {CommunityCardA, CommunityCardB};