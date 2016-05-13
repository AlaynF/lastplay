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
        console.log(data);
    });

    $http.get('/api/reddit/mlbgames').success(function(data) {
        console.log(data);
    });

    $http.get('/api/reddit/nhlgames').success(function(data) {
        console.log(data);
    });

    $http.get('/api/reddit/nbacomments').success(function(data) {
        console.log(data);
    });

    window.onload = function(){
        var player = new Clappr.Player({
            source: "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1463119739/go/1/id/gufohV_VMQY.1/sver/3/maudio/1/playlist_type/LIVE/fexp/9416891%2C9422596%2C9428269%2C9428398%2C9428492%2C9430058%2C9431012%2C9433096%2C9433946%2C9435173%2C9436446%2C9436499/ipbits/0/demuxed/1/sparams/demuxed%2Cgo%2Chfr%2Cid%2Cip%2Cipbits%2Citag%2Cmaudio%2Cplaylist_type%2Cratebypass%2Crequiressl%2Csource%2Cexpire/source/yt_live_broadcast/itag/0/ratebypass/yes/keepalive/yes/upn/TCGTP2dsH8g/requiressl/yes/key/yt6/ip/172.98.67.79/hfr/1/signature/CEF8A0E0ED52BF2806221058FE54F1E14A9ECC85.155BAEC7CD42B3BB4B0442EF8FEA6E2673B2583E/file/index.m3u8",
            poster: 'http://cors.io/?u=http://wallpaperhd.press/wp-content/uploads/2016/02/Sports-Wallpapers-L3O.jpg',
            width: "960px",
            parentId: "#player",
            height: "400px"
        });
    }

});
