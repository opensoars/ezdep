module.exports = function getSource(conf) {
  //
  // Should be able to pass in more configuration which may
  // depend on the results of calling this function.
  // Even though conf.checkDeps should be called in one of the first
  // function body code lines.
  //

  console.log(conf.getData());

  conf.checkDeps({
    use_throw: true
  });

  /** Actual getSource module */
  return function () {

  };

  //console.log(conf);
};