import * as d3 from 'd3'
type D3 = typeof d3
type NodeData = { name: string; children: NodeData[] }
type D3Node = d3.SimulationNodeDatum & d3.HierarchyNode<NodeData>

export const d3Drag = (d3: D3) => (simulation: d3.Simulation<any, any>) => {
  function dragstarted(event: any, d: any) {
    if (!event.active) {
      simulation.alphaTarget(0.3).restart()
    }
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: any) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}
type DragFunc = ReturnType<typeof drag>
export const createChart = (
  d3: D3,
  data: NodeData,
  width: number,
  height: number,
  drag: DragFunc,
  invalidation: any,
) => {
  const root = d3.hierarchy(data)
  const links = root.links() as any[]
  const nodes = root.descendants() as D3Node[]

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(links)
        .id((d: any) => d.id)
        .distance(0)
        .strength(1),
    )
    .force('charge', d3.forceManyBody().strength(-50))
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  const svg = d3
    .create('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')

  const node = svg
    .append('g')
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('fill', (d) => (d.children ? null : '#000'))
    .attr('stroke', (d) => (d.children ? null : '#fff'))
    .attr('r', 3.5)
    // @ts-ignore
    .call(drag(simulation))

  node.append('title').text((d) => d.data.name)

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)

    node.attr('cx', (d) => `${d.x}`).attr('cy', (d) => `${d.y}`)
  })

  invalidation.then(() => simulation.stop())

  return svg.node()
}
