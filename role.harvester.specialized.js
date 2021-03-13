/**
 * Harvests energy from source and dumps on a container.
 */
var containerHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting){
            move_to_container(creep);
            return;
        }
        harvest(creep);
    }
};

function move_to_container(creep){
    var containers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
    var found_move = false;
    for(var container of containers){
        var creepsAtContainer = creep.room.lookAt(container).filter(o => o.type == "creep");
        var creep_reached_container = creepsAtContainer.filter(c => c.creep.name == creep.name).length > 0;
        if(creep_reached_container){
            //Assumes ALL containers are next to sources.
            creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
            creep.memory.harvesting = true;
            found_move = OK;
            break;
        }
        var container_in_use = creepsAtContainer.length > 0;
        if(container_in_use)
            continue;
        else {
            found_move = creep.moveTo(container);
            break;
        }
    }
    if(found_move != OK && found_move != ERR_BUSY && found_move != ERR_TIRED){
        console.log("Unable to find container, reason: ", found_move);
    }
}

function harvest(creep){
    const source = Game.getObjectById(creep.memory.sourceId);
    var harvest_result = creep.harvest(source);
    if(harvest_result != OK && harvest_result != ERR_NOT_ENOUGH_RESOURCES){
        console.log("Specialized Harvester unexpected behavior: ", harvest_result);
    }
}

module.exports = containerHarvester;