var workerRole = require('role.worker');

var roleUpgrader = {
    run: function(creep) {
        workerRole.run(creep, upgrade_controller);
	}
};

function upgrade_controller(creep){
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

module.exports = roleUpgrader;