/*global moment,angular*/
(function ()
{
    'use strict';

    function AdminCtrl(ChartDAO, LogDAO)
    {
        var ctrl = this;

        var startDate = '2012-04-18';
        var endDate = moment();

        ChartDAO.test({chart: 'dailyCallChart'}).then(function (data) {
            console.log(data);
        });

        this.mainChartRow = function (date) {
            LogDAO.test(date.format('YYYY-MM')).then(function (data) {
                var row = {
                    date: date.format('YYYY-MM'),
                    callsOut: 0,
                    callsIn: 0,
                    smsOut: 0,
                    internetData: 0
                };

                angular.forEach(data, function (item) {
                    if(item) {
                        if(item.type === 'Rozmowy głosowe' && item.direction === 'Przychodzące') {
                            row.callsIn += item.value;
                        }
                        if(item.type === 'Rozmowy głosowe' && item.direction === 'Wychodzące') {
                            row.callsOut += item.value;
                        }
                        if(item.type === 'SMS') {
                            row.smsOut += item.value;
                        }
                        if(item.type === 'Dane') {
                            row.internetData += item.value;
                        }
                    }
                });

                if(moment(date).isBefore(endDate)) {
                    row.callsIn = parseFloat(Number(row.callsIn / 60).toFixed(2));
                    row.callsOut = parseFloat(Number(row.callsOut / 60).toFixed(2));
                    row.internetData = parseFloat(Number(row.internetData / 1024).toFixed(3));

                    console.log(row);

                    ChartDAO.push({chart: 'mainChart', object: row}).then(function () {
                        date.add(1, 'M');
                        ctrl.mainChartRow(date);
                    });
                }
            });
        };

        this.dailyCallRow = function (date) {
            LogDAO.test(date.format('YYYY-MM-DD')).then(function (data) {
                var row = {
                    date: date.format('YYYY-MM-DD'),
                    callsOut: 0,
                    callsIn: 0
                };

                angular.forEach(data, function (item) {
                    if(item) {
                        if(item.type === 'Rozmowy głosowe' && item.direction === 'Przychodzące') {
                            row.callsIn += item.value;
                        }
                        if(item.type === 'Rozmowy głosowe' && item.direction === 'Wychodzące') {
                            row.callsOut += item.value;
                        }
                    }
                });

                if(moment(date).isBefore(endDate)) {
                    row.callsIn = parseFloat(Number(row.callsIn / 60).toFixed(2));
                    row.callsOut = parseFloat(Number(row.callsOut / 60).toFixed(2));

                    console.log(row);

                    ChartDAO.push({chart: 'dailyCallChart', object: row}).then(function () {
                        date.add(1, 'd');
                        ctrl.dailyCallRow(date);
                    });
                }
            });
        };

        this.dailyInternetRow = function (date) {
            LogDAO.test(date.format('YYYY-MM-DD')).then(function (data) {
                var row = {
                    date: date.format('YYYY-MM-DD'),
                    internetData: 0
                };

                angular.forEach(data, function (item) {
                    if(item) {
                        if(item.type === 'Dane') {
                            row.internetData += item.value;
                        }
                    }
                });

                if(moment(date).isBefore(endDate)) {
                    row.internetData = parseFloat(Number(row.internetData / 1024).toFixed(3));

                    console.log(row);

                    ChartDAO.push({chart: 'dailyInternetChart', object: row}).then(function () {
                        date.add(1, 'd');
                        ctrl.dailyInternetRow(date);
                    });
                }
            });
        };

        this.refreshMainChart = function () {
            ctrl.mainChartRow(moment(startDate));
        };

        this.refreshDailyCallChart = function () {
            ctrl.dailyCallRow(moment(startDate));
        };

        this.refreshDailyInternetChart = function () {
            ctrl.dailyInternetRow(moment(startDate));
        };

    }

    var module = angular.module('billingApp');
    module.controller('AdminCtrl', ['ChartDAO', 'LogDAO', AdminCtrl]);

})();
