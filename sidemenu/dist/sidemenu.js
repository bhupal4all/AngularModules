/* sidemenu - v1.0.0 - 2016-12-23 */

angular.module('SideMenu', []);
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
angular.module('SideMenu').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/md-menu-group.html',
    "<md-menu-item><md-button ng-click=\"toggleButton()\" class=\"md-primary\"><div layout=\"row\" flex><md-icon md-menu-align-target class=\"material-icons\">menu</md-icon><p flex>{{ngModel.title}}</p><md-icon md-menu-align-target class=\"material-icons\" ng-show=\"showMore\">remove</md-icon><md-icon md-menu-align-target class=\"material-icons\" ng-hide=\"showMore\">add</md-icon></div></md-button></md-menu-item><md-divider><ng-md-menu ng-class=\"menu\" ng-filter=\"ngFilter\" ng-show=\"showMenu() || ngFilter\" ng-model=\"ngModel.pages\">"
  );


  $templateCache.put('templates/ng-md-menu.html',
    "<md-list><md-menu-item ng-repeat=\"page in ngModel | filter:ngFilter\"><md-button class=\"md-primary\"><div layout=\"row\" flex><p flex>{{page.label}}</p><md-icon md-menu-align-target class=\"material-icons\">{{page.icon}}</md-icon></div></md-button></md-menu-item><md-divider></md-list>"
  );


  $templateCache.put('templates/ng-side-menu.html',
    "<style>.search-input { \r" +
    "\n" +
    "	padding-left: 20px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".search-input .hint {\r" +
    "\n" +
    "	/* Position the hint */\r" +
    "\n" +
    "	position: absolute;\r" +
    "\n" +
    "	left: 2px;\r" +
    "\n" +
    "	right: auto;\r" +
    "\n" +
    "	bottom: 7px;\r" +
    "\n" +
    "	/* Copy styles from ng-messages */\r" +
    "\n" +
    "	font-size: 12px;\r" +
    "\n" +
    "	line-height: 14px;\r" +
    "\n" +
    "	transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\r" +
    "\n" +
    "	/* Set our own color */\r" +
    "\n" +
    "	color: grey;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".search-input .hint.ng-hide,\r" +
    "\n" +
    ".search-input .hint.ng-enter,\r" +
    "\n" +
    ".search-input .hint.ng-leave.ng-leave-active {\r" +
    "\n" +
    "	bottom: 26px;\r" +
    "\n" +
    "	opacity: 0;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".search-input .hint.ng-leave,\r" +
    "\n" +
    ".search-input .hint.ng-enter.ng-enter-active {\r" +
    "\n" +
    "	bottom: 7px;\r" +
    "\n" +
    "	opacity: 1;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".search-input .hint .active {\r" +
    "\n" +
    "	color: orange;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".search-input .close-button {\r" +
    "\n" +
    "	position: absolute; \r" +
    "\n" +
    "	margin: 0px 0px;\r" +
    "\n" +
    "}</style><section ng-show=\"ngShowLoading\"><md-menu-item><span>Menu is Loading, Please wait</span><md-progress-circular md-mode=\"indeterminate\" md-diameter=\"20px\"></md-menu-item></section><div ng-show=\"!ngShowLoading && !ngIsError\"><section><div layout=\"row\" layout-align=\"start center\" flex class=\"search-input\"><span class=\"bt-search\"><i class=\"material-icons md-fab-icon\">search</i></span><md-input-container md-no-float><label>Search</label><input flex ng-model=\"filterMenu\"><div class=\"hint\"><span ng-hide=\"filterMenu\">Search over below Menu...</span> <span ng-show=\"filterMenu\" class=\"active\">To clear search, click on 'X' button</span></div><md-button ng-show=\"filterMenu\" ng-click=\"filterMenu=''\" class=\"md-icon-button close-button\"><i class=\"material-icons md-fab-icon\">close</i></md-button></md-input-container></div></section><section ng-repeat=\"menuItem in ngModel track by $index\"><ng-md-menu-group ng-filter=\"filterMenu\" ng-model=\"menuItem\"></section></div>"
  );

}]);
