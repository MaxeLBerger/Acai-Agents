# Shared Components System

## Übersicht

Das System lädt Navigation und Footer automatisch auf allen Seiten. Änderungen an der Navigation oder dem Footer müssen nur noch an **einer** Stelle vorgenommen werden.

## Dateien

- `js/components/navbar.js` - Enthält die Navigation
- `js/components/footer.js` - Enthält den Footer  
- `js/components-loader.js` - Lädt die Components automatisch

## Wie es funktioniert

1. Jede HTML-Seite hat Placeholders:
   - `<div id="navbar-placeholder"></div>` für die Navigation
   - `<div id="footer-placeholder"></div>` für den Footer

2. Der Component-Loader lädt automatisch beim Seitenaufruf:
   - Die korrekte Navigation mit aktivem Link
   - Den Footer mit korrekten Pfaden

## Änderungen vornehmen

### Navigation ändern
Bearbeite `js/components/navbar.js` - Änderungen gelten für **alle** Seiten.

### Footer ändern  
Bearbeite `js/components/footer.js` - Änderungen gelten für **alle** Seiten.

## Vorteile

 **Einheitlich** - Alle Seiten haben dieselbe Navigation & Footer
 **Wartbar** - Änderungen nur an einer Stelle
 **Automatisch** - Aktiver Link wird automatisch erkannt
 **Pfade** - Relative Pfade werden automatisch angepasst
