import React, { useEffect, useRef } from 'react'
import { Network } from 'vis-network'

const nodes = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
]

const edges = [
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
]
const ParagraphGraph: React.FC = ({}) => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const svgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!svgRef || !svgRef.current) {
      return
    }

    // create a network
    var container = svgRef.current
    var data = {
      nodes: nodes,
      edges: edges,
    }
    var options = {}

    var network = new Network(container, data, options)
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
