// Webhook URL dla mandatów
const discordWebhookUrlMandat = "https://discord.com/api/webhooks/1305617060402823309/RQXIaIDsJH-W8X7MBvgYGsgBSUJiInze_KOik63oX6kQqXTPFpapDs_LCzkJDRHJ357B";
// Webhook URL dla zatrzymań
const discordWebhookUrlZatrzymanie = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";
// Webhook URL dla nowych zdarzeń dyscyplinarnych
const discordWebhookUrlDyscyplinarne = "https://discord.com/api/webhooks/1305621989087776778/MsIgza2EjHxSko6Mn0roZ-v-XLRygMCopcOenehBeHE2dY5kZC9AHsUSHiU-8dqe3J6Y";

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
    "wzd": { password: "bezpiecznosc123", name: "Wydział Zabezpieczeń Straży Granicznej" },
    "sg": { password: "straza123", name: "Zwykła Straż Graniczna" },
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

    const data = {
        "content": null,
        "embeds": [{
            "title": `Nowe Zdarzenie: ${typZdarzenia}`,
            "description": `**Gracz:** ${nazwaGracza}\n**Nick na Discordzie:** ${nickDiscord}\n**Typ Zdarzenia:** ${typZdarzenia}\n**Opis:**\n${opis}`,
            "color": 15258703,
            "footer": {
                "text": "System Raportowania Granicznego"
            }
        }]
    };

    // Wybór webhooka zależnie od typu zdarzenia
    let webhookUrl = discordWebhookUrlMandat;  // domyślnie mandat
    if (typZdarzenia === "zatrzymanie") {
        webhookUrl = discordWebhookUrlZatrzymanie;
    }

    // Wysłanie zapytania do webhooka Discord
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sukces:', data);
        alert("Zdarzenie zostało dodane pomyślnie!");
    })
    .catch((error) => {
        console.error('Błąd:', error);
        alert("Wystąpił błąd podczas dodawania zdarzenia.");
    });
}

// Funkcja do dodawania działania dyscyplinarnego
function dodajDyscyplinarne() {
    const imie = document.getElementById("imieDyscypliny").value;
    const nick = document.getElementById("nickDyscypliny").value;
    const typDyscypliny = document.getElementById("typDyscypliny").value;
    const opisDyscypliny = document.getElementById("opisDyscypliny").value;

    const data = {
        "content": null,
        "embeds": [{
            "title": `Działanie Dyscyplinarne: ${typDyscypliny}`,
            "description": `**Imię i Nazwisko:** ${imie}\n**Nick na Discordzie:** ${nick}\n**Typ Działania:** ${typDyscypliny}\n**Opis:**\n${opisDyscypliny}`,
            "color": 15548997,
            "footer": {
                "text": "System Raportowania Granicznego"
            }
        }]
    };

    // Wysłanie zapytania do webhooka Discord
    fetch(discordWebhookUrlDyscyplinarne, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sukces:', data);
        alert("Działanie dyscyplinarne zostało zarejestrowane.");
    })
    .catch((error) => {
        console.error('Błąd:', error);
        alert("Wystąpił błąd podczas rejestrowania działania dyscyplinarnego.");
    });
}
