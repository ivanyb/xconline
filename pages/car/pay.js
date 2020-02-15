
import { connect } from 'react-redux'
import css from './pay.less'
import QRCode from 'qrcode.react'
import fetchHelper from '../../kits/fetchHelper.js'
import { message } from 'antd'
import Router from 'next/router'
import { withRouter } from 'next/router'

let intervalHander = null

class pay extends React.Component {

    state = {
        payUrl: 'http://www.itheima.com'
    }

    getWXPayUrl() {
        let orderid = this.props.orderReducer.state.order_id
        let orderno = this.props.orderReducer.state.order_no
        let amount = this.props.orderReducer.state.amount

        // console.log(orderid, orderno, amount)

        fetchHelper.post('/ch/shop/wxpay', { order_id: orderid, out_trade_no: orderno, nonce_str: amount })
            .then(json => {
                if (json.status == 1) {
                    message.error(json.message, 1)
                    return
                }

                // 成功就要将json.message.code_url值赋值给this.state中的payUrl
                this.setState({
                    payUrl: json.message.code_url
                })

                // 删除购物车中已经下单的课程数据
                this.delcourses();

                // 开启定时器轮询支付状态接口
                intervalHander = setInterval(() => {
                    fetchHelper.post('/ch/shop/checkpay', { order_id: orderid, out_trade_no: orderno, nonce_str: amount })
                        .then(json => {
                            if (json.status == 0 && json.message.trade_state == 'SUCCESS') {
                                // 提示用户支付完成，并且跳转到我的订单页面
                                message.success(json.message.statusTxt, 1, () => {
                                    // 清除定时器
                                    if (intervalHander) {
                                        clearInterval(intervalHander)
                                    }
                                    Router.push({ pathname: '/mycenter/myorders' })
                                })
                            }
                        })
                }, 3000);
            })
    }

    // 删除购物车中已经下单的课程数据
    delcourses() {
        if (this.props.selectedReducer && this.props.selectedReducer.state) {
            // 获取购物车课程总数量
            // console.log(this.props.shopCarCountReducer)
            let shopCount = this.props.shopCarCountReducer.count;

            this.props.selectedReducer.state.map(item => {
                fetchHelper.get('/ch/shop/deleteshopcar/' + item.shop_car_id)
                    .then(json => {
                        if (json.status == 0) {
                            shopCount -= 1;
                            if(shopCount <0){
                                shopCount = 0;
                            }

                            this.props.onChangeShopCarCount(shopCount);
                        }
                    })
            });
        }
    }

    componentWillMount() {
        let orderid = this.props.router.query.orderid;
        if(orderid){
            // 从我的订单页面中点击支付而来（会在url后面传入参数 ?orderid=xxx）
            this.getorder(orderid);
        }else{
        // 从购物车下单而来，不带有orderid参数，数据从redux中获取，调用支付url获取连接接口
        this.getWXPayUrl()
        }
    }

    getorder(orderid){
         // 1.0 定义一个url
         let url = `/ch/mycenter/getMyOrderListByPage/-1?pageIndex=1&pageSize=100`
         // 2.0 发出fetch
         fetchHelper.get(url)
             .then(json => {
                 // 3.0 判断是否有登录
                 if (json.status == 2) {
                     message.warn('您未登录', 1, () => {
                         Router.push({ pathname: '/account/login' })
                     })
                     return
                 }
 
                 // 3.0.1 如果报错则提示
                 if (json.status == 1) {
                     message.error(json.message, 1, () => {
                         Router.push({ pathname: '/account/login' })
                     })
                     return
                 }
 
                 // 3.0.2 如果处理成功则将数据赋值给state.orderlist
                //  console.log(json.message)
                let orderInfo= json.message.orderList.filter(item=>item.id == orderid);
                
                 if(!orderInfo || orderInfo.length<=0){
                    message.error('订单数据异常，请重新勾选到购物车下单');
                    return;
                 }

                 if(!orderInfo[0].order_goods_list || orderInfo[0].order_goods_list.length<=0){
                    message.error('订单数据异常，请重新勾选到购物车下单');
                    return;
                }

                // 设置redux数据
                let remark = '';
              
                orderInfo[0].order_goods_list.map(goods=>{
                    remark += goods.goods_title + '&nbsp;&nbsp; 原价：￥'+goods.goods_market_price + '<br /> ';
                })
                let reduxOrder = {
                    order_id:orderInfo[0].id,
                    order_no:orderInfo[0].order_no,
                    amount:orderInfo[0].payable_amount,
                    remark:remark
                };
                this.props.onSetOrderInfo(reduxOrder);
 
             })
    }

    // 离开页面之前清除定时器
    componentWillUnmount() {
        if (intervalHander) {
            clearInterval(intervalHander)
        }
    }

    render() {

        return (<div style={{ minHeight: 800 }}>
            {/* 订单信息 */}
            <div className={css.CashierBodyTop}>
                <div className={css.CashierLeft}>
                    <p className={css.cashierTitle}>产品名称：
                    <span id="bookName" dangerouslySetInnerHTML={{ __html: this.props.orderReducer.state.remark }}>

                        </span></p>
                    <p>业务订单：<span>{this.props.orderReducer.state.order_no}</span></p>
                </div>
                <div className={css.CashierRight}>
                    <p className={css.org}>应付金额：<span>￥{this.props.orderReducer.state.amount}</span></p>

                </div>
            </div>
            {/* 订单信息 -end */}
            {/* 扫码支付 */}
            <div className={css.CashierBodyTop}>
                <span style={{ fontSize: 20 }}>
                    <h4>请使用手机微信扫码下面支付二维码完成支付：{this.state.payUrl ? this.state.payUrl : 'http://itheima.com'}</h4>
                    <QRCode value={this.state.payUrl ? this.state.payUrl : 'http://itheima.com'} bgColor='yellowgreen' />
                </span>
                <div>
                </div>
            </div>
            {/* 扫码支付 */}

        </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        ...state
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        // 定义一个方法，count就是当前用户购买的总商品数量
        onChangeShopCarCount: (count) => {
            dispatch({ type: 'CHANGE_SHOP_CAR_COUNT', count: count })
        },
        onSetOrderInfo:(orderinfo)=>{
            dispatch({type:'SET_ORDER',orderinfo:orderinfo})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(pay))