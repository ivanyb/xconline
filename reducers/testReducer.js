<<<<<<< HEAD
// reducer本质上是一个函数，此函数接收两个参数
/**
 *   参数1：state ：全局的对象，将来可以被store中的dispatch修改，同时会触发依赖于此对象
 * 中的属性的组件中的内容的相关业务改变
 *    参数2：action：当store的dispatch被调用的时候，会传入此action，来告诉store应该做什么操作
 *  */

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
=======
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
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
