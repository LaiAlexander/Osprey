/**
* The Creation Game (working title)
* Copyright (c) 2014 Lai Alexander Holmsen
*
* Thanks for playing!
*
* v. 0.1
*/

/********************************************
            VARIABLES
********************************************/
// Initialize variables
var electrons = 0;
var electronMaker = {
    total : 0,
    cost : 10,
    increment : 1, // the increment attribute is totally useless, efficiency handles exactly the same thing. Either delete one of them, or find and actual use
    efficiency : 1,
    upgradeCost : 100,
    upgrades : 0,
    maxUpgrades : 10
};

var protons = 0;
var protonMaker = {
    total : 0,
    cost : 10,
    increment : 1,
    efficiency : 1,
    upgradeCost : 100,
    upgrades : 0,
    maxUpgrades : 10
};

var neutrons = 0;
var neutronMaker = {
    total :0,
    cost : 10,
    increment : 1,
    upgradeCost : 100,
    upgrades : 0,
    maxUpgrades : 10
};

var hydrogen = {
    total : 0,
    materialsNeeded : {
        electrons : 1,
        protons : 1
        //neutrons : 1, 2 or 3 depending on isotope
    }
};

var reactor = {
    total : 0,
    cost : 10,
    increment : 1,
    efficiency : 1,
    upgradeCost : 500,
    upgrades : 0,
    maxUpgrades : 10
};

var stats = {
    // holds various stats, like times clicked, total resources gained, times clicked this session, times clicked each resource and so on. can use sessionStorage instead of localStorage to track session stats.
    timesClickedThisSave : 0,
    timesClickedAllTime : 0,
};

var prestige = {
    // holds prestige stats, that should give a bonus when you reset
};

/********************************************
            INITIALIZATION AND LOADING
********************************************/
initialize();
// Should only be ran once
function initialize() {
    // parseInt is important! wihtout it weird things happen, because localStorage stores stuff as strings.
    // should check that the values from localStorage actually exists before doing this
    // if not you could get "unexpected token u"
    // I think this is somewhat buggy. If a save doesnt already exist, I think it bugs out because it doesn't use window.localStorage, but just localStorage.
    // Need to test this a bit, probably have to do it on googledrive, since I can't find a way to delete localStorage from a local file.
    if(localStorage.getItem("electrons")) {
        console.log("electrons " + localStorage.electrons);
        electrons = parseInt(window.localStorage.electrons);
    }
    if(localStorage.getItem('protons')) {
        console.log("protons before parse " + protons);
        protons = parseInt(localStorage.protons);
        console.log("protons after parse  " + localStorage.protons);
    }
    if(localStorage.getItem("neutrons")) {
        neutrons = parseInt(localStorage.neutrons);
    }
    if(localStorage.getItem("hydrogen")) {
        console.log(localStorage.hydrogen);
        hydrogen = JSON.parse(localStorage.hydrogen);
    }
    if(localStorage.getItem("electronMaker")) {
        electronMaker = JSON.parse(localStorage.electronMaker);
    }
    if(localStorage.getItem("protonMaker")) {
        protonMaker = JSON.parse(localStorage.protonMaker);
    }
    if(localStorage.getItem("reactor")) {
        reactor = JSON.parse(localStorage.reactor);
    }
    if(localStorage.getItem("stats")) {
        stats = JSON.parse(localStorage.stats);
    }
    if(localStorage.getItem("neutronMaker")) {
        neutronMaker = JSON.parse(localStorage.neutronMaker);
    }
    updateInventory();
}

