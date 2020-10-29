#!/usr/bin/env node

const fs = require("fs")
const process = require("process")

// if no custom names for index,css and js files are specified
if (process.argv[2] === undefined) {
    var h, c, j
    if (
        process.argv[3] !== undefined &&
        process.argv[4] !== undefined &&
        process.argv[5] !== undefined
    ) {
        h = process.argv[3]
        c = process.argv[4]
        j = process.argv[5]
    } else {
        h = "index"
        c = "style"
        j = "script"
    }
} else {
    h = "index"
    c = "style"
    j = "script"
}
// Function to read and write data in the file
const readAndWriteFiles = (projectDir) => {
    // Reading the contents of index.html file
    fs.readFile(__dirname + "/index.html", (err, data) => {
        if (err) {
            throw err
        }
        // Creating a new html file and writing data in that html file
        fs.writeFile(projectDir + "/" + h + ".html", data, (err) => {
            if (err) {
                throw err
            }
            console.log("Created " + h + ".html")
        })
    })

    // create an empty js file
    fs.open(projectDir + "/" + j + ".js", "w", (err, file) => {
        if (err) {
            throw err
        }

        console.log("Created " + j + ".js")
    })
    // Creating CSS file in project directory
    fs.open(projectDir + "/" + c + ".css", "w", (err, file) => {
        if (err) {
            throw err
        }

        console.log("Created " + c + ".css")
    })
}
// To get directory name from command line arguments
const dirToCreate = process.argv[2]
// To get current working directory
let projectDir = process.cwd()
if (!dirToCreate) {
    // Making the read-write operations in the current working directory
    readAndWriteFiles(projectDir)
} else {
    //Making a new project directory and making read-write operations in that directory
    projectDir = projectDir + "/" + dirToCreate
    fs.mkdir(projectDir, (err) => {
        if (err) {
            throw err
        }
        readAndWriteFiles(projectDir)
    })
}
