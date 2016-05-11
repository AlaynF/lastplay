/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";
    $scope.allgames;

    $http.get('reddit/allgames').success(function(data) {
        $scope.allgames = data;

        $scope.dataJson = $scope.allgames;

        $scope.baseball = $scope.allgames.filter( function(game){
            return ( game.sport=="Baseball" );
        });

        $scope.basketball = $scope.allgames.filter( function(game){
            return ( game.sport=="Basketball" );
        });

        $scope.hockey = $scope.allgames.filter( function(game){
            return ( game.sport=="Hockey" );
        });

        
    });


    // $http.get('games/nbastuff').success(function(data) {
    //     $scope.nbastuff = data;
    // });

    // $http.get('reddit/redditstuff').success(function(data) {
    // });

});
