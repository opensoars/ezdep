ezdep program doc
=================

## API

### Sample usage

```js

// Sample getSource module
module.exports = function (conf) {

  conf.checkDeps({ use_throw: true });

};


var ezdep = require('ezdep'),
    Ezdep = ezdep.Constructor;

var getSource = require('./lib/getSource')(
  new Ezdep({
    data: 'https://github.com',
    type: 'string',
    customs: {
      protocol: function (url, done) {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          done(false, 'No protocol found');
        }
      }
    }
  })
);

```