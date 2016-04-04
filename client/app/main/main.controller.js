'use strict';

(function() {

class MainController {

  constructor($scope, thermoHygro) {
    thermoHygro.query(function (response) {
      $scope.thermoHygro = [
        {
          key: 'temperature',
          values: response.map(function(d) {
            return {
              createdAt: d.createdAt,
              value: d.temperature
            };
          }),
          color: '#CCC'
        },
        {
          key: '体感温度',
          values: response.map(function (d) {
            return {
              createdAt: d.createdAt,
              value: d.heatIndex
            };
          }),
          color: '#2196f3'
        }
      ];
      $scope.humidity = [
        {
          key: '湿度',
          values: response.map(function (d) {
            return {
              createdAt: d.createdAt,
              value: d.humidity
            };
          }),
          color: '#2196f3'
        }
      ];
    });

    $scope.temperatureOptions = {
      chart: {
        type: 'lineChart',
        height: 400,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d) { return Date.parse(d.createdAt); },
        y: function(d) { return d.value; },
        useInteractiveGuideline: false,
        dispatch: {},
        xAxis: {
          axisLabel: '時刻',
          tickFormat: function (d) {
            return d3.time.format('%H:%M')(new Date(d))
          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: '温度',
          axisLabelDistance: 30,
          showMaxMin: false
        },
        forceY: [null, null],
        transitionDuration: 250,
        callback: angular.noop
      },
      title: {
        enable: false,
        text: '温度'
      },
      caption: {
        enable: false
      }
    };
    $scope.humidityOptions = {
      chart: {
        type: 'lineChart',
        height: 400,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d) { return Date.parse(d.createdAt); },
        y: function(d) { return d.value; },
        useInteractiveGuideline: false,
        dispatch: {},
        xAxis: {
          axisLabel: '時刻',
          tickFormat: function (d) {
            return d3.time.format('%H:%M')(new Date(d))
          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: '湿度',
          axisLabelDistance: 30,
          showMaxMin: false
        },
        forceY: [null, null],
        transitionDuration: 250,
        callback: angular.noop
      },
      title: {
        enable: false,
        text: '湿度'
      },
      caption: {
        enable: false
      }
    };
  }
}

angular.module('metAppApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
