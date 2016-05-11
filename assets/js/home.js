/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";
    var allgames =[];
    $scope.allgames = allgames;

    $http.get('reddit/allgames').success(function(data, callback) {
        allgames = data;
        $scope.dataJson = allgames;

        $window.callback(function(){
            $scope.baseball = allgames.filter( function(game){return (game.sport=="baseball");
            })
            console.log($scope.baseball)
        });
    });


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
