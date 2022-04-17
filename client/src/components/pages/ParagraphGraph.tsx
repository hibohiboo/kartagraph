import React, { useEffect, useRef } from 'react'
import * as vis from 'vis-network'

const ParagraphGraph: React.FC = ({}) => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const svgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!svgRef || !svgRef.current) {
      return
    }
    var nodes = new vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ])

    // create an array with edges
    // @ts-ignore
    var edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 },
    ])

    // create a network
    var container = svgRef.current
    var data = {
      nodes: nodes,
      edges: edges,
    }
    var options = {}
    // @ts-ignore
    var network = new vis.Network(container, data, options)
  }, [svgRef])

  return (
    <div
      ref={svgRef}
      style={{
        width: '600px',
        height: '400px',
        border: '1px solid lightgray',
      }}
    ></div>
  )
}
export default ParagraphGraph
