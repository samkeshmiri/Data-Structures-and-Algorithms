class Vertex {
  adjacentVertices: Vertex[] = [];
  constructor(readonly name: string) {}

  addAdjacentVertex(vertex: Vertex) {
    this.adjacentVertices.push(vertex);
  }
}

// vertex, search value, traversed map
// if vertex has search value, return it
// mark that vertex as traversed
// for each adjacent vertex
// if adjacent vertex value has been visited, continue
// if it is what we are looking for, return it
// assign function recursively to a variable
// if that variable has a value return it
// return undefined
function dfs(vertex: Vertex, searchValue: any, visitedVertices: {} = {}) {
  if (vertex == searchValue) return vertex;

  // add the value of the node as the key of the map and true as the value
  // so that it is marked as traversed
  visitedVertices[vertex.name] = true;

  // loop through the adjacent vertices,
  for (const adjacentVertex of vertex.adjacentVertices) {
    // if it's already marked as true then it's been checked
    if (visitedVertices[adjacentVertex.name]) continue;

    // if found, return it
    if (adjacentVertex == searchValue) {
      return adjacentVertex;
    }

    // recursively search on the adjacent vertex
    let vertexToFind = dfs(adjacentVertex, searchValue, visitedVertices);

    // once everything has been marked as searched i.e. no more adjacent vertexes, then return if it is found
    if (vertexToFind) return vertexToFind;
  }

  // this will be run before the line above (31) because it is coming out of the loop on the final vertex to search on
  // so vertexToFind will be undefined
  return undefined;
}

// add starting vertex to has table and mark as visited
// add it to a queue
// loop while queue not empty
// remove the first vertex from the queue. (current vertex)
// iterate over all adjacent vertices
// if visited, continue
// mark as visited and add to the queue
// repeat until queue is empty or found value
function bfs(startVertex: Vertex, searchValue: string): Vertex | undefined {
  const queue: Vertex[] = [];
  let visitedVertices: { [key: string]: boolean } = {};

  queue.push(startVertex);

  visitedVertices[startVertex.name] = true;

  while (queue.length > 0) {
    const currentVertex = queue.shift();

    if (!currentVertex) {
      continue;
    }

    for (const adjacentVertex of currentVertex.adjacentVertices) {
      if (visitedVertices[adjacentVertex.name]) continue;
      if (adjacentVertex.name === searchValue) return adjacentVertex;
      visitedVertices[adjacentVertex.name] = true;
      queue.push(adjacentVertex);
    }
  }

  return undefined;
}

// console.log(bfs(alice, sam.value));

// start at any vertex
// add it to the queue

// while queue not empty

function bfs2(startingVertex: Vertex, searchValue: string) {
  let map: { [value: string]: boolean } = {};
  let queue: Vertex[] = [];

  map[startingVertex.name] = true;
  queue.push(startingVertex);

  if (startingVertex.name === searchValue) return startingVertex;

  while (queue.length > 0) {
    let currentVertex = queue.shift();
    for (const adjacentVertex of currentVertex!.adjacentVertices) {
      if (map[adjacentVertex.name]) continue;
      if (adjacentVertex.name == searchValue) return adjacentVertex;
      map[adjacentVertex.name] = true;
      queue.push(adjacentVertex);
    }
  }

  return undefined;
}

// console.log(bfs2(alice, sam.value));

// start at any vertex
// add it to the queue
// mark it as traversed
// then pop it off the queue as the first vertex to search its brethren
// so for each of its bredren
// if found return
// if traversed, continue
// otherwise add it to the queue
// search all its bredren
function bfs3(startingVertex: Vertex, searchValue: string) {
  const queue: Vertex[] = [];
  const map: { [value: string]: boolean } = {};
  queue.push(startingVertex);

  map[startingVertex.name] = true;

  while (queue[0]) {
    let currentVertex = queue.shift();

    for (const adjacentVertex of currentVertex!.adjacentVertices) {
      if (adjacentVertex.name == searchValue) return adjacentVertex;
      if (map[adjacentVertex.name]) continue;
      queue.push(adjacentVertex);
      map[adjacentVertex.name] = true;
    }
  }
  return undefined;
}

const alice = new Vertex("alice");
const bob = new Vertex("bob");
const sam = new Vertex("sam");

alice.addAdjacentVertex(bob);
bob.addAdjacentVertex(alice);
bob.addAdjacentVertex(sam);

function bfs4(vertex: Vertex, searchValue: string) {
  const queue: Vertex[] = [];
  const visited: { [key: string]: boolean } = {};

  queue.push(vertex);
  visited[vertex.name] = true;

  while (queue.length) {
    const currentVertex = queue.shift();

    for (const adjacentVertex of currentVertex.adjacentVertices) {
      if (adjacentVertex.name === searchValue) {
        return adjacentVertex;
      }

      if (!visited[adjacentVertex.name]) {
        visited[adjacentVertex.name] = true;
        queue.push(adjacentVertex);
      }
    }
  }

  return undefined;
}

console.log(bfs4(alice, "sam"));
