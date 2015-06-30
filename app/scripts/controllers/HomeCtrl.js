/*global moment,d3*/
(function ()
{
    'use strict';

    function HomeCtrl($scope, $timeout, ChartDAO)
    {
        var ctrl = this;

        this.mainChartProgress = false;
        this.dailyCallChartProgress = false;
        this.dailyDataChartProgress = false;

        this.loadMainChart = function ()
        {
            ctrl.mainChartProgress = true;

            ChartDAO.getMainChart().then(function (result)
            {
                $scope.mainChart.data = [{
                    key: 'Rozmowy wychodzące',
                    values: result.callsOut,
                    color: '#3366cc'
                }, {
                    key: 'Rozmowy przychodzące',
                    values: result.callsIn,
                    color: '#dc3912'
                }, {
                    key: 'Smsy',
                    values: result.smsOut,
                    color: '#ff9900'
                }, {
                    key: 'Dane',
                    values: result.internetData,
                    color: '#109618'
                }];
                ctrl.mainChartProgress = false;
            });
        };

        this.loadDailyCallChart = function ()
        {
            ctrl.dailyCallChartProgress = true;

            ChartDAO.getDailyCallChar().then(function (result)
            {
                $scope.dailyCallChart.data = [{
                    key: 'Rozmowy wychodzące',
                    values: result.callsOut,
                    color: '#3366cc'
                }, {
                    key: 'Rozmowy przychodzące',
                    values: result.callsIn,
                    color: '#dc3912'
                }];
                ctrl.dailyCallChartProgress = false;
            });
        };

        this.loadMainChart();
        this.loadDailyCallChart();
    }

    var module = angular.module('billingApp');
    module.controller('HomeCtrl', ['$scope', '$timeout', 'ChartDAO', HomeCtrl]);

})();
