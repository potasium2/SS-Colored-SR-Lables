// ==UserScript==
// @name         Scoresaber SR Colored Labels
// @namespace    SS Star Rating Color
// @version      1.2.2
// @description  Changes the Star Rating difficulty label colors to represent the actual Star Rating of the map
// @author       potasium_
// @updateURL    https://github.com/potasium2/SS-Colored-SR-Lables/blob/main/Scoresaber-Colored-Labels.js
// @downloadURL  https://github.com/potasium2/SS-Colored-SR-Lables/blob/main/Scoresaber-Colored-Labels.js
// @match        https://scoresaber.com/*
// ==/UserScript==

let Enable_PP_Recolor = true; // Enables PP Recoloring on both profiles and leaderboards
let Enable_SR_Label_Recolor = true; // Enables Star Rating Label Recoloring
let PP_Leaderboard_Color = "rgb(37, 146, 232)" // Score saber default is rgb(137,146,232)
let Simplified_Star_Ratings = false; // Compresses Star Ratings by an exponential Curve to try and simplify Star Ratings a bit (i;e 13 Stars = ~10.5 Stars)

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
    [0, [255, 255, 255]],
    [1, [59, 225, 237]],
    [2.5, [51, 239, 182]],
    [5, [35, 236, 55]],
    [7, [222, 200, 45]],
    [9, [255, 132, 0]],
    [10, [224, 5, 5]],
    [11, [230, 12, 124]],
    [12, [126, 0, 186]],
    [13, [0, 35, 148]],
    [14, [0, 0, 0]],
];

// Alternative Star Rating Points for Simplified SR
let pointsAlternative = [
    [0, [59, 225, 237]],
    [2.5, [59, 225, 237]],
    [5, [51, 239, 182]],
    [6, [35, 236, 55]],
    [7, [222, 200, 45]],
    [8, [255, 132, 0]],
    [8.5, [224, 5, 5]],
    [9, [230, 12, 124]],
    [9.5, [126, 0, 186]],
    [10, [0, 35, 148]],
    [11, [0, 0, 0]],
    [14, [0, 0, 0]],
];

// PP Curve
let PPPoints = [
    [0, [205, 175, 175]],
    [55, [255, 175, 144]],
    [110, [249, 137, 0]],
    [220, [173, 205, 1]],
    [330, [14, 198, 0]],
    [440, [0, 216, 148]],
    [550, [0, 35, 148]],
    [660, [128, 0, 175]],
    [770, [80, 0, 35]],
    [880, [45, 0, 0]],
    [1000, [0, 0, 0]],
];

// Map Label Update Code
function updateMapLabel(Maps) {
    for(let i = 0; i < Maps.length; i++) {
        let starRating = String(Maps[i].innerHTML).slice(0, -1);
        if(!Maps[i].style.backgroundColor && Simplified_Star_Ratings){
            Maps[i].innerHTML = String(Math.round(0.196 * Math.pow(starRating, 1.55) * 100) / 100) + "★";
        }
        starRating = String(Maps[i].innerHTML).slice(0, -1);
        let BackColor = getLerpedColor(points, starRating);
        if(Simplified_Star_Ratings){
            BackColor = getLerpedColor(pointsAlternative, starRating);
        }
        Maps[i].style.setProperty("background-color", BackColor, "important");
    }
}

function updatePP(pp, ppBack){
    for(let i = 0; i < ppBack.length; i++) {
        let BackColor = getLerpedColor(PPPoints, Number(String(pp[i * 2].innerHTML).slice(0, -5)));
        ppBack[i].style.setProperty("background-color", BackColor, "important");
    }
}

function updatePPLeaderboard(pp) {
    for(let i = 0; i < pp.length; i++){
        if(!pp[i].style.color){
            pp[i].style.setProperty("color", PP_Leaderboard_Color, "important");
        }
    }
}

(async function() {
    'use strict';

    while(true){
        await new Promise(r => setTimeout(r, 1));

        let allMaps = document.querySelectorAll("div[class*='tag ']");

        // I cant use the same query selector for both the individual diff labels and ranked/page labels or some code will break
        // Instead I leave the individual diff labels on their own since they take up less time to sort through than the ranked/page labels
        let expertPlusLabel = document.getElementsByClassName("tag mb-2 expert-plus svelte-aoq06a");
        let expertLabel = document.getElementsByClassName("tag mb-2 expert svelte-aoq06a");
        let hardLabel = document.getElementsByClassName("tag mb-2 hard svelte-aoq06a");
        let normalLabel = document.getElementsByClassName("tag mb-2 normal svelte-aoq06a");
        let easyLabel = document.getElementsByClassName("tag mb-2 easy svelte-aoq06a");

        let pp = document.getElementsByClassName("info svelte-1hsacpa");
        let pp2 = document.getElementsByClassName("pp")
        let ppBack = document.getElementsByClassName("stat ranked svelte-1hsacpa");

        // Update Map Labels on Player Pages and Ranked List
        if(Enable_SR_Label_Recolor){
            updateMapLabel(allMaps);
        }

        // Update Map Labels on actual Map Pages
        if(Enable_SR_Label_Recolor){
            updateMapLabel(easyLabel);
            updateMapLabel(normalLabel);
            updateMapLabel(hardLabel);
            updateMapLabel(expertLabel);
            updateMapLabel(expertPlusLabel);
        }

        // Update PP Values on Player Pages
        if(Enable_PP_Recolor){
            updatePP(pp, ppBack)
            updatePPLeaderboard(pp2)
        }
    }
})

(function() {
});
