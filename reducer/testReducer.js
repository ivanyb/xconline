// 负责存放共享的state和改变这个state中的属性的逻辑
/**
 * state:全局共享的对象，将来可以被所有页面方法到
 * action：通常有两个属性:type:标记是哪种逻辑，具体的业务属性值
 *  {type:'CHANGE_COLOR',color:color}
 *  */
export default function testReducer(state = {color:'red'},action){
    
    // 判断如果是需要修改state中color的值那么则修改，否则返回state
    switch(action.type){
        case 'CHANGE_COLOR':
        return {
            ...state,
            color:action.color
        }
        default:
        return state;
    }
}