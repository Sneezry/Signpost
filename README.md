# Signpost

A simple tool to show keys pressed on the screen for Windows 10. It could be helpful when you record the screen.

## Configuration

The configuration file locates at `%UserProfile%\.signpost\config.json`.

```json
{
  "display": 0,
  "fadeDelay": 3,
  "position": "bottomright",
  "offsetX": -20,
  "offsetY": -50,
  "showPrintableKey": false
}
```

* `display`: default to 0, which is your primary display.
* `fadeDealy`: time in second before fade popup.
* `position`: popup position on the screen, valid values are `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft` and `bottomright`.
* `offsetX`: offset x in pixel relative to the position.
* `offsetY`: offset y in pixel relative to the position.
* `showPrintableKey`: whether or not to show printable keys, if set to true, any key you pressed will be shown on the screen.

## Custom CSS

The custom CSS locates at `%UserProfile%\.signpost\custom.json`.

```css
#signpost {
  background: #ccc;
  color: black;
  opacity: 0.75;
}

.kbd {
  border: 1px solid black;
}

.plus {
  margin: 0 1em;
}
```

* `#signpost`: popup style
* `.kbd`: key style
* `.plus`: plus symbol style