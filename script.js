// Mockowe dane logowania
const validUsers = {
    "michal.nowacki": "haslo123",
    "cezary.wieczorek": "haslo456",
    "cezary.poranek": "haslo789",
    "leonard.bielik": "haslo101",
    "jan.kowalski": "haslo202"
};

// Funkcja logowania
function zaloguj() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userFullName = {
        "michal.nowacki": "Michał Nowacki",
        "cezary.wieczorek": "Cezary Wieczorek",
        "cezary.poranek": "Cezary Poranek",
        "leonard.bielik": "Leonard Bielik",
        "jan.kowalski": "Jan Kowalski"
    };

    if (validUsers[username] && validUsers[username] === password) {
        sessionStorage.setItem("username", username);
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("userFullName").textContent = userFullName[username];
    } else {
        document.getElementById("loginError").textContent = "Nieprawidłowy login lub hasło!";
    }
}

// Funkcja dodawania działania dyscyplinarnego
function dodajDzialanieDyscyplinarne() {
    const nick = document.getElementById("dyscyplinarneNick").value;
    const imieNazwisko = document.getElementById("dyscyplinarneImieNazwisko").value;
    const typ = document.getElementById("dyscyplinarneTyp").value;
    const opis = document.getElementById("dyscyplinarneOpis").value;

    const newItem = document.createElement("li");
    newItem.textContent = `${nick} (${imieNazwisko}) - ${typ}: ${opis}`;
    document.getElementById("dyscyplinarneLista").appendChild(newItem);

    // Wysyłanie danych do webhooka
    fetch('https://your-webhook-url.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nick,
            imieNazwisko,
            typ,
            opis
        })
    }).then(response => {
        if (response.ok) {
            alert("Działanie dyscyplinarne zapisane!");
        } else {
            alert("Błąd podczas wysyłania danych!");
        }
    }).catch(error => {
        console.error("Błąd w połączeniu z webhookiem:", error);
        alert("Błąd webhooka!");
    });
}
