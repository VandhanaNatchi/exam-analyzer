let buses = [
    {num:101, name:"Green Line", type:"morning", start:"7:30 AM", end:"8:30 AM", route:"Town → College"},
    {num:102, name:"Blue Express", type:"morning", start:"7:45 AM", end:"8:45 AM", route:"City → College"},
    {num:103, name:"Red Line", type:"morning", start:"8:00 AM", end:"9:00 AM", route:"East → College"},
    {num:104, name:"Yellow Route", type:"morning", start:"7:15 AM", end:"8:20 AM", route:"West → College"},
    {num:105, name:"Orange Bus", type:"morning", start:"7:50 AM", end:"8:50 AM", route:"North → College"},

    {num:201, name:"Green Return", type:"evening", start:"4:30 PM", end:"5:30 PM", route:"College → Town"},
    {num:202, name:"Blue Return", type:"evening", start:"4:45 PM", end:"5:45 PM", route:"College → City"},
    {num:203, name:"Red Return", type:"evening", start:"5:00 PM", end:"6:00 PM", route:"College → East"},
    {num:204, name:"Yellow Return", type:"evening", start:"4:20 PM", end:"5:20 PM", route:"College → West"},
    {num:205, name:"Orange Return", type:"evening", start:"4:50 PM", end:"5:50 PM", route:"College → North"}
];

let currentType = "morning";
let selectedBus = null;
let position = 0;

/* Show buses */
function showBuses(type) {
    currentType = type;
    let list = document.getElementById("busList");
    list.innerHTML = "";

    buses.filter(b => b.type === type).forEach(bus => {
        list.innerHTML += `
            <div class="bus-card" onclick="showDetails(${bus.num})">
                <h3>${bus.name}</h3>
                <p>Bus No: ${bus.num}</p>
                <p>${bus.start} - ${bus.end}</p>
            </div>
        `;
    });

    document.getElementById("busDetails").classList.add("hidden");
}

/* Time conversion */
function convertToMinutes(time) {
    let [hourMin, period] = time.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
}

function getCurrentMinutes() {
    let now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/* Status */
function getStatus(startTime) {
    let current = getCurrentMinutes();
    let start = convertToMinutes(startTime);

    if (current < start - 5) return "Not Taken";
    else if (current <= start + 10) return "On Time";
    else return "Late";
}

/* Countdown */
function getCountdown(startTime) {
    let current = getCurrentMinutes();
    let start = convertToMinutes(startTime);

    let diff = start - current;

    if (diff <= 0) return "Bus Started";

    let mins = diff % 60;
    let hours = Math.floor(diff / 60);

    return `${hours > 0 ? hours + "h " : ""}${mins}m left`;
}

/* Show details */
function showDetails(num) {
    selectedBus = buses.find(b => b.num === num);
    updateBusDetails();
}

/* Update details LIVE */
function updateBusDetails() {
    if (!selectedBus) return;

    let status = getStatus(selectedBus.start);
    let countdown = getCountdown(selectedBus.start);

    let colorClass = status === "On Time" ? "green" :
                     status === "Late" ? "yellow" : "red";

    let details = document.getElementById("busDetails");

    details.innerHTML = `
        <h2>${selectedBus.name}</h2>
        <p><b>Bus No:</b> ${selectedBus.num}</p>
        <p><b>Route:</b> ${selectedBus.route}</p>
        <p><b>Time:</b> ${selectedBus.start} - ${selectedBus.end}</p>
        <p><b>Arrival In:</b> ${countdown}</p>
        <p class="status ${colorClass}">${status}</p>

        <div id="map">
            <div id="bus">🚌</div>
        </div>

        <button class="back" onclick="goBack()">⬅ Back</button>
    `;

    details.classList.remove("hidden");
}

/* Move bus */
function moveBus() {
    let busIcon = document.getElementById("bus");
    if (!busIcon) return;

    position += 2;
    if (position > 90) position = 0;

    busIcon.style.left = position + "%";
}

/* Back */
function goBack() {
    selectedBus = null;
    document.getElementById("busDetails").classList.add("hidden");
}

/* Search */
function searchBus() {
    let value = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".bus-card");

    cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value)
            ? "block" : "none";
    });
}

/* Auto updates */
setInterval(() => {
    updateBusDetails();
    moveBus();
}, 1000);

/* Default load */
showBuses("morning");
