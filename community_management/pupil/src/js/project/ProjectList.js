import React from 'react';
import {
    Form, Button, Input, Upload, Icon, message
  } from 'antd';
import Fetch from '../own/Fetch';
import '../../css/global/apply.css';
import Local from '../own/Local';

const { TextArea } = Input;
const role = Local.get('role');

class NormalForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filename: '',
        }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('remuneration', values.remuneration);
            formData.append('file', values.file);
          
            Fetch.post(`api/projects/create/`,{
                body: formData
            }).then(data=>{
                if (role == 3 || role == 4){
                    message.info('发布成功!')
                }else{
                    message.info('发布成功，待审核!')
                }
            }).catch(err=>{
              message.info('发布失败!')
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
              if ('remuneration' in err){
                this.props.form.setFields({
                    remuneration: {
                        errors: [new Error(err.remuneration[0])]
                      }
                    })
              }
              if ('file' in err){
                this.props.form.setFields({
                    file: {
                        errors: [new Error(err.file[0])]
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
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
                label={(
                    <span>
                        项目名称
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
                    项目描述
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
                label={(
                    <span>
                        酬金
                    </span>
                )}
                >
                {getFieldDecorator('remuneration', {initialValue: '0',
                    rules: [{ required: true, whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
   
           <Form.Item
                label="需求文件"
                extra="仅支持上传docx格式的文档,大小不能超过50M"
            >
            {getFieldDecorator('file', {initialValue: null,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true}],
            })(
                    <Upload {...cprops} accept='.docx'>
                        <Button>
                        <Icon type="upload" /> 上传需求文档
                        </Button><span>{this.state.filename}</span>
                    </Upload>
                )}
           </Form.Item> 
          
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">发布项目</Button>
          </Form.Item>
        </Form>
      );
    }
  }

const EditForm = Form.create()(NormalForm);

export {EditForm};