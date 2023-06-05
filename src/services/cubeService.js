const Cube = require("../models/Cube.js");

exports.getAllCubes = async (search, from, to) => {
  let result = await Cube.find().lean();

  if (search) {
    result = result.filter((cube) =>
      cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (from) {
    result = result.filter((cube) => cube.difficultyLvl >= Number(from));
  }

  if (to) {
    result = result.filter((cube) => cube.difficultyLvl <= Number(to));
  }

  return result;
};

exports.getOneCube = (cubeId) => Cube.findById(cubeId).populate('accessories').lean();

exports.create = (cubeData) => {
  const newCube = new Cube(cubeData);

  return newCube.save();
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  // await Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });

  const cube = await Cube.findById(cubeId);
  cube.accessories.push(accessoryId);

  return cube.save();
};
