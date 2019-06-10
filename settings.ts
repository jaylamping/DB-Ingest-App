// ----------------- //
// settings renderer //
// ----------------- //

const { ipcRenderer } = require('electron');

let dbName;
let dbUrl;
let dbPort;
let payload;
let saveBtn = document.getElementById('save-settings');
let testBtn = document.getElementById('test-db-connection');

// event sender/listeners
testBtn.addEventListener('click', () => {

  dbName = document.getElementById('db-name').value;
  dbUrl = document.getElementById('db-url').value;
  dbPort = document.getElementById('db-port').value;

  if(!dbName || !dbUrl || !dbPort) {
    console.log('missing data');
    // need to figure out how to do this part
  } else {
    // toggle loading animation
    testBtn.classList.add('loading');

    payload = {
      name: dbName,
      url: dbUrl,
      port: dbPort
    };

    // send payload to main process
    ipcRenderer.send('test-db-connection', payload);

    // recieve response from main process
    ipcRenderer.on('test-db-connection', (event, message) => {
      if (message) {
        console.log('success')
        // enable save button
        saveBtn.classList.remove('disabled');
        // toggle loading animation
        testBtn.classList.remove('loading');
      } else {
        console.log('fail')
        // toggle loading animation
        testBtn.classList.remove('loading');
      }
    });
  };
});

saveBtn.addEventListener('click', () => {

  dbName = document.getElementById('db-name').value;
  dbUrl = document.getElementById('db-url').value;
  dbPort = document.getElementById('db-port').value;

  payload = {
    name: dbName,
    url: dbUrl,
    port: dbPort
  };

  ipcRenderer.send('db-info', payload);

});


// validation logic for test and save buttons
$('form')
.form({
  on: 'blur',
  fields: {
    name: {
      identifier  : 'dbname',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter db name'
        }
      ]
    },
    url: {
      identifier  : 'dburl',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter db url'
        }
      ]
    },
    port: {
      identifier  : 'dbport',
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter db port'
        },
        {
          type : 'number',
          prompt : 'Please enter a valid port number'
        }
      ]
    }
  }
});
