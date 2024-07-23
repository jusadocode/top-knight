const knightMoves = function(start, end) {

    if(!validPoint(start[0], start[1]) || !validPoint(end[0], end[1])) {
        console.log("Invalid coordinates");
        return;
    }

    if (start[0] == end[0] && start[1] == end[1]) {
        console.log("You are at the destination");
        return;
    }
        

    const graph = prepareGraph()

    let par = Array.from({ length: 8 }, () => Array(8).fill(-1));
    let dist = Array.from({ length: 8 }, () => Array(8).fill(Infinity));

    bfs(start, graph, par, dist);

    if(dist[end[0]][end[1]] === Infinity) {
        console.log("Source and Destination are not connected");
        return;
    }

    const path = [end];

    let currNode = end;

    while(par[currNode[0]][currNode[1]] !== -1) {
        const x = currNode[0];
        const y = currNode[1];

        path.push(par[x][y]);
        currNode = par[x][y];
    }

    const result = path.reverse();

    console.log(`You made it in ${result.length-1} moves!`);
    
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
    
    // Fills the distance array and parent array with values

    // node is a [x,y]
    // graph[3][3] = [[4,3], [2,2]]
    // dist [3][3] = 5
    // parent[3][3] = [4,3]

    const queue = [start];
    dist[start[0]][start[1]] = 0;

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

    const possibleMoves = [];

    // check all possible move directions from here

    const moves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1], 
        [1, 2], [1, -2], [-1, 2], [-1, -2], 
    ]

    for(const [dx, dy] of moves) {
        const moveX = x + dx;
        const moveY = y + dy;

        if(validPoint(moveX, moveY))
            possibleMoves.push([moveX, moveY]);
    }
    
    return possibleMoves;
}

const validPoint = (x,y) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

export default knightMoves;