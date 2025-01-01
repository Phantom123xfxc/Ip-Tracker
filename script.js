async function trackIP() {
    const ip = document.getElementById("ipInput").value;

    if (!ip) {
        alert("Por favor, ingresa una IP.");
        return;
    }

    const url = `http://ip-api.com/json/${ip}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "fail") {
        alert("No se pudo encontrar la IP. Verifica que esté correctamente escrita.");
        return;
    }

    document.getElementById("ip").textContent = data.query;
    document.getElementById("city").textContent = data.city || "No disponible";
    document.getElementById("country").textContent = data.country;
    document.getElementById("lat").textContent = data.lat;
    document.getElementById("lon").textContent = data.lon;
    document.getElementById("isp").textContent = data.isp || "No disponible";

    document.getElementById("result").style.display = "block";

    const lat = data.lat;
    const lon = data.lon;
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${data.city}, ${data.country}</b><br>Lat: ${lat}, Lon: ${lon}`)
        .openPopup();
}
