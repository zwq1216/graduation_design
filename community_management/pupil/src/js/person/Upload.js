import React, {Component} from 'react';
import {
    Upload, message, Button, Icon,
  } from 'antd';
import Local from '../own/Local';
import Fetch from '../own/Fetch';

const userid = Local.get('userid');
  
  const props = {
    name: 'file',
    action: `/api/users/avastar/${userid}/`,
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
    customRequest(file){
      const formData = new FormData();
      formData.append('image', file.file);
      Fetch.put(`/api/users/avastar/${userid}/`,{
        body: formData
      }).then((data) => {
         Local.set("image", data.image);
         message.info('修改成功!')
      }).catch(err=>{
        message.info('修改失败!')
        console.log(err)
      })
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