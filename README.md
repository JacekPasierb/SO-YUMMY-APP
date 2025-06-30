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
- 🌐 Obsługa wielu języków (PL/EN)

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
- **Testy**: Jest, React Testing Library

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
- `npm test` - uruchamia testy jednostkowe i integracyjne
- `npm run test:coverage` - generuje raport pokrycia testów

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
- ⏳ Testy integracyjne (React Testing Library)
- ⏳ Testy E2E (Cypress)

## 🛠️ Problemy i Rozwiązania

### 1. Problem z Nawigacją w Testach
- **Opis**: Test nawigacji po udanym logowaniu nie działał,   
            ponieważ `mockNavigate` nie był wywoływany.
            
- **Rozwiązanie**: Upewniłem się, że mockowanie `useNavigate`  
                   jest poprawnie skonfigurowane oraz dodałem mock dla `dispatch`, aby symulować udane logowanie::
  ```typescript
  const mockDispatch = jest.fn().mockResolvedValueOnce({ type: "auth/logIn/fulfilled" });
  (mockStore.dispatch as jest.Mock) = mockDispatch;
  ```

### 2. Problemy z Testami Komponentu `SigninForm`
- **Opis**: Podczas uruchamiania testów dla komponentu `SigninForm` napotykano błędy związane z wywołaniem akcji `dispatch`, co prowadziło do nieprawidłowego zachowania testów.
  
- **Rozwiązanie**: Upewniłem się, że mock `dispatch` jest poprawnie skonfigurowany w testach. Wykorzystałem `jest.fn()` do stworzenia mocka, który symuluje zachowanie akcji. W testach, które sprawdzają ponowne wysyłanie e-maila weryfikacyjnego, użyłem `mockRejectedValueOnce`, aby symulować błąd:
  ```typescript
  jest.mock("react-redux", () => {
    const originalModule = jest.requireActual("react-redux");
    return {
      ...originalModule,
      useDispatch: jest.fn(),
    };
  });
  ```

### 3. Użycie `storeWithSuccess` i `storeWithError`
- **Opis**: W testach komponentu `SigninForm` dodano `storeWithSuccess` i `storeWithError`, aby symulować różne stany aplikacji.
  
- **Rozwiązanie**: Użycie `storeWithSuccess` do symulacji udanego logowania oraz `storeWithError` do symulacji błędów. Przykłady:
  ```typescript
  const storeWithSuccess = configureStore({
    reducer: {
      auth: (state = { error: null }, action) => state,
    },
  });

  const storeWithError = configureStore({
    reducer: {
      auth: (state = { error: "Email not verified" }, action) => state,
    },
  });
  ```

### 4. Mockowanie `useDispatch`
- **Opis**: W bloku `beforeEach` dodano linijkę, która mockuje `useDispatch`, aby zapewnić, że testy będą korzystać z odpowiedniego mocka.
  
- **Rozwiązanie**: W bloku `beforeEach` dodano:
  ```typescript
  beforeEach(() => {
    jest.clearAllMocks();
    (require("react-redux").useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });
  ```
### 5. Problem z Importem `useNavigate`
- **Opis**: Podczas testowania komponentu `RegisterForm` wystąpił problem z nawigacją, ponieważ `useNavigate` był importowany z niewłaściwego modułu, co powodowało, że `mockNavigate` nie był wywoływany.
  
- **Rozwiązanie**: Upewniłem się, że `useNavigate` jest importowany z `react-router` zamiast `react-router-dom`, co rozwiązało problem z nawigacją w testach. Poprawny import wygląda następująco:
  ```typescript
  import { useNavigate } from "react-router";
  ```

## 👨‍💻 Autor

- [Jacek Pasierb](https://github.com/JacekPasierb)

## 📞 Kontakt

Jeśli masz pytania lub sugestie, skontaktuj się z nami:
- Email: jpasierb@proton.me
- [GitHub Issues](https://github.com/JacekPasierb/SO-YUMMY-APP/issues)