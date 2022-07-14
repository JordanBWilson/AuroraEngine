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
	commonScrap: 0,
	unCommonScrap: 0,
	uniqueScrap: 0, // rare
	intriguingScrap: 0, // epic
	facinatingScrap: 0, // legendary
	mythicScrap: 0,
	exoticScrap: 0, // I'm thinking this scrap type could be used to make special items
	// ---scrap base prices--- these prices will determine how much parts and robots will cost
	// when calcing the barter price upgrade, use these numbers
	commonScrapBase: { money: 'copper', price: 5 },
	unCommonScrapBase: { money: 'copper', price: 25 },
	uniqueScrapBase: { money: 'copper', price: 250 },
	intriguingScrapBase: { money: 'copper', price: 600 },
	facinatingScrapBase: { money: 'bronze', price: 5 },
	mythicScrapBase: { money: 'bronze', price: 25 },
	exoticScrapBase: { money: 'bronze', price: 100 },
	// -- general stats to improve and upgrade
	scrapInvintory: 10, // how much scrap can the player hold
	scrapperSkill: 0, // ability to find more rare scrap
	roboticSkill: 0, // ability to put together robots with higher tiered parts
	engineeringSkill: 0, // abiltiy to to turn higher tiered scrap into parts
	barterSkill: 0, // sell for more on the grand exchange; use percentages to increase prices
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
	robotStorage: 3, // these robots can be sold on the grand exchange
	robotsMade: 0, // or go on adventures to find riches; ***can be upgraded***
	robotTeams: [], // the different robots who are going out to find riches
	discoveredHeads: [], // all the robot heads discovered by the player
	discoveredChassis: [], // all the robot chassis discovered by the player
	discoveredLegs: [], // all the robot legs discovered by the player
	discoveredArms: [], // all the robot arms discovered by the player
	selectedRobot: [], // this is the robot currently selected in the shop
	robotDesigns: [], // this will hold all the different robot design the player has made
	// a robot design can be made into a robot team
	// ---robot menu displaying---
	robotDesignCount: 3, // this is how many robots the player can design right now. Max is 9, go up by 3s; ***can be upgraded***
	selectedRobotDesign: -1, // this is the design that's currently selected
	discoveredPartsList: [], // holds all the organized parts into 5 items per page
	partPageIndex: 0, // this value will store where you are in the part list
	partsDisplayed: '', // can be 'chassis', 'head', 'arm-' + armPos, 'leg-' + legPos
	buildButtonDisabled: false, // if there are no parts or no room for robots, disable the button
	// ---robot returning home---
	scrapHeap: [], // when robots return from their adventures, return scrap here
	newPartFound: false, // display a modal saying 'new part' when in the part menu in factory
};

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
	},
];
