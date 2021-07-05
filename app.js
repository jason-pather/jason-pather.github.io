'use strict'

const button = document.querySelector('.btn');
button.addEventListener('click', function() {
    createNew({
        "tuningRoot": document.getElementById("tuningRoot").value,
        "tuningType": document.getElementById("tuningType").value,
        "numStrings": document.getElementById("numStrings").value,
        "scaleRoot": document.getElementById("scaleRoot").value,
        "scaleType": document.getElementById("scaleType").value
    }
    );
});

function createNew(params) {
    for (const string of params["numStrings"]) {
        let stringRoot = getStringRoot(string, params)
        for (const fret of Array(24).keys()) {
            drawFret(string, fret, params)
        }
    }
    alert('t');
}

function drawFret(string, fret, params) {
}

function getStringRoot(string, params) {
    
};

function getStringRoots(params) {

    let semitoneDiffs = {
        "6": {
            "standard": [5, 5, 5, 4, 5],
            "dropped": [7, 5, 5, 4, 5],
        },
        "7": {
            "standard": [5, 5, 5, 5, 4, 5],
            "dropped": [7, 5, 5, 5, 4, 5],
        },
        "8": {
            "standard": [5, 5, 5, 5, 5, 4, 5],
            "dropped": [7, 5, 5, 5, 5, 4, 5],
        }

    }
    let sd = semitoneDiffs[params["numStrings"]][params["tuningType"]];

    sd = sd.map(x => x * params["tuningRoot"] % 12)



    
}


// {
//     "C": ["C", "C#"]
// }