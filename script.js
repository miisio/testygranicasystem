// Webhook URL dla mandatów
const discordWebhookUrlMandat1 = "https://discord.com/api/webhooks/1305617060402823309/RQXIaIDsJH-W8X7MBvgYGsgBSUJiInze_KOik63oX6kQqXTPFpapDs_LCzkJDRHJ357B";
const discordWebhookUrlMandat2 = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Webhook URL dla nowych zdarzeń dyscyplinarnych (zatrzymanie, reprymenda, zwolnienie)
const discordWebhookUrlDyscyplinarne = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Spersonalizowane dane logowania
const validUsers = {
    "michal.nowacki": { password: "haslo123", name: "Płk SG Michał Nowacki" },
    "cezary.wieczorek": { password: "haslo456", name: "Kpt. SG Cezary Wieczorek" },
    "leonard.bielik": { password: "haslo101", name: "Ppłk SG Leonard Bielik" },
    "cezary.poranek": { password: "haslo789", name: "Ppor. SG Cezary Poranek" }
};

// Funkcja logowania
function zaloguj(event) {
    event.preventDefault();  // Zatrzymuje wysyłanie formularza

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username].password === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie użytkownika w sesji
        sessionStorage.setItem("userName", validUsers[username].name);  // Zapisywanie pełnego imienia i nazwiska użytkownika
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        
        // Dodawanie odpowiedniego stylu w zależności od roli
        if (username === "michal.nowacki") {
            document.body.classList.add("wzd");
        } else {
            document.body.classList.add("sgz");
        }

        // Jeśli to Michał Nowacki, Leonard Bielik, lub Cezary Wieczorek, dodaj opcje dyscyplinarne
        if (["michal.nowacki", "cezary.wieczorek", "leonard.bielik"].includes(username)) {
            document.getElementById("dyscyplinarneOptions").style.display = "block";
        }
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja dodająca zdarzenie dyscyplinarne do listy i wysyłająca powiadomienie na Discorda w formacie embed
function dodajDyscyplinarne() {
    const nazwaGracza = document.getElementById("nazwaGraczaDyscyplina").value;
    const nickDiscord = document.getElementById("nickDiscordDyscyplina").value;
    const typDyscypliny = document.getElementById("typDyscypliny").value;
    const opisDyscypliny = document.getElementById("opisDyscypliny").value;
    const data = new Date().toLocaleString("pl-PL");
    const userName = sessionStorage.getItem("userName");  // Pobieranie imienia i nazwiska użytkownika z sesji

    const embed = {
        title: `Nowe Zdarzenie Dyscyplinarne: ${typDyscypliny}`,
        fields: [
            { name: "Gracz", value: nazwaGracza },
            { name: "Nick Discord", value: nickDiscord },
            { name: "Opis", value: opisDyscypliny },
            { name: "Wystawione przez", value: userName },
            { name: "Data", value: data }
        ],
        color: 16711680  // Czerwony kolor
    };

    fetch(discordWebhookUrlDyscyplinarne, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
    })
    .then(response => response.json())
    .then(data => console.log('Sukces:', data))
    .catch((error) => console.error('Błąd:', error));

    // Wyświetl zdarzenie w liście
    const li = document.createElement('li');
    li.textContent = `Typ: ${typDyscypliny} - Gracz: ${nazwaGracza} (${nickDiscord}) - Opis: ${opisDyscypliny}`;
    document.getElementById("zdarzeniaLista").appendChild(li);
}
