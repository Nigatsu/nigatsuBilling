/*global d3*/
(function ()
{
    'use strict';

    angular.module('billingApp').controller('AppCtrl', function ($scope)
    {
        var ctrl = this;

        $scope.mainChart = {
            options: {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d)
                    {
                        return d.x;
                    },
                    y: function (d)
                    {
                        return d.y;
                    },
                    useInteractiveGuideline: true,
                    xAxis: {
                        tickFormat: function (d)
                        {
                            return d3.time.format('%m/%y')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Minuty/SMSy/Dane',
                        tickFormat: function (d)
                        {
                            return d3.format('.01f')(d);
                        },
                        axisLabelDistance: -5
                    },
                    noData: 'Waiting for data...'
                }
            },
            data: []
        };

        $scope.dailyCallChart = {
            options: {
                chart: {
                    type: 'lineWithFocusChart',
                    height: 550,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 40
                    },
                    transitionDuration: 500,
                    interactive: true,
                    useVoronoi: true,
                    tooltips: true,
                    xAxis: {
                        tickFormat: function (d)
                        {
                            return d3.time.format('%d/%m/%y')(new Date(d));
                        }
                    },
                    x2Axis: {
                        tickFormat: function (d)
                        {
                            return d3.time.format('%d/%m/%y')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Minuty',
                        tickFormat: function (d)
                        {
                            return d3.format('.01f')(d);
                        },
                        rotateYLabel: false
                    },
                    y2Axis: {},
                    noData: 'Waiting for data...'
                }
            },
            data: []
        };

    });

})();
