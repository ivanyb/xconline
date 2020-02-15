import { connect } from 'react-redux'
import { Row, Col, Collapse,Pagination ,Spin, Alert } from 'antd'
const Panel = Collapse.Panel
import { withRouter } from 'next/router'

import featchHelper from '../../kits/fetchHelper.js'
import css from './clist.less'
import Head from 'next/head'
import Link from 'next/link'
class clistse extends React.Component {

    static async getInitialProps() {
        let catelist = await featchHelper.get('/nc/course/courseList/getCateList');
        //   console.log(catelist.message)

        return {
            cate_Top_List: catelist.message.cate_Top_List,
            cate_Other_List: catelist.message.cate_Other_List,
            course_types: catelist.message.course_types
        }
    }

    componentWillMount() {
        let cate_top_id = this.props.router.query.lv1;
        let cate_id = this.props.router.query.lv2;
        cate_top_id = cate_top_id ?cate_top_id:-1;
        cate_id = cate_id ?cate_id:-1;
        this.setState({
            cate_top_id:cate_top_id,
            cate_id:cate_id
        })
      
        setTimeout(()=>{
            this.changeLi1('clist1',cate_top_id,null);
            this.changeLi1('clist2',cate_id,null);
            let lv1obj = document.getElementById('lv1'+cate_top_id);
            let lv2obj = document.getElementById('lv2'+cate_id);
            let lv3obj = document.getElementById('lv3-1');
            if(!lv1obj){
                lv1obj = document.getElementById('lv1-1');
            }
            if(!lv2obj){
                lv2obj = document.getElementById('lv2-1');
            }
            lv1obj && lv1obj.setAttribute('class', 'active');
            lv2obj && lv2obj.setAttribute('class', 'active');
            lv3obj && lv3obj.setAttribute('class', 'active');
        },0)

        this.getcourselistByPage(cate_top_id,cate_id);

        this.setState({
            toplist: this.props.pageProps.cate_Top_List,
            otherlist: this.props.pageProps.cate_Other_List,
            ctypes: this.props.pageProps.course_types
        })
    }

    changeLi1(refstring, cid, e) {
       e && e.stopPropagation()
        if (refstring == 'clist1') {
            this.getotherlist(cid);
            this.clearSelect('clist1');           
            this.clearSelect('clist2');   
            this.clearSelect('clist3');
            this.setState({
                cate_top_id:cid
            })
            this.getcourselistByPage(cid,this.state.cate_id,
                this.state.type,this.state.pageIndex,
                this.state.pageSize)
        }else if(refstring == 'clist2'){
            this.clearSelect('clist2');   
            this.clearSelect('clist3');
            this.setState({
                cate_id:cid
            })
            this.getcourselistByPage(this.state.cate_top_id,cid,
                this.state.type,this.state.pageIndex,
                this.state.pageSize)
        }else{
            this.clearSelect('clist3');
            this.setState({
                type:cid
            })
            this.getcourselistByPage(this.state.cate_top_id,this.state.cate_id,
                cid,this.state.pageIndex,
                this.state.pageSize)
        }
        e && e.currentTarget.setAttribute('class', 'active');
    }

    clearSelect(refstring){
        var els = this.refs[refstring].getElementsByTagName('a')//[1].setAttribute('class','')
        //   console.log(els.length)
        for (let i = 0; i < els.length; i++) {
            els[i].setAttribute('class', '')
        }
    }

    // 获取1级分类下的二级分类
    getotherlist(cid) {
        if (cid < 0) {
            this.setState({
                otherlist: this.props.pageProps.cate_Other_List
            })
            return
        }

        var newlist = this.props.pageProps.cate_Other_List.filter(item => item.class_list.indexOf(`,${cid},`) > -1)
        this.setState({
            otherlist: [{
                "id": -1,
                "title": "全部",
                "parent_id": -1,
                "class_layer": -1
            }].concat(newlist) 
        })
    }

