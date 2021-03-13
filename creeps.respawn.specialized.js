const ideal_fleet = {
     'spec-harvester': 2,
     'transferer' : 3,
     'spec-upgrader' : 3,
     'spec-builder' : 1,
     'spec-repairer' : 1   
}

var specializedRespawner = {
    run: function(spawn, creeps, spawn_for_role){
        var role_to_spawn = find_necessary_role(creeps);
        if(role_to_spawn == "")
            return;
        spawn_for_role(role_to_spawn, spawn);
    }
};

function find_necessary_role(creeps) {
    for(var role of creeps['specialized-roles']){
        if(creeps[role].amount < ideal_fleet[role]) {
            return role;
        }
    }
    return "";
}

module.exports = specializedRespawner;