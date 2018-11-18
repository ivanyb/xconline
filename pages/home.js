
import { Button } from 'antd'
import Head from 'next/head'

import {connect} from 'react-redux'

class home extends React.Component {
    render() { 
        return (<div>
            <Head>
                <title>首页</title>               
            </Head>
            <span style={{color:this.props.testReducer.color}}>Home</span>
            <Button type="primary"> antd 按钮</Button>
        </div>)
    }
}


const mapState = (state)=>{
    return {
        ...state
    }
}

export default connect(mapState)(home)