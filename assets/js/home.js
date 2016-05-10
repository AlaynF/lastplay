/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";

    $http.get('reddit/nbagames').success(function(data) {
        $scope.nbagames = data;
    });

    $http.get('reddit/mlbgames').success(function(data) {
        $scope.mlbgames = data;
    });

    $http.get('reddit/nhlgames').success(function(data) {
        $scope.nhlgames = data;
    });

    // $http.get('games/nbastuff').success(function(data) {
    //     $scope.nbastuff = data;
    // });

    $http.get('reddit/redditstuff').success(function(data) {
        console.log(data)
    })

});
