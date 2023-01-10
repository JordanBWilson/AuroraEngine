// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 2.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// this will keep track of the game
const gameObject = {
	// ---types of scrap matirials---
	commonScrap: 50,
	unCommonScrap: 10,
	uniqueScrap: 10, // rare
	intriguingScrap: 10, // epic
	facinatingScrap: 10, // legendary
	mythicScrap: 10,
	exoticScrap: 10, // I'm thinking this scrap type could be used to make special items
	// ---scrap base prices--- these prices will determine how much parts and robots will cost
	// when calcing the barter price upgrade, use these numbers
	commonScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 5 }
	],
	unCommonScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 25 }
	],
	uniqueScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 250 }
	],
	intriguingScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 600 }
	],
	facinatingScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 5 },
		{ money: 'copper', price: 0 }
	],
	mythicScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 25 },
		{ money: 'copper', price: 0 }
	],
	exoticScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 50 }, 
		{ money: 'copper', price: 0 }
	],
	scrapToSell: '', // this can be common, uncommon, unique, etc.
	// --- upgrade costs
	factoryUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 1,
		copper: 5
	},
	engineeringUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	roboticsUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	scrappingUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	barteringUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	arenaUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	scrapInvUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	partInvUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	robotInvUpgradeCost: {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 5
	},
	// -- general stats to improve and upgrade
	scrapInvintory: 10, // how much scrap can the player hold
	scrapInvintoryLevel: 0,
	scrapperSkill: 0, // ability to find more rare scrap
	roboticSkill: 0, // ability to put together robots with higher tiered parts.
	engineeringSkill: 0, // abiltiy to to turn higher tiered scrap into parts. makes robots worth more
	barterSkill: 0, // sell for more on the grand exchange; use percentages to increase prices
	partStorage: 6, // how many of each part can be stored at once. ***upgraded with factory level***
	partStorageLevel: 0,
	// ---different tiers of money---
	copper: 0, // 1000 copper = 1 bronze
	bronze: 0, // 1000 bronze = 1 silver
	silver: 0, // 1000 silver = 1 gold
	gold: 0, // 1000 gold = 1 platinum
	platinum: 0, // 1000 platinum = 1 mythryl
	mythryl: 0, // mythryl is the highest tier
	// ---types of buildings---
	factoryBuilt: false, // this building is where the player can make and automate robot production
	factoryLevel: 0, // the factory level will determine how many different robots can be qued and saved
	arenaBuild: false, // this is where multiplayer will come in. assign and build battle bots and buildings
	arenaLevel: 0, // this will determine what type of buildings are availiable in multiplayer
	// ---robot adventuring---
	robotStorage: 3, // total robots that can be made ***can be upgraded***
	robotStorageLevel: 0,
	robotsMade: 0, // current number of robots made
	robotTeams: [], // the different robots who could go out to find riches or to be sold
	discoveredHeads: [], // all the robot heads discovered by the player
	discoveredChassis: [], // all the robot chassis discovered by the player
	discoveredLegs: [], // all the robot legs discovered by the player
	discoveredArms: [], // all the robot arms discovered by the player
	selectedRobot: [], // this is the robot currently selected in the shop
	robotDesigns: [], // this will hold all the different robot design the player has made
	// a robot design can be made into a robot team
	// ---robot menu displaying---
	robotDesignCount: 3, // this is how many robots the player can design right now. Max is 9, go up by 3s; ***upgraded with factory level***
	selectedRobotDesign: -1, // this is the design that's currently selected
	discoveredPartsList: [], // holds all the organized parts into 5 items per page
	partPageIndex: 0, // this value will store where you are in the part list
	partsDisplayed: '', // can be 'chassis', 'head', 'arm-' + armPos, 'leg-' + legPos
	buildButtonDisabled: false, // if there are no parts or no room for robots, disable the button
	// ---robot returning home---
	scrapHeap: [], // when robots return from their adventures, return scrap here
	newPartFound: false, // display a modal saying 'new part' when in the part menu in factory
};
// ** Robot Parts ***
const robotHeads = [
	{
		headId: 1,
		type: 'head',
		name: 'New World Head',
		img: 'orange',
		count: 6, // how many parts have been made
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 3,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		headId: 2,
		type: 'head',
		name: 'NW Scrapper Head',
		img: 'coral',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		headId: 3,
		type: 'head',
		name: 'NW Scout Head',
		img: 'darkgoldenrod',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 4,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		headId: 4,
		type: 'head',
		name: 'NW Harvester Head',
		img: 'cornflowerblue',
		count: 1,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
];
const robotChassis = [
	{
		chassisId: 1,
		type: 'chassis',
		name: 'New World Chassis',
		img: 'orange',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		chassisId: 2,
		type: 'chassis',
		name: 'NW Scrapper Chassis',
		img: 'coral',
		count: 6,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 2,
		},
		scrapToBuild: {
			commonScrap: 10,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		chassisId: 3,
		type: 'chassis',
		name: 'NW Scout Chassis',
		img: 'darkgoldenrod',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 9,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		chassisId: 4,
		type: 'chassis',
		name: 'NW Harvester Chassis',
		img: 'cornflowerblue',
		count: 1,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 10,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		chassisId: 5,
		type: 'chassis',
		name: 'Test Chassis-1',
		img: 'red',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		chassisId: 6,
		type: 'chassis',
		name: 'Test Chassis-2',
		img: 'red',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
];
const robotLegs = [
	{
		legId: 1,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'New World Leg',
		img: 'orange',
		count: 2,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		legId: 2,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Leg',
		img: 'coral',
		count: 2,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		legId: 3,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Leg',
		img: 'darkgoldenrod',
		count: 12,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		legId: 4,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Harvester Leg',
		img: 'cornflowerblue',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 1,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
];
const robotArms = [
	{
		armId: 1,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'New World Arm',
		img: 'orange',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		armId: 2,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Arm',
		img: 'coral',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		armId: 3,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Arm',
		img: 'darkgoldenrod',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
	{
		armId: 4,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Harvester Arm',
		img: 'cornflowerblue',
		count: 12,
		stats: {
			att: 2,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
		requires: {
			factoryLevel: 0,
			roboticSkill: 0,
			engineeringSkill: 0,
		},
	},
];

// *** Add Funds ***
function addFunds(addFund) {
	addFund.forEach(fund => {
		if (fund.money === 'copper') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.copper++;
				if (gameObject.copper >= 1000) {
					gameObject.copper = 0;
					gameObject.bronze++;
				}
			}
		}
		if (fund.money === 'bronze') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.bronze++;
				if (gameObject.bronze >= 1000) {
					gameObject.bronze = 0;
					gameObject.silver++;
				}
			}
		}
		if (fund.money === 'silver') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.silver++;
				if (gameObject.silver >= 1000) {
					gameObject.silver = 0;
					gameObject.gold++;
				}
			}
		}
		if (fund.money === 'gold') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.gold++;
				if (gameObject.gold >= 1000) {
					gameObject.gold = 0;
					gameObject.platinum++;
				}
			}
		}
		if (fund.money === 'platinum') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.platinum++;
				if (gameObject.platinum >= 1000) {
					gameObject.platinum = 0;
					gameObject.mythryl++;
				}
			}
		}
		if (fund.money === 'mythryl') {
			gameObject.mythryl += fund.price;
		}
	});
}