// This function should only be ran once, and that is at startup inside initialize();
// also used inside resetSave();
function updateInventory() {
    document.getElementById("numberOfElectrons").innerHTML = electrons;
    document.getElementById("numberOfElectronMakers").innerHTML = electronMaker.total;
    document.getElementById("costOfElectronMaker").innerHTML = electronMaker.cost;
    document.getElementById("efficiencyOfElectronMakers").innerHTML = electronMaker.efficiency;
    document.getElementById("costToUpgradeElectronMaker").innerHTML = electronMaker.upgradeCost;
    document.getElementById("numberOfElectronMakerUpgrades").innerHTML = electronMaker.upgrades;
    document.getElementById("numberOfProtons").innerHTML = protons;
    document.getElementById("numberOfProtonMakers").innerHTML = protonMaker.total;
    document.getElementById("costOfProtonMaker").innerHTML = protonMaker.cost;
    document.getElementById("efficiencyOfProtonMakers").innerHTML = protonMaker.efficiency;
    document.getElementById("costToUpgradeProtonMaker").innerHTML = protonMaker.upgradeCost;
    document.getElementById("numberOfProtonMakerUpgrades").innerHTML = protonMaker.upgrades;
    document.getElementById("numberOfNeutrons").innerHTML = neutrons;
    document.getElementById("numberOfHydrogens").innerHTML = hydrogen.total;
    document.getElementById("numberOfReactors").innerHTML = reactor.total;
    document.getElementById("numberOfHydrogens").innerHTML = hydrogen.total;
    document.getElementById("costOfReactor").innerHTML = reactor.cost;
    document.getElementById("efficiencyOfReactors").innerHTML = reactor.efficiency;
    document.getElementById("costToUpgradeReactor").innerHTML = reactor.upgradeCost;
    document.getElementById("numberOfReactorUpgrades").innerHTML = reactor.upgrades;
}

// Makes it possible to initialize the variables with the saved values
// This is not used as of now. Could be used while declaring the variables, but I think initialize handles this just as well.
function initializeFromStorage(name, startValue) {
    if (localStorage[name] === null) {
        return startValue;
    }
    return parseFloat(localStorage[name]);
}

/********************************************
            GENERATE PARTICLES
********************************************/
// ELECTRONS
function makeElectron(number) {
    electrons += number;
    document.getElementById("numberOfElectrons").innerHTML = electrons;
}

// PROTONS
function makeProton(number) {
    protons += number;
    document.getElementById("numberOfProtons").innerHTML = protons;
}

// NEUTRONS
function makeNeutron(number) {
    neutrons += number;
    document.getElementById("numberOfNeutrons").innerHTML = neutrons;
}

// HYDROGEN
function makeHydrogen(number) {
    if (electrons >= hydrogen.materialsNeeded.electrons * number && protons >= hydrogen.materialsNeeded.protons * number) {
        electrons = electrons - number;
        protons = protons - number;
        hydrogen.total += number;
        document.getElementById("numberOfElectrons").innerHTML = electrons;
        document.getElementById("numberOfProtons").innerHTML = protons;
        document.getElementById("numberOfHydrogens").innerHTML = hydrogen.total;
    }
}

/********************************************
            BUY MACHINES
********************************************/
function buyElectronMaker(number) {
    if(electrons >= electronMaker.cost * number) {
        electronMaker.total += number;
        electrons = electrons - electronMaker.cost * number;
        electronMaker.cost += 2 * number;
        document.getElementById("numberOfElectrons").innerHTML = electrons;
        document.getElementById("numberOfElectronMakers").innerHTML = electronMaker.total;
        document.getElementById("costOfElectronMaker").innerHTML = electronMaker.cost;
    }
}

function buyProtonMaker(number) {
    if(protons >= protonMaker.cost * number) {
        protonMaker.total += number;
        protons = protons - protonMaker.cost * number;
        protonMaker.cost += 2 * number;
        document.getElementById("numberOfProtons").innerHTML = protons;
        document.getElementById("numberOfProtonMakers").innerHTML = protonMaker.total;
        document.getElementById("costOfProtonMaker").innerHTML = protonMaker.cost;
    }
}

function buyReactor(number) {
    if (hydrogen.total >= reactor.cost * number) {
        reactor.total += number;
        hydrogen.total = hydrogen.total - reactor.cost * number;
        reactor.cost += 10 * number;
        document.getElementById("numberOfReactors").innerHTML = reactor.total;
        document.getElementById("numberOfHydrogens").innerHTML = hydrogen.total;
        document.getElementById("costOfReactor").innerHTML = reactor.cost;
    }
}

