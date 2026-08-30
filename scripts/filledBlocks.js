const filledBlocks = [
    Blocks.graphitePress,
	Blocks.multiPress,
	Blocks.siliconSmelter,
	Blocks.siliconCrucible,
	Blocks.kiln,
	Blocks.plastaniumCompressor,
	Blocks.phaseWeaver,
	Blocks.cryofluidMixer,
	Blocks.pyratiteMixer,
	Blocks.blastMixer,
	Blocks.melter,
	Blocks.sporePress,
	Blocks.pulverizer,
	Blocks.coalCentrifuge,
	Blocks.combustionGenerator,
	Blocks.steamGenerator,
	Blocks.differentialGenerator,
	Blocks.rtgGenerator,
	Blocks.thoriumReactor,
	Blocks.impactReactor,
	Blocks.cultivator,
	Blocks.siliconArcFurnace,
	Blocks.carbideCrucible,
	Blocks.electrolyzer,
	Blocks.oxidationChamber,
	Blocks.surgeSmelter,
	Blocks.surgeCrucible,
	Blocks.cyanogenSynthesizer,
	Blocks.slagIncinerator,
	Blocks.phaseSynthesizer,
	Blocks.atmosphericConcentrator,
	Blocks.chemicalCombustionChamber,
	Blocks.pyrolysisGenerator,
	Blocks.phaseHeater,
	Blocks.slagHeater,
	Blocks.fluxReactor,
	Blocks.neoplasiaReactor,
];

const filledBlocksMap = [];
for (let i = 0; i < filledBlocks.length; i++) {
	const block = filledBlocks[i];
    filledBlocksMap[block.id] = true;
}

exports.filledBlocksMap = filledBlocksMap;