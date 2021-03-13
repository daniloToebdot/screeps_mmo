var parts = require('creep.parts');

const harvester_parts = [parts.advanced_harvester, parts.extended_harvester, parts.simple_harvester];
const builder_parts = [parts.advanced_worker, parts.extended_worker, parts.simple_worker]; 
const upgrader_parts = [parts.advanced_worker, parts.extended_worker, parts.simple_worker]; 
const repairer_parts = [parts.extended_worker, parts.simple_worker]; 
const transferer_parts = [parts.advanced_transferer, parts.extended_transferer, parts.simple_transferer]; 
const generalized_parts = [parts.extended_generalized_worker, parts.basic_generalized_worker];

var role_to_parts = {
    'spec-harvester' : harvester_parts,
    'spec-builder' : builder_parts,
    'spec-upgrader' : upgrader_parts,
    'spec-repairer' : repairer_parts,
    'transferer' : transferer_parts,
    'builder' : generalized_parts,
    'harvester' : generalized_parts,
    'upgrader' : generalized_parts,
}

var partFinder = {
    for_role : function(role, capacity) {
        return role_to_parts[role].find(r => r.cost <= capacity);
    }
};

module.exports = partFinder;