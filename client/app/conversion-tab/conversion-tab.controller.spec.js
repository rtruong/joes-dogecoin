'use strict';

describe('Controller: ConversionTabController', function () {

  // load the controller's module
  beforeEach(module('joesDogecoinApp'));

  var ConversionTabController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConversionTabController = $controller('ConversionTabController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
