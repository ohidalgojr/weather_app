async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();

        root.append(geo, date);
        document.body.append(root);
    }
}

getData();