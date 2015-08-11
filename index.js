var ezdep = require('./lib/ezdep.js'),
    Ezdep = ezdep.Constructor;


function getUrlDep(url) {
  return {
    data: url,
    type: 'string',
    customs: {
      // What to return on a custom succes or fail?
      // I guess it could be an object with the property passed: true|false
      protocol: function (data) {
        if (data.indexOf('http') !== 0 && data.indexOf('https') !== 0) {
          return {
            passed: false,
            msg: 'No protocol found in url: ' + data
          }
        }
      }
    }
  }
}

function getUrlEzdep(url) {
  return new Ezdep({
    url: {
      data: url,
      type: 'string',
      customs: {
        protocol: function (url, done) {
          if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
            done(false, 'No protocol found');
          }
        }
      }
    }
  });
}

/*
require('./tests/fixtures/getSource.js')(
  new Ezdep({
    url: getUrlDep('hsttps://github.com/opensoars/ezdep')
  })
);
*/
var url = 'htttps://github.com';

require('./tests/fixtures/getSource.js')(getUrlEzdep(url));


/**
 * Any property which hasn't got a data property won't be seen
 * as data to use in checkDeps
 */
/*
var getSource_deps = new Ezdep({
  url: {
    data: 'a',
    type: 'string',

    // Customs should only respond with true or false
    customs: {
      length: function (data) {
        if (data.length < 2) {
          this.fail('data.length < 2');
        }
      }
    }
  },

  use_throw: false
});
*/

/*
require('./tests/fixtures/getSource.js')(
  getSource_deps
);*/