'use strict'

const notes = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B"
}

const semitoneDiffs = {
    "6": {
        "standard": [0, 5, 5, 5, 4, 5],
        "dropped": [0, 7, 5, 5, 4, 5],
    },
    "7": {
        "standard": [0, 5, 5, 5, 5, 4, 5],
        "dropped": [0, 7, 5, 5, 5, 4, 5],
    },
    "8": {
        "standard": [0, 5, 5, 5, 5, 5, 4, 5],
        "dropped": [0, 7, 5, 5, 5, 5, 4, 5],
    }
}

const button = document.querySelector('.btn');
button.addEventListener('click', function() {
    createNew({
        "tuningRoot": parseInt(document.getElementById("tuningRoot").value),
        "tuningType": document.getElementById("tuningType").value,
        "numStrings": parseInt(document.getElementById("numStrings").value),
        "scaleRoot": document.getElementById("scaleRoot").value,
        "scaleType": document.getElementById("scaleType").value
    }
    );
});

function createNew(params) {
    const stringRoots = getStringRoots(params["numStrings"], params["tuningType"], params["tuningRoot"])

    for (let stringNum = 0; stringNum < params["numStrings"]; stringNum++) {
        renderString(stringRoots[stringNum], stringNum)
    }

}

function renderString(root, stringNum) {
    let fretboard = document.getElementById("fretboard");
    const row = fretboard.insertRow(stringNum);
    let string = [...Array(24).keys()];
    string = string.map((fret) => (fret + root) % 12);

    string.forEach(fret => {
        renderFret(fret, row)
    })
}

function renderFret(fret, row) {
    const cell = row.insertCell()
    cell.setAttribute("id", fret)
    cell.innerHTML = notes[fret];
}

function getStringRoots(numStrings, tuningType, tuningRoot) {
    const diffs = semitoneDiffs[numStrings][tuningType];
    const stringRoots = [...Array(numStrings).keys()]  
    const reducer = (acc, curr) => {
        let increment = diffs.slice(0, curr + 1).reduce((x, y) => x + y);
        let v = acc.push((tuningRoot + increment) % 12);
        return acc;
      }

    return stringRoots.reduce(reducer, []).reverse()
}


// {
//     "C": ["C", "C#"]
// }