/********************************************
            UPGRADES
********************************************/
// BUG DOES NOT UPDATE TOTAL UPGRADES FOR SOME REASON, migh be because of display: none? THIS IS FIXED
function upgradeElectronMaker() { // Should probably make this take the object to be upgraded as a parameter
    if(electrons >= electronMaker.upgradeCost && electronMaker.upgrades < electronMaker.maxUpgrades) {
        electronMaker.efficiency *= 2;
        electrons = electrons - electronMaker.upgradeCost;
        electronMaker.upgrades += 1;
        electronMaker.upgradeCost = Math.floor(100 * Math.pow(1.1, electronMaker.upgrades));
        document.getElementById("efficiencyOfElectronMakers").innerHTML = electronMaker.efficiency;
        document.getElementById("costToUpgradeElectronMaker").innerHTML = electronMaker.upgradeCost;
        document.getElementById("numberOfElectronMakerUpgrades").innerHTML = electronMaker.upgrades;
    }
}

/* something like this
function upgrade(type) { // Should probably make this take the object to be upgraded as a parameter
    if(electrons >= type.upgradeCost && type.upgrades < type.maxUpgrades) {
        type.efficiency *= 2;
        electrons = electrons - type.upgradeCost;
        type.upgrades += 1;
        type.upgradeCost = Math.floor(100 * Math.pow(1.1, type.upgrades));
        document.getElementById("efficiencyOfElectronMakers").innerHTML = type.efficiency;
        document.getElementById("costToUpgrade" + String(type)).innerHTML = type.upgradeCost; // this does not work at all, consider adding the name of the kind of object as a variable within the objects itself, although that feels stupid
        document.getElementById("numberOfElectronMakerUpgrades").innerHTML = type.upgrades;
    }
}
*/

function upgradeProtonMaker() { // BUG DOES NOT UPDATE TOTAL UPGRADES FOR SOME REASON, migh be because of display: none? FIXED NP
    if(protons >= protonMaker.upgradeCost && protonMaker.upgrades < protonMaker.maxUpgrades) {
        protonMaker.efficiency *= 2;
        protons = protons - protonMaker.upgradeCost;
        protonMaker.upgrades += 1;
        protonMaker.upgradeCost = Math.floor(100 * Math.pow(1.1, protonMaker.upgrades));
        document.getElementById("efficiencyOfProtonMakers").innerHTML = protonMaker.efficiency;
        document.getElementById("costToUpgradeProtonMaker").innerHTML = protonMaker.upgradeCost;
        document.getElementById("numberOfProtonMakerUpgrades").innerHTML = protonMaker.upgrades;
    }
}

function upgradeReactor() {
    if(hydrogen.total >= reactor.upgradeCost && reactor.upgrades < reactor.maxUpgrades) {
        reactor.efficiency *= 2;
        hydrogen.total = hydrogen.total - reactor.upgradeCost;
        reactor.upgrades++;
        reactor.upgradeCost = Math.floor(500 * Math.pow(1.1, reactor.upgrades));
        document.getElementById("efficiencyOfReactors").innerHTML = reactor.efficiency;
        document.getElementById("costToUpgradeReactor").innerHTML = reactor.upgradeCost;
        document.getElementById("numberOfReactorUpgrades").innerHTML = reactor.upgrades;
    }
}

/********************************************
            SAVE FUNCTIONS
********************************************/
function save() {
    window.localStorage.electrons = electrons;
    window.localStorage.protons = protons;
    window.localStorage.hydrogen = JSON.stringify(hydrogen);
    window.localStorage.electronMaker = JSON.stringify(electronMaker);
    window.localStorage.protonMaker = JSON.stringify(protonMaker);
    window.localStorage.reactor = JSON.stringify(reactor);
    window.localStorage.stats = JSON.stringify(stats);
    window.localStorage.neutrons = neutrons;
    window.localStorage.neutronMaker = JSON.stringify(neutronMaker);
    // For debugging, just to have some control of when the game is saved
    var d = new Date();
    console.log("Game saved " + d.toLocaleString());
    // For debugging
    // console.log("total hydrogen " + JSON.parse(localStorage.hydrogen).total);
    // console.log("total electrons " + localStorage.electrons);
    // console.log("reactor upgrade cost " + JSON.parse(reactor.upgradeCost));
    _3x22();
}

