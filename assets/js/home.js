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
            source: "https://stream.lastplay.us/api/manifest/hls_variant/maudio/1/hfr/1/signature/A33FDD66F622F31D52B6E3B6B3C88B035894AAFD.BF73480CE009628B0C4299B74B1B9C6855C8C8EA/demuxed/1/ip/172.98.67.27/gcr/ca/ipbits/0/expire/1463202479/sparams/demuxed%2Cgcr%2Cgo%2Chfr%2Cid%2Cip%2Cipbits%2Citag%2Cmaudio%2Cplaylist_type%2Cratebypass%2Crequiressl%2Csource%2Cexpire/source/yt_live_broadcast/requiressl/yes/playlist_type/LIVE/fexp/11200715%2C9416891%2C9422596%2C9428269%2C9428398%2C9428492%2C9430058%2C9431012%2C9433096%2C9433946%2C9435173%2C9436446%2C9436499/sver/3/itag/0/ratebypass/yes/id/YjoNZaiu_eQ.1/key/yt6/keepalive/yes/go/1/upn/VLnvm4HPO3Y/file/index.m3u8",
            poster: 'http://cors.io/?u=http://wallpaperhd.press/wp-content/uploads/2016/02/Sports-Wallpapers-L3O.jpg',
            width: "960px",
            parentId: "#player",
            height: "400px"
        });
    }

});
