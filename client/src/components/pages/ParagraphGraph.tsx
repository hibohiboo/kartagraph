import { async } from '@firebase/util'
import React, { useEffect, useRef } from 'react'
import { Node, Edge, Network } from 'vis-network'

const ParagraphGraph: React.FC = ({}) => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const svgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ;(async () => {
      if (!svgRef || !svgRef.current) {
        return
      }
      const [nodes, edges]: [Node[], Edge[]] = await Promise.all([
        (await fetch('/data/paragraph/nodes.json')).json(),
        (await fetch('/data/paragraph/edges.json')).json(),
      ])
      // create a network
      const container = svgRef.current
      const data = {
        nodes: nodes,
        edges: edges,
      }
      const options = {}

      const network = new Network(container, data, options)
      network.on('click', ({ nodes }) => {
        if (nodes.length === 1) {
          const [nodeId] = nodes
          window.open(`/cartagraph-gamebook/public/${nodeId}`, '_blank')
        }
      })
    })()
  }, [svgRef])

  return (
    <div>
      <div
        ref={svgRef}
        style={{
          width: '80vw',
          height: '80vh',
          border: '1px solid lightgray',
        }}
      ></div>
    </div>
  )
}
export default ParagraphGraph
