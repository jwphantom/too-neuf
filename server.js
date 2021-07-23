//Install express server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/too-neuf'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/too-neuf/index.html'));
});




// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, () => {
    console.log('server started');
});