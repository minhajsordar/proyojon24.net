import fs from "fs";
import path from "path";

const directory = "../deleteall";

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    fs.rm(directory,  { recursive: true, force: true },(err) => {
        if (err) throw err;
    },);
});