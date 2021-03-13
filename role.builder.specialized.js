var upgrader_behavior = require('role.upgrader.specialized');
var builder_behavior = require('role.builder');

var roleSpecializedBuilder = {
    run: function(creep) {
        if(!builder_behavior.build(creep)){
            upgrader_behavior.run(creep);
        }
	}
};

module.exports = roleSpecializedBuilder;