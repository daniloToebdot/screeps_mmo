var _ = require('lodash');

const PICKUP_DROPPED_MINIMUM = 150;

var roleTransferer = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        var target = null;
        if((creep.memory.gathering && creep.store.getFreeCapacity() == 0)) {
            creep.memory.gathering = false;
            creep.memory.containerId = null;
        }
        
	    if(!creep.memory.gathering && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.gathering = true;
	        creep.memory.targetId = null;
	    }

	    if(creep.memory.gathering) {
            gather_energy(creep);
        }
        else {
            transfer_energy(creep);
        }
    }
};

function gather_energy(creep){
    var source = Game.getObjectById(creep.memory.containerId);
    if(source == null)
        source = find_source(creep);

    var result = creep.withdraw(source, RESOURCE_ENERGY);
    if(result == ERR_INVALID_TARGET) 
        result = creep.pickup(source, RESOURCE_ENERGY);

    if(result == ERR_NOT_IN_RANGE) 
        creep.moveTo(source);
}

function find_source(creep){
    var target_source = find_dropped_energy(creep);
    if(target_source == undefined) {
        target_source = find_container(creep);
    }
    creep.memory.containerId = target_source.id;
    return target_source;
}

function find_dropped_energy(creep){
    const sources = creep.room.find(FIND_DROPPED_RESOURCES);
    var dropped_source = sources[0];
    for(var src of sources){
        if(src.energy > dropped_source.energy){
            dropped_source = src;
        }
    }
    if(dropped_source != undefined && dropped_source.energy > PICKUP_DROPPED_MINIMUM){
        creep.memory.containerId = dropped_source.id;
        return dropped_source;
    }
    return null;
}

function find_container(creep){
    var containers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
    var target_container = containers[0];
    for(var container of containers){
        if(container.store.getFreeCapacity(RESOURCE_ENERGY) < target_container.store.getFreeCapacity(RESOURCE_ENERGY)){
            target_container = container;
        }    
    }
    return target_container;
}

function transfer_energy(creep) {
    var target = Game.getObjectById(creep.memory.targetId);
    if(target == null) {
        var target = find_target(creep);
    }
    var transfer_result = creep.transfer(target, RESOURCE_ENERGY);
    if(transfer_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    } else if(transfer_result == ERR_FULL || transfer_result == ERR_INVALID_TARGET || transfer_result == OK)  {
        creep.memory.targetId = null;
    }
}

function find_target(creep) {
    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        maxOps: 1000, ignoreCreeps: true,
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(target != null){
        creep.memory.targetId = target.id;
        return target;
    }
    target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        maxOps: 500, ignoreCreeps: false,
        filter: (creep) => {
            return creep.memory.role != 'transferer' &&
                    creep.memory.role != 'spec-harvester' && 
                    creep.store.getFreeCapacity(RESOURCE_ENERGY) > 25;
        }
    });
    if(target != null){
        creep.memory.targetId = target.id;
        return target;
    }
}

module.exports = roleTransferer;