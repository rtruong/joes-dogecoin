'use strict';

describe('Service: rate', function () {

  // load the service's module
  beforeEach(module('joesDogecoinApp'));

  // instantiate service
  var rate;
  beforeEach(inject(function (_rate_) {
    rate = _rate_;
  }));

  it('should do something', function () {
    expect(!!rate).toBe(true);
  });

});
