const MAXIMUM_SPACES = 9;
const WORKER_MULTIPLIER = 1.4;

/**
 * Initializes variables u
 */
var initializer = {
    initialize: function(spawn){
        console.log("initializing!");

        var havesting_spaces = 0;
        var sources = spawn.room.find(FIND_SOURCES);
        for(var source of sources){
            havesting_spaces += set_source_usable_space(source, spawn.room);
        }
        Memory.maximum_unspecialized_workers = havesting_spaces * WORKER_MULTIPLIER;

        if(Memory.current_role_index == undefined)
            Memory.current_role_index = 0;

        if(Memory.current_id == undefined)
            Memory.current_id = 0;
    }
};

function set_source_usable_space(source, room){
    var usable_space = calculate_usable_spaces(source, room);
    var workers = room.find(FIND_MY_CREEPS, { filter : get_workers_using_source_filter(source)});
    Memory[source.id] = {
        max_workers : usable_space,
        current_workers : _.map(workers, w => w.name)
    };
    return usable_space;
}

function get_workers_using_source_filter(source){
    return function(creep) {
        return creep.memory.sourceId === source.id;
    }
}

function calculate_usable_spaces(source, room){
    var pos = source.pos;
    var terrains = room.lookForAtArea(LOOK_TERRAIN, pos.y-1, pos.x-1, pos.y+1, pos.x+1, true);
    return MAXIMUM_SPACES - terrains.filter(t => t.terrain == 'wall').length;
}

module.exports = initializer;