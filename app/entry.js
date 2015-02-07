var React          = require('react')
var faye           = require('faye')

import { ContainerGraph } from './graph'

var containers = [
    {
        id    : 'api',
        image : 'my/api',
        host  : 'laptop1'
    },
    {
        id    : 'elasticsearch',
        image : 'my/elasticsearch',
        host  : 'laptop2'
    }
]


class TestApp extends React.Component {

    constructor() {
        this.state = { containers : containers }
    }

    render() {
        return <ContainerGraph containers={this.state.containers} /> 
    }

    componentDidMount() { 
//        this.client = new faye.Client('http://dux-dispatcher.dux.test:8000')
//        this.client.subscribe('/running-containers', function(containers) {
//            this.setState({containers : containers})
//        }.bind(this))
    }

}

React.render(<TestApp/>, document.body) 
