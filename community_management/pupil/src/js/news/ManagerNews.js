import React, {Component} from 'react';
import {
    Divider, Button, message, Input, Upload, Icon, Modal, Form
} from 'antd';
import IndexTable from '../global/PTable';
import Table from '../global/Table';
import Fetch from '../own/Fetch'

class All extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/news/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
        render() {
            const columns = [{
              title: '新闻活动名称',
              dataIndex: 'name',
              width: 100,
            }, {
              title: '新闻活动描述',
              width:140,
              dataIndex: 'desc',
              render: (text) => (
                <div>{text.slice(0, 20)}</div>
              )
            },{
              title: '浏览量',
              dataIndex: 'count',
              width: 50,
            },{
              title: '发布者',
              dataIndex: 'user',
              width: 50,
            },
            {
              title: '发布时间',
              dataIndex: 'add_time',
              width: 50,
            }];
            
        const data = this.state.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>全部新闻消息</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <IndexTable rowKey='id' columns={columns} data={data} herf='/app/news/detail/'/>
                </div>
            </div>
        )
    }
}

class Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/news/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
      onClick = (id) => {
        Fetch.delete(`/api/news/delete/${id}/`).then((data) => {
            Fetch.get('/api/news/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
            message.info('删除成功');
        }).catch(err=>{
            Fetch.get('/api/news/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
          console.log(err);
          message.info('删除成功');
        })
     };
    render() {
        const columns = [{
            title: '新闻活动名称',
            dataIndex: 'name',
            width: 100,
        }, {
            title: '新闻活动描述',
            width:140,
            dataIndex: 'desc',
            render: (text) => (
            <div>{text.slice(0, 20)}</div>
            )
        },{
            title: '浏览量',
            dataIndex: 'count',
            width: 50,
        },{
            title: '发布者',
            dataIndex: 'user',
            width: 50,
        },
        {
            title: '发布时间',
            dataIndex: 'add_time',
            width: 50,
        },{
            title: '删除',
            width:70,
            dataIndex: 'id',
            render: (id) => (
                <Button type="primary" onClick={this.onClick.bind(this, id)}>删除</Button>
            )
          }];
            
    const data = this.state.data;
    return(
        <div className='con'>
            <div className='con-top'>
                <div className='con-top-title'>全部新闻消息</div>
            </div>
            <Divider style={{ marginTop:0, marginBottom:0}}/>
            <div className='con-content'>
                <Table rowKey='id' columns={columns} data={data} herf='/app/news/detail/'/>
            </div>
        </div>
    )
    }
}

const { TextArea } = Input;
let length = 0;
class NormalNewsForm extends Component {
    state = {
        data: [],
        confirmDirty: false,
        autoCompleteResult: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
      };

    handleCancel = () => this.setState({ previewVisible: false })
    
    handlePreview = (file) => {
          this.setState({
              previewImage: file.url || file.thumbUrl,
              previewVisible: true,
            });
        }

    //   handlePreview = (file) => {
    //       if(length.length < 5){
    //         length++;
    //         this.setState({
    //             previewImage: file.url || file.thumbUrl,
    //             previewVisible: true,
    //           });
    //       }else{
    //           return false;
    //       }
        
    //   }
    
    handleChange = ({ fileList }) => this.setState({ fileList })
   
    componentDidMount(){
        Fetch.get('/api/discuss/catagroy/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }    
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
            let objs = {
                title: values.title,
                catagory: values.catagory,
                content: values.content
            }
            Fetch.post("/api/discuss/create/",{
                body: JSON.stringify(objs)
            }).then(data=>{
                message.info("成功发布");
            }).catch(err=>{
              message.info("发布失败")
            })
        }
      });
    }
  
  
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
            </div>
        );
      const data = this.state.data;
      const { getFieldDecorator } = this.props.form;
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Item label="新闻活动标题">
                {getFieldDecorator('title', {
                validateFirst: true,
                rules: [
                    {required: true, message: '标题不能为空'},
                    {pattern: '^[^ ]+$', message: '不能输入空格'},
                ]
                })(
                    <Input/>
                )}
                     
            </Form.Item>
            <Form.Item
                label={(
                <span>
                    新闻活动内容
                </span>
                )}
            >
                {getFieldDecorator('content', {
                rules: [{ required: true, message: '新闻活动内容不能为空', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
            
            <Form.Item>
                {getFieldDecorator('catagory', {
                    rules: [
                    { required: true, message: '上传图片' },
                    ],
                })(
                    <div className="clearfix">
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="新闻活动图片" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">发布</Button>
            </Form.Item>
        </Form>
      );
    }
  }
  
const NewsForm = Form.create({ name: 'normalnews' })(NormalNewsForm);

class Pub extends Component {
    
    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>发布新闻消息</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{width: 400}}>
                        <NewsForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export {All, Manage, Pub};

