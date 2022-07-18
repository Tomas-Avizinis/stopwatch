blocks = [
    {
        "gym": false,
        "shool": true,
        "store": false
    },
    {
        "gym": true,
        "shool": false,
        "store": false
    },
    {
        "gym": true,
        "shool": true,
        "store": false
    },
    {
        "gym": false,
        "shool": true,
        "store": false
    },
    {
        "gym": false,
        "shool": true,
        "store": true
    }
]

requirements = ['gym', 'shool','store']
let distances = new Array(requirements.length);
let blockMaxDistance = {
    distance: blocks.length,
    blockNo: null
};


blocks.map((block, blockIndex) => {

    distances.fill(blocks.length);
    
    requirements.map((place, placeIndex) => {
        let distanceToPlace = blocks.length;

        for (let i = 0; i < blocks.length; i ++) {

            if (blocks[i][place]) {
                if (Math.abs(blockIndex - i) < distanceToPlace) {
                    distanceToPlace = Math.abs(blockIndex - i);
                }
            }   
        }

        if (distanceToPlace < distances[placeIndex]) {
            distances[placeIndex] = distanceToPlace;
        }

    })
    const maxdistance = distances.reduce((a,b) => {
        return a = a > b? a : b
    })
    console.log('house', blockIndex, distances, maxdistance)

    if (blockMaxDistance.distance > maxdistance) {
        blockMaxDistance = {
            distance: maxdistance,
            blockNo: blockIndex
        }
    }

});

console.log(`closest distance is in block${blockMaxDistance.blockNo} and it is ${blockMaxDistance.distance}`)

