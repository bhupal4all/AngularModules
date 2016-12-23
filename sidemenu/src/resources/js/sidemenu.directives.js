angular.module('SideMenu')
    .directive('ngMdMenu', function($templateCache){
		return {
			restrict: 'E',
			scope: {
				ngModel: '=',
				ngFilter: '='
			},
			templateUrl: 'templates/ng-md-menu.html'
		};		
	})
	
	.controller('NgMdMenuGroupCtrl', function($scope, $templateCache) {
		$scope.showMenu = function() {
			return $scope.showMore;
		};

		$scope.toggleButton = function() {
			$scope.showMore = !$scope.showMore;
		};		
	})
	
    .directive('ngMdMenuGroup', function($templateCache){
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
	})	
	;