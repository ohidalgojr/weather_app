let lat, lon;

function toCelsius(f) {
    return Math.round((5/9) * (f-32));
  }

function geolocate() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('lat').textContent = lat.toFixed(2);
            document.getElementById('lon').textContent = lon.toFixed(2);
            const api_url = `weather/${lat}/${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            const weather = json.currently;
            console.log(json);

            document.getElementById('summary').textContent = weather.summary;
            document.getElementById('temperature').textContent = toCelsius(weather.temperature);
        });
    } else {
        alert('geolocation not available');
    }
}

function setup() {
    geolocate();
    document.getElementById('geolocate').addEventListener('click', async event => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat, lon})
        };
        const response = await fetch('/api', options);
        const geo = await response.json();
    });
}