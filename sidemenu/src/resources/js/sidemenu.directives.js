angular.module('SideMenu')
	/**
	 * @ngdoc directive
	 * @name SideMenu.directive:ngMdMenu
	 * @restrict E
	 * @scope
	 * @description
	 * this would list all menu items
	 * 
	 * @param {array} ngModel Array for list Menu Items
	 * @param {string} ngFilter To filter the menu items
	 */
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
	
	/**
	 * @ngdoc controller
	 * @name SideMenu.controller:NgMdMenuGroupCtrl
	 * @description
	 * This is the controller for ng-md-menu-group tag
	 *
	 */
	.controller('NgMdMenuGroupCtrl', function($scope, $templateCache) {
		$scope.showMenu = function() {
			return $scope.showMore;
		};

		$scope.toggleButton = function() {
			$scope.showMore = !$scope.showMore;
		};		
	})

	/**
	 * @ngdoc directive
	 * @name SideMenu.directive:ngMdMenuGroup
	 * @restrict E
	 * @scope
	 * @description
	 * This is group menu which contains list of items
	 * 
	 * @param {array} ngModel Array for list Menu Items
	 * @param {boolean} ngShow To show the menu group
	 * @param {boolean} ngOpen To the menu in expand mode
	 * @param {string} ngFilter To filter the menu items
	 */
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

	/**
	 * @ngdoc directive
	 * @name SideMenu.directive:ngMdSideMenu
	 * @restrict E
	 * @scope
	 * @description
	 * This is contins section of menu 
	 * 
	 * @param {array} ngModel Array for list Menu Items
	 * @param {boolean} ngSideMenuOpen To show entire menu
	 * @param {boolean} ngShowLoading To show loading messsage, if this sets, then menu wont be displayed
	 * @param {boolean} ngIsError is there any error while loading the menu and results empty
	 * 
	 * @example
    <doc:example>
        <doc:source>
            <script>

            </script>
			<md-sidenav ng-if='!error' md-is-locked-open="sideMenuOpen" class='md-whiteframe-4dp'>
				<ng-md-side-menu ng-model='itemsMenu' ng-side-menu-open='sideMenuOpen' ng-show-loading='menuLoading'></ng-md-side-menu>
			</md-sidenav>
        </doc:source>
    </doc:example>
	 * 
	 */

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
					$scope.ngSideMenuOpen = !(iattrs.ngSideMenuOpen !== undefined && iattrs.ngSideMenuOpen !== undefined && iattrs.ngSideMenuOpen === true);
					
					$scope.ngShowLoading = (iattrs.ngShowLoading !== undefined && iattrs.ngShowLoading !== undefined && iattrs.ngShowLoading === true);
					
					$scope.ngIsError = (iattrs.ngIsError !== undefined && iattrs.ngIsError !== undefined && iattrs.ngIsError === true);
				}
			}
		};
	})
	;