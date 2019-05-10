import React from 'react';
import {
    Form, Button, Input, Upload, Icon, message, Select
  } from 'antd';
import Fetch from '../own/Fetch';
import '../../css/global/apply.css';
import Local from '../own/Local';

const { TextArea } = Input;
const { Option } = Select;
const role = Local.get('role');

class NormalForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filename: '',
            data: []
        }
    }
    componentDidMount(){
        Fetch.get('/api/data/category/create_list/')
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
      this.props.form.validateFields((err, values) => {
        if (!err) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('type', values.type);
            formData.append('disclosure', values.disclosure);
            formData.append('package', values.package);
          
            Fetch.post(`/api/data/create/`,{
                body: formData
            }).then(data=>{
                if (role == 3 || role == 4){
                    message.info('分享成功!')
                }else if(values.type == 1){
                    message.info('分享成功!')
                }else{
                    message.info('发布成功，待审核!')
                }
            }).catch(err=>{
              message.info('分享失败!')
              if ('name' in err){
                this.props.form.setFields({
                    name: {
                        errors: [new Error(err.name[0])]
                      }
                    })
              }
              if ('desc' in err){
                this.props.form.setFields({
                    desc: {
                        errors: [new Error(err.desc[0])]
                      }
                    })
              }
              if ('type' in err){
                this.props.form.setFields({
                    type: {
                        errors: [new Error(err.type[0])]
                      }
                    })
              }
              if ('disclosure' in err){
                this.props.form.setFields({
                    disclosure: {
                        errors: [new Error(err.disclosure[0])]
                      }
                    })
              }
              if ('package' in err){
                this.props.form.setFields({
                    package: {
                        errors: [new Error(err.package[0])]
                      }
                    })
              }
        
            })
        }
      });
    }
    normFile = (e) => {
        this.setState({
            filename: e.file.name
        })
        if (Array.isArray(e)) {
          return e;
        }
       
        return e.file;
        // return e && e.fileList;
      }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const cprops = {
        beforeUpload(file, fileList){
            return false
        },
        showUploadList: false,
      };
      const data = this.state.data;
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
                label={(
                    <span>
                        资料名称
                    </span>
                )}
                >
                {getFieldDecorator('name', {initialValue: '',
                    rules: [{ required: true, whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label={(
                <span>
                    资料描述
                </span>
                )}
                extra="最多输入500个字符"
            >
                {getFieldDecorator('desc', {initialValue: '',
                rules: [{ required: true, whitespace: true }],
                })(
                <TextArea rows={3} />
                )}
            </Form.Item>
            <Form.Item
                label="资料分类"
                hasFeedback
            >
                {getFieldDecorator('type', {
                rules: [
                    { required: true },
                ],
                })(
                <Select placeholder="选择资料分类">
                    {
                         data.map(function(val, index, array){
                            return <Option value={val.id}>{val.name}</Option>
                        })
                    }

                </Select>
                )}
          </Form.Item>
          <Form.Item
            label="公开度"
            hasFeedback
            >
                {getFieldDecorator('disclosure', {
                rules: [
                    { required: true },
                ],
                })(
                <Select placeholder="选择公开度">
                    <Option value={0}>所有人可见</Option>
                    <Option value={1}>仅所在社团人员可见</Option>
                </Select>
                )}
          </Form.Item>
   
           <Form.Item
                label="资料包"
                extra="仅支持上传tar、zip格式的压缩包,大小不能超过50M"
            >
            {getFieldDecorator('package', {initialValue: null,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true}],
            })(
                    <Upload {...cprops} accept='.tar,.zip'>
                        <Button>
                        <Icon type="upload" /> 上传资料包
                        </Button><span>{this.state.filename}</span>
                    </Upload>
                )}
           </Form.Item> 
          
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">分享资料</Button>
          </Form.Item>
        </Form>
      );
    }
  }

const EditForm = Form.create()(NormalForm);

export {EditForm};