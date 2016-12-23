(function() {
  // config app ####################
  angular
    .module('MyApp', ['ngMaterial', 'ngAnimate', 'SideMenu'])
    .controller('AppController', ['$scope', '$mdSidenav', AppController]);

  // config theme ##################
  angular
    .module('MyApp')
    .config(function($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('indigo');
      /*.backgroundPalette('grey', {
          'default': '800',
          'hue-1': '300',
          'hue-2': '600',
          'hue-3': '900'
       })
      .accentPalette('grey', {
        'default': '50',
      });   */
      //.dark();
    });

  // APP Controller ################
  function AppController($scope, $mdSidenav) {
    // menu itens
    $scope.itemsMenu = [{
      id: 1,
      title: 'Menu',
      pages: [{
        'icon': 'list',
        'label': 'List All Queries',
        'link': 'list'
      }, {
        'icon': 'add',
        'label': 'Add New Query',
        'link': 'add'
      }, {
        'icon': 'list',
        'label': 'List All Queries',
        'link': 'nav'
      }, {
        'icon': 'add',
        'label': 'Add New Query'
      }]
    }, {
      id: 2,
      title: 'Menu2',
      pages: [{
        'icon': 'list',
        'label': 'List All Queries',
        'link': 'list'
      }, {
        'icon': 'add',
        'label': 'Add New Query',
        'link': 'add'
      }, {
        'icon': 'list',
        'label': 'List All Queries',
        'link': 'nav'
      }, {
        'icon': 'add',
        'label': 'Add New Query'
      }]
    }];
    // scope here
    $scope.toggleSidenav = function(nav) {
      $mdSidenav(nav).toggle();
    };
	
	$scope.sideMenuOpen = true;
	$scope.menuLoading = false;

  }
}());
