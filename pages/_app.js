import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'

// 1.0 导入store
import {initStore,persisitor} from '../store/index.js'

// 2.0 获取到withRedux函数
import withRedux from 'next-redux-wrapper'

// 3.0 获取Provider组件对象
import {Provider} from 'react-redux'

// 4.0 导入persistGate组件
import {PersistGate} from 'redux-persist/integration/react'

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
            </Container>
        )
    }
}

// 4.0 将store对象注入到_app.js中的props中去
export default withRedux(initStore)(MyApp)