// *** Subtract Funds ***
function checkSubtractFunds(subFunds) {
	let problems = 0;
	subFunds.forEach(fund => {
		if (fund.money === 'copper') {
			if (fund.price > gameObject.copper) {
				let noProblems = 0;
				if (gameObject.bronze > 0) {
					noProblems++;
				} 
				if (gameObject.silver > 0) {
					noProblems++;
				}
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'bronze') {
			if (fund.price > gameObject.bronze) {
				let noProblems = 0;
				if (gameObject.silver > 0) {
					noProblems++;
				}
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'silver') {
			if (fund.price > gameObject.silver) {
				let noProblems = 0;
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'gold') {
			if (fund.price > gameObject.gold) {
				let noProblems = 0;
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'platinum') {
			if (fund.price > gameObject.platinum) {
				let noProblems = 0;
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'mythryl') {
			if (fund.price > gameObject.mythryl) {
				problems++;
			}
		}
	});
	if (problems === 0) {
		return true;
	} else {
		return false;
	}
}

function subtractFunds(subFunds) {
	const plentyFunds = checkSubtractFunds(subFunds);
	if (plentyFunds) {
		subFunds.forEach(fund => {
			if (fund.money === 'copper') {
				if (fund.price > gameObject.copper) {
					let converted = false;
					if (!converted && gameObject.bronze > 0) {
						gameObject.bronze--;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					} 
					if (!converted && gameObject.silver > 0) {
						gameObject.silver--;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
				} else {
					gameObject.copper -= fund.price;
				}
			}
			if (fund.money === 'bronze') {
				if (fund.price > gameObject.bronze) {
					let converted = false;
					if (!converted && gameObject.silver > 0) {
						gameObject.silver--;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
				} else {
					gameObject.bronze -= fund.price;
				}
			}
			if (fund.money === 'silver') {
				if (fund.price > gameObject.silver) {
					let converted = false;
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
				} else {
					gameObject.silver -= fund.price;
				}
			}
			if (fund.money === 'gold') {
				if (fund.price > gameObject.gold) {
					let converted = false;
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold += 1000;
						gameObject.gold -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold += 1000;
						gameObject.gold -= fund.price;
						converted = true;
					}
				} else {
					gameObject.gold -= fund.price;
				}
			}
			if (fund.money === 'platinum') {
				if (fund.price > gameObject.platinum) {
					let converted = false;
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum += 1000;
						gameObject.platinum -= fund.price;
						converted = true;
					}
				} else {
					gameObject.platinum -= fund.price;
				}
			}
			if (fund.money === 'mythryl') {
				if (gameObject.mythryl > fund.price) {
					gameObject.mythryl -= fund.price;
				}
			}
		});
	}
}

// *** Display player funds ***
function displayCondensedFunds(highFundX, highFundY, lowFundX, lowFundY, font, color, align) {
	if (gameObject.mythryl > 0) {
		// future Jordan, 99,999 is the max number on mobile display
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Mythryl: ' + gameObject.mythryl,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(lowFundX),
					posY: Game.placeEntityY(lowFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.platinum > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(lowFundX),
					posY: Game.placeEntityY(lowFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.gold > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(lowFundX),
					posY: Game.placeEntityY(lowFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.silver > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(lowFundX),
					posY: Game.placeEntityY(lowFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.bronze > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(lowFundX),
					posY: Game.placeEntityY(lowFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.copper >= 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: font,
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(highFundX),
					posY: Game.placeEntityY(highFundY),
					color: color,
					align: align ? align : 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	}
}

function formatDisplayValue(formatPartCost) {
	
	const displayPartValue = {
		highValue: {
			type: '',
			value: 0
		},
		lowValue: {
			type: '',
			value: 0
		}
	}
	if (formatPartCost.mythryl > 0) {
		displayPartValue.highValue = {
			type: 'Mythryl', 
			value: formatPartCost.mythryl
		}
		displayPartValue.lowValue = {
			type: 'Platinum', 
			value: formatPartCost.platinum
		}
	} else if (formatPartCost.platinum > 0) {
		displayPartValue.highValue = {
			type: 'Platinum', 
			value: formatPartCost.platinum
		}
		displayPartValue.lowValue = {
			type: 'Gold', 
			value: formatPartCost.gold
		}
	} else if (formatPartCost.gold > 0) {
		displayPartValue.highValue = {
			type: 'Gold', 
			value: formatPartCost.gold
		}
		displayPartValue.lowValue = {
			type: 'Silver', 
			value: formatPartCost.silver
		}
	} else if (formatPartCost.silver > 0) {
		displayPartValue.highValue = {
			type: 'Silver', 
			value: formatPartCost.silver
		}
		displayPartValue.lowValue = {
			type: 'Bronze', 
			value: formatPartCost.bronze
		}
	} else if (formatPartCost.bronze > 0) {
		displayPartValue.highValue = {
			type: 'Bronze', 
			value: formatPartCost.bronze
		}
		displayPartValue.lowValue = {
			type: 'Copper', 
			value: formatPartCost.copper
		}
	} else if (formatPartCost.copper > 0) {
		displayPartValue.highValue = {
			type: 'Copper', 
			value: formatPartCost.copper
		}
	}
	
	return displayPartValue;
}

function combineRobotParts(robot) {
	const parts = {
		scrapToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		}
	}
	
	robot.forEach(part => {
			parts.scrapToBuild.commonScrap += part.scrapToBuild.commonScrap;
			parts.scrapToBuild.unCommonScrap += part.scrapToBuild.unCommonScrap;
			parts.scrapToBuild.uniqueScrap += part.scrapToBuild.uniqueScrap;
			parts.scrapToBuild.intriguingScrap += part.scrapToBuild.intriguingScrap;
			parts.scrapToBuild.facinatingScrap += part.scrapToBuild.facinatingScrap;
			parts.scrapToBuild.mythicScrap += part.scrapToBuild.mythicScrap;
			parts.scrapToBuild.exoticScrap += part.scrapToBuild.exoticScrap;
	});
		
	return parts;
}

function formatPartsCostToFunds(formatPartCost) {
	const addPartCost = [
		{ money: 'mythryl', price: formatPartCost.mythryl },
		{ money: 'platinum', price: formatPartCost.platinum },
		{ money: 'gold', price: formatPartCost.gold },
		{ money: 'silver', price: formatPartCost.silver },
		{ money: 'bronze', price: formatPartCost.bronze },
		{ money: 'copper', price: formatPartCost.copper }
	];
	return addPartCost;
}

function gatherScrapCostFromPart(part) {
	const scrapCosts = [];
	for (const scrap in part.scrapToBuild) {
					
		if (part.scrapToBuild[scrap] > 0) {
			const scrapObj = { 
				type: scrap, 
				cost: part.scrapToBuild[scrap]
			};
			scrapCosts.push(scrapObj);
		}
	}
	return scrapCosts;
}

function calculatePartPrice(scrapCosts) { // scrap cost is an array of scrap and amount of scrap
	const partCost = {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 0,
	}
	// get how much scrap it takes to build a part and
	// multiply it by how much that scrap is worth
	scrapCosts.forEach((scrap, i) => {
		if (scrap.type === 'commonScrap') {
			gameObject.commonScrapBase.forEach(commonScrap => {
				if (commonScrap.price > 0) {
					if (commonScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += commonScrap.price * scrap.cost;
					}
					if (commonScrap.money === 'platinum') {
						partCost.platinum += commonScrap.price * scrap.cost;
					}
					if (commonScrap.money === 'gold') {
						partCost.gold += commonScrap.price * scrap.cost;
					}
					if (commonScrap.money === 'silver') {
						partCost.silver += commonScrap.price * scrap.cost;
					}
					if (commonScrap.money === 'bronze') {
						partCost.bronze += commonScrap.price * scrap.cost;
					}
					if (commonScrap.money === 'copper') {
						partCost.copper += commonScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'unCommonScrap') {
			gameObject.unCommonScrapBase.forEach(unCommonScrap => {
				if (unCommonScrap.price > 0) {
					if (unCommonScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += unCommonScrap.price * scrap.cost;
					}
					if (unCommonScrap.money === 'platinum') {
						partCost.platinum += unCommonScrap.price * scrap.cost;
					}
					if (unCommonScrap.money === 'gold') {
						partCost.gold += unCommonScrap.price * scrap.cost;
					}
					if (unCommonScrap.money === 'silver') {
						partCost.silver += unCommonScrap.price * scrap.cost;
					}
					if (unCommonScrap.money === 'bronze') {
						partCost.bronze += unCommonScrap.price * scrap.cost;
					}
					if (unCommonScrap.money === 'copper') {
						partCost.copper += unCommonScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'uniqueScrap') {
			gameObject.uniqueScrapBase.forEach(uniqueScrap => {
				if (uniqueScrap.price > 0) {
					if (uniqueScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += uniqueScrap.price * scrap.cost;
					}
					if (uniqueScrap.money === 'platinum') {
						partCost.platinum += uniqueScrap.price * scrap.cost;
					}
					if (uniqueScrap.money === 'gold') {
						partCost.gold += uniqueScrap.price * scrap.cost;
					}
					if (uniqueScrap.money === 'silver') {
						partCost.silver += uniqueScrap.price * scrap.cost;
					}
					if (uniqueScrap.money === 'bronze') {
						partCost.bronze += uniqueScrap.price * scrap.cost;
					}
					if (uniqueScrap.money === 'copper') {
						partCost.copper += uniqueScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'intriguingScrap') {
			gameObject.intriguingScrapBase.forEach(intriguingScrap => {
				if (intriguingScrap.price > 0) {
					if (intriguingScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += intriguingScrap.price * scrap.cost;
					}
					if (intriguingScrap.money === 'platinum') {
						partCost.platinum += intriguingScrap.price * scrap.cost;
					}
					if (intriguingScrap.money === 'gold') {
						partCost.gold += intriguingScrap.price * scrap.cost;
					}
					if (intriguingScrap.money === 'silver') {
						partCost.silver += intriguingScrap.price * scrap.cost;
					}
					if (intriguingScrap.money === 'bronze') {
						partCost.bronze += intriguingScrap.price * scrap.cost;
					}
					if (intriguingScrap.money === 'copper') {
						partCost.copper += intriguingScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'facinatingScrap') {
			gameObject.facinatingScrapBase.forEach(facinatingScrap => {
				if (facinatingScrap.price > 0) {
					if (facinatingScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += facinatingScrap.price * scrap.cost;
					}
					if (facinatingScrap.money === 'platinum') {
						partCost.platinum += facinatingScrap.price * scrap.cost;
					}
					if (facinatingScrap.money === 'gold') {
						partCost.gold += facinatingScrap.price * scrap.cost;
					}
					if (facinatingScrap.money === 'silver') {
						partCost.silver += facinatingScrap.price * scrap.cost;
					}
					if (facinatingScrap.money === 'bronze') {
						partCost.bronze += facinatingScrap.price * scrap.cost;
					}
					if (facinatingScrap.money === 'copper') {
						partCost.copper += facinatingScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'mythicScrap') {
			gameObject.mythicScrapBase.forEach(mythicScrap => {
				if (mythicScrap.price > 0) {
					if (mythicScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += mythicScrap.price * scrap.cost;
					}
					if (mythicScrap.money === 'platinum') {
						partCost.platinum += mythicScrap.price * scrap.cost;
					}
					if (mythicScrap.money === 'gold') {
						partCost.gold += mythicScrap.price * scrap.cost;
					}
					if (mythicScrap.money === 'silver') {
						partCost.silver += mythicScrap.price * scrap.cost;
					}
					if (mythicScrap.money === 'bronze') {
						partCost.bronze += mythicScrap.price * scrap.cost;
					}
					if (mythicScrap.money === 'copper') {
						partCost.copper += mythicScrap.price * scrap.cost;
					}
				}
			});
		} else if (scrap.type === 'exoticScrap') {
			gameObject.exoticScrapBase.forEach(exoticScrap => {
				if (exoticScrap.price > 0) {
					if (exoticScrap.money === 'mythryl') {
						// how much scrap takes to make the part * the parts worth
						partCost.mythryl += exoticScrap.price * scrap.cost;
					}
					if (exoticScrap.money === 'platinum') {
						partCost.platinum += exoticScrap.price * scrap.cost;
					}
					if (exoticScrap.money === 'gold') {
						partCost.gold += exoticScrap.price * scrap.cost;
					}
					if (exoticScrap.money === 'silver') {
						partCost.silver += exoticScrap.price * scrap.cost;
					}
					if (exoticScrap.money === 'bronze') {
						partCost.bronze += exoticScrap.price * scrap.cost;
					}
					if (exoticScrap.money === 'copper') {
						partCost.copper += exoticScrap.price * scrap.cost;
					}
				}
			});
		}
	});
	const formatPartCost = {
		mythryl: 0,
		platinum: 0,
		gold: 0,
		silver: 0,
		bronze: 0,
		copper: 0,
	}
	// check and see if we need convert the money to the 
	// next highest value
	if (partCost.copper >= 1000) {
		for (let i = 0; i < partCost.copper; i++) {
			formatPartCost.copper++;
			if (formatPartCost.copper >= 1000) {
				formatPartCost.copper = 0;
				formatPartCost.bronze++;
			}
		}
	} else {
		formatPartCost.copper = partCost.copper;
	}
	if (partCost.bronze >= 1000) {
		for (let i = 0; i < partCost.bronze; i++) {
			formatPartCost.bronze++;
			if (formatPartCost.bronze >= 1000) {
				formatPartCost.bronze = 0;
				formatPartCost.silver++;
			}
		}
	} else {
		formatPartCost.bronze = partCost.bronze;
	}
	if (partCost.silver >= 1000) {
		for (let i = 0; i < partCost.silver; i++) {
			formatPartCost.silver++;
			if (formatPartCost.silver >= 1000) {
				formatPartCost.silver = 0;
				formatPartCost.gold++;
			}
		}
	} else {
		formatPartCost.silver = partCost.silver;
	}
	if (partCost.gold >= 1000) {
		for (let i = 0; i < partCost.gold; i++) {
			formatPartCost.gold++;
			if (formatPartCost.gold >= 1000) {
				formatPartCost.gold = 0;
				formatPartCost.platinum++;
			}
		}
	} else {
		formatPartCost.gold = partCost.gold;
	}
	if (partCost.platinum >= 1000) {
		for (let i = 0; i < partCost.platinum; i++) {
			formatPartCost.platinum++;
			if (formatPartCost.platinum >= 1000) {
				formatPartCost.platinum = 0;
				formatPartCost.mythryl++;
			}
		}
	} else {
		formatPartCost.platinum = partCost.platinum;
	}
	return formatPartCost;
}
