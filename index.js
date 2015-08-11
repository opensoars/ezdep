var ezdep = require('./lib/ezdep.js'),
    Ezdep = ezdep.Constructor;


function getUrlDep(url) {

  return {
    data: url,
    type: 'string',
    customs: {
      protocol: function (data) {
        if (data.indexOf('http') !== 0 && data.indexOf('https') !== 0) {
          console.log('No protocol found in url: ' + data);
        }
      }
    }
  }

}

require('./tests/fixtures/getSource.js')(

  new Ezdep({
    url: getUrlDep('hsttps://github.com/opensoars/ezdep')
  })

);



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