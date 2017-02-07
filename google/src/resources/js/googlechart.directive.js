angular.module('GoogleCharts')
	.directive('ngGoogleChart', function ($templateCache) {
		return {
			restrict: 'E',
			scope: {
				ngChartType: '@',
				ngChartData: '=',
				ngChartOptions: '='
			},
			template: '<div>Loading ...</div>',
			controller: ['$scope', function ($scope) {
				google.charts.load('current', { packages: ['corechart'] });

				$scope.drawAnnotations = function () {
					var data = google.visualization.arrayToDataTable($scope.ngChartData);
					var chart = new google.visualization[$scope.ngChartType]($scope.div);

					google.visualization.events.addListener(chart, 'error', $scope.onError);

					chart.draw(data, $scope.ngChartOptions);
				};

				$scope.onError = function (id, message) {
					console.log(id);
					console.log(message);
					alert('Error While Rendering. Error Message is ' + message);
				};
			}],
			link: {
				post: function ($scope, ielement, iattrs) {
					$scope.div = ielement[0].firstChild;
					google.charts.setOnLoadCallback($scope.drawAnnotations);
				}
			}
		};
	})
	;