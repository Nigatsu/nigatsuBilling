(function () {
    'use strict';

    angular.module('billingApp').controller('AppCtrl', function ($scope) {
        var ctrl = this;

        $scope.mainChart = {
            options: {},
            data: []
        };

        $scope.dailyCallChart = {
            options: {},
            data: []
        };

    });

})();
