const express = require('express');
const app     = express();

const request = require('request');

const PORT    = 3000;
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log("New socket client connection: ", socket.id);
});

// --------------------------------------------------------
// EXPRESS STUFF
// --------------------------------------------------------
// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// --------------------------------------------------------
// tell our app where to listen for connections
server.listen(PORT, () => {
  console.log('Listening on PORT ' + PORT);
});

function pingSunset() {
  let sunsetUrl = 'https://api.sunrise-sunset.org/json';
  let options = {
    url: sunsetUrl,
    qs: {
      lat:36.7201600,
      lng:-4.4203400,
      date:'today'
    }
  };

  // make an api request to the api /scores endpoint
  let sunsetResponse = request(options, function(error, response, body) {
    // console.log(response);

    if (!error && response.statusCode == 200) {
      console.log('returning body');
      return body;
    } else {
      console.log('returning errors');
      return error;
    }
  });

  console.log(sunsetResponse);
  return sunsetResponse;
}

app.get('/getSunsetInfo', function(req, res) {
  // let sunsetInfo = pingSunset();
  // res.send(sunsetInfo);
  let sunsetUrl = 'https://api.sunrise-sunset.org/json';
  let options = {
    url: sunsetUrl,
    qs: {
      lat:36.7201600,
      lng:-4.4203400,
      date:'today'
    }
  };

  // make an api request to the api /scores endpoint
  let sunsetResponse = request(options, function(error, response, body) {
    // console.log(response);

    if (!error && response.statusCode == 200) {
      console.log('sending body');
      res.send(body);
    } else {
      console.log('sending errors');
      res.send(error);
    }
  });
});

// bart.on('24th', (times) => {
//   io.emit('stationUpdate', times);
// });
