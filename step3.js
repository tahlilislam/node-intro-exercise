const fs = require("fs");
const axios = require("axios");

function cat(path, outToFile) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`ERROR READING ${path}: ${err}`);
      process.kill(1);
    }
    console.log("DATA:", data);
    handleOutput(data, outToFile);
  });
}

async function webCat(url, outToFile) {
    try {
        const res = await axios.get(url)
        console.log(res.data);
        handleOutput(res.data, outToFile);
    }
    catch(err) {
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1);
    }
}
/** handle output: write to file if filename given, else print */
function handleOutput (content, outToFile) {
    fs.writeFile(outToFile, content, 'utf8', function(err) {
        if (err) {
            console.error(`Couldn't write to file ${outToFile}: ${err}`)
        } else {
            console.log(content);
        }
    })
}

// Extract path from the 3rd command line argument and then calling the cat function
let path;
let outToFile;
if (process.argv[2] === '--out') {
    outToFile = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path && path.startsWith('http')) {
  webCat(path, outToFile);
} else if (path) {
    cat(path, outToFile);
}
else {
  console.error(
    "Please provide file path or URL as command line argument."
  );
}