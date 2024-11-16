// Webhook URL dla mandatów (dwa różne)
const discordWebhookUrlMandat1 = "https://discord.com/api/webhooks/1305617060402823309/RQXIaIDsJH-W8X7MBvgYGsgBSUJiInze_KOik63oX6kQqXTPFpapDs_LCzkJDRHJ357B";
const discordWebhookUrlMandat2 = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Webhook URL dla nowych zdarzeń dyscyplinarnych (zatrzymanie, reprymenda, zwolnienie)
const discordWebhookUrlDyscyplinarne = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";

// Spersonalizowane dane logowania
const validUsers = {
    "michal.nowacki": { password: "haslo123", name: "Płk SG Michał Nowacki" },
    "cezary.wieczorek": { password: "haslo456", name: "Kpt. SG Cezary Wieczorek" },
    "leonard.bielik": { password: "haslo101", name: "Ppłk SG Leonard Bielik" },
    "cezary.poranek": { password: "haslo789", name: "Kpr. SG Cezary Poranek" },
    "jan.kowalski": { password: "haslo202", name: "Szer. SG Jan Kowalski" },
    "jan.kowalczyk": { password: "haslo303", name: "Szer. SG Jan Kowalczyk" },
    "adam.cipkiewicz": { password: "haslo404", name: "Szer. SG Adam Cipkiewicz" },
    "admin": { password: "granica123", name: "Administrator" },
    "Wydział Zabezpieczneia Działań": { password: "bezpiecznosc123", name: "Wydział Zabezpieczeń Straży Granicznej" },
    "Straż Graniczna": { password: "straza123", name: "Zwykła Straż Graniczna" },
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
        if (username === "wzd") {
            document.body.classList.add("wzd");
            document.getElementById("mainContent").classList.add("wzd");
        } else {
            document.body.classList.add("sgz");
            document.getElementById("mainContent").classList.add("sgz");
        }

        // Jeśli to Michał Nowacki, Leonard Bielik, lub Cezary Wieczorek, dodaj opcje dyscyplinarne
        if (["michal.nowacki", "cezary.wieczorek", "leonard.bielik"].includes(username)) {
            document.getElementById("dyscyplinarneOptions").style.display = "block";
        }
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja dodająca zdarzenie do listy i wysyłająca powiadomienie na Discorda w formacie embed
function dodajZdarzenie() {
    const nazwaGracza = document.getElementById("nazwaGracza").value;
    const nickDiscord = document.getElementById("nickDiscord").value;
    const typZdarzenia = document.getElementById("typZdarzenia").value;
    const opis = document.getElementById("opis").value;
    const data = new Date().toLocaleString("pl-PL");
    const userName = sessionStorage.getItem("userName");  // Pobieranie imienia i nazwiska użytkownika z sesji

    const zdarzenie = {
        nazwaGracza,
        nickDiscord,
        typZdarzenia,
        opis,
        data,
        userName
    };

    // Dodawanie zdarzenia do listy na stronie
    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - ${zdarzenie.typZdarzenia}: ${zdarzenie.opis} (${zdarzenie.nazwaGracza}) - Wystawione przez: ${zdarzenie.userName}`;
    zdarzeniaLista.appendChild(listItem);

    // Wybór odpowiedniego webhooka w zależności od typu zdarzenia
    let webhookUrl = "";

    if (typZdarzenia === "mandat") {
        // Wybór losowego webhooka dla mandatów
        webhookUrl = Math.random() > 0.5 ? discordWebhookUrlMandat1 : discordWebhookUrlMandat2;
    } else if (typZdarzenia === "zatrzymanie" || typZdarzenia === "reprymenda" || typZdarzenia === "zwolnienie") {
        // Webhook dla zdarzeń dyscyplinarnych
        webhookUrl = discordWebhookUrlDyscyplinarne;
    }

    // Wysyłanie zdarzenia do Discorda
    const embedData = {
        content: `Nowe zdarzenie: ${typZdarzenia}`,
        embeds: [{
            title: `Zdarzenie: ${typZdarzenia}`,
            description: `${opis}`,
            fields: [
                {
                    name: "Gracz",
                    value: nazwaGracza,
                    inline: true
                },
                {
                    name: "Nick Discord",
                    value: nickDiscord,
                    inline: true
                },
                {
                    name: "Data",
                    value: data,
                    inline: true
                },
                {
                    name: "Wystawiający",
                    value: userName,
                    inline: true
                }
            ],
            footer: {
                text: `Typ: ${typZdarzenia}`,
            }
        }]
    };

    // Wysyłanie danych na odpowiedni webhook (w zależności od typu zdarzenia)
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Zdarzenie wysłane do Discorda:', data);
    })
    .catch(error => {
        console.error('Błąd podczas wysyłania zdarzenia do Discorda:', error);
    });
}
