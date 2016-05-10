/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";

    $http.get('games/nbagames').success(function(data) {
        $scope.nbagames = data;
    });

    $http.get('games/mlbgames').success(function(data) {
        $scope.mlbgames = data;
    });

    $http.get('games/nhlgames').success(function(data) {
        $scope.nhlgames = data;
    });

    $http.get('games/nbastuff').success(function(data) {
        $scope.nbastuff = data;
    });

});