    getcourselistByPage(cate_top_id=-1,cate_id=-1,type=-1,pageIndex=1,pageSize=10){
        // console.log(cate_top_id,cate_id)
        this.setState({
            loading:true
        })
        featchHelper.get(`/nc/course/courseList/getCourseList?cate_top_id=${cate_top_id}&cate_id=${cate_id}&type=${type}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
        .then(json=>{
            this.setState({
                clist:json.message,
                pageIndex:json.pageIndex,
                pageSize:json.pageSize,
                tcount:json.totalCount,
                loading:false
            })
        })
    }

    collapsechange(){       
        let cate_id = this.props.router.query.lv2;
        setTimeout(()=>{    
            let lv2obj = document.getElementById('lv2'+cate_id);           
            lv2obj && lv2obj.setAttribute('class', 'active');
        },0)

    }

    changePage(pageNumber){
        this.setState({
            pageIndex: pageNumber
        })
        this.getcourselistByPage(this.state.cate_top_id,this.state.cate_id,
            this.state.type,pageNumber,
            this.state.pageSize)
    }

    state = {
        toplist: null,
        otherlist: null,
        ctypes: null,
        pageIndex:1,
        pageSize:10,
        tcount:0,
        clist:null,
        cate_top_id :-1,
        cate_id :-1,
        type :-1,
        loading:false
    }

    render() {
        return (<div style={{ minHeight: 800 }}>
         <Head>
                <title>学成在线-课程搜索页面</title>
            </Head>
            {/* 搜索分类 */}
            <div className={css.loading}>
                <Spin spinning={this.state.loading}>
                </Spin>
            </div>
            <div className={css.bg}>
                <div className={css.clist}>
                    <Row className={css.row}>
                        <Col className={css.bold} span="2">一级分类：</Col>
                        <Col span="22">
                            <ul ref="clist1">
                                {this.state.toplist&&this.state.toplist.map((item, i) => (
                                    <li><a id={'lv1'+item.id} onClick={e => this.changeLi1('clist1', item.id, e)} className={item.id < 0 ? 'active' : ''}>{item.title}</a></li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <Row className={css.row}>
                        <Col className={css.bold} span="2">二级分类：</Col>
                        <Col span="22">
                            <ul ref="clist2">
                                <Collapse onChange = {()=>{this.collapsechange();}} bordered={false} defaultActiveKey={["0"]} >
                                    <Panel key="0" header={this.state.otherlist&&this.state.otherlist.slice(0, 10).map((item, i) => (
                                        <li><a id={'lv2'+item.id}  onClick={e => this.changeLi1('clist2', item.id, e)} className={item.id < 0 ? 'active' : ''}>{item.title}</a></li>
                                    ))}>
                                        {this.state.otherlist&&this.state.otherlist.slice(10, 10000).map((item, i) => (
                                            <li><a id={'lv2'+item.id} onClick={e => this.changeLi1('clist2', item.id, e)} className={item.id < 0 ? 'active' : ''}>{item.title}</a></li>
                                        ))}
                                    </Panel>

                                </Collapse>
                            </ul>
                        </Col>
                    </Row>
                    <Row className={css.row}>
                        <Col className={css.bold} span="2">难度等级：</Col>
                        <Col span="22">
                            <ul ref="clist3">
                                {this.state.ctypes&&this.state.ctypes.map((item, i) => (
                                    <li><a id={'lv3'+item.tid} onClick={e => this.changeLi1('clist3', item.tid, e)} className={item.tid < 0 ? 'active' : ''}>{item.title}</a></li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <div class="clearfix"></div>
                </div>
                {/* 搜索分类-end */}
                {/* 课程列表-begin */}
                <div className={css.clist}>
               
                <Row>
                    <Col span="19">
                    <Row className={css.page}>
                    <Col span="6" offset="18">
                        <Pagination size="small" pageSize={this.state.pageSize}
                        defaultCurrent={this.state.pageIndex} total={this.state.tcount} 
                        onChange={this.changePage.bind(this)}/>
                    </Col>
                    </Row>
                    <ul>
                        {
                            this.state.clist
                            && this.state.clist.map((item,index)=>(
                                <Link href={'/course/detail?cid='+item.id}>
                                <li className={css.recom_item} key={item.id}>
                                <a href="#">
                                    <p><img src={item.img_url} style={{ height: 102,width:168 }} alt="图片" />
                                        <span className={css.lab}>HOT</span>
                                    </p>
                                    <ul>
                                        <li style={{ height: 36 }}>{item.title}</li>
                                        <li className={css.li2}><span>{item.lesson_level}</span> <em> · </em> {item.click}人在学习</li>
                                    </ul>
                                </a>
                            </li>
                            </Link>
                            ))
                        }                        
                    </ul>
                    </Col>
                    <Col span="5">
                    <Row className={css.page}>
                    <Col span="24">
                        <span className={css.title}>精品TOP榜</span>
                    </Col>
                    </Row>
                   <ul>
                         <li className={css.topitem}>
                            <a href="#">                               
                                <ul>
                                    <li style={{ height: 36 }}>6节课掌握Next.js</li>
                                    <li className={css.li2}><span>高级</span> <em> · </em> 8888人在学习</li>
                                </ul>
                                <p>
                                    随着大数据时代的到来，人们对数据资源的需求越来越多，而爬虫是一种很好的自动采集数据的手段。那么，如何才能精通Python网络爬虫呢？学习Python网络爬虫的路线应该如何进行呢？就让本视频来为你讲述吧
                                </p>
                            </a>                           
                        </li>
                        <li className={css.topitem}>
                            <a href="#">                               
                                <ul>
                                    <li style={{ height: 36 }}>Vue商城项目实战</li>
                                    <li className={css.li2}><span>高级</span> <em> · </em> 8888人在学习</li>
                                </ul>
                                <p>
                                    随着大数据时代的到来，人们对数据资源的需求越来越多，而爬虫是一种很好的自动采集数据的手段。那么，如何才能精通Python网络爬虫呢？学习Python网络爬虫的路线应该如何进行呢？就让本视频来为你讲述吧
                                </p>
                            </a>
                        </li>
                        <li className={css.topitem}>
                            <a href="#">                               
                                <ul>
                                    <li style={{ height: 36 }}>Node.js高级编程</li>
                                    <li className={css.li2}><span>高级</span> <em> · </em> 8888人在学习</li>
                                </ul>
                                <p>
                                    随着大数据时代的到来，人们对数据资源的需求越来越多，而爬虫是一种很好的自动采集数据的手段。那么，如何才能精通Python网络爬虫呢？学习Python网络爬虫的路线应该如何进行呢？就让本视频来为你讲述吧
                                </p>
                            </a>
                        </li>
                        <li className={css.topitem}>
                            <a href="#">                               
                                <ul>
                                    <li style={{ height: 36 }}>SSR服务端渲染</li>
                                    <li className={css.li2}><span>高级</span> <em> · </em> 8888人在学习</li>
                                </ul>
                                <p>
                                    随着大数据时代的到来，人们对数据资源的需求越来越多，而爬虫是一种很好的自动采集数据的手段。那么，如何才能精通Python网络爬虫呢？学习Python网络爬虫的路线应该如何进行呢？就让本视频来为你讲述吧
                                </p>
                            </a>
                        </li>
                        <li className={css.topitem}>
                            <a href="#">                               
                                <ul>
                                    <li style={{ height: 36 }}>Js面向对象</li>
                                    <li className={css.li2}><span>高级</span> <em> · </em> 8888人在学习</li>
                                </ul>
                                <p>
                                    随着大数据时代的到来，人们对数据资源的需求越来越多，而爬虫是一种很好的自动采集数据的手段。那么，如何才能精通Python网络爬虫呢？学习Python网络爬虫的路线应该如何进行呢？就让本视频来为你讲述吧
                                </p>
                            </a>
                        </li>
                        
                   </ul>

                    </Col>
                </Row>
                    
                </div>
                {/* 课程列表-end */}
            </div>


            <style>{`
        .active {
            background-color: #0094ff;
        }
          .ant-collapse > .ant-collapse-item > .ant-collapse-header{
            padding:12px 0 12px 0px;
          }
          .ant-collapse-borderless > .ant-collapse-item{
              border-bottom:none;
          }
       
          .ant-collapse > .ant-collapse-item > .ant-collapse-header i {
            position: absolute !important;
            left:1080px !important;
            top:65% !important ;
            width:10px !important;
          }
          `}</style>
        </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', color: color })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(clistse))