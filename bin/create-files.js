#!/usr/bin/env node

const fs = require("fs");
const process = require("process");

if (process.argv[2] === undefined) {
  var h, c, j;
  if (
    process.argv[3] !== undefined &&
    process.argv[4] !== undefined &&
    process.argv[5] !== undefined
  ) {
    h = process.argv[3];
    c = process.argv[4];
    j = process.argv[5];
  } else {
    h = "index";
    c = "style";
    j = "script";
  }
} else {
  h = "index";
  c = "style";
  j = "script";
}
const readAndWriteFiles = (projectDir) => {
  //console.log(projectDir);

  fs.readFile(__dirname + "/" + h + ".html", (err, data) => {
    if (err) {
      throw err;
    }
    fs.writeFile(projectDir + "/" + h + ".html", data, (err) => {
      if (err) {
        throw err;
      }
      console.log("Created " + h + ".html");
    });
  });

  // create an empty file
  fs.open(projectDir + "/" + j + ".js", "w", (err, file) => {
    if (err) {
      throw err;
    }

    console.log("Created " + j + ".js");
  });

  fs.open(projectDir + "/" + c + ".css", "w", (err, file) => {
    if (err) {
      throw err;
    }

    console.log("Created " + c + ".css");
  });
};

const dirToCreate = process.argv[2];
let projectDir = process.cwd();
if (!dirToCreate) {
  readAndWriteFiles(projectDir);
} else {
  projectDir = projectDir + "/" + dirToCreate;
  fs.mkdir(projectDir, (err) => {
    if (err) {
      throw err;
    }
    readAndWriteFiles(projectDir);
  });
}
