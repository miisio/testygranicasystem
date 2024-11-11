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
        } else {
            document.getElementById("dyscyplinarneForm").style.display = "none";
        }
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja zwracająca pełne imię i nazwisko użytkownika
function getFullName(username) {
    const names = {
        "michal.nowacki": "płk SG Michał Nowacki",
        "cezary.wieczorek": "kpt. SG Cezary Wieczorek",
        "cezary.poranek": "kpr. SG Cezary Poranek",
        "leonard.bielik": "ppłk SG Leonard Bielik",
        "jan.kowalski": "szer. SG Jan Kowalski",
        "jan.kowalczyk": "szer. SG Jan Kowalczyk"
    };
    return names[username] || "Użytkownik";
}

// Funkcja dodająca zdarzenie (np. mandat, zatrzymanie, nakaz)
function dodajZdarzenie() {
    const nazwaGracza = document.getElementById("nazwaGracza").value;
    const typZdarzenia = document.getElementById("typZdarzenia").value;
    const opis = document.getElementById("opis").value;
    const data = new Date().toLocaleString("pl-PL");

    const zdarzenie = {
        nazwaGracza,
        typZdarzenia,
        opis,
        data
    };

    // Dodawanie zdarzenia do listy
    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - ${zdarzenie.typZdarzenia}: ${zdarzenie.opis} (${zdarzenie.nazwaGracza})`;
    zdarzeniaLista.appendChild(listItem);

    // Resetowanie formularza
    document.getElementById("zdarzenieForm").reset();
}

// Funkcja dodająca działanie dyscyplinarne
function dodajDyscyplinarne() {
    const typKary = document.getElementById("typKary").value;
    const osobaDyscyplinarna = document.getElementById("osobaDyscyplinarna").value;
    const opisKary = document.getElementById("opisKary").value;
    const data = new Date().toLocaleString("pl-PL");

    const dzialanie = {
        typKary,
        osobaDyscyplinarna,
        opisKary,
        data
    };

    // Dodawanie działania dyscyplinarnego do listy
    const dyscyplinarneLista = document.getElementById("dyscyplinarneLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${dzialanie.data} - ${dzialanie.typKary}: ${dzialanie.opisKary} (${dzialanie.osobaDyscyplinarna})`;
    dyscyplinarneLista.appendChild(listItem);

    // Resetowanie formularza
    document.getElementById("dyscyplinarneForm").reset();
}

// Funkcja do wylogowania
function wyloguj() {
    sessionStorage.removeItem("username");
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("mainContent").style.display = "none";
}

// Ustawienie powiadomienia dla nieprawidłowego logowania
function bladLogowania() {
    document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
}
