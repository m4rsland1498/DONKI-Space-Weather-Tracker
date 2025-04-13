function loadAPODs(){
    const today = new Date();
    const threeAgo = new Date(today);
    threeAgo.setDate(today.getDate() - 2)

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const startDate = formatDate(threeAgo);    
      const endDate = formatDate(today);

      fetch(`https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apod_api_key}`, {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
            const imgURL = item.hdurl || data.url;
            const imgElement = document.createElement("img");
            imgElement.src = imgURL;
            imgElement.id = "APODimage";
            const container = document.getElementById("APODdiv");
            container.appendChild(imgElement);
        })
      })
      .catch(error => console.error("Error fetching data", error));
};

loadAPODs();