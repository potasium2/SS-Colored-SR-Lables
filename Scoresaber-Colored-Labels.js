// ==UserScript==
// @name         Scoresaber SR Colored Labels
// @namespace    SS Star Rating Color
// @version      1.1
// @description  Changes the Star Rating difficulty label colors to represent the actual Star Rating of the map
// @author       potasium_
// @updateURL    https://github.com/potasium2/SS-Colored-SR-Lables/blob/main/Scoresaber-Colored-Labels.js
// @downloadURL  https://github.com/potasium2/SS-Colored-SR-Lables/blob/main/Scoresaber-Colored-Labels.js
// @match        https://scoresaber.com/*
// ==/UserScript==

// Color Interpolation Code
function getLerpedColor(points, t) {
    points.sort(function (a, b) { return a[0] - b[0] });

    if (t <= points[0][0]) return points[0][1];
    else if (t >= points[points.length - 1][0]) return points[points.length - 1][1];

    let index = 0;
    for (let i = 0; i < points.length; i++) {
        if (points[i][0] > t) {
            index = i - 1;
            break;
        }
    }

    let c1 = points[index][1];
    let c2 = points[index + 1][1];
    let ct = reverseLerp(points[index][0], points[index + 1][0], t);
    return lerpColor(c1, c2, ct);
}

function lerpColor(c1, c2, t) {
    let r = lerp(c1[0], c2[0], t);
    let g = lerp(c1[1], c2[1], t);
    let b = lerp(c1[2], c2[2], t);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reverseLerp(a, b, c) {
    return (c - a) / (b - a);
}

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

// Change points here - Use the following format:
// [Star Rating, [Red, Green, Blue]]
let points = [
    [0, [85, 202, 255]],
    [1, [85, 202, 255]],
    [2.5, [8, 255, 179]],
    [5, [0, 173, 17]],
    [7, [206, 185, 2]],
    [9, [226, 113, 0]],
    [10, [212, 31, 0]],
    [11, [221, 0, 110]],
    [12, [126, 0, 186]],
    [13.25, [0, 0, 0]],
    [15, [0, 0, 0]],
];

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

// Map Lable Update Code
function updateMap(Maps) {
    for(let i = 0; i < Maps.length; i++) {
            let starRating = String(Maps[i].innerHTML).slice(0, -1);
            let BackColor = getLerpedColor(points, starRating);
            Maps[i].style.setProperty("background-color", BackColor, "important");
        }
}

(async function() {
    'use strict';

    while(true){
        await new Promise(r => setTimeout(r, 1));
        // Instead of writing some complex code to just filter for the "svelte-5pua3r" and "svelte-aoq06a" parts from the classes
        // It's just easier to put them into their own variables - This is slower but also i dont care :p
        var expertPlusMaps = document.getElementsByClassName("tag expert-plus svelte-5pua3r");
        var expertMaps = document.getElementsByClassName("tag expert svelte-5pua3r");
        var hardMaps = document.getElementsByClassName("tag hard svelte-5pua3r");
        var normalMaps = document.getElementsByClassName("tag normal svelte-5pua3r");
        var easyMaps = document.getElementsByClassName("tag easy svelte-5pua3r");

        var expertPlusLabel = document.getElementsByClassName("tag mb-2 expert-plus svelte-aoq06a")
        var expertLabel = document.getElementsByClassName("tag mb-2 expert svelte-aoq06a")
        var hardLabel = document.getElementsByClassName("tag mb-2 hard svelte-aoq06a")
        var normalLabel = document.getElementsByClassName("tag mb-2 normal svelte-aoq06a")
        var easyLabel = document.getElementsByClassName("tag mb-2 easy svelte-aoq06a")

        // Update Map Labels on Player Pages and Ranked List
        updateMap(easyMaps)
        updateMap(normalMaps)
        updateMap(hardMaps)
        updateMap(expertMaps)
        updateMap(expertPlusMaps)

        // Update Map Labels on actual Map Pages
        updateMap(easyLabel)
        updateMap(normalLabel)
        updateMap(hardLabel)
        updateMap(expertLabel)
        updateMap(expertPlusLabel)
    }
})

(function() {
});
