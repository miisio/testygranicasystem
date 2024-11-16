// Spersonalizowane dane logowania
const validUsers = {
    "michal.nowacki": { password: "haslo123", name: "Płk SG Michał Nowacki" },
    "cezary.wieczorek": { password: "haslo456", name: "Kpt. SG Cezary Wieczorek" },
    "leonard.bielik": { password: "haslo101", name: "Ppłk SG Leonard Bielik" },
    "cezary.poranek": { password: "haslo789", name: "Ppor. SG Cezary Poranek" },
    "jan.kowalski": { password: "haslo202", name: "Szer. SG Jan Kowalski" },
    "adam.cipkiewicz": { password: "haslo404", name: "Szer. SG Adam Cipkiewicz" }
};

// Funkcja logowania
function zaloguj(event) {
    event.preventDefault();  // Zatrzymuje wysyłanie formularza

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Sprawdzamy, czy użytkownik i hasło są prawidłowe
    if (validUsers[username] && validUsers[username].password === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie loginu użytkownika w sesji
        sessionStorage.setItem("userName", validUsers[username].name);  // Zapisywanie pełnego imienia i nazwiska użytkownika

        // Po udanym logowaniu ukrywamy formularz logowania, a pokazujemy sekcję główną
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

        // Dodawanie odpowiedniego stylu w zależności od roli
        if (username === "michal.nowacki" || username === "cezary.wieczorek" || username === "leonard.bielik") {
            document.getElementById("dyscyplinarneOptions").style.display = "block"; // Pokaż sekcję dyscyplinarną, jeśli to odpowiednia osoba
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

    // Wybór odpowiedniego webhooka dla typu zdarzenia
    let webhookUrl = "";
    if (typZdarzenia === "mandat") {
        webhookUrl = "https://discord.com/api/webhooks/1305617060402823309/RQXIaIDsJH-W8X7MBvgYGsgBSUJiInze_KOik63oX6kQqXTPFpapDs_LCzkJDRHJ357B";
    } else if (typZdarzenia === "zatrzymanie") {
        webhookUrl = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";
    } else {
        webhookUrl = "https://discord.com/api/webhooks/1305621989087776778/MsIgza2EjHxSko6Mn0roZ-v-XLRygMCopcOenehBeHE2dY5kZC9AHsUSHiU-8dqe3J6Y";
    }

    // Wysyłanie zdarzenia do Discorda
    const embedData = {
        content: `Nowe zdarzenie: ${typZdarzenia}`,
        embeds: [{
            title: `Zdarzenie: ${typZdarzenia}`,
            description: opis,
            fields: [
                {
                    name: "Gracz",
                    value: nazwaGracza,
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

// Zabezpieczenie przed wylogowaniem - sprawdzenie w sessionStorage
window.onload = function() {
    const username = sessionStorage.getItem("username");
    if (username) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("userNameDisplay").textContent = `Witaj, ${sessionStorage.getItem("userName")}`;
        if (["michal.nowacki", "cezary.wieczorek", "leonard.bielik"].includes(username)) {
            document.getElementById("dyscyplinarneOptions").style.display = "block"; // Pokazuje sekcję dyscyplinarną
        }
    }
};
