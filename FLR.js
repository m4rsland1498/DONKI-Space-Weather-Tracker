const ctx = document.getElementById("sfScatter");
let sfChart;

function updateChart(){
    const startDate = document.getElementById("FLRfrom").value;
    const endDate = document.getElementById("FLRto").value;

    fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${flr_api_key}`)
        .then(response => response.json())
        .then(data => {
            const coords = data.map(flare => ({
                x: new Date(flare.peakTime),
                y: flareIntensityToNumber(flare.classType)
            }));

            const chartData = {
                datasets: [{
                    label: "Solar Flare",
                    data: coords,
                    pointBackgroundColor: "#FF8000",
                    pointRadius: 5,
                }]
            };

            if (sfChart) {
                sfChart.destroy();
            }

            sfChart = new Chart(ctx, {
                type: "scatter",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    color: "#FF8000",
                    scales: {
                        x: {
                            type: "time",
                            position: "bottom",
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Flare Intensity'
                            },
                            ticks: {
                                callback: function(value, index, values) {
                                    return numberToFlareIntensity(value);
                                },
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function flareIntensityToNumber(intensity) {
    const intensityLevels = { 'A': 1, 'B': 10, 'C': 100, 'M': 1000, 'X': 10000 };
    const level = intensity.charAt(0);
    const multiplier = parseFloat(intensity.substring(1));
    return intensityLevels[level] * multiplier;
}

function numberToFlareIntensity(number) {
    if (number >= 10000) { return 'X' + (number / 10000).toString(); }
    if (number >= 1000) { return 'M' + (number / 1000).toString(); }
    if (number >= 100) { return 'C' + (number / 100).toString(); }
    if (number >= 10) { return 'B' + (number / 10).toString(); }
    return 'A' + number.toString();
}

document.getElementById("FLRfrom").addEventListener("change", updateChart);
document.getElementById("FLRto").addEventListener("change", updateChart);

updateChart();