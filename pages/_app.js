import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'

<<<<<<< HEAD
// redux步骤1：导入store/index
import {initStore} from '../store/index.js'

// redux步骤2：从next-redux-wrapper中导入withRedux方法
import withRedux from 'next-redux-wrapper'

// redux步骤3：导入一个Provider 组件,将来作为layout的父附件
import {Provider} from 'react-redux'

=======
// 1.0 导入store
import {initStore,persisitor} from '../store/index.js'

// 2.0 获取到withRedux函数
import withRedux from 'next-redux-wrapper'

// 3.0 获取Provider组件对象
import {Provider} from 'react-redux'

// 4.0 导入persistGate组件
import {PersistGate} from 'redux-persist/integration/react'
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9

 class MyApp extends App {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
<<<<<<< HEAD
        const { Component,store, ...pageProps } = this.props

        return (
            <Container>
                {/* redux步骤三：通过Provider拿到store传入到所有的子组件 */}
                <Provider store={store}>
                    {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}                
                    <Layout Component={Component} {...pageProps}>

                    </Layout>
                </Provider>
=======
        const { Component, pageProps,store } = this.props
    
        return (
            <Container>   
                {/* 5.0 利用Provider作为根组件将store传递给所有的子组件 */}
                <Provider store = {store}>      
            {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}                
           
            <PersistGate persistor={persisitor}>
                <Layout Component={Component} {...pageProps}>

                </Layout>
            </PersistGate>
            </Provider>  
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
            </Container>
        )
    }
}

<<<<<<< HEAD
// redux步骤4：包装MyApp，使得store能够绑定到myapp中的props上
=======
// 4.0 将store对象注入到_app.js中的props中去
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
export default withRedux(initStore)(MyApp)