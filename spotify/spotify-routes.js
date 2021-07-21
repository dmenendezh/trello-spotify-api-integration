const axios = require('axios');
const qs = require('qs');


const getAuthToken = async () => {
    const buff = Buffer.from(`${process.env.API_CLIENT_ID_SPOTIFY}:${process.env.API_CLIENT_SECRET_SPOTIFY}`);
    const base64data = buff.toString('base64');
    try {
        const response = await axios({
            method: 'POST',
            url: process.env.API_URL_GET_SPOTIFY_TOKEN,
            data: qs.stringify({
                'grant_type': 'client_credentials'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Basic ${base64data}`
            }
        });
        return response.data.access_token;

    } catch (err) {
        console.log(err);
    }   
}


const searchAlbumImage = async(token, albumName) => {
    try {
        const response = await axios({
            method: 'GET',
            url: process.env.API_URL_SEARCH_IMAGE,
            params: {
                q: albumName,
                type: 'album'

            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.albums.items;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getAuthToken, searchAlbumImage}
