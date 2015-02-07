var React          = require('react')
var containers     = [
    {
        id    : 'api',
        image : 'smartm/api',
        host  : 'laptop'
    },
    {
        id    : 'elasticsearch',
        image : 'smartm/elasticsearch',
        host  : 'taghub-kiwi-1'
    }
]

import { ContainerGraph } from './graph'

React.render(<ContainerGraph containers={containers}/>, document.body) 
