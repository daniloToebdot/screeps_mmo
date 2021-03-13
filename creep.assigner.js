var sourceAssigner = {
    /** 
     * @param {Creep} creep - assigns a source to creep.memory.sourceId. 
     * @returns {Source};
     **/
    assign: function(creep) {
        const source = Game.getObjectById(creep.memory.sourceId);
        if(source == null) {
            var sources = creep.room.find(FIND_SOURCES);
            var source_memory = null;
            for(var src of sources){
                source_memory = Memory[src.id];
                if(source_memory.current_workers.length < source_memory.max_workers){
                    creep.memory.sourceId = src.id;
                    source_memory.current_workers.push(creep.name);
                    return src;
                }
            }
            var random_index = Math.floor(Math.random() * sources.length);
            var source_id = sources[random_index].id
            creep.memory.sourceId = source_id;
            source_memory.current_workers.push(creep.name);
            return Game.getObjectById(creep.memory.sourceId);
        }
        return source;
    }
};

module.exports = sourceAssigner;