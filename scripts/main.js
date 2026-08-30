global.rapidSim = {};
global.rapidSim.reload = reload;



const filledBlocksModule = require("filledBlocks")
const filledBlocksMap = filledBlocksModule.filledBlocksMap;



const consumeItemFilterCache = new ObjectMap();

const trackedBuildings = [];


Events.on(WorldLoadEvent, () => Vars.state.rules.reactorExplosions = false);
Events.on(WorldLoadEvent, reload);



Events.on(BlockBuildEndEvent, event => {
    if (event.tile.build !== null && filledBlocksMap[event.tile.build.block.id]) {
        trackedBuildings.push(event.tile.build);
    }
});



Events.run(Trigger.beforeGameUpdate, () => {
    let i = 0;
    while (i < trackedBuildings.length) {
        // using const here and in some other places
        // breaks stuff for some reason ¯\_(ツ)_/¯
        let building = trackedBuildings[i];

        if (building === null || building.dead) {
            trackedBuildings[i] = trackedBuildings[trackedBuildings.length - 1];
            trackedBuildings.length--;
        } else {
            refillBuilding(building);
            i++;
        }
    }
});



function reload() {
    trackedBuildings.length = 0;
    Vars.world.tiles.eachTile(tile => {
        const building = tile.build;

        if (building !== null
            && filledBlocksMap[building.block.id]
            && tile.x == building.tile.x
            && tile.y == building.tile.y
        ) {
            trackedBuildings.push(building);
        }
    });
}



function refillBuilding(building) {
    const consumers = building.block.nonOptionalConsumers;

    for (let i = 0; i < consumers.length; i++) {
        let consumer = consumers[i];

        if (consumer instanceof ConsumeItems) {
            for (let j = 0; j < consumer.items.length; j++) {
                // idk how to handle separateItemCapacity properly ¯\_(ツ)_/¯

                let itemStack = consumer.items[j];

                building.items.set(
                    itemStack.item,
                    building.block.itemCapacity
                );
            }

        } else if (consumer instanceof ConsumeLiquid) {
            building.liquids.set(
                consumer.liquid,
                building.block.liquidCapacity
            );
        
        } else if (consumer instanceof ConsumeItemFilter) {
            let cached = consumeItemFilterCache.get(consumer.filter);

            if (!cached) {
                let itemTypes = []

                Vars.content.items().each(itemType => {
                    if (consumer.filter.get(itemType)) itemTypes.push(itemType);
                });
                consumeItemFilterCache.put(consumer.filter, itemTypes);

                cached = itemTypes;
            }

            for (let j = 0; j < cached.length; j++) {
                let itemType = cached[j];
                building.items.set(
                    itemType,
                    building.block.itemCapacity
                );
            }


        } else if (consumer instanceof ConsumeLiquids) {
            for (let j = 0; j < consumer.liquids.length; j++) {
                // idk if liquid cap is pooled or independent ¯\_(ツ)_/¯

                let liquidStack = consumer.liquids[j];

                building.liquids.set(
                    liquidStack.liquid,
                    building.block.liquidCapacity
                );
            }
        }
    }
}