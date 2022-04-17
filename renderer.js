// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')
const tableify = require('tableify');
let parser = null;
let port = null;

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }

    tableHTML = tableify(ports)
    document.getElementById('ports').innerHTML = tableHTML
  })
}

function listPorts() {
  listSerialPorts();
  //setTimeout(listPorts, 2000);
}

function isOpen(){
  return isopen;
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
//setTimeout(listPorts, 2000);

//setTimeout(isOpen(), 2000);

listSerialPorts()


//button event
document.getElementById('connBtn').addEventListener('click', () => {
  // sendBtn event가 click되면 textarea의 데이터를 string으로 변환시킨다.
  // why? string이 아니면 port.write에서 오류가 생긴다.

   port = new SerialPort({ path: '\\\\.\\COM4', baudRate: 9600 });
   parser = port.pipe(new ReadlineParser());
  console.log(port);
  console.log("port connected");
});


//button event
document.getElementById('sendBtn').addEventListener('click', () => {
  // sendBtn event가 click되면 textarea의 데이터를 string으로 변환시킨다.
  // why? string이 아니면 port.write에서 오류가 생긴다.
  const message = document.getElementById('code').value.toString();
  console.log("port write : "+message);
  port.write(message);

  // Read data that is available but keep the stream in "paused mode"
/*  port.on('readable', function () {
    console.log('Data:', port.read())
  })*/
  console.log("port write done");
// Switches the port into "flowing mode"

    /*port.on('data', function (data) {
      console.log('Data:', data)
    });*/

  parser.on('data',function (data) {
    console.log('Data:', data);
    document.getElementById('T21ta').value = data;
  });
/*
// Pipe the data into another stream (like a parser or standard out)
  const lineStream = port.pipe(new Readline())*/
});



