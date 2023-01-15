import { Graph, Edge, Shape } from '@antv/x6'

// 定义节点
export class MyShape extends Shape.Rect {
  getInPorts() {
    return this.getPortsByGroup('in')
  }

  getOutPorts() {
    return this.getPortsByGroup('out')
  }

  getUsedInPorts(graph: Graph) {
    const incomingEdges = graph.getIncomingEdges(this) || []
    return incomingEdges.map((edge: Edge) => {
      const portId = edge.getTargetPortId()
      return this.getPort(portId!)
    })
  }

  getNewInPorts(length: number) {
    return Array.from(
      {
        length,
      },
      () => {
        return {
          group: 'in',
        }
      },
    )
  }

  updateInPorts(graph: Graph) {
    const minNumberOfPorts = 2
    const ports = this.getInPorts()
    const usedPorts = this.getUsedInPorts(graph)
    const newPorts = this.getNewInPorts(
      Math.max(minNumberOfPorts - usedPorts.length, 1),
    )

    if (
      ports.length === minNumberOfPorts &&
      ports.length - usedPorts.length > 0
    ) {
      // noop
    } else if (ports.length === usedPorts.length) {
      this.addPorts(newPorts)
    } else if (ports.length + 1 > usedPorts.length) {
      this.prop(
        ['ports', 'items'],
        this.getOutPorts().concat(usedPorts).concat(newPorts),
        {
          rewrite: true,
        },
      )
    }

    return this
  }
}

MyShape.config({
  attrs: {
    root: {
      magnet: false,
    },
    body: {
      fill: 'transparent',
      stroke: '#5F95FF',
      strokeWidth: 1,
    },
  },
  ports: {
    items: [
      {
        group: 'out',
      },
    ],
    groups: {
      in: {
        position: {
          name: 'top',
        },
        attrs: {
          portBody: {
            magnet: 'passive',
            r: 6,
            stroke: '#5F95FF',
            fill: '#tranparent',
            strokeWidth: 1,
          },
        },
      },
      out: {
        position: {
          name: 'bottom',
        },
        attrs: {
          portBody: {
            magnet: true,
            r: 6,
            fill: '#tranparent',
            stroke: '#5F95FF',
            strokeWidth: 1,
          },
        },
      },
    },
  },
  portMarkup: [
    {
      tagName: 'circle',
      selector: 'portBody',
    },
  ],
})