# 🧠 Mistrz Gramatyki AI

Zaawansowana aplikacja internetowa do nauki gramatyki angielskiej z wykorzystaniem sztucznej inteligencji Google Gemini.

## ✨ Funkcje

- **Interaktywne testy gramatyczne** - Test Past Simple vs Present Perfect z natychmiastowym feedbackiem
- **Wstęp teoretyczny** - Przejrzyste wyjaśnienia gramatyczne przed testem
- **Analiza błędów przez AI** - Spersonalizowane analizy błędów z poradami
- **Generator nowych testów** - AI generuje nowe pytania na ten sam temat
- **Generator własnych testów** - Dowolne zagadnienia gramatyczne
- **Responsywny design** - Działa na wszystkich urządzeniach
- **Ciemny motyw** - Nowoczesny interfejs w kolorach slate

## 🚀 Instalacja

1. **Sklonuj repozytorium**
   ```bash
   git clone [repository-url]
   cd mistrz-gramatyki
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Konfiguracja API**
   - Skopiuj plik `.env.example` jako `.env`
   - Uzyskaj klucz API Google Gemini:
     - Przejdź do https://makersuite.google.com/app/apikey
     - Zaloguj się kontem Google
     - Kliknij "Create API Key"
     - Skopiuj klucz
   - Wklej klucz w pliku `.env`:
     ```
     VITE_GEMINI_API_KEY=twój_klucz_api
     ```

4. **Uruchom aplikację**
   ```bash
   npm run dev
   ```

5. **Otwórz w przeglądarce**
   ```
   http://localhost:5173
   ```

## 🛠️ Technologie

- **React** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Stylizacja
- **Google Generative AI** - Integracja z Gemini
- **Lucide React** - Ikony
- **JavaScript/ES6+** - Język programowania

## 📱 Struktura aplikacji

```
src/
├── components/          # Komponenty React
│   ├── StartScreen.jsx     # Ekran startowy
│   ├── TheoryScreen.jsx    # Wstęp teoretyczny
│   ├── QuizScreen.jsx      # Ekran testu
│   ├── ResultsScreen.jsx   # Wyniki z AI
│   └── CustomTestScreen.jsx # Generator testów
├── services/            # Serwisy
│   └── aiService.js        # Integracja z Gemini AI
├── data/               # Dane
│   └── defaultQuestions.js # Domyślne pytania
└── App.jsx             # Główny komponent
```

## 🎯 Przepływ użytkownika

1. **Ekran startowy** - Powitanie i prezentacja funkcji
2. **Wstęp teoretyczny** - Nauka różnic Past Simple vs Present Perfect
3. **Test interaktywny** - 10 pytań z natychmiastowym feedbackiem
4. **Wyniki** - Analiza wyników z funkcjami AI:
   - Spersonalizowana analiza błędów
   - Generowanie nowych testów
   - Przejście do generatora własnych testów
5. **Generator testów** - Tworzenie testów na dowolne tematy

## 🤖 Funkcje AI

### 1. Analiza błędów
- Identyfikuje wzorce w błędach użytkownika
- Dostarcza spersonalizowane porady
- Generuje dodatkowe przykłady
- Proponuje plan nauki

### 2. Generator nowych testów
- Tworzy nowe pytania na temat Past Simple vs Present Perfect
- Zapewnia różnorodność i progresję trudności
- Polskie wyjaśnienia dla każdego pytania

### 3. Generator własnych testów
- Przyjmuje dowolny temat gramatyczny
- Generuje 10 pytań dostosowanych do tematu
- Popularne tematy: strona bierna, conditionals, modal verbs, etc.

## 🎨 Design

- **Paleta kolorów**: Slate (ciemna)
- **Typografia**: Inter font
- **UI/UX**: Nowoczesny, minimalistyczny design
- **Responsywność**: Mobile-first approach
- **Animacje**: Płynne przejścia i hover effects
- **Accessibility**: WCAG-compliant

## 📊 Bezpieczeństwo i Niezawodność

- Walidacja danych z API
- Obsługa błędów i fallback content
- Loading states dla operacji AI
- Sanityzacja odpowiedzi Markdown
- Environment variables dla kluczy API

## 🔧 Rozwój

### Uruchomienie w trybie rozwoju
```bash
npm run dev
```

### Build dla produkcji
```bash
npm run build
```

### Podgląd build
```bash
npm run preview
```

## 📝 Licencja

Ten projekt jest stworzony w celach edukacyjnych.

## 🤝 Wsparcie

Jeśli masz pytania lub sugestie, skontaktuj się z deweloperem.

---

**Ucz się gramatyki angielskiej w sposób inteligentny i efektywny! 🚀**
