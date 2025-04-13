function updateValues(){
    const startDate = document.getElementById("IPSfrom").value;
    const endDate = document.getElementById("IPSto").value;

    fetch(`https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/IPS?startDate=${startDate}&endDate=${endDate}&api_key=${ips_api_key}`)
    .then(response => response.json())
    .then(data => {
        const locationCounts = {"Earth":0, "Mars":0, "MESSENGER":0, "STEREO A":0, "STEREO B":0};
        data.forEach(item => {
            const location = item.location;
            if (locationCounts.hasOwnProperty(location)){
                locationCounts[location]++;
            }
        });

        document.getElementById("earth").textContent=locationCounts["Earth"];
        document.getElementById("mars").textContent=locationCounts["Mars"];
        document.getElementById("messenger").textContent=locationCounts["MESSENGER"];
        document.getElementById("stereoa").textContent=locationCounts["STEREO A"];
        document.getElementById("stereob").textContent=locationCounts["STEREO B"];

    })
    .catch(error => console.error("Error fetching data:", error));
}

document.getElementById("IPSfrom").addEventListener("change", updateValues);
document.getElementById("IPSto").addEventListener("change", updateValues);

updateValues();