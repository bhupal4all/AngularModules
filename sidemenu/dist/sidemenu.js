angular.module('SideMenu')
    .directive('ngMdMenu', ['$templateCache', function($templateCache){
		return {
			restrict: 'E',
			scope: {
				ngModel: '=',
				ngFilter: '='
			},
			templateUrl: 'templates/ng-md-menu.html'
		};		
	}])
	
	.controller('NgMdMenuGroupCtrl', ['$scope', '$templateCache', function($scope, $templateCache) {
		$scope.showMenu = function() {
			return $scope.showMore;
		};

		$scope.toggleButton = function() {
			$scope.showMore = !$scope.showMore;
		};		
	}])
	
    .directive('ngMdMenuGroup', ['$templateCache', function($templateCache){
		return {
			restrict: 'E',
			scope: {
				ngModel: '=',
				ngShow: '=',
				ngOpen: '=',
				ngFilter: '='
			},
			templateUrl: 'templates/md-menu-group.html',
			controller: 'NgMdMenuGroupCtrl',
			link: {
				post: function($scope, ielement, iattrs) {
					$scope.showMore = iattrs.ngOpen == 'true';
				}
			}
		};		
	}])	
	;
angular.module('SideMenu', []);
angular.module('SideMenu').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/md-menu-group.html',
    "<md-menu-item><md-button ng-click=\"toggleButton()\" class=\"md-primary\"><div layout=\"row\" flex><md-icon md-menu-align-target class=\"material-icons\">menu</md-icon><p flex>{{ngModel.title}}</p><md-icon md-menu-align-target class=\"material-icons\" ng-show=\"showMore\">remove</md-icon><md-icon md-menu-align-target class=\"material-icons\" ng-hide=\"showMore\">add</md-icon></div></md-button></md-menu-item><md-divider></md-divider><ng-md-menu ng-class=\"menu\" ng-filter=\"ngFilter\" ng-show=\"showMenu() || ngFilter\" ng-model=\"ngModel.pages\"></ng-md-menu>"
  );


  $templateCache.put('templates/ng-md-menu.html',
    "<md-list><md-menu-item ng-repeat=\"page in ngModel | filter:ngFilter\"><md-button class=\"md-primary\"><div layout=\"row\" flex><p flex>{{page.label}}</p><md-icon md-menu-align-target class=\"material-icons\">{{page.icon}}</md-icon></div></md-button></md-menu-item><md-divider></md-divider></md-list>"
  );

}]);
