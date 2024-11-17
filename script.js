// Obsługa logowania
function zaloguj(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowe dane logowania.";
    }
}

// Pobieranie danych z LocalStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Zapisywanie danych do LocalStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Dodawanie osoby
function dodajOsobe() {
    const imieNazwisko = document.getElementById("imieNazwisko").value;
    const numerDowodu = document.getElementById("numerDowodu").value;
    const dataUrodzenia = document.getElementById("dataUrodzenia").value;

    const osoby = getData("osoby");
    osoby.push({ imieNazwisko, numerDowodu, dataUrodzenia });
    saveData("osoby", osoby);

    alert("Osoba dodana do bazy danych.");
}

// Dodawanie pojazdu
function dodajPojazd() {
    const numerRejestracyjny = document.getElementById("numerRejestracyjny").value;
    const marka = document.getElementById("marka").value;
    const model = document.getElementById("model").value;
    const wlasciciel = document.getElementById("wlasciciel").value;

    const pojazdy = getData("pojazdy");
    pojazdy.push({ numerRejestracyjny, marka, model, wlasciciel });
    saveData("pojazdy", pojazdy);

    alert("Pojazd dodany do bazy danych.");
}

// Wyświetlanie danych w bazie (baza.html)
if (location.pathname.includes("baza.html")) {
    const listaOsob = document.getElementById("listaOsob");
    const listaPojazdow = document.getElementById("listaPojazdow");

    const osoby = getData("osoby");
    const pojazdy = getData("pojazdy");

    osoby.forEach(osoba => {
        const li = document.createElement("li");
        li.textContent = `Imię i Nazwisko: ${osoba.imieNazwisko}, Dowód: ${osoba.numerDowodu}, Data Urodzenia: ${osoba.dataUrodzenia}`;
        listaOsob.appendChild(li);
    });

    pojazdy.forEach(pojazd => {
        const li = document.createElement("li");
        li.textContent = `Pojazd: ${pojazd.marka} ${pojazd.model}, Rejestracja: ${pojazd.numerRejestracyjny}, Właściciel: ${pojazd.wlasciciel}`;
        listaPojazdow.appendChild(li);
    });
}
