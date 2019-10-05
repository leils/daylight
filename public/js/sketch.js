// --------------------------------------------------------
// 03-bart
// --------------------------------------------------------
// let socket;
let stationData;


function setup() {
  createCanvas(window.innerWidth, 2560);

  // this works if you're running your server on the same port
  // if you're running from a separate server on a different port
  // you'll need to pass in the address to connect()
  socket = io.connect();

  // we listen for message on the socket server called 'data'
  // socket.on('sunsetUpdate',
  //   (results) => {
  //     console.log('sunset Update: ', results);
  //     // stationData = results;
  //   }
  // );

  httpGet('/getSunsetInfo', function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function windowResized() {
  resizeCanvas(window.innerWidth, 2560);
}

// --------------------------------------------------------
function draw() {
  background(255);
  strokeWeight(0);
}
