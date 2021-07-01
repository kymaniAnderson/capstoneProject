// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.78:5000"
var xAxis = [];
var yAxis = [];

var xAxis2 = [];
var yAxis2 = [];

var isupChart;
var ageChart;

window.onload = function() {
    getISUP();  
    getAge();
};

function getRecords(){
    return fetch(connectionURL.concat("/api/record"))
    .then((res) => res.json())
    .then((json) => json);
}

function getPatients(){
    return fetch(connectionURL.concat("/api/patient"))
    .then((res) => res.json())
    .then((json) => json);
}

async function getISUP(){
    let records = await getRecords();

    records.forEach((record) => {
        yAxis.push(record.isupGrade);
        xAxis.push(record.lastUpdated.slice(4));
    });

    setTimeout(function(){
        createISUPChart();
    },250);
}

async function getAge(){
    let patients = await getPatients();
    let num = 1;

    patients.forEach((patient) => {
        yAxis2.push(patient.patientAge);
        xAxis2.push(num++);
    });

    setTimeout(function(){
        createAgeChart()
    },250);
}

function createISUPChart(){
    var chart = document.getElementById('chart').getContext('2d');
    isupChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                fill: true,
                borderColor: '#3AAFA9',
                backgroundColor: '#3AAFA91A',
                tension: 0.1
            }]
        },
        options: {            
            layout: {
                padding: 25
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                },
            },
            plugins: {
                legend: {
                    display: false,

                    labels: {
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                }
            }
        }
    });
}

function createAgeChart(){
    var chart = document.getElementById('chart2').getContext('2d');
    ageChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: xAxis2,
            datasets: [{
                data: yAxis2,
                fill: true,
                borderColor: '#3AAFA9',
                backgroundColor: '#3AAFA91A',
                tension: 0.1
            }]
        },
        options: {            
            layout: {
                padding: 25
            },
            plugins: {
                legend: {
                    display: false,

                    labels: {
                        font: {
                            size: 14,
                            weight: 600
                        }
                    }
                }
            }
        }
    });
}
