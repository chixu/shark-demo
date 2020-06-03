const gulp = require("gulp");
const argv = require("yargs").argv;
getlib("build");
getlib("serve");

function getlib(file) {
    return require("./engine/gulp/" + file + ".js");
}