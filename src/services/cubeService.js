const Cube = require("../models/Cube.js");
const cubesData = [
  {
    id: "1sdkks234kks98masssasddsa2l94",
    cubeName: "Proffesor's Cube",
    cubeDesc:
      "The Professor's Cube (also known as the 5×5×5 Rubik's Cube and many other names, depending on manufacturer) is a 5×5×5 version of the original Rubik's Cube. It has qualities in common with both the 3×3×3 Rubik's Cube and the 4×4×4 Rubik's Revenge, and solution strategies for both can be applied. ",
    cubeImgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Professor%27s_cube_solved.jpg",
    cubeDiff: 6,
  },
  {
    id: "133sdkksss1vbas234kks98masl98",
    cubeName: "Rubik's Cube",
    cubeDesc:
      "The Rubik's Cube is a 3-D combination puzzle originally invented in 1974[2][3] by Hungarian sculptor and professor of architecture Ernő Rubik.",
    cubeImgUrl:
      "https://www.hpcwire.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067.jpg",
    cubeDiff: 3,
  },
];
const { v4: uuidv4 } = require("uuid");

exports.getAllCubes = (search, from, to) => {
  let result = cubesData.slice();

  if (search) {
    result = result.filter((cube) =>
      cube.cubeName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (from) {
    result = result.filter((cube) => cube.cubeDiff >= Number(from));
  }

  if (to) {
    result = result.filter((cube) => cube.cubeDiff <= Number(to));
  }

  return result;
};

exports.getOneCube = (cubeId) => cubesData.find((x) => x.id == cubeId);

exports.create = async (cubeData) => {
  const newCube = new Cube(cubeData);
  
  await newCube.save();

  return newCube;
};
