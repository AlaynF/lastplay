/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";


    window.onload = function () {

        flowplayer("#hlsjslive", {
            splash: true,
            embed: false,
            ratio: 9/16,
            clip: {
                live: true,
                sources: [
                    { type: "application/x-mpegURL",
                      src: "http://coolstreamz.x10host.com/stream/stream.m3u8"
                    }
                ]
            }
        });
    };

    $http.get('/nbagames').success(function(data) {
        $scope.nbagames = data;

    });

    $http.get('/mlbgames').success(function(data) {
        $scope.mlbgames = data;
        


    });

});
