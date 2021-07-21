const axios = require('axios');//axios npm package 

const createBoard = async (name) => {
    try {
        const response = await axios.post(process.env.API_URL_TRELLO_BOARD,
            {
                name: name,
                defaultLists: false
            },
            {
                params: {
                    key: process.env.API_KEY_TRELLO,
                    token: process.env.API_TOKEN_TRELLO
                }
            }
        );


        return response.data.id;

    } catch (err) {
        console.log(err);
    }

};


const createNewList = async (boardId, name) => {
    try {
        const response = await axios.post(process.env.API_URL_TRELLO_BOARD + "/" + boardId + "/lists",
            { name: name },
            {
                params: {
                    key: process.env.API_KEY_TRELLO,
                    token: process.env.API_TOKEN_TRELLO
                }
            }
        );
        return response.data.id;
    } catch (err) {
        console.log(err);
    }
}


const createNewCard = async (currentListId, cardName) => {
    try {
        const response = await axios.post(process.env.API_URL_TRELLO_CARDS,
            "",
            {
                params: {
                    idList: currentListId,
                    name: cardName,
                    key: process.env.API_KEY_TRELLO,
                    token: process.env.API_TOKEN_TRELLO
                }
            }
        );
        return response.data.id;
    } catch (error) {
        console.log(error);
    }
}



const attachImage = async (cardId, image_url) => {
    try {
        const response = await axios.post(
            process.env.API_URL_TRELLO_CARDS + "/" + cardId + "/attachments",
            "",
            {
                params: {
                    url: image_url,
                    key: process.env.API_KEY_TRELLO,
                    token: process.env.API_TOKEN_TRELLO
                }
            }
        );
        return response.data.id;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createBoard, createNewList, createNewCard, attachImage};
