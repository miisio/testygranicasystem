// Mockowe dane logowania
const validUsers = {
    "michal.nowacki": "haslo123",
    "cezary.wieczorek": "haslo456",
    "cezary.poranek": "haslo789",
    "leonard.bielik": "haslo101",
    "jan.kowalski": "haslo202"
};

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userFullName = {
        "michal.nowacki": "Michał Nowacki",
        "cezary.wieczorek": "Cezary Wieczorek",
        "cezary.poranek": "Cezary Poranek",
        "leonard.bielik": "Leonard Bielik",
        "jan.kowalski": "Jan Kowalski"
    };

    if (validUsers[username] && validUsers[username] === password) {
        sessionStorage.setItem("username", username);
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("userFullName").textContent = userFullName[username];

        if (username === "michal.nowacki" || username === "cezary.wieczorek" || username === "cezary.poranek") {
            document.getElementById("dyscyplinarneSection").style.display = "block";
        }
        if (username === "michal.nowacki" || username === "cezary.wieczorek" || username === "jan.kowalski") {
            document.getElementById("mandatySection").style.display = "block";
        }
        if (username === "leonard.bielik" || username === "jan.kowalski") {
            document.getElementById("zatrzymaniaSection").style.display = "block";
        }
    } else {
        document.getElementById("loginError").textContent = "Niepoprawny login lub hasło.";
    }
}

// Funkcja dodawania działania dyscyplinarnego
function dodajDzialanieDyscyplinarne() {
    const nick = document.getElementById("dyscyplinarneNick").value;
    const imieNazwisko = document.getElementById("dyscyplinarneImieNazwisko").value;
    const typ = document.getElementById("dyscyplinarneTyp").value;
    const opis = document.getElementById("dyscyplinarneOpis").value;

    const lista = document.getElementById("dyscyplinarneLista");
    const li = document.createElement("li");
    li.textContent = `${imieNazwisko} (${nick}) - Typ: ${typ}, Opis: ${opis}`;
    lista.appendChild(li);
}

// Funkcja dodawania mandatu
function dodajMandat() {
    const nick = document.getElementById("mandatNick").value;
    const imieNazwisko = document.getElementById("mandatImieNazwisko").value;
    const kwota = document.getElementById("mandatKwota").value;
    const opis = document.getElementById("mandatOpis").value;

    const lista = document.getElementById("mandatyLista");
    const li = document.createElement("li");
    li.textContent = `${imieNazwisko} (${nick}) - Kwota: ${kwota} zł, Opis: ${opis}`;
    lista.appendChild(li);
}

// Funkcja dodawania zatrzymania
function dodajZatrzymanie() {
    const nick = document.getElementById("zatrzymanieNick").value;
    const imieNazwisko = document.getElementById("zatrzymanieImieNazwisko").value;
    const opis = document.getElementById("zatrzymanieOpis").value;

    const lista = document.getElementById("zatrzymaniaLista");
    const li = document.createElement("li");
    li.textContent = `${imieNazwisko} (${nick}) - Opis: ${opis}`;
    lista.appendChild(li);
}
