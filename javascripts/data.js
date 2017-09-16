"use strict";

const printToDom = require('./dom');
const loadGifs = require('./gifs');
const loadCategories = require('./categories');
let gifArray = [];

const errorFunction = () => {
	console.log("you broke everything");
};

// When Gif Loads
const whenGifsLoad = function(){
	gifArray = JSON.parse(this.responseText).gifs;
	// Load categories
	loadCategories(whenCategoriesLoad, errorFunction);
};

const whenCategoriesLoad = function(){
	let categoryArray = JSON.parse(this.responseText).categories;
	// Combine arrays
	combineArrays(categoryArray);
};

const combineArrays = (categories) => {
	categories.forEach((category) => {
		gifArray.forEach((gif) => {
			// if gif has category of 1 and category has id of 1
			if(gif.category === category.id){
				gif.categoryName = category.name;
				gif.categoryDataName = category.dataName;
			}
		});
	});
	//call the print to dom
	printToDom(gifArray);
}; 

// setup 'initializer' - in order to set off the chain of events (load gifs)
const initializer = () => {
	loadGifs(whenGifsLoad, errorFunction);
};

const getGifs = () => {
	return gifArray;
};

module.exports = {initializer, getGifs};