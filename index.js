 const express = require('express');
 const Datastore = require('nedb');
 const fetch = require('node-fetch');
 const app = express();

 app.listen(3333, () => console.log('Listening at port 3333'));
 app.use(express.static('public'));
 app.use(express.json({limit: '1mb'}));

 const database  = new Datastore('database.db');
 database.loadDatabase();

 app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
  });

  app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
  });

  app.get('/weather/:lat/:lon', async (request, response) => {
    const lat = request.params.lat;
    const lon = request.params.lon;
    const api_url = `https://api.darksky.net/forecast/0c831ddd4c48bfe7028c1c53c98feed9/${lat},${lon}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
  });

