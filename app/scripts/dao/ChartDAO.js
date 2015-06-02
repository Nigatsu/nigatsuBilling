/*global Firebase*/
(function () {
    'use strict';

    function ChartDAO($q, $firebaseObject, $firebaseArray) {
        var ref = new Firebase('https://dazzling-heat-830.firebaseio.com/chart');

        return {
            query: function (data) {
                return $firebaseObject(ref.child(data.chart)).$loaded();
            },
            push: function (data) {
                return $firebaseObject(ref.child(data.chart).push(data.object)).$loaded();
            },
            test: function (data) {
                var deferred = $q.defer();
                $firebaseArray(ref.child(data.chart)).$loaded().then(function (result) {
                    ref.child(data.chart).on('value', function(snapshot) {
                        var count = snapshot.numChildren();
                        return deferred.resolve({results: result, total: count});
                    });
                });
                return deferred.promise;
            }
        };
    }

    angular.module('billingApp').factory('ChartDAO', ['$q', '$firebaseObject', '$firebaseArray', ChartDAO]);
})();
