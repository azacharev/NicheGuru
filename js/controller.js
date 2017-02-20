angular.module("NicheGuru", [])
  .controller('NicheController', nicheControl);

  // inject $http into the controller since we need to make requests to our server
nicheControl.$inject = ["$http"];

// define the controller
function nicheControl($http) {
  var nCtrl = this;

  nCtrl.greeting = "this is a test"; 
}
