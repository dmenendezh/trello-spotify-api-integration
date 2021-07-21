const trello_api = require('./trello/trello-routes');
const spotify_api = require('./spotify/spotify-routes');
const util = require('./helper/util');

const startFileReading = async () => {
    const albums = util.readAlbums(__dirname + "/data/discography.txt");//read file and order the albums by year and aflabetically by album name
    const boardId = await trello_api.createBoard('Bob Dylan Discography');//create the principal board with de title Bob Dylan Discography

    let currentListId;
    let currentDecade = -1;
    let authSpotifyToken = await spotify_api.getAuthToken(); //go through the Spotify API to get valid token 

    for (let i = 0; i < albums.length; i++) {//iterate through the albums

        const albumYear = albums[i].year;//obtain the album year of index i
        const albumName = albums[i].name;//obtain the album name of index i

        const calculateCentury = Math.floor((albumYear - 1) / 100) + 1;//calculate de century
        const calculateDecade = Math.floor((albumYear % 100) / 10); //calculate de decade

        const century_Decade = "Century: " + calculateCentury  + " / " + "Decade: " + calculateDecade +"0'"; //caoncat list title with the century and the decade
        
        if((calculateDecade != currentDecade)) {//create a new list only if the decade is not equals with de last one
            currentListId = await trello_api.createNewList(boardId, century_Decade);//create a new list with the title Century: XXX / Decade: XXX
            currentDecade = calculateDecade;//set the current decade with the last calculate decade
        }

        const currentCardId = await trello_api.createNewCard(currentListId, "Year: " + albumYear + " - Album name: " + albumName);//create a new card into the currentList with the album year and the album name

        //console.log("currentCardId: " + currentCardId)

        const albumImage = await spotify_api.searchAlbumImage(authSpotifyToken, albumName);//search through the Spotify API the URL image of the album passing the album name 

        if (albumImage[0]) {//check position 0 of array
            //console.log( albumImage[0].images[0].url)
            await trello_api.attachImage(currentCardId, albumImage[0].images[0].url);//attach de image obtain through the Spotify API into de currentCard
        }
    }
};

startFileReading();