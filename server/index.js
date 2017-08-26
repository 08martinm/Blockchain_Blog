const express = require('express');
const port = process.env.PORT || 8080;

let app = express();
app.use(express.static(__dirname + '/../public'));

app.listen(port, () => {console.log('Server is listening on port', port);});
