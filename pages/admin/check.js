import { connect } from 'react-redux'
import fetchHelper from '../../kits/fetchHelper.js'
import Router from 'next/router'
import { message } from 'antd'

export default class check extends React.Component {
    componentWillMount() {
        message.config({
            top: 200         
          });

        fetchHelper.get('/ch/admin/getcatelist')
            .then(json => {
                console.log(json);
                if (json.status == 2) {
                    message.warn(json.message, 1,()=>{
                        Router.push({ pathname: '/index' });
                    });
                    return;
                }
                if (json.status == 1) {
                    message.error(json.message, 1, () => {
                        Router.push({ pathname: '/index' });
                    });
                    return;
                }
                // 正常
                Router.push({ pathname: '/admin/course/clist' });
                
            })
    }

    render() {
        return (<div style={{ minHeight: 800 }}>

        </div>)
    }
}
