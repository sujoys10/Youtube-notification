var pubsubhub = require("pubsubhubbub"),
    topic = "https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCdM4pTNXElGNqBOZbvxmzjg",
    hub = "http://pubsubhubbub.appspot.com/";

var pubsub = pubsubhub.createServer({
    callbackUrl: "https://hopeful-kepler-23eefa.netlify.com/.netlify/functions/newUpload"
});

pubsub.listen(1337);

pubsub.on("subscribe", (data) => {
    console.log("Subscribe");
    console.log(data);

    console.log("Subscribed "+topic+" to "+hub);
});

pubsub.on("denied", function(data){
    console.log("Denied");
    console.log(data);
});

pubsub.on("unsubscribe", (data) => {
    console.log("Unsubscribe");
    console.log(data);

    console.log("Unsubscribed "+topic+" from "+hub);
})

pubsub.on("error", function(error){
    console.log("Error");
    console.log(error);
});

pubsub.on("feed", (data) => {
    console.log(data);
    console.log(data.feed.toString());

    pubsub.unsubscribe(topic, hub);
});

pubsub.on("listen", () => {
    console.log("Server listening on port %s", pubsub.port);
    pubsub.subscribe(topic, hub, (err) => {
        if(err){
            console.log("Failed subscribing");
        }
    });
});



