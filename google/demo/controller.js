(function () {
  // config app ####################
  angular
    .module('MyApp', ['ngMaterial', 'ngAnimate', 'GoogleCharts'])
    .controller('AppController', ['$scope', AppController]);

  // config theme ##################
  angular
    .module('MyApp')
    .config(function ($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('indigo');
    });

  // APP Controller ################
  function AppController($scope) {
    console.log('AppController');

    $scope.barchart = {};
    $scope.barchart.data = [
      ['City', '2010 Population', { type: 'string', role: 'annotation' },
        '2000 Population', { type: 'string', role: 'annotation' }],
      ['New York City, NY', 8175000, '8.1M', 8008000, '8M'],
      ['Los Angeles, CA', 3792000, '3.8M', 3694000, '3.7M'],
      ['Chicago, IL', 2695000, '2.7M', 2896000, '2.9M'],
      ['Houston, TX', 2099000, '2.1M', 1953000, '2.0M'],
      ['Philadelphia, PA', 1526000, '1.5M', 1517000, '1.5M']
    ];
    $scope.barchart.options = {
      title: 'Population of Largest U.S. Cities',
      width: '500',
      height: '500',
      chartArea: {
        backgroundColor: {
          'fill': '#E4E4E4',
          'opacity': 50
        },
        width: '50%'
      },
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 12,
          auraColor: 'none',
          color: '#555'
        },
        boxStyle: {
          stroke: '#ccc',
          strokeWidth: 1,
          gradient: {
            color1: '#f3e5f5',
            color2: '#f3e5f5',
            x1: '0%', y1: '0%',
            x2: '100%', y2: '100%'
          }
        }
      },
      hAxis: {
        title: 'Total Population',
        minValue: 0,
      },
      vAxis: {
        title: 'City'
      },
    };

    $scope.piechart = {};
    $scope.piechart.data = [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ];
    $scope.piechart.options = {
      title: 'My Daily Activities',
      pieHole: 0.4,
      width: '500',
      height: '500',
      backgroundColor: {
        fill: 'lightgreen',
        stroke: '#666',
        strokeWidth: '1'
      }
    };


    $scope.columnchart = {};
    $scope.columnchart.data = [
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
        'Western', 'Literature', { role: 'annotation' }],
      ['2010', 10, 24, 20, 32, 18, 5, ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, '']
    ];
    $scope.columnchart.options = {
      width: 600,
      height: 400,
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: true,
    };

    $scope.linechart = {};
    $scope.linechart.data = [
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540]
    ];
    $scope.linechart.options = {
      width: 600,
      height: 400,
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  }
}());
