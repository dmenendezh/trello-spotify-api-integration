const fs = require('fs');

const readAlbums = (path) => {
    const fileContent = fs.readFileSync(path, 'UTF8');//read txt file with fs npm package
    let album = [];
    let colNumber = 0;
    let continueReading = true
    let startColNumber = 0;
    
    while (continueReading) {
        colNumber = fileContent.indexOf('\n', colNumber);//search for next colNumber from previous colNumber to next line break (/n)

        if (colNumber !== -1) {//control if colNumber is not -1. If colNumber is -1 finish file read 
            const line = fileContent.substring(startColNumber, colNumber);//text line with year and album name
       
            album.push({
                year: parseInt(line.slice(0 , 4)), //search for album year. Slice from start colNumber to 4. Assume that year have 4 digits
                name: line.slice(4, line.length).trim() //search for album name. Slice from colNumber 4 to the end of line. Finally, remove possibles white spaces
            });

            colNumber++;
            startColNumber = colNumber;//next startColNumber will be actual colNumber + 1
        } else {
            continueReading = false;//finish reading
        }
    }

    album.sort((a, b) => {return a.year - b.year || a.name.localeCompare(b.name);});//first sort from year, next sort alfabetically from album name

    return album;//return array with album year - album name
};

module.exports = { readAlbums };