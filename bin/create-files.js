#!/usr/bin/env node

const fs = require("fs")
const process = require("process")

const readAndWriteFiles = (projectDir) => {
    fs.readFile(__dirname + "/index.html", (err, data) => {
        if (err) {
            throw err
        }
        fs.writeFile(projectDir + "/index.html", data, (err) => {
            if (err) {
                throw err
            }
            console.log("Created index.html")
        })
    })

    // create an empty file
    fs.open(projectDir + "/script.js", "w", (err, file) => {
        if (err) {
            throw err
        }

        console.log("Created script.js")
    })

    fs.open(projectDir + "/style.css", "w", (err, file) => {
        if (err) {
            throw err
        }

        console.log("Created style.css")
    })
}

const dirToCreate = process.argv[2]
let projectDir = process.cwd()
if (!dirToCreate) {
    readAndWriteFiles(projectDir)
} else {
    projectDir = projectDir + "/" + dirToCreate
    fs.mkdir(projectDir, (err) => {
        if (err) {
            throw err
        }
        readAndWriteFiles(projectDir)
    })
}
