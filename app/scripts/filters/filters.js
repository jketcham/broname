'use strict';

angular.module('bronameApp.filters', []).
  filter('broTranslate', function() {
    var strSplit = function(string, splitLength) {
      // http://kevin.vanzonneveld.net
      // +     original by: Martijn Wieringa
      // +     improved by: Brett Zamir (http://brett-zamir.me)
      // +     bugfixed by: Onno Marsman
      // +      revised by: Theriault
      // +        input by: Bjorn Roesbeke (http://www.bjornroesbeke.be/)
      // +      revised by: Rafał Kukawski (http://blog.kukawski.pl/)
      // *       example 1: strSplit('Hello Friend', 3);
      // *       returns 1: ['Hel', 'lo ', 'Fri', 'end']
      if (splitLength === null) {
        splitLength = 1;
      }
      if (string === null || splitLength < 1) {
        return false;
      }
      string += '';
      var chunks = [],
        pos = 0,
        len = string.length;
      while (pos < len) {
        chunks.push(string.slice(pos, pos += splitLength));
      }

      return chunks;
    };

    var translate = function(word) {
      // Don't translate short words
      if (word.length === 1) {
        return word;
      }

      // Before translating, keep a reference of the original word
      var originalWord = word;
      // Grab the first character of word
      var firstChar = originalWord.charAt(0);

      // Vowel checker - For loop quicker than regexp, though not as pretty
      var vowels = new Array('a', 'e', 'i', 'o', 'u');
      function isVowel(char) {
        if (char.length === 1) {
          var len = vowels.length;
          for (var i = 0; i < len; i++) {
            if (vowels[i] === char) {
              return true;
            }
          }
          return false;
        }
      }

      // The good stuff: replace character at beginning with "bro", or "br" if second character is a vowel
      if (isVowel(originalWord.charAt(1))) {
        word = word.replace(firstChar, 'Br');
      } else {
        if (originalWord.charAt(1) === 'r' && isVowel(originalWord.charAt(2))) {
          word = word.replace(originalWord.substring(0, 3), 'Bro');
        } else {
          word = word.replace(firstChar, 'Bro');
        }
      }

      return word;
    };

    return function (broWord) {
      if (!broWord) {
        return 'Broski...';
      }

      broWord = broWord.toLowerCase();

      var lines = broWord.split('\n'),
        translatedLines = [];
      for (var k in lines) {
        var words = lines[k].split(' '),
          translatedWords = [];

        for (var j in words) {
          var prefix = words[j].match(/^\W+/) || '',
            suffix = words[j].match(/\W+$/) || '',
            word = words[j].replace(prefix, '').replace(suffix, '');

          if (word) {
            // Is translatable
            translatedWords.push(prefix + translate(word) + suffix);
          } else {
            // Is punctuation
            translatedWords.push(words[j]);
          }
        }

        translatedLines.push(translatedWords.join(' '));
      }

      return translatedLines.join('\n');
    };
  });