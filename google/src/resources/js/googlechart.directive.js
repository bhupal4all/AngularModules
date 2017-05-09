angular.module('GoogleCharts', ['googlechart']);

angular.module('GoogleCharts')
	.directive('ngGoogleChart', function ($templateCache) {
		return {
			restrict: 'AE',
			scope: {
				ngChartType: '=',
				ngChartData: '=',
				ngChartOptions: '='
			},
			template: '<div>Loading ...</div>',
			controller: ['$scope', '$timeout', function ($scope, $timeout) {
				google.charts.load('current', { packages: ['corechart'] });
				$scope.triggerDraw = false;
				$scope.drawAnnotations = function () {
					if ($scope.triggerDraw) {
						$timeout(function () {
							// var data = google.visualization.arrayToDataTable($scope.ngChartData);
							var data = new google.visualization.DataTable();
							angular.forEach($scope.ngChartData.cols, function(value, key) {
								data.addColumn(value.type, value.label);
							});

							angular.forEach($scope.ngChartData.rows, function(value, key) {
								var row = [];
								angular.forEach(value.c, function(ivalue, ikey){
									row.push(ivalue);
								});
								data.addRow(row);
								console.log(row);
							});

							var chart = new google.visualization[$scope.ngChartType]($scope.div);
							google.visualization.events.addListener(chart, 'error', $scope.onError);
							chart.draw(data, $scope.ngChartOptions);
						}, 1000, true);
					}
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
					$scope.triggerDraw = true;

					$scope.$watch('ngChartData', function (newd, oldd) {
						$scope.drawAnnotations();
					});
					$scope.$watch('ngChartType', function (newd, oldd) {
						$scope.drawAnnotations();
					});	
				}
			}
		};
	})
	;