const osoby = [];
const pojazdy = [];

// Funkcja logowania
function zaloguj(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Tu wprowadź odpowiednią walidację użytkowników
    if (username === "admin" && password === "admin123") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja dodająca zdarzenie
function dodajZdarzenie() {
    alert("Zdarzenie zostało dodane.");
}

// Funkcja dodająca osobę do bazy
function dodajOsobe() {
    const imieNazwisko = document.getElementById("imieNazwisko").value;
    const numerDowodu = document.getElementById("numerDowodu").value;
    const dataUrodzenia = document.getElementById("dataUrodzenia").value;

    osoby.push({ imieNazwisko, numerDowodu, dataUrodzenia });
    alert(`Osoba ${imieNazwisko} została dodana do bazy.`);
}

// Funkcja dodająca pojazd do bazy
function dodajPojazd() {
    const numerRejestracyjny = document.getElementById("numerRejestracyjny").value;
    const marka = document.getElementById("marka").value;
    const model = document.getElementById("model").value;
    const wlasciciel = document.getElementById("wlasciciel").value;

    pojazdy.push({ numerRejestracyjny, marka, model, wlasciciel });
    alert(`Pojazd ${marka} ${model} został dodany do bazy.`);
}
