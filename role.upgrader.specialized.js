var roleSpecializedUpgrader = {
    run: function(creep) {
        var result = creep.upgradeController(creep.room.controller);
        if(result == ERR_NOT_IN_RANGE || result == ERR_NOT_ENOUGH_RESOURCES) {
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleSpecializedUpgrader;