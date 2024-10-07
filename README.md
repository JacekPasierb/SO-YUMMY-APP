KONTO TESTOWE:
user@test.pl
user1234

PROJEKT jest w fazie rozwojowej, kod wymaga stworzenia funkcji pomocniczych oraz komponentów wspólnych i dokonczenia Ap

// INFORMACJE DLA DEVELOPERA //

- stowrzyć folder types z interaface
- dodać obsługę języków z react-i18next
- uprościć kod tworząc funkcje pomocnicze
- zastosować style components
-

## Project CSS Guidelines

## 1. Overview

    This document outlines the CSS conventions and guidelines for the project to ensure consistency, maintainability, and scalability across the codebase.

## 2. Style Conventions

         2.1 Units

        - Font Sizes: Use rem for all font sizes to ensure scalability and accessibility.

        Example:

        body {
        font-size: 1rem; /_ 16px _/
        }

        - Spacing (Padding & Margin): Use rem for all spacing properties.

        Example:

        .container {
        margin: 1rem; /_ 16px _/
        padding: 1.5rem; /_ 24px _/
        }

        - Dimensions: Use px for fixed dimensions (like borders or specific UI elements) and rem for
           responsive elements.

        Example:

        .box {
        width: 300px; /_ Fixed width _/
        height: 5rem; /_ Responsive height _/
        }

        2.2 Colors

        - Color Format: All colors should be defined in rgba format for better control over transparency and consistency.

        Example:

        .primary-bg {
        background-color: rgba(42, 87, 141, 1); /_ Solid color _/
        }

        .transparent-bg {
        background-color: rgba(255, 255, 255, 0.8); /_ Semi-transparent _/
        }

## 3. Responsiveness

    - Use @media queries to adjust styles for different screen sizes. Breakpoints should be defined as follows:

    - Small devices (phones): @media screen and (max-width: 768px)
    - Medium devices (tablets): @media screen and (min-width: 768px) and (max-width: 1200px)
    - Large devices (desktops): @media screen and (min-width: 1200px)
      Example:

    @media screen and (max-width: 768px) {
    .container {
    flex-direction: column; /_ Stack items vertically _/
    }
    }

## 4. CSS Declaration Order

To ensure consistency and maintainability across the project, please follow this order when writing CSS styles:

1. **Positioning**

   - `position`, `top`, `right`, `bottom`, `left`, `z-index`

2. **Box Model**

   - `display`, `flex`, `flex-direction`, `width`, `height`, `margin`, `padding`, `border`, `border-radius`, `overflow`

3. **Typography**

   - `font`, `font-size`, `font-family`, `font-weight`, `line-height`, `color`, `text-align`, `text-decoration`

4. **Visual**

   - `background-color`, `background-image`, `background-position`, `opacity`, `box-shadow`

5. **Miscellaneous**
   - Any other properties that don't fit into the above categories, such as `transition`, `cursor`,`animation`, etc.
