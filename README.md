# translit — Rusyn transliteration

Rusyn language is written in Cyrillic script. If you lack a proper keyboard or an extra software, writing in Rusyn can take a while.

Translit is a javascript library to transliterate Rusyn language from Latin alphabet to Cyrillic script and vice versa. You can write your text in Latin alphabet and then transliterate it automatically.


## Use

### Online app
Try at [https://tota.sk/translit](https://tota.sk/translit).

### NPM package
Include translit as an NPM package in your web project:

```
npm install translit-rue
```

### JS library
* Download dist/translit.min.js and include it in your web project.


## Documentation
Transliterate text from Cyrillic script to Latin alphabet:
```javascript
translitAzbLat(string)
```

Transliterate text from Latin alphabet to Cyrillic script:
```javascript
translitLatAzb(string)
```


## License
Licensed under MIT license. (See [LICENCE.TXT](//github.com/surfinzap/translit/blob/master/LICENSE.txt).)


## Special thanks
* [@vit-svoboda](https://github.com/vit-svoboda) for help with gulp pipeline (2.0.0)
