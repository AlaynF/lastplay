/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";

    $http.get('reddit/allgames').success(function(data) {
        $scope.allgames = data;
    });

    $scope.sport = {};

    $scope.sportFilter = function (game) {
        console.log(game, $scope.sport);
        return !$scope.sport ?
                   game : (game.sport == $scope.sport);
    };

    // $http.get('reddit/mlbgames').success(function(data) {
    //     $scope.mlbgames = data;
    // });
    //
    // $http.get('reddit/nhlgames').success(function(data) {
    //     $scope.nhlgames = data;
    // });

    // $http.get('games/nbastuff').success(function(data) {
    //     $scope.nbastuff = data;
    // });

    // $http.get('reddit/redditstuff').success(function(data) {
    // });

    // $scope.nbaFilter = function(game) {
    //     return (nbagames.sport == "nba");
    // };

    $scope.nbaFilter = function(game) {
        return ($scope.nbagames.sport == "nba");
    };


});
