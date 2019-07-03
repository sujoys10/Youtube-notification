import fetch from 'node-fetch';

/* exports.handler = function(event, context, callback) {

    callback(null, {
        statusCode: 200,
        body: "Hello world"
        //body: JSON.stringify({msg: "hello"}) for post request
    })
} */

exports.handler = async(event, context) => {
    //Only allow post
    /* if(event.httpMethod !== "POST"){
        return {
            statusCode: 405, body: "Method not allowed"
        }
    } */

    //call netlify incoming webhook
    return fetch(process.env.INCOMING_WEBHOOK_URL, {
        headers: { "content-type": "application/json" },
        method: "POST"
    }).then(() => ({
        statusCode: 200,
        body: "SUCCESS BUILD"
    })).catch(err => ({
        statusCode: 422,
        body: `Oops! ${err}`
    }))
}