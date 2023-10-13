const express = require('express');
const app = express();

const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static('Public'));

app.listen(port, function(error) {
    if(error) {
        console.log("Soimething went wrong", error);
    } else {
        console.log("Server listening on port " + port);
    }
});