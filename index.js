var ezdep = require('./lib/ezdep.js'),
    Ezdep = ezdep.Constructor;


function getUrlDep(url) {

  return {
    data: url,
    type: 'string',
    customs: {
      protocol: function () {



      }
    }
  }

}


/**
 * Any property which hasn't got a data property won't be seen
 * as data to use in checkDeps
 */
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


require('./tests/fixtures/getSource.js')(
  getSource_deps
);