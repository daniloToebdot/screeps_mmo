var workerRole = require('role.worker');
const WALL_HEALTH = 30000;

var roleBuilder = {
	run: function(creep) {
        workerRole.run(creep, build_with_repair_fallback);
	},
	build : try_build
};

function build_with_repair_fallback(creep){
	if(!try_build(creep)){
		repair(creep);
	}
}

function try_build(creep){
	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	if(targets.length > 0) {
		var result = creep.build(targets[0]);
		if(result == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		} else if(result != OK && result != ERR_NOT_ENOUGH_RESOURCES){
			console.log("failed to build, reason:", result);
		}
	} 
	return targets.length > 0;
}

function repair(creep){
	var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => structure.structureType == STRUCTURE_WALL 
		&& structure.hits < WALL_HEALTH});
	if (target != undefined && creep.repair(target) == ERR_NOT_IN_RANGE) {
		creep.moveTo(target);
	}
}

module.exports = roleBuilder;