import React, {Component} from 'react';
import {
    Upload, message, Button, Icon,
  } from 'antd';
  
  const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: 'input',
    showUploadList: false,
  };
  
  class AvastarUpload extends Component {
      render(){
          return(
            <Upload {...props}>
                <Button>
                <Icon type="upload" /> 修改头像
                </Button>
            </Upload>
          )
      }
  }

export default AvastarUpload;