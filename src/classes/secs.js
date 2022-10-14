import { Entity } from "./Entity";

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

export const secs = new Secs();