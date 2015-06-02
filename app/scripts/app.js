(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name billingApp
     * @description
     * # billingApp
     *
     * Main module of the application.
     */

    var module = angular.module('billingApp', ['firebase', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'nvd3']);
    module.config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: '/views/home.html',
            controller: 'HomeCtrl as home'
        }).when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl as admin'
        }).otherwise({
            redirectTo: '/'
        });
    });

})();
