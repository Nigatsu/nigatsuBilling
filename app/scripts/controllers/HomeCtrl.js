/*global moment,d3*/
(function () {
    'use strict';

    function HomeCtrl($scope, $timeout, ChartDAO) {
        var ctrl = this;

        this.mainChartProgress = false;
        this.dailyCallChartProgress = false;
        this.dailyDataChartProgress = false;

        $scope.mainChart.options = {
            chart: {
                type: 'lineChart',
                height: '450',
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                useInteractiveGuideline: true,
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%m/%y')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Minuty/SMSy/Dane',
                    tickFormat: function (d) {
                        return d3.format('.01f')(d);
                    },
                    axisLabelDistance: -5
                },
                noData: 'Waiting for data...'
            }
        };
        $scope.mainChart.data = [];

        this.loadMainChart = function () {
            ctrl.mainChartProgress = true;

            var row = [
                {
                    key: 'Rozmowy wychodzące',
                    values: [],
                    color: '#3366cc'
                },
                {
                    key: 'Rozmowy przychodzące',
                    values: [],
                    color: '#dc3912'
                },
                {
                    key: 'Smsy',
                    values: [],
                    color: '#ff9900'
                },
                {
                    key: 'Dane',
                    values: [],
                    color: '#109618'
                }
            ];

            ChartDAO.query({chart: 'mainChart'}).then(function (data) {
                angular.forEach(data, function (item) {
                    row[0].values.push({x: moment(item.date, 'YYYY-MM'), y: item.callsOut});
                    row[1].values.push({x: moment(item.date, 'YYYY-MM'), y: item.callsIn});
                    row[2].values.push({x: moment(item.date, 'YYYY-MM'), y: item.smsOut});
                    row[3].values.push({x: moment(item.date, 'YYYY-MM'), y: item.internetData});
                });
                $scope.mainChart.data = row;
                ctrl.mainChartProgress = false;
                ctrl.mainChartCollapse = false;
            });
        };

        //$scope.dailyCallChart.options = {
        //    chart: {
        //        type: 'lineWithFocusChart',
        //        height: 550,
        //        margin: {
        //            top: 20,
        //            right: 20,
        //            bottom: 60,
        //            left: 40
        //        },
        //        transitionDuration: 500,
        //        interactive: true,
        //        useVoronoi: true,
        //        tooltips: true,
        //        xAxis: {
        //            tickFormat: function(d) {
        //                return d3.time.format('%d/%m/%y')(new Date(d));
        //            }
        //        },
        //        x2Axis: {
        //            tickFormat: function(d) {
        //                return d3.time.format('%d/%m/%y')(new Date(d));
        //            }
        //        },
        //        yAxis: {
        //            axisLabel: 'Minuty',
        //            tickFormat: function (d) {
        //                return d3.format('.01f')(d);
        //            },
        //            rotateYLabel: false
        //        },
        //        y2Axis: {},
        //        noData: 'Waiting for data...'
        //    }
        //};
        //$scope.dailyCallChart.data = [];



        //this.loadDailyCallChart = function () {
        //    ctrl.dailyCallChartProgress = true;
        //
        //    var row = [
        //        {
        //            key: 'Rozmowy wychodzące',
        //            values: [],
        //            color: '#3366cc'
        //        },
        //        {
        //            key: 'Rozmowy przychodzące',
        //            values: [],
        //            color: '#dc3912'
        //        }
        //    ];
        //
        //    ChartDAO.query({chart: 'dailyCallChart'}).then(function (data) {
        //        angular.forEach(data, function (item) {
        //            row[0].values.push({x: moment(item.date, 'YYYY-MM-DD'), y: item.callsOut});
        //            row[1].values.push({x: moment(item.date, 'YYYY-MM-DD'), y: item.callsIn});
        //        });
        //        $scope.dailyCallChart.data = row;
        //        ctrl.dailyCallChartProgress = false;
        //    });
        //};

        this.loadMainChart();
        //this.loadDailyCallChart();
    }

    var module = angular.module('billingApp');
    module.controller('HomeCtrl', ['$scope', '$timeout', 'ChartDAO', HomeCtrl]);

})();
