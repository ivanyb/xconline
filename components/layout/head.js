import css from './layout.less';
import { Icon, Badge } from 'antd';

// 导入connect函数
import {connect} from 'react-redux'

 class head extends React.Component {
    render() {
        return <header className={css.headtop + " w"}>
            <a href="" className="fl"><img src="/static/img/asset-logoIco.png" alt="" /></a>
            <div className={css.left + " fl"}>
                <a className={css.a} href="">首页</a>
                <a className={css.a} href="">课程</a>
                <a className={css.a} href="">职业规划</a>
            </div>
            <div className={css.input + " fl"}>
                <input type="text" className="fl" placeholder="输入查询关键字" />
                <button className="fr">搜索</button>
            </div>
            <div className={css.right + " fr"}>
                <div class={css.signin}>
                <a onClick={()=>{this.props.onChangeColor('blue')}}>蓝色</a> 
                <a onClick={()=>{this.props.onChangeColor('red')}}>红色</a>
                    <Badge count={5}>
                       {/* 加入antd中的购物车图标 */}
                       <Icon type="shopping-cart" className={css.Icon} />
                    </Badge>
                    {/* <!-- 未登录 -->*/}
                    <a href="#">登录 </a> <span> |</span> <a href="#"> 注册</a>
                    {/* <!-- 登录 --> */}
                    {/* <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                    <a href="#" ><img src="/static/img/asset-myImg.jpg" alt="" />18665765432</a> */}
                </div>
            </div>
        </header>

    }
}

const mapState = (state)=>{
    return {
        ...state
    }
}

// 此方法可以传入一个dispatch,可以利用dispatch完成testReducer中的color属性改变逻辑的调用
const mapDispath = (dispatch)=>{
    return {
        onChangeColor:(color)=>{
            // 利用dispatch触发testReducer中的方法的调用
            dispatch({type:'CHANGE_COLOR',color:color})
        }
    }
}

export default connect(mapState,mapDispath)(head)