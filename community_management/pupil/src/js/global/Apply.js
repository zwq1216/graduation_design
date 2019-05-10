import React from 'react';
import {
    Form, Select, Button, Input, Upload, Icon, message
  } from 'antd';
import Fetch from '../own/Fetch';
import '../../css/global/apply.css';

const { Option } = Select;
const { TextArea } = Input;
  
class NormalForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filename: ''
        }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            const formData = new FormData();
            formData.append('content', values.content);
            if(values.apply_data != undefined){
              formData.append('apply_data', values.apply_data);
            }
            formData.append('type', 1);

            Fetch.post("/api/users/record/create/",{
                body: formData
            }).then(data=>{
                message.info('申请成功!')
            }).catch(err=>{
              message.info('申请失败!')
              if ('apply_data' in err){
                this.props.form.setFields({
                    apply_data: {
                        errors: [new Error(err.apply_data[0])]
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
                    申请理由
                </span>
                )}
                extra="最多输入500个字符"
            >
                {getFieldDecorator('content', {
                rules: [{ required: true, message: '申请理由不能为空', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
        
          {/* <Form.Item
            label="申请类型"
            hasFeedback
          >
            {getFieldDecorator('type', {
              rules: [
                { required: true, message: '请选择申请类型' },
              ],
            })(
              <Select placeholder="选择申请类型">
                <Option value={0}>申请加入社团</Option>
                <Option value={1}>申请创建社团</Option>
              </Select>
            )}
          </Form.Item> */}
  
          <Form.Item
            label="上传申请材料"
            extra="仅支持上传tar、zip格式的压缩包,大小不能超过50M"
          >
            {getFieldDecorator('apply_data', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
                <Upload {...cprops} accept='.rar,.zip,.tar'>
                    <Button>
                    <Icon type="upload" /> 上传申请材料
                    </Button><span>{this.state.filename}</span>
                </Upload>
            )}
          </Form.Item>
          
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">提交申请</Button>
          </Form.Item>
        </Form>
      );
    }
  }

const ApplyForm = Form.create({ name: 'ApplyForm' })(NormalForm);
  
export default ApplyForm;
