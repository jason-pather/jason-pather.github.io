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

const createButton = document.getElementById("create_btn");
createButton.addEventListener('click', function() {
    clearFretboard();
    createNew({
        "tuningRoot": parseInt(document.getElementById("tuningRoot").value),
        "tuningType": document.getElementById("tuningType").value,
        "numStrings": parseInt(document.getElementById("numStrings").value),
        "scaleRoot": parseInt(document.getElementById("scaleRoot").value),
        "scaleType": document.getElementById("scaleType").value
    }
    );
});

const clearButton = document.getElementById("clear_btn");
clearButton.addEventListener('click', function() {
    clearScale()
})

const applyButton = document.getElementById("apply_btn");
applyButton.addEventListener('click', function() {
    clearScale();
    highlightScale(
        parseInt(document.getElementById("scaleRoot").value),
        document.getElementById("scaleType").value
    )
})

function createNew(params) {
    const stringRoots = getStringRoots(params["numStrings"], params["tuningType"], params["tuningRoot"])
    const fretboard = document.getElementById("fretboard");

    renderHeader(fretboard)
    renderFretboard(params["numStrings"], stringRoots, fretboard)
    highlightMarker()
    highlightScale(params["scaleRoot"], params["scaleType"])

}

function renderHeader(fretboard) {
    const heading = fretboard.createTHead();
    const cells = [...Array(25).keys()];
    cells.forEach(cell => {
        const head = document.createElement("th");
        head.setAttribute("id", "0_" + cell + "_0")
        head.innerHTML = cell;
        heading.appendChild(head)
    })
}

function renderFretboard(numStrings, stringRoots, fretboard) {
    for (let stringNum = 0; stringNum < numStrings; stringNum++) {
        renderString(stringRoots[stringNum], stringNum, fretboard)
    }
}

function clearFretboard(){
    document.querySelectorAll(".fl-table")[0].innerHTML = "";
}

function clearScale() {
    document.querySelectorAll(".scale").forEach((el) => {
        el.classList.remove('scale');
    });
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
    document.querySelectorAll("[id$='" + scaleNotes[note] + "']").forEach((el) => {
        el.classList.add('scale');
    });
}

function highlightMarker() {
    document.querySelectorAll("[id*='_0_'], [id*='_0_']").forEach((el) => {
        el.classList.add('marker');
    });
}

function renderString(root, stringNum, fretboard) {
    const row = fretboard.insertRow(stringNum);
    let string = [...Array(25).keys()];
    string.forEach(fret => renderFret(fret, row, stringNum, root))
}

function renderFret(fret, row, stringNum, root) {
    const cell = row.insertCell()
    cell.setAttribute("id", stringNum + 1 + "_" + fret + "_" + noteFromFretNumber(fret, root));
    cell.innerHTML = noteFromFretNumber(fret, root);
}

function noteFromFretNumber(fret, root) {
    return displayNotes[(fret + root) % 12];
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
