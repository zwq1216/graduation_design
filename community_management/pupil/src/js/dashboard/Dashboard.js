import React from 'react';
import { Row, Col, Card, Icon, Avatar, Divider } from 'antd';
import EchartsProjects from './EchartsProjects';


class Dashboard extends React.Component {
    
    render() {
        const data = this.props.data;
        if(data.files){
        return (
        
            <div className="gutter-example button-demo">
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={true}>
                                <div style={{marginLeft: 80}}>
                                    <Avatar shape="square" size={150} src={data.image} />
                                </div>
                            </Card>
                            <div className="gutter-box">
                                <Card bordered={true} bodyStyle={{marginTop:0}}>
                                    <h2 style={{textAlign: 'center'}}>{data.name}</h2>
                                    <div style={{textAlign: 'center'}}>{data.objective}</div>
                                </Card>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <h3>社团简介</h3>
                                <div className="pb-m">
                                {data.desc}
                                </div>
                                
                                
                            </Card>
                            <Card bordered={false}>
                                <h3>社团导师简历</h3>
                                <div className="pb-m">
                                    <a href={data.files.teacher_file}>下载导师简历</a>
                                </div>
                            </Card>
                            <Card bordered={false}>
                                <h3>社团简章</h3>
                                <div className="pb-m">
                                <a href={data.files.community_file}>下载社团简章</a>
                                </div>
                            </Card>
                            <Card bordered={false}>
                                <h3>社团规章制度</h3>
                                <div className="pb-m">
                                <a href={data.files.community_file_rule}>下载规章制度</a>
                                </div>
                            </Card>
                            <Card bordered={false}>
                                <h3>社团荣誉</h3>
                                <div className="pb-m">
                                    {/* {
                                        data.honor.map(function(val, index, array){
                                            return <p>{val.date} {val.name}</p>
                                        })
                                    } */}
                                    <p>2019.09.01 荣获校竞赛三等奖</p>
                                    <p>2019.09.01 荣获校竞赛三等奖</p>
                                    <p>2019.09.01 荣获校竞赛三等奖</p>
                                    <p>2019.09.01 荣获校竞赛三等奖</p>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>公告栏</h3>
                                </div>
                                <ul style={{listStyleType: 'none', padding: 0}}>
                                    <li>
                                        <h4>鸣人</h4>
                                        <div className="clear">
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                        <Divider style={{marginTop:0}}/>
                                    </li>
                                    <li>
                                        <h4>鸣人1</h4>
                                        <div className="clear">
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                        <Divider style={{marginTop:0}}/>
                                    </li>
                                    <li>
                                        <h4>鸣人2</h4>
                                        <div className="clear">
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                        <Divider style={{marginTop:0}}/>
                                    </li>
                                    <li>
                                        <h4>鸣人3</h4>
                                        <div className="clear">
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                        <Divider style={{marginTop:0}}/>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <h3>最新资料列表</h3>
                                <div className="pb-m">
                                    <p>资料1</p>
                                    <p>资料2</p>
                                    <p>资料3</p>
                                    <p>资料4</p>
                                </div>
                                更多资料
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )}
        else{
            return (
                <div></div>
            )
        }
    }
}

export default Dashboard;