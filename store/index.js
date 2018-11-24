<<<<<<< HEAD
// 1.0 导入redux中的两个函数
import {createStore,combineReducers} from 'redux'

// 2.0 准备相关的reducer当前只有一个testReducer
import testReducer from '../reducers/testReducer.js'

// 3.0 利用redux中的combineReducers来编译成根reducer
const rootReducer = combineReducers({
    testReducer
});

// 4.0 调用 createStore创建好一个store对象
const store = createStore(rootReducer)

// 5.0 定义一个函数将store对象返回，将来被_app.js中的withRedux去调用
export const initStore = ()=>{
    return store
}
=======
/**
 * 负责创建redux中的store
 * createStore(rootReducer) 来创建
 *  */

 import {createStore,combineReducers} from 'redux'


//  2.0 将自己创建好的业务reducer编译成根reducer
import testReducer from '../reducers/testReducer.js'

const rootReducer = combineReducers({
    testReducer
})


// 2.0.1 利用redux-persist完成store的序列化保存到localStorage操作
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 2.0.2 配置一个对象，用来管理storeage对象的key
const config = {
    key:'xczxredux',
    storage
}

// 2.0.3 绑定config和rootReducer
const pReducer = persistReducer(config,rootReducer);

// 2.0.4 创建一个store
const store = createStore(pReducer)

// 2.0.5 创建一个对象，将来被_app.js中的PersistGate使用
export const persisitor = persistStore(store)

// 3.0 创建一个全局的store对象
// const store = createStore(rootReducer)

// 4.0 创建一个函数这个函数返回的是一个store，将来可以被withRedux接收同步到react应用中去
export const initStore = ()=>{
    return store
}


>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
