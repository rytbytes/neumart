# FreshPantry

FreshPantry is a small front-end grocery-store demonstration website built with plain HTML, CSS, and JavaScript. It was originally created as a single HTML file and has been split into separate files for easier maintenance and development.

## Project Structure

```text
freshpantry/
├── index.html          # Main HTML document and application views
├── css/
│   └── style.css       # All site styling, themes, layout, and responsive UI rules
├── js/
│   └── app.js          # Routing, theme, authentication demo, cart, and dashboard logic
├── assets/             # Local images and other static assets can be placed here
└── README.md           # Project documentation
```

## Features

- Hash-based single-page navigation for Home, Catalog, Register, Login, and Admin Dashboard views.
- Light and dark theme switching with the selected theme saved in `localStorage`.
- Product catalog with Add to Cart buttons.
- Native `<dialog>` shopping-cart modal with a calculated order total.
- Demo registration form using native HTML validation.
- Demo admin login and dashboard.
- Collapsible admin sidebar with inventory and HTML-semantics demonstrations.
- Native HTML examples including `<datalist>`, `<details>`, semantic tables, `<kbd>`, `<code>`, and `<samp>`.

## How to Run

No build system, package manager, or backend is required for the current demo.

### Option 1: Open directly

Open `index.html` in a modern web browser.

### Option 2: Use a local web server

Serving the project locally is useful if you later add modules, APIs, or other browser features that work better over HTTP.

For example, with Python installed:

```bash
cd freshpantry
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Navigation

The application uses URL hash fragments rather than separate HTML pages:

```text
#home
#catalog
#register
#login
#dashboard
#dashboard-table
#dashboard-add
#dashboard-features
```

The routing logic is implemented in `js/app.js`.

## Demo Login

The current front-end demo contains a hard-coded administrator login:

```text
Username: admin
Password: test@123
```

This is demonstration logic only. It is **not secure authentication** and must not be used with real credentials or production data.

## External Resources

The project currently uses a couple of external resources rather than local files:

- Inter font is loaded from Google Fonts.
- Product card images use `placehold.co` URLs.

These can later be replaced with local files under `assets/` if a self-contained/offline version is needed.

## Development Notes

### HTML

`index.html` contains the application structure and page/dashboard views. Inline `<style>` and `<script>` sections have been removed from the original monolithic file.

### CSS

All extracted styling is in `css/style.css`. CSS custom properties are used for the light and dark themes, making the visual system easier to maintain.

### JavaScript

`js/app.js` contains the application's client-side behavior, including:

- Theme initialization and switching
- Hash-based routing
- Dashboard sidebar toggling
- Registration form handling
- Demo authentication
- Shopping cart state and rendering
- In-page anchor scrolling

## Limitations

This is a front-end demonstration rather than a complete e-commerce application. In particular:

- There is no real database.
- There is no real user account system.
- Login credentials are hard-coded in client-side JavaScript.
- Registration does not send data to a server.
- Checkout is only a demonstration action.
- Inventory changes are not persisted.
- Product images are currently placeholders.

A production version would need a backend, secure authentication, server-side validation, persistent storage, proper checkout/payment handling, and protected admin functionality.

## Customizing the Project

To add local product images, place them in `assets/` and update the corresponding `<img src="...">` paths in `index.html`.

To change the site's appearance, edit `css/style.css`.

To change application behavior or add routes/features, edit `js/app.js`.
