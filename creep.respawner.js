var partFinder = require('creep.parts.finder');
var specialized = require("creep.respawner.specialized");

var respawn = {
    run: function(spawn, creeps){
        if(spawn.memory.specialize){
            specialized.run(spawn, creeps, spawn_for_role);
            return;
        }
        var should_specialize = spawn.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;
        if(should_specialize > 0){
            spawn.memory.specialize = true;
            specialized.run(spawn, creeps, spawn_for_role);
            return;
        }

        spawn_workers(spawn, creeps);
    }
};

function spawn_workers(spawn, creeps){
    var total_worker_fleet = creeps.roles.map(r => creeps[r].amount).reduce((accumulator, val) => accumulator + val);
    if(total_worker_fleet < Memory.maximum_unspecialized_workers){
        var role_index = Memory.current_role_index;
        if(role_index == creeps.roles.length) {
            role_index = 0;
        }
        var current_role = creeps.roles[role_index];
        if(spawn_for_role(current_role, spawn) == OK){
            role_index++;
            Memory.current_role_index = role_index;
        }
    } 
}

function spawn_for_role(role, spawn) {
    var creep_body = partFinder.for_role(role, spawn.room.energyCapacityAvailable);
    if(creep_body.cost <= spawn.room.energyAvailable){
        var spawn_code = spawn.spawnCreep(creep_body.parts
            , `${role}_${Memory.current_id++}`
            , { memory: { role: role } });
        if(spawn_code != OK) {
            console.log(`Failure to create a creep, reason: ${spawn_code}`);
        }
        return spawn_code;
    }
    return ERR_NOT_ENOUGH_ENERGY;
}

module.exports = respawn;