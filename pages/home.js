
import { Button } from 'antd'
import Head from 'next/head'

import {connect} from 'react-redux'
<<<<<<< HEAD
 
 class home extends React.Component {
=======


class home extends React.Component {
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
    render() { 
        return (<div>
            <Head>
                <title>首页</title>               
            </Head>
<<<<<<< HEAD
            <span style={{color:this.props.testReducer.color}}>home</span>
=======
            <span style={{color:this.props.testReducer.color}}>Home</span>
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
            <Button type="primary"> antd 按钮</Button>
        </div>)
    }
}

<<<<<<< HEAD

const mapStateToProps = (state)=>{
    return {
      ...state
    }
  }
export default  connect(mapStateToProps)(home)
=======
const mapStateToProps =(state)=>{
    return {
        ...state
    }
}
export default connect(mapStateToProps,null)(home)
>>>>>>> a417a48dddad342173f97df825f9d8cb668478d9
