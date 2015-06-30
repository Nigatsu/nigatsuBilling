/*global Firebase*/
(function ()
{
    'use strict';

    function LogDAO($q, $firebaseObject, $firebaseArray)
    {
        var ref = new Firebase('https://dazzling-heat-830.firebaseio.com/log');

        return {
            query: function (filter)
            {
                return $firebaseArray(ref.orderByChild('date').startAt(filter.query).endAt(filter.query + '~')).$loaded();
            },
            push: function (data)
            {
                return $firebaseObject(ref.push(data)).$loaded();
            },
            test: function (filter)
            {
                var deferred = $q.defer();
                $firebaseArray(ref.orderByChild('date').startAt(filter.query).endAt(filter.query + '~')).$loaded().then(function (result)
                {
                    ref.once('value', function (snapshot)
                    {
                        var count = snapshot.numChildren();
                        deferred.resolve({
                            results: result,
                            total: count
                        });
                    });
                    deferred.resolve({
                        results: result,
                        total: 0
                    });
                });
                return deferred.promise;
            },
            getLast: function ()
            {
                return $firebaseArray(ref.limitToLast(1)).$loaded();
            }
        };
    }

    angular.module('billingApp').factory('LogDAO', ['$q', '$firebaseObject', '$firebaseArray', LogDAO]);
})();
