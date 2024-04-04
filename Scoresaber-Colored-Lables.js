// ==UserScript==
// @name         Scoresaber SR Colored Labels
// @namespace    SS Star Rating Color
// @version      1.0
// @description  Changes the Star Rating difficulty lable colors to represent the actual Star Rating of the map
// @author       potasium_
// @match        https://scoresaber.com/*
// @icon         https://scoresaber.com/imports/images/logo.ico
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_log
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

(async function() {
    'use strict';

    while(true){
    await new Promise(r => setTimeout(r, 500));
    // Instead of writing some complex code to just filter for the "svelte-5pua3r" and "svelte-aoq06a" parts from the classes
    // It's just easier to put them into their own variables - This is slower but also i dont care :p
    var expertPlusMaps = document.getElementsByClassName("tag expert-plus svelte-5pua3r");
    var expertMaps = document.getElementsByClassName("tag expert svelte-5pua3r");
    var hardMaps = document.getElementsByClassName("tag hard svelte-5pua3r");
    var normalMaps = document.getElementsByClassName("tag normal svelte-5pua3r");
    var easyMaps = document.getElementsByClassName("tag easy svelte-5pua3r");

    var expertPlusLable = document.getElementsByClassName("tag mb-2 expert-plus svelte-aoq06a")
    var expertLable = document.getElementsByClassName("tag mb-2 expert svelte-aoq06a")
    var hardLable = document.getElementsByClassName("tag mb-2 hard svelte-aoq06a")
    var normalLable = document.getElementsByClassName("tag mb-2 normal svelte-aoq06a")
    var easyLable = document.getElementsByClassName("tag mb-2 easy svelte-aoq06a")

    // Map Lables on Player Pages and Ranked Maps pages
    for(let i = 0; i < easyMaps.length; i++) {
        let BackColor = getLerpedColor(points, String(easyMaps[i].innerHTML).slice(0, -1));
        easyMaps[i].style.setProperty("background-color", BackColor, "important");
    }
    for(let i = 0; i < normalMaps.length; i++) {
        let BackColor = getLerpedColor(points, String(normalMaps[i].innerHTML).slice(0, -1));
        normalMaps[i].style.setProperty("background-color", BackColor, "important");
    }
    for(let i = 0; i < hardMaps.length; i++) {
        let BackColor = getLerpedColor(points, String(hardMaps[i].innerHTML).slice(0, -1));
        hardMaps[i].style.setProperty("background-color", BackColor, "important");
    }
    for(let i = 0; i < expertMaps.length; i++) {
        let BackColor = getLerpedColor(points, String(expertMaps[i].innerHTML).slice(0, -1));
        expertMaps[i].style.setProperty("background-color", BackColor, "important");
    }
    for(let i = 0; i < expertPlusMaps.length; i++) {
        let BackColor = getLerpedColor(points, String(expertPlusMaps[i].innerHTML).slice(0, -1));
        expertPlusMaps[i].style.setProperty("background-color", BackColor, "important");
    }

    // Map Lables on the actual Map Pages
    if(easyLable.length > 0){
        let BackColor = getLerpedColor(points, String(easyLable[0].innerHTML).slice(0, -1));
        easyLable[0].style.setProperty("background-color", BackColor, "important");
    }
    if(normalLable.length > 0){
        let BackColor = getLerpedColor(points, String(normalLable[0].innerHTML).slice(0, -1));
        normalLable[0].style.setProperty("background-color", BackColor, "important");
    }
    if(hardLable.length > 0){
        let BackColor = getLerpedColor(points, String(hardLable[0].innerHTML).slice(0, -1));
        hardLable[0].style.setProperty("background-color", BackColor, "important");
    }
    if(expertLable.length > 0){
        let BackColor = getLerpedColor(points, String(expertLable[0].innerHTML).slice(0, -1));
        expertLable[0].style.setProperty("background-color", BackColor, "important");
    }
    if(expertPlusLable.length > 0){
        let BackColor = getLerpedColor(points, String(expertPlusLable[0].innerHTML).slice(0, -1));
        expertPlusLable[0].style.setProperty("background-color", BackColor, "important");
    }
    }
})

(function() {
});
