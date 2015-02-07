var React  = require('react')
var vis    = require('vis')
var utils  = require('./utils')

export class ContainerGraph extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div ref="container" style={this.style()}></div>
    }

    _render() {
        this.network.setOptions({ groups : this.getGroups() })
        this.nodes.update(this.getNodes())
    }

    style() {
        return {
            width  : '500px',
            height : '500px',
            border : '1px solid #ccc'
        }
    }

    getNodes() {
        return this.props.containers.map(this.containerToNode.bind(this))
    }

    getGroups() {
        return this.props.containers.reduce(function(groups, container, index, containers) {
            groups[container.host] = {
                shape  : 'square',
                color  : {
                    border     : utils.stringToColor(container.image),
                    background : utils.stringToColor(container.host)
                }
            }
            return groups 
        }, {})
    }

    containerToNode(container, index) {
        return { 
            id : index, 
            label : container.id, 
            group : container.host,
            radius : 15 
        }
    }

    componentDidUpdate() {
        console.log('update')
        this._render()
    }

    componentDidMount() {
        this.nodes   = new vis.DataSet()
        this.network = new vis.Network(this.refs.container.getDOMNode(), { 
            nodes  : this.nodes 
        }, {
            groups : {} 
        }) 
        this._render()
    }

}
