window.app.controller('game', function($scope, $http, $location, $window) {
    document.title="LastPlay";
    $scope.sport = {}

    $http.get('reddit/allgames').success(function(data) {
        $scope.allgames = data;
    });


    window.onload = function(){
        var player = new Clappr.Player({
            source: "https://manifest.googlevideo.com/api/manifest/hls_variant/key/yt6/expire/1462856950/go/1/sparams/demuxed%2Cgcr%2Cgo%2Chfr%2Cid%2Cip%2Cipbits%2Citag%2Cmaudio%2Cplaylist_type%2Cratebypass%2Crequiressl%2Csource%2Cexpire/id/2hrslKjkWkE.1/sver/3/ratebypass/yes/demuxed/1/signature/CACC6D8EF1E542578C2D76F471A85ACCEA18998C.9A3737D9F0B4FAE80710D86C77280228486670AF/maudio/1/playlist_type/LIVE/fexp/9416891%2C9417405%2C9422596%2C9428269%2C9428398%2C9428492%2C9430058%2C9431012%2C9433096%2C9433946%2C9435173%2C9436446%2C9436499/upn/xZZQoyt5G6k/source/yt_live_broadcast/keepalive/yes/gcr/ca/hfr/1/itag/0/ip/172.98.67.52/ipbits/0/requiressl/yes/file/index.m3u8",
            parentId: "#player",
            poster: 'http://cors.io/?u=http://wallpaperhd.press/wp-content/uploads/2016/02/Sports-Wallpapers-L3O.jpg',
            width: "960px",
            height: "400px"
        });
    }

})
