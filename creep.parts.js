const basic_generalized_worker = {
    parts: [WORK, CARRY, CARRY, MOVE, MOVE],
    cost: 300
};
const extended_generalized_worker  = {
    parts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
    cost: 550
};
const simple_harvester = {
    parts: [WORK, WORK, MOVE],
    cost: 250
};
const extended_harvester  = {
    parts: [WORK, WORK, WORK, WORK, WORK, MOVE],
    cost: 550
};
const advanced_harvester = {
    parts: [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
    cost: 700
};
const simple_worker = {
    parts: [WORK, WORK, CARRY, MOVE],
    cost: 300
};
const extended_worker = {
    parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    cost: 550
};
const advanced_worker = {
    parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
    cost: 800
};
const simple_transferer = {
    parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    cost: 300
};
const extended_transferer = {
    parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    cost: 450
};
const advanced_transferer = {
    parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    cost: 750
};

var creepParts = {
    'basic_generalized_worker' : basic_generalized_worker,
    'extended_generalized_worker' : extended_generalized_worker,
    'simple_harvester' : simple_harvester,
    'extended_harvester' : extended_harvester,
    'advanced_harvester' : advanced_harvester,
    'simple_worker' : simple_worker,
    'extended_worker' : extended_worker,
    'advanced_worker' : advanced_worker,
    'simple_transferer' : simple_transferer,
    'extended_transferer' : extended_transferer,
    'advanced_transferer' : advanced_transferer,  
};

module.exports = creepParts;