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
	
	.directive('ngMdSideMenu', function(){
		return {
			restrict: 'E',
			scope: {
				ngModel: '=',
				ngSideMenuOpen: '=?',
				ngShowLoading: '=?',
				ngIsError: '=?'
			},
			// dont add md-sidenav here as whiteframe classes are not applied properly
			templateUrl: 'templates/ng-side-menu.html',
			link: {
				post: function($scope, ielement, iattrs) {
					$scope.ngSideMenuOpen = !(iattrs.ngSideMenuOpen !== undefined && iattrs.ngSideMenuOpen !== undefined && iattrs.ngSideMenuOpen == true);
					
					$scope.ngShowLoading = (iattrs.ngShowLoading !== undefined && iattrs.ngShowLoading !== undefined && iattrs.ngShowLoading == true);
					
					$scope.ngIsError = (iattrs.ngIsError !== undefined && iattrs.ngIsError !== undefined && iattrs.ngIsError == true);
				}
			}
		}
	})
	;