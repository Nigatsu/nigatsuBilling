/*global Firebase*/
(function ()
{
    'use strict';

    function ChartDAO($q, $firebaseObject, $firebaseArray)
    {
        var ref = new Firebase('https://dazzling-heat-830.firebaseio.com/chart');

        return {
            query: function (data)
            {
                var deferred = $q.defer();
                $firebaseArray(ref.child(data.chart)).$loaded().then(function (result)
                {
                    ref.child(data.chart).once('value', function (snapshot)
                    {
                        var count = snapshot.numChildren();
                        deferred.resolve({
                            results: result,
                            total: count
                        });
                    });
                });
                return deferred.promise;
            },
            getMainChart: function ()
            {
                var deferred = $q.defer();
                var chartData = {
                    callsOut: [],
                    callsIn: [],
                    smsOut: [],
                    internetData: []
                };
                $firebaseArray(ref.child('mainChart')).$loaded().then(function (result)
                {
                    angular.forEach(result, function (item)
                    {
                        chartData.callsOut.push({
                            x: item.dateUnix,
                            y: item.callsOut
                        });
                        chartData.callsIn.push({
                            x: item.dateUnix,
                            y: item.callsIn
                        });
                        chartData.smsOut.push({
                            x: item.dateUnix,
                            y: item.smsOut
                        });
                        chartData.internetData.push({
                            x: item.dateUnix,
                            y: item.internetData
                        });
                    });
                    deferred.resolve(chartData);
                });
                return deferred.promise;
            },
            getDailyCallChar: function ()
            {
                var deferred = $q.defer();
                var chartData = {
                    callsOut: [],
                    callsIn: []
                };
                $firebaseArray(ref.child('dailyCallChart')).$loaded().then(function (result)
                {
                    angular.forEach(result, function (item)
                    {
                        chartData.callsOut.push({
                            x: item.dateUnix,
                            y: item.callsOut
                        });
                        chartData.callsIn.push({
                            x: item.dateUnix,
                            y: item.callsIn
                        });
                    });
                    deferred.resolve(chartData);
                });
                return deferred.promise;
            },
            push: function (data)
            {
                return $firebaseObject(ref.child(data.chart).push(data.object)).$loaded();
            }
        };
    }

    angular.module('billingApp').factory('ChartDAO', ['$q', '$firebaseObject', '$firebaseArray', ChartDAO]);
})();
