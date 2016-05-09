/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";

    window.onload = function(){
        var player = new Clappr.Player({
            source: "http://xrxs.net/video/live-p12netw-4728.m3u8",
            parentId: "#player",
            poster: 'http://wallpaperhd.press/wp-content/uploads/2016/02/Sports-Wallpapers-L3O.jpg',
            width: "960px",
            height: "400px"
        });
    }

    $http.get('games/nbagames').success(function(data) {
        $scope.nbagames = data;

    });

    $http.get('games/mlbgames').success(function(data) {
        $scope.mlbgames = data;



    });

});
