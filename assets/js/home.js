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
        source: "rtmp://localonly.chickenkiller.com:1935/live/test",
        parentId: "#player-wrapper",
        plugins: {'playback': [RTMP]},
        rtmpConfig: {},
        });

        var player2 = new Clappr.Player({
        source: "rtmp://localonly.chickenkiller.com:1935/live/test1",
        parentId: "#player-wrapper2",
        plugins: {'playback': [RTMP]},
        rtmpConfig: {},
        });

    }


    $scope.logout = function () {
        console.log('her');
        session.userId = null;
        res.redirect('/login')
    };

    // $scope.empty = function () {
    //     if(){
    //         No games today
    //     }
    // }

});
