# 🥗 So Yummy - Aplikacja Kulinarna

<div align="center">
  <img src="./public/screenshots/banner.png" alt="So Yummy Banner" width="800" height="auto" />
</div>

## 📝 Opis Projektu

So Yummy to nowoczesna aplikacja kulinarna, która pomaga użytkownikom odkrywać, zapisywać i dzielić się przepisami kulinarnymi. Aplikacja oferuje intuicyjny interfejs użytkownika i szereg funkcji ułatwiających zarządzanie przepisami.

### ✨ Główne Funkcje

- 🔍 Wyszukiwanie przepisów po nazwie lub składnikach
- 📱 Responsywny design (Mobile First)
- 👤 System autoryzacji użytkowników
- ❤️ Zapisywanie ulubionych przepisów
- 📝 Tworzenie własnych przepisów
- 🛒 Lista zakupów
- 🌙 Tryb ciemny/jasny
- 🌐 Planowana obsługa wielu języków (PL/EN)

## 🛠️ Technologie

### Frontend
- React 18
- TypeScript
- Redux Toolkit & Redux Persist
- React Router 6
- Axios
- Formik & Yup
- React Hook Form
- React Select
- React Toastify
- Material-UI (MUI)
- React Loading Skeleton
- React Media
- SASS/SCSS Modules

### Backend
- Node.js
- Express
- MongoDB
- Mongoose (ODM)
- JWT Authentication
- Passport & Passport JWT
- Cloudinary
- SendGrid
- Joi
- Morgan
- Multer
- Swagger UI Express
- Bcrypt
- CORS
- EJS

### Narzędzia
- Vite
- ESLint
- TypeScript
- Prettier
- Jest
- Nodemon (dev)
- Vercel (deployment)

## 📸 Screenshots

<div align="center">
  <img src="./public/screenshots/home.png" alt="Home Page" width="250" height="440"/>
  <img src="./public/screenshots/login.png" alt="Login Page" width="250" height="440"/>
  <img src="./public/screenshots/recipe.png" alt="Recipes Page" width="250" height="440"/>
</div>

## 🚀 Demo

[Live Demo](https://so-yummy-jack.netlify.app/)

## 🔑 Konto testowe

Aby szybko przetestować funkcjonalności aplikacji, możesz skorzystać z przygotowanego konta testowego:

### Dane dostępowe
- **Email**: user@test.pl
- **Hasło**: user1234

### Zawartość konta testowego
- Przykładowe przepisy
- Zapisane ulubione przepisy
- Przygotowana lista zakupów
- Przykładowe kategorie

> **Uwaga**: To konto jest przeznaczone wyłącznie do celów demonstracyjnych. Prosimy o niemodyfikowanie istniejących danych.

## 💻 Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/JacekPasierb/SO-YUMMY-APP.git
```

2. Przejdź do katalogu projektu:
```bash
cd SO-YUMMY-APP
```

3. Zainstaluj zależności:
```bash
npm install
```

4. Utwórz plik .env w głównym katalogu i dodaj wymagane zmienne środowiskowe:
```env
VITE_APP_API_URL=your_api_url
```

5. Uruchom aplikację w trybie deweloperskim:
```bash
npm run dev
```

## 🔧 Dostępne Skrypty

### Frontend
- `npm run dev` - uruchamia aplikację w trybie deweloperskim
- `npm run build` - buduje aplikację do produkcji
- `npm run lint` - sprawdza kod pod kątem błędów (js,jsx)
- `npm run preview` - podgląd zbudowanej aplikacji

### Backend
- `npm start` - uruchamia serwer w trybie produkcyjnym
- `npm run start:dev` - uruchamia serwer w trybie deweloperskim z nodemon

## 🌟 Funkcjonalności

### Autoryzacja
- Rejestracja użytkownika
- Logowanie
- Weryfikacja email

### Przepisy
- Przeglądanie przepisów
- Wyszukiwanie po nazwie
- Wyszukiwanie po składnikach
- Filtrowanie po kategorii
- Dodawanie własnych przepisów
- Zarządzanie ulubionymi przepisami

### Lista Zakupów
- Dodawanie składników do listy
- Usuwanie składników

### Profil Użytkownika
- Edycja danych profilu
- Zmiana avatara
- Przełączanie motywu (ciemny/jasny)

## 🔄 Planowane rozszerzenia

- ✅ Testy jednostkowe (Jest)
    - Dodanie skryptów: `npm test` i `npm run test:coverage`
- ⏳ Testy integracyjne (React Testing Library)
- ⏳ Testy E2E (Cypress)
- ⏳ Wielojęzyczność (i18next)
  - 🇵🇱 Polski
  - 🇬🇧 Angielski
## 👨‍💻 Autor

- [Jacek Pasierb](https://github.com/JacekPasierb)

## 📞 Kontakt

Jeśli masz pytania lub sugestie, skontaktuj się z nami:
- Email: jpasierb@proton.me
- [GitHub Issues](https://github.com/JacekPasierb/SO-YUMMY-APP/issues)