'use strict';

describe('Controller: PeercoinTabCtrl', function () {

  // load the controller's module
  beforeEach(module('joesDogecoinApp'));

  var PeercoinTabCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeercoinTabCtrl = $controller('PeercoinTabCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
