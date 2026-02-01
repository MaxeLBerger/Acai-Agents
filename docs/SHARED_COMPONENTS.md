# Shared Components System

## �bersicht

Das System l�dt Navigation und Footer automatisch auf allen Seiten. �nderungen
an der Navigation oder dem Footer m�ssen nur noch an **einer** Stelle
vorgenommen werden.

## Dateien

- `js/components/navbar.js` - Enth�lt die Navigation
- `js/components/footer.js` - Enth�lt den Footer
- `js/components-loader.js` - L�dt die Components automatisch

## Wie es funktioniert

1. Jede HTML-Seite hat Placeholders:
   - `<div id="navbar-placeholder"></div>` f�r die Navigation
   - `<div id="footer-placeholder"></div>` f�r den Footer

2. Der Component-Loader l�dt automatisch beim Seitenaufruf:
   - Die korrekte Navigation mit aktivem Link
   - Den Footer mit korrekten Pfaden

## �nderungen vornehmen

### Navigation �ndern

Bearbeite `js/components/navbar.js` - �nderungen gelten f�r **alle** Seiten.

### Footer �ndern

Bearbeite `js/components/footer.js` - �nderungen gelten f�r **alle** Seiten.

## Vorteile

**Einheitlich** - Alle Seiten haben dieselbe Navigation & Footer **Wartbar** -
�nderungen nur an einer Stelle **Automatisch** - Aktiver Link wird automatisch
erkannt **Pfade** - Relative Pfade werden automatisch angepasst
