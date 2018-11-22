import css from './layout.less';
import { Icon, Badge } from 'antd';

// 1.0 导入connect 从 react-redux包中
import {connect} from 'react-redux'

 class head extends React.Component {
    render() {
        return (<header className={css.headtop + " w"}>
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
                    <Badge count={5}>
                       {/* 加入antd中的购物车图标 */}
                       <Icon type="shopping-cart" className={css.Icon} />
                    </Badge>
                    <a onClick={()=>{this.props.onChangeColor('blue')}}>蓝色</a>
                    <a onClick={()=>{this.props.onChangeColor('red')}}>红色</a>
                    {/* <!-- 未登录 -->*/}
                    <a href="#">登录 </a> <span> |</span> <a href="#"> 注册</a>
                    {/* <!-- 登录 --> */}
                    {/* <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
                    <a href="#" ><img src="/static/img/asset-myImg.jpg" alt="" />18665765432</a> */}
                </div>
            </div>
        </header>)
    }
}

// 2.0 利用connect函数将组件对象包装以后返回
// 2.0.1 注册一个dispatch触发对象到head组件的props中
const mapDispathToProps = (dispatch)=>{
    return {
        onChangeColor:(color)=>{
            // 调用dispatch完成store中的state属性的改变
            dispatch({type:'CHANGE_COLOR',color:color})
        }
    }
}

// connect有两个参数：第一个参数是一个函数，可以将store中的所有的state绑定到当前组件的props中
// 第二个参数也是一个函数，可以将diapsth绑定到当前组件的props中
export default connect(null,mapDispathToProps)(head)