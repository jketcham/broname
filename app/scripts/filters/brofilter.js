angular.module('bronameApp.filters', []).
  filter('broTranslate', function() {
    var str_split = function(string, split_length) {
      // http://kevin.vanzonneveld.net
      // +     original by: Martijn Wieringa
      // +     improved by: Brett Zamir (http://brett-zamir.me)
      // +     bugfixed by: Onno Marsman
      // +      revised by: Theriault
      // +        input by: Bjorn Roesbeke (http://www.bjornroesbeke.be/)
      // +      revised by: Rafał Kukawski (http://blog.kukawski.pl/)
      // *       example 1: str_split('Hello Friend', 3);
      // *       returns 1: ['Hel', 'lo ', 'Fri', 'end']
      if (split_length === null) {
        split_length = 1;
      }
      if (string === null || split_length < 1) {
        return false;
      }
      string += '';
      var chunks = [],
        pos = 0,
        len = string.length;
      while (pos < len) {
        chunks.push(string.slice(pos, pos += split_length));
      }

      return chunks;
    };

    var translate = function(word) {
      // Don't translate short words
      if (word.length == 1) {
        return word;
      }

      // Before translating, keep a reference of the original word
      var originalWord = word;

      // BRADLEY -> BRODLEY
      word = word.replace(/Br/g, 'Bro');

      // Keep Y as first character
      // YES -> ERS -> YERS
      if (originalWord.charAt(0) == 'Y') {
        word = 'Bro' + word;
      }

      return word;
    };

    return function (broWord) {
      if (!broWord) {
        return 'Broski...';
      }

      var lines = broWord.split("\n"),
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

      return translatedLines.join("\n");
    };
  });