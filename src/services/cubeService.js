const cubesData = [];
const { v4: uuidv4 } = require('uuid');

exports.getAllCubes = () => cubesData.slice();

exports.create = (cubeName, cubeDesc, cubeImgUrl, cubeDiff) => {
  const newCube = {
    id: uuidv4(),
    cubeName,
    cubeDesc,
    cubeImgUrl,
    cubeDiff,
  };

  cubesData.push(newCube);

  return newCube;
};
