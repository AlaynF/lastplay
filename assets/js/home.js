/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window, $filter) {
    document.title="Home";
    $scope.allgames;
    $scope.nbatitles;
    $scope.reddit_posts;

    //Fix Caps for game.sport
    $http.get('/api/reddit/allgames').success(function(data) {
        $scope.allgames = data;
        tittle = {};


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

        $scope.boxing = $scope.allgames.filter( function(game){
            return ( game.sport=="Boxing" );
        });

        $scope.football = $scope.allgames.filter( function(game){
            return ( game.sport=="Football" );
        });

        $scope.wrestling = $scope.allgames.filter( function(game){
            return ( game.sport=="Wrestling" );
        });
        //Fix Caps for game.sport
    });

    $http.get('/api/reddit/nbagames').success(function(data) {

    });

    $http.get('/api/reddit/mlbgames').success(function(data) {

    });

    $http.get('/api/reddit/nhlgames').success(function(data) {

    });

    $http.get('/api/reddit/nbacomments').success(function(data) {
        
    });

    window.onload = function(){
        var player = new Clappr.Player({
            source: "http://localhost:8000/wow.m3u8",
            poster: 'http://athlonsports.com/sites/athlonsports.com/files/EasternConfFinals_0.jpg',
            width: "960px",
            parentId: "#player",
            height: "400px"
        });

        // function playM3u8(url){
        //     console.log(Hls.isSupported());
        //   if(Hls.isSupported()) {
        //       console.log('ok');
        //       var video = document.getElementById('video');
        //       var hls = new Hls();
        //       var m3u8Url = decodeURIComponent(url)
        //       console.log(hls.loadSource);
        //       hls.loadSource(m3u8Url);
        //       hls.attachMedia(video);
        //       hls.on(Hls.Events.MANIFEST_PARSED,function() {
        //         video.play();
        //       });
        //       document.title = url
        //     }
        // }
        //
        // playM3u8("http://localhost:8000/wow.m3u8");
    }

});
