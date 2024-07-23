const knightMoves = function(start, end) {
    const graph = prepareGraph()

    const par = Array.from({ length: 8 }, () => Array(8).fill(-1));
    const dist = Array.from({ length: 8 }, () => Array(8).fill(Infinity));

    bfs(start, graph, par, dist);

    if(dist[end[0]][end[1]] === Infinity) {
        console.log("Source and Destination are not connected");
        return;
    }

    const path = [end];

    let currNode = end;

    

    while(par[currNode[0][currNode[1]]] !== -1) {
        const x = currNode[0];
        const y = currNode[0];

        path.push(par[x][y]);
        currNode = par[par[x][y]];
    }

    const result = path.reverse();

    console.log(`You made it in ${result.length} moves!`);
    
    for(const move of result) {
        console.log(move);
    }

}

const prepareGraph = () => {

    // adjacency lists for all coordinates
    const graph = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => []));

    for(let i = 0;i<8;i++) {
        for(let j = 0;j<8;j++) {

            const adjacencyList = getPossibleMoves(i,j);
            graph[i][j] = adjacencyList;
        }
    }

    return graph;

}

const bfs = function(start, graph, parent, dist) {
    
    // Fills the distance graph and parent graph with values

    const queue = [start];

    while(queue.length > 0) {
        const currNode = queue.shift();

        const currX = currNode[0];
        const currY = currNode[1];

        const possibleMoves = graph[currX][currY];

        for(const move of possibleMoves) {

            const x = move[0];
            const y = move[1];

            if(dist[x][y] === Infinity) {
                parent[x][y] = currNode;
                dist[x][y] = dist[currX][currY] + 1;
                queue.push(move);
            }
        }

    }

}



const getPossibleMoves = (x,y) => {
    // check all possible move directions from here

    const possibleMoves = [];

    // NE 1
    let moveY = y + 2;
    let moveX = x + 1;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // NE 2
    moveY = y + 1;
    moveX = x + 2;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // NW 1
    moveY = y + 2;
    moveX = x - 1;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // NW 2
    moveY = y + 1;
    moveX = x - 2;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // SE 1
    moveY = y - 1;
    moveX = x + 2;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // SE 2
    moveY = y - 2;
    moveX = x + 1;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // SW 1
    moveY = y - 1;
    moveX = x - 2;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    // SW 2
    moveY = y - 2;
    moveX = x - 1;

    if(validPoint(moveX, moveY))
        possibleMoves.push([moveX, moveY]);

    return possibleMoves;
}

const validPoint = (x,y) => x >= 0 && x <= 7 && y >= 0 && y <= 7;




export default knightMoves;