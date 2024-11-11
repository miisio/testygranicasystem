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
            document.getElementById("dyscyplinarneSection").style.display = "block";
            document.getElementById("dyscyplinarneSection").classList.remove("hidden");
        } else {
            document.getElementById("dyscyplinarneForm").style.display = "none";
            document.getElementById("dyscyplinarneSection").style.display = "none";
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
        "jan.kowalczyk": "Szer. SG Jan Kowalczyk"
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
    const dzialaniaLista = document.getElementById("dyscyplinarneLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${dzialanieInfo.data} - ${dzialanieInfo.dzialanie}: ${dzialanieInfo.opis} (${username})`;
    dzialaniaLista.appendChild(listItem);

    // Wysyłanie na Discorda (możesz dostosować webhook zależnie od działania)
    const discordWebhookUrl = "https://discord.com/api/webhooks/1305621989087776778/MsIgza2EjHxSko6Mn0roZ-v-XLRygMCopcOenehBeHE2dY5kZC9AHsUSHiU-8dqe3J6Y"; // Twój webhook
    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "System Raportowania Granicznego",
            avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png",
            embeds: [{
                title: `Nowe działanie dyscyplinarne: ${dzialanieInfo.dzialanie}`,
                description: `Imię i nazwisko: ${getFullName(username)}\nOpis: ${dzialanieInfo.opis}`,
                color: 3447003,
                footer: { text: `Data: ${dzialanieInfo.data}` }
            }]
        })
    });

    // Wyczyść formularz
    document.getElementById("dyscyplinarneForm").reset();
}
