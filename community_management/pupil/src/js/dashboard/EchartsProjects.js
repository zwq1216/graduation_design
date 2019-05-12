import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import Fetch from '../own/Fetch';

class EchartsProjects extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            datas: {
                "deducts": [],
                "date": []
            }
        }
    }
    componentDidMount(){
        Fetch.get(`/api/community/record/create_list/?id=${this.state.id}`)
        .then((data) => {
            this.setState({
              datas: data
            })
        }).catch(err=>{
          console.log(err)
        })
        
    };
    render(){
            let xAxisData = [];
            const data = this.state.datas.deducts;
            const date = this.state.datas.date;
            for (let i = 0; i < 30; i++) {
                xAxisData.push(i);
            }
            const option = {
                title: {
                    text: '最近30次的扣分记录变化',
                    left: 'center',
                    textStyle: {
                        color: '#ccc',
                        fontSize: 10
                    }
                },
                backgroundColor: '#08263a',
                xAxis: [{
                    show: true,
                    data: xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },{
                    show: false,
                    data: xAxisData
                }],
                tooltip: {
                    show: true
                },
                formatter: function (obj) {
                    return obj.seriesName + ':' + obj.data;
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 50,
                    dimension: 0,
                    inRange: {
                        color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#08263f'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                     {
                    name: '扣除积分',
                    type: 'bar',
                    data: data,
                    xAxisIndex: 1,
                    z: 3,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5
                        }
                    }
                }],
                animationEasing: 'elasticOut',
                animationEasingUpdate: 'elasticOut',
                animationDelay: function (idx) {
                    return idx * 20;
                },
                animationDelayUpdate: function (idx) {
                    return idx * 20;
                }
            };
        return(
            <ReactEcharts
            option={option}
            style={{height: '212px', width: '100%'}}
            className={'react_for_echarts'}
        />
        )
    }
}

export default EchartsProjects;