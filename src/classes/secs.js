class Entity {   
    /**
     * instantiates a new Entity;
     * @param {number} id the unique id of the entity
     * @param {Secs} secs the instance of secs
     */
    constructor(id, secs){
        this.id = id;
        this.secs = secs;
    }
    /**
     * Retrieves the specified component.
     */
    get (comp) {
        return this.secs.entitiesToComponents[this.id][comp.name];
    }
    /**
     * Adds the specified component.
     */
    add (component) {
        var name = component.constructor.name;
        if (!this.secs.componentsToEntities[name]) {
            this.secs.componentsToEntities[name] = [];
        }

        this.secs.entitiesToComponents[this.id][name] = component;
        this.secs.componentsToEntities[name][this.id] = true;
    }
    /**
     * Removes the specified component.
     */
    // remove (component) {
    //     delete this.secs.entitiesToComponents[this.id][component.name];
    //     delete this.secs.componentsToEntities[component.name][this.id];
    // }
    /**
     * Kills the entity.
     */
    kill () {
        delete this.secs.entities[this.id];
        delete this.secs.entitiesToComponents[this.id];
        for (var comp in this.secs.componentsToEntities) {
            delete this.secs.componentsToEntities[comp][this.id];
        }
    }
};

class Secs {
    nextID = 0;
    entities = [];
    entitiesToComponents = [];
    componentsToEntities = {};
    system = {};

    registerSystems(systems){
        systems.forEach(s=>{
            var name = s.constructor.name;
            this.system[name] = s;
        });        
    }

    /**
     * Creates a new entity.
     */
    createEntity(components) {
        var entityID = this.nextID++;
        var entity = new Entity(entityID, this);        

        this.entities[entityID] = entity;
        this.entitiesToComponents[entityID] = {};

        if (components) {
            components.forEach((component)=>{
                entity.add(component);
            });
        }

        return entity;
    }

    /**
     * Returns all entities having the specified component.
     */
    match(comp) {
        return Object.keys(this.componentsToEntities[comp.name] || []).map((entityID) => {
            return this.entities[entityID];
        });
    }
};

let secs = new Secs();