// Webhook URL Discorda
const discordWebhookUrl = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Mockowe dane logowania
const validUsers = {
    "admin": "granica123",   // Administrator
    "wzd": "bezpiecznosc123",   // Wydział Zabezpieczeń Straży Granicznej
    "sg": "straza123"   // Zwykła Straż Graniczna
};

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username] === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie użytkownika w sesji
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        
        // Dodawanie odpowiedniego stylu w zależności od roli
        if (username === "wzd") {
            document.body.classList.add("wzd");
            document.getElementById("mainContent").classList.add("wzd");
        } else {
            document.body.classList.add("sgz");
            document.getElementById("mainContent").classList.add("sgz");
        }
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja dodająca zdarzenie do listy i wysyłająca powiadomienie na Discorda w formacie embed
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

    // Dodawanie zdarzenia do listy na stronie
    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - ${zdarzenie.typZdarzenia}: ${zdarzenie.opis} (${zdarzenie.nazwaGracza})`;
    zdarzeniaLista.appendChild(listItem);

    // Wysyłanie powiadomienia na Discorda
    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "System Raportowania Granicznego",
            avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png",
            embeds: [{
                title: `Nowe zdarzenie: ${zdarzenie.typZdarzenia}`,
                description: `Nazwa gracza: ${zdarzenie.nazwaGracza}\nOpis: ${zdarzenie.opis}`,
                color: 3447003,
                footer: { text: `Data: ${zdarzenie.data}` }
            }]
        })
    });

    // Wyczyść formularz
    document.getElementById("zdarzenieForm").reset();
}