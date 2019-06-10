// ----------------- //
// settings renderer //
// ----------------- //

const { ipcRenderer } = require('electron');

let saveBtn = document.getElementById('save-settings');
let testBtn = document.getElementById('test-db-connection');

  // event sender/listeners
  testBtn.addEventListener('click', () => {

    // toggle loading animation
    testBtn.classList.add('loading');

    let payload = {
      name: document.getElementById('db-name').value,
      url: document.getElementById('db-url').value,
      port: document.getElementById('db-port').value
    };
    
    // send payload to main process
    ipcRenderer.send('test-connection', payload);
    // recieve response from main process
    ipcRenderer.on('test-connection', (event, message) => {
      if (message) {
        // enable save button
        saveBtn.classList.remove('disabled');
        // toggle loading animation
        testBtn.classList.remove('loading');
      }
      console.log(message);
    });

    console.log(payload);
  })
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
