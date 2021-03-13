var workerRole = require('role.worker');

var roleHarvester = {
    run: function(creep) {
        workerRole.run(creep, deliver_energy);
    }
};

function deliver_energy(creep){
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
}

module.exports = roleHarvester;