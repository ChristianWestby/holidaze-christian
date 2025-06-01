# Holidaze – Accommodation Booking Frontend

## 🏝️ Om prosjektet
Dette er det avsluttende eksamensprosjektet for Frontend Development (FED2) ved Noroff. Prosjektet er et komplett frontend-grensesnitt for Holidaze, en nyopprettet plattform for booking av overnattingssteder. Løsningen inkluderer både en kundeside og en adminside for venue managers.

Applikasjonen er bygget med React og Tailwind CSS, og integrerer Noroff sitt offisielle API for opprettelse og håndtering av venues og bookinger.

## 🎯 Mål og læringsutbytte
Prosjektet dekker følgende læringsutbytte:
- Planlegging og strukturering av et fullstendig webapplikasjonsprosjekt
- Design og prototyping i Figma
- Bruk av React til å bygge moderne og modulære grensesnitt
- Integrasjon med Noroff API (CRUD-operasjoner)
- Bruk av Tailwind CSS for visuell styling
- Responsivt design tilpasset mobil, nettbrett og laptop
- Brukertesting, validering og deploy

## 👥 Brukerroller
- **Visitor**: Kan bla i venues
- **Customer**: Kan registrere seg, logge inn, booke, se bookinger og endre profilbilde
- **Venue Manager**: Kan registrere seg, logge inn, opprette/redigere/slette egne venues og se bookinger

## ✅ Ferdige funksjoner
- Visning og søk av venues
- Visning av detaljer med bildegalleri og tilgjengelighet
- Kalender med blokkerte datoer fra API
- Bookingflyt: dato, gjester, oppsummering og bekreftelse
- Profilside med avatar og oversikt over bookinger
- Admin-funksjoner: opprett, rediger og slett egne venues

## 🎨 Visuell stil og design

Designet er inspirert av luksuriøse reiseopplevelser, med fokus på rolig estetikk, høy kontrast og brukervennlighet. Dropdown-menyen, logo og komponentene følger en helhetlig stil gjennom hele prosjektet.

### Fonter og typografi
- **Font:** `Inter`, sans-serif (via Google Fonts)
- Overskrifter: 36px, 24px, 18px
- Brødtekst: 16px

### Fargepalett

| Navn              | Hex-kode    | Bruk |
|-------------------|-------------|------|
| Primær mørk       | `#1c1c1c`   | Navbar, dropdown, footer |
| Sekundær beige    | `#d2c6b2`   | Border, bakgrunn, detaljer |
| Aksent gull       | `#f3bf49`   | Favoritter, markører |
| Hvit              | `#ffffff`   | Tekst, knapper, bakgrunner |
| Rød (feil)        | `#dc2626`   | Valideringsfeil |
| Grønn (suksess)   | `#16a34a`   | Bookingsuksess |

### Komponentstil
- **Knapper:** Hvite med sort tekst, avrundede hjørner, hover-effekt
- **Kort og modaler:** Mørk bakgrunn, myke skygger, tydelige kontraster
- **Forms:** Tydelig validering, luftige felter
- **Dropdown:** Venstrestilt, full høyde og bredde tilpasset mobil, med logo øverst

### Responsivitet
Tailwind-breakpoints brukes aktivt:
- `min-[300px]`: Mobilvisning
- `md`: Nettbrett (fra 768px)
- `lg`: Laptop og opp (fra 1024px)

## 🔗 Lenker
- **GitHub repo**: [kommer her]
- **Deployet app på Netlify**: [https://holidaze-christian.netlify.app](https://holidaze-christian.netlify.app)
- **Kanban board (GitHub Projects)**: [kommer her]
- **Gantt-skjema (GitHub Roadmap)**: [kommer her]
- **Figma styleguide**: [kommer her]
- **Figma prototyp (desktop + mobil)**: [kommer her]

## 🧪 Testing og validering
- Testet i Lighthouse (ytelse og tilgjengelighet)
- HTML-validert (W3C Markup Validation)
- WAVE-test for tilgjengelighet

## ⚙️ Teknologi brukt
- React 18
- Tailwind CSS 3
- React Router DOM 6+
- Noroff API v2
- Netlify (deploy)

## 📁 Installasjon lokalt
```bash
git clone https://github.com/<ditt-brukernavn>/holidaze.git
cd holidaze
npm install
npm run dev
📸 Bilder og media

Alle bilder som brukes i applikasjonen er hentet fra Pixabay og er lisensiert for fri bruk uten kreditering. Tusen takk til Pixabay for deres gratis bildedatabase.

📜 Disclaimer og etiske retningslinjer

Prosjektet er gjennomført i henhold til Noroff sine etiske retningslinjer og inneholder ingen ulovlig eller upassende bruk av innhold. Det er ikke benyttet AI-genererte tekster uten videre tilpasning.

⸻

Holidaze er et fiktivt prosjekt brukt som læringsplattform for frontend-studenter. All kode er skrevet for pedagogiske formål og reflekterer kandidatenes ferdigheter innen moderne webutvikling.