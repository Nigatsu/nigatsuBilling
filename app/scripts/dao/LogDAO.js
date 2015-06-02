/*global Firebase*/
(function () {
    'use strict';

    function LogDAO($firebaseObject) {
        var ref = new Firebase('https://dazzling-heat-830.firebaseio.com/log');

        return {
            query: function () {
                return $firebaseObject(ref).$loaded();
            },
            test: function (data) {
                return $firebaseObject(ref.orderByChild('date').startAt(data).endAt( data + '~')).$loaded();
            },
            push: function (data) {
                return $firebaseObject(ref.push(data)).$loaded();
            }
        };
    }

    angular.module('billingApp').factory('LogDAO', ['$firebaseObject', LogDAO]);
})();
