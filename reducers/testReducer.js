// reducer本质上是一个函数，接收一个state和actin
// state:全局的数据对象，可以被所有组件访问到
// action：改变state中的某些属性值
// action格式：{type:'CHANGE_COLOR',color:'点击按钮的时候传入真正的颜色值'}
export default function testReducer(state={color:'red'},action){
    switch(action.type){
        case 'CHANGE_COLOR':
        return {
            color:action.color
        }
        default:
        return state
    }
}