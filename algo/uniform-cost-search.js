const edges = [
    ["S", "A", 2],
    ["B", "A", 3],
    ["D", "A", 4],
    ["C", "A", 7],
    ["D", "C", 2],
    ["C", "F", 8],
    ["C", "G", 1],
    ["E", "F", 2],
    ["E", "G", 100],
]
const start = "S"
const goal = "G"

const INT_MAX = 99999

const getNeighbors = (node) => {
    return edges.filter(edge => edge.includes(node)).flat().filter(item => !Number.isInteger(item) && item!== node)
}

const DFS = () => {

    let stack = [start]
    const backtracking = []

    while(stack.length){
        node = stack.pop()
        backtracking.push(node)
        if(node === goal)
            break;

        const neighbors = getNeighbors(node).filter(n => !backtracking.includes(n))
        stack = stack.concat(neighbors)
    }
    return backtracking
}

const BFS = () => {
    let queue = [start]
    const backtracking = []

    while(queue.length){
        node = queue.shift()
        backtracking.push(node)
        if(node === goal)
            break;
        const neighbors = getNeighbors(node).filter(n => !backtracking.includes(n))
        queue = queue.concat(neighbors)
    }
    return backtracking
}

const getCost = (u, v) => {
    const edge = edges.find(edge => edge.includes(u) && edge.includes(v))
    return edge?.[2] || INT_MAX
}



// console.log("BFS:", BFS());
// console.log("DFS:", DFS());
console.log("UCS:", UCS());

