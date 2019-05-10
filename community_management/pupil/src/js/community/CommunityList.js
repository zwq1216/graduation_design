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
            filename: '',
        }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            const formData = new FormData();
            formData.append('objective', values.objective);
            formData.append('desc', values.desc);
            formData.append('plan_count', values.plan_count);
            formData.append('score', values.score);
            if(values.community_type === undefined){
                formData.append('community_type', null);
            }else{
                formData.append('community_type', values.community_type);
            }
            formData.append('image', values.image);
          
            

            Fetch.put(`/api/community/update/${this.props.data.id}/`,{
                body: formData
            }).then(data=>{
                message.info('更新成功!')
            }).catch(err=>{
              message.info('更新失败!')
            //   if ('apply_data' in err){
            //     this.props.form.setFields({
            //         apply_data: {
            //             errors: [new Error(err.apply_data[0])]
            //           }
            //         })
            //   }
        
            })
        }
      });
    }
    // normFile = (e) => {
    //     this.setState({
    //         filename: e.file.name
    //     })
    //     if (Array.isArray(e)) {
    //       return e;
    //     }
       
    //     return e.file;
    //     // return e && e.fileList;
    //   }
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
                    社团宗旨
                </span>
                )}
                extra="最多输入200个字符"
            >
                {getFieldDecorator('objective', {initialValue:'',
                rules: [{ required: false, whitespace: true }],
                })(
                <TextArea rows={2} value='xsaf'/>
                )}
            </Form.Item>

            <Form.Item
                label={(
                <span>
                    社团描述
                </span>
                )}
                extra="最多输入500个字符"
            >
                {getFieldDecorator('desc', {initialValue: '',
                rules: [{ required: false, whitespace: true }],
                })(
                <TextArea rows={3} />
                )}
            </Form.Item>

            <Form.Item
                label={(
                    <span>
                        计划人数
                    </span>
                )}
                >
                {getFieldDecorator('plan_count', {initialValue: '0',
                    rules: [{ required: false, whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label={(
                    <span>
                        社团积分
                    </span>
                )}
                >
                {getFieldDecorator('score', {initialValue: '0',
                    rules: [{ required: false, whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
            label="社团分类"
            hasFeedback
          >
            {getFieldDecorator('community_type', {initialValue: 0,
              rules: [
                { required: false },
              ],
            })(
              <Select placeholder="选择社团类型">
                <Option value={1}>学习类</Option>
                <Option value={2}>语言类</Option>
                <Option value={3}>艺术类</Option>
                <Option value={4}>户外类</Option>
                <Option value={5}>体育类</Option>
                <Option value={6}>其他</Option>
              </Select>
            )}
          </Form.Item>
{/*   
          <Form.Item
            label="社团头像"
            extra="仅支持上传png、jpg、jpeg格式的图片,大小不能超过10M"
          >
            {getFieldDecorator('image', {initialValue: null,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
                <Upload {...cprops} accept='.png,.jpg,.jpeg'>
                    <Button>
                    <Icon type="upload" /> 上传图片
                    </Button><span>{this.state.filename}</span>
                </Upload>
            )}
          </Form.Item> */}
          
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">更新信息</Button>
          </Form.Item>
        </Form>
      );
    }
  }

const EditForm = Form.create()(NormalForm);

class MForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        Fetch.get(`/api/community/`)
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
          let objs = {
              desc: values.desc,
              deduct: values.deduct,
              community: values.community
          }
        if (!err) {
            Fetch.post("/api/community/record/create_list/",{
                body: JSON.stringify(objs)
            }).then(data=>{
                message.info("扣分成功!");
            }).catch(err=>{
              console.log(err)
                if ('deduct' in err){
                    this.props.form.setFields({
                        deduct: {
                            errors: [new Error(err.deduct[0])]
                        }
                    })
                }
              message.info("发布失败")
            })
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const data = this.state.data;
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
                label={(
                <span>
                    扣分原因
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
                        扣除的分数
                    </span>
                )}
                >
                {getFieldDecorator('deduct', {initialValue: '0',
                    rules: [{ required: true, whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="扣除积分的社团"
                >
                {getFieldDecorator('community', {
                    rules: [
                        { required: true, message: '请选择扣分的社团'},
                    ],
                })(
                    <Select placeholder="选择社团" size='small'>
                     {
                        data.map(function(val, index, array){
                            return <Option 
                            key={index} 
                            value={val.id}
                            >{val.name}</Option>
                        })
                     }
                    </Select>
                )}
            </Form.Item>
          
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">扣除积分</Button>
          </Form.Item>
        </Form>
      );
    }
  }

const MonitForm = Form.create()(MForm);
  
export {EditForm, MonitForm};
