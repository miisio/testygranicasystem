// Czas cooldown (w sekundach)
const cooldownTime = 30;
let lastActionTime = 0;

// Funkcja, która wystawia zatrzymanie
function wystawZatrzymanie() {
    const currentTime = Date.now();
    const timeSinceLastAction = (currentTime - lastActionTime) / 1000; // Czas w sekundach

    if (timeSinceLastAction < cooldownTime) {
        // Jeśli nie minęło wystarczająco dużo czasu, pokazujemy komunikat o cooldownie
        const remainingTime = cooldownTime - Math.floor(timeSinceLastAction);
        document.getElementById('cooldownMessage').innerText = `Proszę poczekać ${remainingTime} sekundy, zanim wystawisz kolejne zatrzymanie.`;
    } else {
        // Można wystawić zatrzymanie
        const zatrzymaniePowod = document.getElementById('zatrzymanie').value.trim();
        if (zatrzymaniePowod) {
            // Wysłanie danych do Discorda (lub innej logiki)
            wyslijZatrzymanieDoDiscorda(zatrzymaniePowod);
            document.getElementById('cooldownMessage').innerText = 'Zatrzymanie wystawione pomyślnie!';
            lastActionTime = currentTime; // Zaktualizowanie ostatniego czasu akcji
            document.getElementById('zatrzymanie').value = ''; // Czyszczenie pola
        } else {
            document.getElementById('cooldownMessage').innerText = 'Wpisz powód zatrzymania przed wysłaniem!';
        }
    }
}

// Funkcja do wysłania zatrzymania do Discorda
function wyslijZatrzymanieDoDiscorda(powod) {
    const webhookURL = "https://discord.com/api/webhooks/1305568093958963302/HOfEAIM7-p_HilV91rnyxqe56qFA-AZTHoVtZK05i_cOisLxVrgQYwiCjkCNrHgAHXJH";
    
    const data = {
        content: `Zatrzymanie: ${powod}`,
        embeds: [{
            title: "Zatrzymanie na granicy",
            description: `Powód zatrzymania: ${powod}`,
            color: 16711680
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Zatrzymanie wysłane do Discorda:', data);
    })
    .catch(error => {
        console.error('Błąd przy wysyłaniu do Discorda:', error);
    });
}

// Przypisanie funkcji do przycisku
document.getElementById('zatrzymanieButton').addEventListener('click', wystawZatrzymanie);
