var builder_behavior = require('role.builder.specialized');

const WALL_HEALTH = 30000;
const CONTAINER_HEALTH = 75000;
const ROAD_HEALTH = 3000;

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_WALL && structure.hits < WALL_HEALTH)
            || (structure.structureType == STRUCTURE_CONTAINER && structure.hits < CONTAINER_HEALTH)
            || (structure.structureType == STRUCTURE_ROAD && structure.hits < ROAD_HEALTH)});
        if(!target) {
            builder_behavior.run(creep);
        }
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	}
};

module.exports = roleRepairer;