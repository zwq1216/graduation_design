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
            {getFieldDecorator('community_type', {
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

  
class CForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filename: '',
            filename1: '',
            filename2: '',
            filename3: '',
            data: []
        }
    }
  componentDidMount(){
      Fetch.get(`/api/users/college/`)
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
            formData.append('no', values.no);
            formData.append('name', values.name);
            formData.append('objective', values.objective);
            formData.append('desc', values.desc);
            formData.append('college', values.college);
            formData.append('plan_count', values.plan_count);
            formData.append('community_type', values.community_type);
            formData.append('image', values.image);
            formData.append('community_file', values.community_file);
            formData.append('teacher_file', values.teacher_file);
            formData.append('community_file_rule', values.community_file_rule);

            Fetch.post("/api/community/create/",{
                body: formData
            }).then(data=>{
                message.info('创建成功!')
            }).catch(err=>{
              message.info('创建失败!')
              if ('community_file_rule' in err){
                this.props.form.setFields({
                  community_file_rule: {
                        errors: [new Error(err.community_file_rule[0])]
                      }
                    })
              }
              if ('teacher_file' in err){
                this.props.form.setFields({
                  teacher_file: {
                        errors: [new Error(err.teacher_file[0])]
                      }
                    })
              }
              if ('community_file' in err){
                this.props.form.setFields({
                  community_file: {
                        errors: [new Error(err.community_file[0])]
                      }
                    })
              }
              if ('image' in err){
                this.props.form.setFields({
                  image: {
                        errors: [new Error(err.image[0])]
                      }
                    })
              }
              if ('community_type' in err){
                this.props.form.setFields({
                  community_type: {
                        errors: [new Error(err.community_type[0])]
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
              if ('college' in err){
                this.props.form.setFields({
                  college: {
                        errors: [new Error(err.college[0])]
                      }
                    })
              }
              if ('plan_count' in err){
                this.props.form.setFields({
                  plan_count: {
                        errors: [new Error(err.plan_count[0])]
                      }
                    })
              }
              if ('objective' in err){
                this.props.form.setFields({
                  objective: {
                        errors: [new Error(err.objective[0])]
                      }
                    })
              }
              if ('name' in err){
                this.props.form.setFields({
                    name: {
                        errors: [new Error(err.name[0])]
                      }
                    })
              }
              if ('no' in err){
                this.props.form.setFields({
                    no: {
                        errors: [new Error(err.no[0])]
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
    normFile1 = (e) => {
        this.setState({
            filename1: e.file.name
        })
        if (Array.isArray(e)) {
          return e;
        }
       
        return e.file;
        // return e && e.fileList;
      }
      normFile2 = (e) => {
        this.setState({
            filename2: e.file.name
        })
        if (Array.isArray(e)) {
          return e;
        }
       
        return e.file;
        // return e && e.fileList;
      }
      normFile3 = (e) => {
        this.setState({
            filename3: e.file.name
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
                        社团编号
                    </span>
                )}
                >
                {getFieldDecorator('no', {
                    rules: [{ required: true, message: '社团编号不能为空', whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label={(
                    <span>
                        社团名称
                    </span>
                )}
                >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '社团名称不能为空', whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label={(
                    <span>
                        社团宗旨
                    </span>
                )}
                >
                {getFieldDecorator('objective', {
                    rules: [{ required: true, message: '社团宗旨不能为空', whitespace: true }],
                })(
                    <Input />
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
            label="选择学院"
            hasFeedback
            >
              {getFieldDecorator('college', {
                rules: [
                  { required: true, message: '请选择学院' },
                ],
              })(
                <Select placeholder="选择学院">
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
            label="社团分类"
            hasFeedback
            >
              {getFieldDecorator('community_type', {
                rules: [
                  { required: true, message: '请选择分类'},
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
            <Form.Item
                label={(
                <span>
                    社团描述
                </span>
                )}
                extra="最多输入500个字符"
            >
                {getFieldDecorator('desc', {
                rules: [{ required: false, whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
           </Form.Item>
           <Form.Item
            label="社团头像"
            extra="仅支持上传png、jpg、jpeg格式的文档,大小不能超过10M"
          >
            {getFieldDecorator('image', {rules: [
                  { required: true, message: '请上传社团头像'},
                ],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
                <Upload {...cprops} accept='.png,.jpg, .jpeg'>
                    <Button>
                    <Icon type="upload" /> 上传社团头像
                    </Button><span>{this.state.filename}</span>
                </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="导师简历"
            extra="仅支持上传docx格式的文档,大小不能超过20M"
          >
            {getFieldDecorator('teacher_file', {rules: [
                  { required: true, message: '请上传导师简历'},
                ],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile1,
          })(
                <Upload {...cprops} accept='.docx'>
                    <Button>
                    <Icon type="upload" /> 上传导师简历
                    </Button><span>{this.state.filename1}</span>
                </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="社团简章"
            extra="仅支持上传docx格式的文档,大小不能超过20M"
          >
            {getFieldDecorator('community_file', {rules: [
                  { required: true, message: '请上传社团简章'},
                ],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile2,
          })(
                <Upload {...cprops} accept='.docx'>
                    <Button>
                    <Icon type="upload" /> 上传社团简章
                    </Button><span>{this.state.filename2}</span>
                </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="社团规章制度"
            extra="仅支持上传docx格式的文档,大小不能超过20M"
          >
            {getFieldDecorator('community_file_rule', {rules: [
                  { required: true, message: '请上传社团规章制度'},
                ],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile3,
          })(
                <Upload {...cprops} accept='.docx'>
                    <Button>
                    <Icon type="upload" /> 上传社团规章制度
                    </Button><span>{this.state.filename3}</span>
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

const CreateForm = Form.create({ name: 'CreateForm' })(CForm);
  
export {EditForm, MonitForm, CreateForm};
