var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var respawner = require('creep.respawner');
var initializer = require('initializer');

var roleSpecializedHarvester = require('role.harvester.specialized');
var roleSpecializedBuilder = require('role.builder.specialized');
var roleSpecializedUpgrader = require('role.upgrader.specialized');
var roleSpecializedTransferer = require('role.transferer.specialized');
var roleSpecializedRepairer = require('role.repairer.specialized');

var roleDict = {
    'harvester' : roleHarvester,
    'upgrader': roleUpgrader,
    'builder' : roleBuilder,
    'spec-harvester' : roleSpecializedHarvester,
    'transferer' : roleSpecializedTransferer,
    'spec-builder' : roleSpecializedBuilder,
    'spec-upgrader' : roleSpecializedUpgrader,
    'spec-repairer' : roleSpecializedRepairer
};

module.exports.loop = function () {
    initialize_memory();
    run_respawner();
    clean_up_memory();
    run_creeps();
}

function initialize_memory(){
    if(!Memory.initialized){
        try {
            for(const spawn in Game.spawns) {
                initializer.initialize(Game.spawns[spawn]);
            }
            Memory.initialized = true;
        } catch(initialization_exception) {
            console.log(`Initialization failed, reason:${initialization_exception}`);
        }
    }
}

function run_respawner(){
    var current_creeps = list_creeps_by_role();
    for(const spawn in Game.spawns) {
        respawner.run(Game.spawns[spawn], current_creeps);
    }
}

function list_creeps_by_role(){
    var creeps = get_empty_creep_list();
    for (var creepname in Game.creeps){
        var creep_role = Game.creeps[creepname].memory.role;
        creeps[creep_role].amount++;
        creeps[creep_role].names.push(creepname);
    }
    return creeps;
}

function get_empty_creep_list() {
    return {
        'roles' : ['harvester', 'upgrader', 'builder'],
        'specialized-roles' : ['spec-harvester', 'transferer', 'spec-builder', 'spec-upgrader', 'spec-repairer'],
        'harvester' : { amount: 0, names: []},
        'upgrader' : { amount: 0, names: []},
        'builder' : { amount: 0, names: []},
        'spec-harvester' : { amount: 0, names: []},
        'transferer' : { amount: 0, names: []},
        'spec-builder' : { amount: 0, names: []},
        'spec-upgrader' : { amount: 0, names: []},
        'spec-repairer' : { amount: 0, names: []},
    };
}

function clean_up_memory(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var src_id =  Memory.creeps[name].sourceId;
            if(Memory[src_id] != undefined) {
                const index = Memory[src_id].current_workers.indexOf(name);
                Memory[src_id].current_workers.splice(index, 1);
            }
            delete Memory.creeps[name];
        }
    }
}

function run_creeps(){
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var runner = roleDict[creep.memory.role];
        if(runner != undefined)
            runner.run(creep);
        else
            console.log(`role ${creep.memory.role} has no behavior.`)
    }
}
