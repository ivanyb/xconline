import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'

// 1.0 redux使用步骤1：导入initalStore
import initStore from '../store/index.js'

// 2.0 导入next-redux-warpper这个包
import withRedux from 'next-redux-wrapper'

// 4.0 导入Provider对象
import {Provider} from 'react-redux'

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
            
            {/* 5.0 利用Provider对象将this.props中的store传递给所有的页面 */}
            <Provider store = {store}>
                {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}                
                <Layout Component={Component} {...pageProps}>

                </Layout>
            </Provider>
            </Container>
        )
    }
}

// 3.0 利用withRedux将App类包装以后进行返回,此时this.props中就会存在一个 store的对象
export default withRedux(initStore)(MyApp)