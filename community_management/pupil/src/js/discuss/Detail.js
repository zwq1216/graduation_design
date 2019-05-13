import React, {Component} from 'react';
import { 
    Comment, Tooltip, List, Avatar, Form, Button, Input, Layout, Divider, message 
} from 'antd';
import moment from 'moment';
import Nav from '../home/Nav';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';
import Local from '../own/Local';


  
const TextArea = Input.TextArea;
const image = Local.get('image');
const username = Local.get('username');
const userid = Local.get('userid');
  
const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
    //   header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
const Editor = ({
    onChange, onSubmit, submitting, value,
  }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          发表评论
        </Button>
      </Form.Item>
    </div>
  );
  
class App extends React.Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
    }
  
    handleSubmit = () => {
      const theme = this.props.id;
      const data = {
          theme: theme,
          content: this.state.value
      }
      if (this.state.value) {
        Fetch.post("/api/discuss/replay/create/",{
          body: JSON.stringify(data)
        }).then(data=>{
          this.setState({
            submitting: true,
            value: '',
            comments: [
              {
                author: username,
                avatar: image,
                content: <p>{this.state.value}</p>,
                datetime: moment().fromNow(),
              },
              ...this.state.comments,
            ],
          });
          message.info('评论成功');
        }).catch(err=>{
          console.log(err)
          message.info('评论失败');
        })
      }
  
      
  
      setTimeout(() => {
        this.setState({
          submitting: false,
        });
      }, 1000);
    }
  
    handleChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    }
  
    render() {
        const { comments, submitting, value } = this.state;
  
        return (
            <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={(
                <Avatar
                    src={image}
                    alt="Han Solo"
                />
                )}
                content={(
                <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                />
                )}
            />
            </div>
        );
    }
}


class DiscussDetail extends Component {
    constructor(props){
      super(props);
      this.state = {
        id: null,
        data: {},
        replay: []
      }
    }
    componentDidMount(){
      const id = this.props.match.match.params.id;
      Fetch.get(`/api/discuss/ret_del/${id}/`)
      .then((data) => {
          this.setState({
            id: id,
            data: data
          })
      }).catch(err=>{
        console.log(err)
      })
      Fetch.get(`/api/discuss/replay/?theme=${id}`)
      .then((data) => {
          this.setState({
            replay: data
          })
      }).catch(err=>{
        console.log(err)
      })
    }
    render(){
        let arrayObj = new Array();
        const id = this.state.id;
        const data1 = this.state.data;
        const data = this.state.replay;
        if (data.length > 0){
          for(var i=0; i<data.length; i++){
            arrayObj.push(
              {
                author: data[i].user.username,
                avatar: data[i].user.image,
                content: (
                  <p>{data[i].content}</p>
                ),
                datetime: (
                  <Tooltip title={moment().subtract(1, 'days').format(data[i].add_time)}>
                    <span>{moment(data[i].add_time, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                  </Tooltip>
                ),
              }
            )
          }
        }
        
      if(JSON.stringify(data1) == '{}'){
        return (
          <div></div>
        )
      }
      else{  
        return (
            <Layout className="App" style={{background: '#ffffff'}}>
                <Nav/>
                <div style={{marginLeft:10, marginTop:10}}> 
                    <Comment
                        author={data1.user.username}
                        avatar={(
                        <Avatar
                            src={data1.user.image}
                            alt={data1.user.username}
                        />
                        )}
                        content={(
                        <p>{data1.content}</p>
                        )}
                        datetime={(
                        <Tooltip title={moment().format(data1.add_time)}>
                            <span>{moment(data1.add_time, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                        </Tooltip>
                        )}
                    />
                </div>
                <Divider style={{marginBottom:0, marginTop:0}}/>
                <div style={{marginLeft:20}}>
                    <List
                        className="comment-list"
                        // header={`${data.length} replies`}
                        itemLayout="horizontal"
                        dataSource={arrayObj}
                        renderItem={item => (
                        <Comment
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                        )}
                    />
                    <App id={id}/>
                </div>
                <Bottom/>
            </Layout>
        );
    }
}
}

export default DiscussDetail;