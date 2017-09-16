"use strict";

const doItAll = require('./data');
const activateEvents = require('./events');

//do it all is now an object so add .initializer
doItAll.initializer();
activateEvents.filterEvent();