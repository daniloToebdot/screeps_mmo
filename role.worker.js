var assigner = require('creep.source.assigner');

var workerCreep = {
    /** @param {Creep} creep
     *  @param {function(Creep)} do_work - work to be performed by the creep.
     * **/
    run: function(creep, do_work) {
        const source = assigner.assign(creep);
	    if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0)
            creep.memory.working = false;

	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0)
            creep.memory.working = true;
            
	    if(creep.memory.working) {
            do_work(creep);
	    }
	    else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
	    }
	}
};

module.exports = workerCreep;