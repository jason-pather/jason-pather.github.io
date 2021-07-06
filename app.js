'use strict'

const displayNotes = {
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

const scaleNotes = {
    0: "C",
    1: "C\\#",
    2: "D",
    3: "D\\#",
    4: "E",
    5: "F",
    6: "F\\#",
    7: "G",
    8: "G\\#",
    9: "A",
    10: "A\\#",
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

const scaleIntervals = {
    "major": [0, 2, 2, 1, 2, 2, 2, 1],
    "minor": [0, 2, 1, 2, 2, 1, 2, 2],
    "harmonicMinor": [0, 2, 1, 2, 2, 1, 3, 1]
}

const button = document.querySelector('.btn');
button.addEventListener('click', function() {
    createNew({
        "tuningRoot": parseInt(document.getElementById("tuningRoot").value),
        "tuningType": document.getElementById("tuningType").value,
        "numStrings": parseInt(document.getElementById("numStrings").value),
        "scaleRoot": parseInt(document.getElementById("scaleRoot").value),
        "scaleType": document.getElementById("scaleType").value
    }
    );
});

function createNew(params) {
    const stringRoots = getStringRoots(params["numStrings"], params["tuningType"], params["tuningRoot"])
    const fretboard = document.getElementById("fretboard");

    renderHeader(fretboard)

    for (let stringNum = 0; stringNum < params["numStrings"]; stringNum++) {
        renderString(stringRoots[stringNum], stringNum, fretboard)
    }

    highlightScale(params["scaleRoot"], params["scaleType"])
}

function highlightScale(scaleRoot, scaleType) {
    const intervals = scaleIntervals[scaleType]
    const notes = [...Array(7).keys()]  
    notes.map((acc, curr) => {
        let increment = intervals.slice(0, curr + 1).reduce((x, y) => x + y);
        highlightNotes((scaleRoot + increment) % 12);
    })
}

function highlightNotes(note) {
    document.querySelectorAll("#" + scaleNotes[note]).forEach((el) => {
        el.classList.add('scale');
    });
}

function renderHeader(fretboard) {
    const heading = fretboard.createTHead();
    const header = fretboard.insertRow(0);
    heading.insertRow(header)
    const cells = [...Array(25).keys()];
    cells.forEach(cell => {
        const head = document.createElement("th");
        head.setAttribute("id", cell)
        head.innerHTML = cell;
        header.appendChild(head)
    })
}

function renderString(root, stringNum, fretboard) {
    const row = fretboard.insertRow(stringNum);
    let string = [...Array(25).keys()];
    string = string.map((fret) => (fret + root) % 12);

    string.forEach(fret => {
        renderFret(fret, row)
    })
}

function renderFret(fret, row) {
    const cell = row.insertCell()
    cell.setAttribute("id", displayNotes[fret])
    cell.innerHTML = displayNotes[fret];
}

function getStringRoots(numStrings, tuningType, tuningRoot) {
    const diffs = semitoneDiffs[numStrings][tuningType];
    const stringRoots = [...Array(numStrings).keys()]  
    const reducer = (acc, curr) => {
        let increment = diffs.slice(0, curr + 1).reduce((x, y) => x + y);
        acc.push((tuningRoot + increment) % 12);
        return acc;
      }

    return stringRoots.reduce(reducer, []).reverse()
}
