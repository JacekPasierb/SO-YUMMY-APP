# Projekt Aplikacji Kulinarnej

## Konto testowe
- Login: user@test.pl
- Hasło: user1234

## Opis projektu
Projekt został napisany w technologii React z wykorzystaniem biblioteki Redux Toolkit. Zastosowano JavaScript ES6+ oraz TypeScript. Do stylizacji wyglądu wykorzystano moduły CSS oraz komponenty Material UI. Formularze tworzone są przy pomocy Formika.

Backend oparty jest na Node.js z Express, korzystając z bazy danych MongoDB połączonej przy użyciu Mongoose. Utworzono kolekcje użytkowników, przepisów, składników oraz list zakupów, które są ze sobą powiązane za pomocą referencji. Do tworzenia kont użytkowników zastosowano JWT passport, a do wysyłania e-maili - SendGrid. Komunikacja z bazą danych odbywa się przy użyciu Axios.

Projekt jest w fazie rozwojowej. Kod wymaga stworzenia funkcji pomocniczych, komponentów wspólnych oraz dokończenia aplikacji.

## Informacje dla developera
- Stworzyć folder `types` z interfejsami
- Dodać obsługę języków z react-i18next
- Uprościć kod, tworząc funkcje pomocnicze

## Wytyczne CSS projektu

### 1. Przegląd
Ten dokument określa konwencje i wytyczne CSS dla projektu, aby zapewnić spójność, łatwość utrzymania i skalowalność w całej bazie kodu.

### 2. Konwencje stylów

#### 2.1 Jednostki

- **Rozmiary czcionek**: Używaj `rem` dla wszystkich rozmiarów czcionek, aby zapewnić skalowalność i dostępność.

  Przykład:
  ```css
  body {
    font-size: 1rem; /* 16px */
  }
  ```

- **Odstępy (Padding & Margin)**: Używaj `rem` dla wszystkich właściwości odstępów.

  Przykład:
  ```css
  .container {
    margin: 1rem; /* 16px */
    padding: 1.5rem; /* 24px */
  }
  ```

- **Wymiary**: Używaj `px` dla stałych wymiarów (jak obramowania lub konkretne elementy UI) i `rem` dla elementów responsywnych.

  Przykład:
  ```css
  .box {
    width: 300px; /* Stała szerokość */
    height: 5rem; /* Responsywna wysokość */
  }
  ```

#### 2.2 Kolory

- **Format kolorów**: Wszystkie kolory powinny być definiowane w formacie rgba dla lepszej kontroli nad przezroczystością i spójnością.

  Przykład:
  ```css
  .primary-bg {
    background-color: rgba(42, 87, 141, 1); /* Pełny kolor */
  }

  .transparent-bg {
    background-color: rgba(255, 255, 255, 0.8); /* Półprzezroczysty */
  }
  ```

### 3. Responsywność

Używaj zapytań `@media` do dostosowywania stylów dla różnych rozmiarów ekranów. Punkty graniczne powinny być zdefiniowane następująco:

- Małe urządzenia (telefony): `@media screen and (max-width: 768px)`
- Średnie urządzenia (tablety): `@media screen and (min-width: 768px) and (max-width: 1200px)`
- Duże urządzenia (komputery stacjonarne): `@media screen and (min-width: 1200px)`

Przykład:
```css
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column; /* Układaj elementy pionowo */
  }
}
```

### 4. Kolejność deklaracji CSS

Aby zapewnić spójność i łatwość utrzymania w całym projekcie, proszę przestrzegać następującej kolejności przy pisaniu stylów CSS:

1. **Pozycjonowanie**
   - `position`, `top`, `right`, `bottom`, `left`, `z-index`

2. **Model pudełkowy**
   - `display`, `flex`, `flex-direction`, `width`, `height`, `margin`, `padding`, `border`, `border-radius`, `overflow`

3. **Typografia**
   - `font`, `font-size`, `font-family`, `font-weight`, `line-height`, `color`, `text-align`, `text-decoration`

4. **Wizualne**
   - `background-color`, `background-image`, `background-position`, `opacity`, `box-shadow`

5. **Różne**
   - Wszelkie inne właściwości, które nie pasują do powyższych kategorii, takie jak `transition`, `cursor`, `animation`, itp.
