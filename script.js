// Użytkownicy i hasła
const validUsers = {
    "michal.nowacki": "haslo123",
    "cezary.wieczorek": "haslo456",
    "cezary.poranek": "haslo789",
    "leonard.bielik": "haslo101",
    "jan.kowalski": "haslo202",
    "jan.kowalczyk": "haslo303"
};

// Użytkownicy, którzy mają dostęp do działań dyscyplinarnych
const usersWithDisciplinaryAccess = [
    "michal.nowacki",
    "cezary.wieczorek",
    "leonard.bielik"
];

// Użytkownicy, którzy mają dostęp do mandatów i zatrzymań
const usersWithMandateAccess = [
    "michal.nowacki",
    "cezary.wieczorek",
    "cezary.poranek",
    "leonard.bielik",
    "jan.kowalski"
];

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Sprawdzanie poprawności logowania
    if (validUsers[username] && validUsers[username] === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie użytkownika w sesji
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

        // Ustawianie pełnego imienia i nazwiska w zależności od użytkownika
        document.getElementById("userFullName").textContent = getFullName(username);

        // Sprawdzanie, czy użytkownik ma dostęp do działań dyscyplinarnych
        if (usersWithDisciplinaryAccess.includes(username)) {
            document.getElementById("dyscyplinarneForm").style.display = "block";
            document.getElementById("dyscyplinarneSection").style.display = "block";
        } else {
            document.getElementById("dyscyplinarneForm").style.display = "none";
            document.getElementById("dyscyplinarneSection").style.display = "none";
        }

        // Sprawdzanie, czy użytkownik ma dostęp do mandatów i zatrzymań
        if (usersWithMandateAccess.includes(username)) {
            document.getElementById("mandatyForm").style.display = "block";
            document.getElementById("mandatySection").style.display = "block";
            document.getElementById("zatrzymaniaForm").style.display = "block";
            document.getElementById("zatrzymaniaSection").style.display = "block";
        } else {
            document.getElementById("mandatyForm").style.display = "none";
            document.getElementById("mandatySection").style.display = "none";
            document.getElementById("zatrzymaniaForm").style.display = "none";
            document.getElementById("zatrzymaniaSection").style.display = "none";
        }
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja ustawiająca pełne imię i nazwisko użytkownika
function getFullName(username) {
    const fullNames = {
        "michal.nowacki": "Płk SG Michał Nowacki",
        "cezary.wieczorek": "Kpt. SG Cezary Wieczorek",
        "cezary.poranek": "Kpr. SG Cezary Poranek",
        "leonard.bielik": "Ppłk SG Leonard Bielik",
        "jan.kowalski": "Szer. SG Jan Kowalski",
        "jan.kowalczyk": "Szer. SG Jan Kowalski"
    };
    return fullNames[username] || "";
}

// Funkcja dodająca działanie dyscyplinarne
function dodajDzialanieDyscyplinarne() {
    const username = document.getElementById("username").value;
    const dzialanie = document.getElementById("dyscyplinarneTyp").value;
    const opis = document.getElementById("dyscyplinarneOpis").value;
    const data = new Date().toLocaleString("pl-PL");

    const dzialanieInfo = {
        dzialanie,
        opis,
        data
    };

    // Dodawanie do listy działań dyscyplinarnych
    const li = document.createElement("li");
    li.textContent = `${data}: ${dzialanie} - ${opis}`;
    document.getElementById("dyscyplinarneLista").appendChild(li);

    // Resetowanie formularza
    document.getElementById("dyscyplinarneForm").reset();
}

// Funkcja dodająca mandat
function dodajMandat() {
    const kwota = document.getElementById("mandatKwota").value;
    const opis = document.getElementById("mandatOpis").value;
    const data = new Date().toLocaleString("pl-PL");

    const mandatInfo = {
        kwota,
        opis,
        data
    };

    // Dodawanie do listy mandatów
    const li = document.createElement("li");
    li.textContent = `${data}: Mandat - ${kwota} PLN: ${opis}`;
    document.getElementById("mandatyLista").appendChild(li);

    // Resetowanie formularza
    document.getElementById("mandatyForm").reset();
}

// Funkcja dodająca zatrzymanie
function dodajZatrzymanie() {
    const opis = document.getElementById("zatrzymanieOpis").value;
    const data = new Date().toLocaleString("pl-PL");

    const zatrzymanieInfo = {
        opis,
        data
    };

    // Dodawanie do listy zatrzymań
    const li = document.createElement("li");
    li.textContent = `${data}: Zatrzymanie - ${opis}`;
    document.getElementById("zatrzymaniaLista").appendChild(li);

    // Resetowanie formularza
    document.getElementById("zatrzymaniaForm").reset();
}
