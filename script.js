// Webhook URL Discorda dla Mandatów
const discordMandatWebhookUrl = "https://discord.com/api/webhooks/1305617060402823309/RQXIaIDsJH-W8X7MBvgYGsgBSUJiInze_KOik63oX6kQqXTPFpapDs_LCzkJDRHJ357B";

// Webhook URL Discorda dla Działań Dyscyplinarnych
const discordDyscyplinarneWebhookUrl = "https://discord.com/api/webhooks/1305621989087776778/MsIgza2EjHxSko6Mn0roZ-v-XLRygMCopcOenehBeHE2dY5kZC9AHsUSHiU-8dqe3J6Y";

// Mockowe dane logowania z przypisanymi hasłami oraz informacjami o rolach
const validUsers = {
    "michal.nowacki": { password: "haslo123", role: "pulkownik", fullName: "płk SG Michał Nowacki" },
    "cezary.wieczorek": { password: "haslo456", role: "kapitan", fullName: "kpt. SG Cezary Wieczorek" },
    "cezary.poranek": { password: "haslo789", role: "kpr", fullName: "kpr. SG Cezary Poranek" },
    "leonard.bielik": { password: "haslo101", role: "ppulkownik", fullName: "ppłk SG Leonard Bielik" },
    "jan.kowalski": { password: "haslo202", role: "szer", fullName: "szer. SG Jan Kowalski" }
};

// Zdarzenia dyscyplinarne (przykład)
const dyscyplinarneZdarzenia = [
    { osoba: "Michał Nowacki", typ: "reprymenda", opis: "Opóźnienie w pracy", rola: "pulkownik" },
    { osoba: "Cezary Wieczorek", typ: "zwolnienie", opis: "Naruszenie zasad", rola: "kapitan" },
    { osoba: "Cezary Poranek", typ: "zawieszenie", opis: "Popełnienie błędu", rola: "kpr" },
    { osoba: "Leonard Bielik", typ: "reprymenda", opis: "Złe zachowanie", rola: "ppulkownik" },
    { osoba: "Jan Kowalski", typ: "zwolnienie", opis: "Złamanie regulaminu", rola: "szer" }
];

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Sprawdzamy czy użytkownik i hasło są poprawne
    if (validUsers[username] && validUsers[username].password === password) {
        sessionStorage.setItem("username", username);  // Zapisywanie użytkownika w sesji
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        
        // Pobieramy pełne dane użytkownika
        const user = validUsers[username];
        
        // Dodawanie odpowiedniego stylu w zależności od roli
        if (user.role === "pulkownik") {
            document.body.classList.add("pulkownik");
            document.getElementById("mainContent").classList.add("pulkownik");
        } else if (user.role === "kapitan") {
            document.body.classList.add("kapitan");
            document.getElementById("mainContent").classList.add("kapitan");
        } else if (user.role === "kpr") {
            document.body.classList.add("kpr");
            document.getElementById("mainContent").classList.add("kpr");
        } else if (user.role === "ppulkownik") {
            document.body.classList.add("ppulkownik");
            document.getElementById("mainContent").classList.add("ppulkownik");
        } else {
            document.body.classList.add("szer");
            document.getElementById("mainContent").classList.add("szer");
        }
        
        // Wyświetlenie pełnego imienia i nazwiska użytkownika
        alert(`Zalogowano jako: ${user.fullName}`);

        // Wyświetlenie odpowiednich działań dyscyplinarnych
        pokazDyscyplinarneZdarzenia(user.role);
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

// Funkcja, która wyświetla działania dyscyplinarne dla odpowiednich ról
function pokazDyscyplinarneZdarzenia(rolo) {
    const listaDyscyplinarnych = document.getElementById("dyscyplinarneLista");
    listaDyscyplinarnych.innerHTML = ""; // Resetowanie listy

    dyscyplinarneZdarzenia.forEach(zdarzenie => {
        if (zdarzenie.rola === rolo) {
            const listItem = document.createElement("li");
            listItem.textContent = `${zdarzenie.osoba} - ${zdarzenie.typ}: ${zdarzenie.opis}`;
            listaDyscyplinarnych.appendChild(listItem);
        }
    });
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

    // Wysyłanie powiadomienia na Discorda dla mandatów
    if (typZdarzenia === "mandat") {
        fetch(discordMandatWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: `Nowe zdarzenie: ${zdarzenie.typZdarzenia}`,
                    description: `Nazwa gracza: ${zdarzenie.nazwaGracza}\nOpis: ${zdarzenie.opis}`,
                    color: 3447003,
                    footer: { text: `Data: ${zdarzenie.data}` }
                }]
            })
        });
    }

    // Wysyłanie powiadomienia na Discorda dla działań dyscyplinarnych
    if (typZdarzenia === "zatrzymanie" || typZdarzenia === "reprymenda" || typZdarzenia === "zwolnienie") {
        fetch(discordDyscyplinarneWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: `Nowe działanie dyscyplinarne: ${zdarzenie.typZdarzenia}`,
                    description: `Osoba: ${zdarzenie.nazwaGracza}\nOpis: ${zdarzenie.opis}`,
                    color: 16711680, // Czerwony
                    footer: { text: `Data: ${zdarzenie.data}` }
                }]
            })
        });
    }

    // Wyczyść formularz
    document.getElementById("zdarzenieForm").reset();
}

// Funkcja dodająca działania dyscyplinarne
function dodajDyscyplinarneZdarzenie() {
    const osobaDyscyplinarna = document.getElementById("osobaDyscyplinarna").value;
    const typKary = document.getElementById("typKary").value;
    const opisKary = document.getElementById("opisKary").value;
    const data = new Date().toLocaleString("pl-PL");

    const zdarzenie = {
        osobaDyscyplinarna,
        typKary,
        opisKary,
        data
    };

    // Dodawanie zdarzenia do listy na stronie
    const zdarzeniaLista = document.getElementById("zdarzeniaLista");
    const listItem = document.createElement("li");
    listItem.textContent = `${zdarzenie.data} - Kara: ${zdarzenie.typKary} - ${zdarzenie.opisKary} (${zdarzenie.osobaDyscyplinarna})`;
    zdarzeniaLista.appendChild(listItem);

    // Przykładowa logika wysyłania powiadomienia do Discorda w przypadku kary
    fetch(discordDyscyplinarneWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: `Nowa kara dyscyplinarna: ${zdarzenie.typKary}`,
                description: `Osoba: ${zdarzenie.osobaDyscyplinarna}\nOpis: ${zdarzenie.opisKary}`,
                color: 16711680, // Czerwony
                footer: { text: `Data: ${zdarzenie.data}` }
            }]
        })
    });

    // Wyczyść formularz
    document.getElementById("dyscyplinarneForm").reset();
}
