
/**
 * createStore:用于初始化Store的函数，将来交给 next-redux-warpper的withRedux使用
 * combineReducers:将多个reducer编译成同一个reducer
 *  */
import {createStore,combineReducers} from 'redux'

// 导入具体的业务reducer,此时只有testReducer
import testReducer from '../reducer/testReducer.js'

// 将多个reducer编译成同一个
const rootReducer = combineReducers({
    testReducer
})

// createStore:用于初始化Store的函数，将来交给 next-redux-warpper的withRedux使用
const initStore = (initalState,options) =>{
    return createStore(rootReducer,initalState)
}

// 将initStore导出
export default initStore