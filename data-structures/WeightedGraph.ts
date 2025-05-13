class WeightedVertex {
  adjacentVertices: { [vertex: string]: number } = {};
  constructor(readonly value: string) {}

  addAdjacentVertex(vertex: Vertex, weight: number) {
    this.adjacentVertices[vertex.value] = weight;
  }
}
