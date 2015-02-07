var React  = require('react')
var vis    = require('vis')
var utils  = require('./utils')

export class ContainerGraph extends React.Component {

    constructor(props) {
        super(props)
        this.prevNodes = []
    }

    render() {
        return <div ref="container" style={this.style()}></div>
    }

    _render() {
        this.network.setOptions({ groups : this.getGroups() })
        var nodes = this.getNodes()
        var kept  = this.nodes.update(nodes)
        this.prevNodes.forEach(function(node) {
            if (kept.indexOf(node.id) < 0) this.nodes.remove(node.id)
        }.bind(this))
        this.prevNodes = nodes
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
            if (!container.host) container.host = 'unknown' 
            groups[container.host+container.image] = {
                shape  : 'square',
                color  : {
                    border     : utils.stringToColor(container.host),
                    background : utils.stringToColor(container.image)
                },
                borderWidth : 2
            }
            return groups 
        }, {})
    }

    containerToNode(container, index) {
        if (!container.host) container.host = 'unknown' 
        return { 
            id     : container.id, 
            label  : container.id, 
            group  : container.host+container.image,
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
