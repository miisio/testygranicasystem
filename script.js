// Lista dostępnych przestępstw/wykroczeń
const przepisy = {
    'obraza funkcjonariusza': {
        'kodeks karny': 'Art. 226. § 1. Kto znieważa funkcjonariusza publicznego w czasie i w związku z pełnieniem przez niego obowiązków służbowych, podlega grzywnie, karze ograniczenia wolności albo pozbawienia wolności do roku.',
        'kodeks wykroczeń': 'Art. 51. § 1. Kto w miejscu publicznym znieważa funkcjonariusza publicznego podczas wykonywania przez niego obowiązków służbowych, podlega karze grzywny.',
    },
    'kradzież': {
        'kodeks karny': 'Art. 278. § 1. Kto kradnie rzecz ruchomą, podlega karze pozbawienia wolności od 3 miesięcy do lat 5.',
        'kodeks wykroczeń': 'Brak odpowiednika w kodeksie wykroczeń.',
    },
    'spożywanie alkoholu w miejscu publicznym': {
        'kodeks wykroczeń': 'Art. 43. § 1. Kto spożywa alkohol w miejscach publicznych, podlega karze grzywny.',
        'kodeks karny': 'Brak odpowiednika w kodeksie karnym.',
    },
};

// Funkcja do wyszukiwania przepisów
function wyszukajPrzepis() {
    const przestepstwo = document.getElementById('przestepstwo').value.trim().toLowerCase();
    const przepis = przepisy[przestepstwo];

    if (przepis) {
        let wynik = `<b>Kodeks Karny:</b> ${przepis['kodeks karny'] || 'Brak przepisu'}<br>
                     <b>Kodeks Wykroczeń:</b> ${przepis['kodeks wykroczeń'] || 'Brak przepisu'}`;
        document.getElementById('przepisResult').innerHTML = wynik;
    } else {
        document.getElementById('przepisResult').innerHTML = 'Nie znaleziono artykułu dla tego wykroczenia/przestępstwa.';
    }
}

// Funkcja do wyświetlania podpowiedzi
function pokazPodpowiedzi() {
    const input = document.getElementById('przestepstwo').value.trim().toLowerCase();
    const podpowiedziDiv = document.getElementById('podpowiedzi');
    podpowiedziDiv.innerHTML = '';

    if (input.length === 0) return;

    // Filtrujemy przestępstwa/wykroczenia, które pasują do wpisywanego tekstu
    const pasujacePrzestepstwa = Object.keys(przepisy).filter(przestepstwo => przestepstwo.toLowerCase().includes(input));

    // Wyświetlamy wyniki pasujące do wpisanego tekstu
   