function resetSave() {
    if(confirm("Stoffel will eat everything. Are you sure?")) {
        electrons = 0;
        electronMaker = {
        total : 0,
        cost : 10,
        increment : 1,
        efficiency : 1,
        upgradeCost : 100,
        upgrades : 0,
        maxUpgrades : 10
        };

        protons = 0;
        protonMaker = {
            total : 0,
            cost : 10,
            increment : 1,
            efficiency : 1,
            upgradeCost : 100,
            upgrades : 0,
            maxUpgrades : 10
        };

        neutrons = 0;
        neutronMaker = {
            total :0,
            cost : 10,
            increment : 1,
            upgradeCost : 100,
            upgrades : 0,
            maxUpgrades : 10
        };

        hydrogen = {
            total : 0,
            materialsNeeded : {
                electrons : 1,
                protons : 1
            //neutrons : 1, 2 or 3 depending on isotope
            }
        };

        reactor = {
            total : 0,
            cost : 10,
            increment : 1,
            efficiency : 1,
            upgradeCost : 500,
            upgrades : 0,
            maxUpgrades : 10
        };

        stats = {
            timesClickedThisSave : 0,
            timesClickedAllTime : stats.timesClickedAllTime
        };
    save();
    updateInventory();
    }
}

/********************************************
            UI FUNCTIONS
********************************************/

// This is currently not in use, selectTab is better.
function switchVisibility(list1, list2) {
    var active = document.getElementById(list1);
    var hidden = document.getElementById(list2);
    active.style.display = 'inline';
    hidden.style.display = 'none';
}

// This is fairly straightforward, hides all elements that has class 'tabs' and then shows the parameter.
// Might want to update this a bit, so the type of elements to be hidden can be passed as a parameter as well.
// update it so that the tabs themselves are highlighted when chosen. need to add classes/ids in the html for this to work.
function _4x89777() {
    alert(b);
}

// Clean up this mess. This feels like a very hacky solution to make the tabs themselves have a different color.
// need the tab buttons to have the class "tab-buttons" just for this function to work. must be a better solution. that is the class' only use.
// also need to give the buttons a specific id to make just one of them change color, but that probably is necessary
// jQuery can do this much easier i think
// Make a version of this function in jQuery
// also, for this to work, "active-button" NEEDS to come after "buttons" in the css
function selectTab(activeTab) {
    var active = document.getElementById(activeTab);
    var activeButton = document.getElementById(activeTab + "-tab");
    var tabNames = document.getElementsByClassName('tabs');
    var buttonTabNames = document.getElementsByClassName('tab-buttons');
    for (var i = 0; i < tabNames.length; i++) {
        tabNames[i].style.display = 'none';
        tabNames[i].className ="tabs";
    }
    for (var j = 0; j < buttonTabNames.length; j++) {
        buttonTabNames[j].className = "buttons tab-buttons";
    }
    active.style.display = 'inline';
    active.className = "tabs tab-active";
    activeButton.className = "buttons tab-buttons active-button";
}

function _3x22(){console[_0xa656[1]](a);}

function update() {
    // This is the "autoclickers", or rather generators
    makeElectron(electronMaker.total * electronMaker.increment * electronMaker.efficiency);
    makeProton(protonMaker.total * protonMaker.increment * protonMaker.efficiency);
    makeHydrogen(reactor.total * reactor.increment * reactor.efficiency);
}

window.setInterval(function () {
    update();
}, 1000);

window.setInterval(function () {
    save();
}, 30000);