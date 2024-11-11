// Webhook URL dla mandatów
const discordWebhookUrlMandat = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";
// Webhook URL dla nowych zdarzeń dyscyplinarnych
const discordWebhookUrlDyscyplinarne = "https://discord.com/api/webhooks/1305621989087776778/MsIgza2EjHxSko6Mn0roZ-v-XLRygMCopcOenehBeHE2dY5kZC9AHsUSHiU-8dqe3J6Y";

// Spersonalizowane dane logowania
const validUsers = {
    "michal.nowacki": { password: "haslo123", name: "Płk SG Michał Nowacki", role: "admin" },
    "cezary.wieczorek": { password: "haslo456", name: "Kpt. SG Cezary Wieczorek", role: "admin" },
    "cezary.poranek": { password: "haslo789", name: "Kpr. SG Cezary Poranek", role: "sg" },
    "leonard.bielik": { password: "haslo101", name: "Ppłk SG Leonard Bielik", role: "admin" },
    "jan.kowalski": { password: "haslo202", name: "Szer. SG Jan Kowalski", role: "sg" },
    "jan.kowalczyk": { password: "haslo303", name: "Szer. SG Jan Kowalczyk", role: "sg" },
    "admin": { password: "granica123", name: "Administrator", role: "admin" },
    "wzd": { password: "bezpiecznosc123", name: "Wydział Zabezpieczeń Straży Granicznej", role: "admin" },
    "sg": { password: "straza123", name: "Zwykła Straż Graniczna", role: "sg" }
};

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username].password === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie użytkownika w sesji
        sessionStorage.setItem("userName", validUsers[username].name);  // Zapisywanie pełnego imienia i nazwiska użytkownika
        sessionStorage.setItem("role", validUsers[username].role);  // Zapisywanie roli użytkownika

        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        
        // Wczytywanie zawartości zależnej od roli użytkownika
        const role = validUsers[username].role;
        if (role === "admin") {
            document.getElementById("dyscyplinarneOptions").style.display = "block"; // Wyświetlanie opcji dyscyplinarnych dla administratorów
        }
        
        // Zmienianie stylów zależnie od roli
        document.body.classList.add(role); // np. "admin" lub "sg"
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
    const userName = sessionStorage.getItem("userName");  // Pobieranie imienia i nazwiska użytkownika z sesji

    const zdarzenie = {
        nazwaGracza,
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
    let webhookUrl = discordWebhookUrlMandat;  // Domyślny webhook dla mandatów
    if (typZdarzenia === "zatrzymanie") {
        webhookUrl = discordWebhookUrlMandat;  // Możesz dodać inny webhook dla zatrzymań, jeśli chcesz
    }

    // Wysyłanie powiadomienia na Discorda
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "System Raportowania Granicznego",
            avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png",
            embeds: [{
                title: `Nowe zdarzenie: ${zdarzenie.typZdarzenia}`,
                description: `Nazwa gracza: ${zdarzenie.nazwaGracza}\nOpis: ${zdarzenie.opis}\nWystawione przez: ${zdarzenie.userName}`,
                color: 3447003,
                footer: { text: `Data: ${zdarzenie.data}` }
            }]
        })
    });

    // Wyczyść formularz
    document.getElementById("zdarzenieForm").reset();
}

// Funkcja dodająca zdarzenie dyscyplinarne
function dodajDyscyplinarne() {
    const typDyscypliny = document.getElementById("typDyscypliny").value;
    const opisDyscypliny = document.getElementById("opisDyscypliny").value;
    const data = new Date().toLocaleString("pl-PL");
    const userName = sessionStorage.getItem("userName");

    const dyscyplinarneZdarzenie = {
        typDyscypliny,
        opisDyscypliny,
        data,
        userName
    };

    // Wysyłanie powiadomienia o zdarzeniu dyscyplinarnym na Discorda
    fetch(discordWebhookUrlDyscyplinarne, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "System Raportowania Granicznego",
            avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png",
            embeds: [{
                title: `Nowe działanie dyscyplinarne: ${dyscyplinarneZdarzenie.typDyscypliny}`,
                description: `Opis: ${dyscyplinarneZdarzenie.opisDyscypliny}\nWystawione przez: ${dyscyplinarneZdarzenie.userName}`,
                color: 15548997,
                footer: { text: `Data: ${dyscyplinarneZdarzenie.data}` }
            }]
        })
    });

    // Wyczyść formularz
    document.getElementById("dyscyplinarneOptions").reset();
}
