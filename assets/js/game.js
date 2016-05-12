window.app.controller('game', function($scope, $http, $location, $window) {
    document.title="LastPlay";
    $scope.sport = {}

    $http.get('reddit/allgames').success(function(data) {
        $scope.allgames = data;
    });


    window.onload = function(){
        var player = new Clappr.Player({
            source: "https://manifest.googlevideo.com/api/manifest/hls_variant/maudio/1/requiressl/yes/ratebypass/yes/ip/172.98.67.50/key/yt6/ipbits/0/go/1/fexp/11200715%2C9416891%2C9422596%2C9428269%2C9428398%2C9428492%2C9430058%2C9431012%2C9433096%2C9433946%2C9435173%2C9436446%2C9436499/hfr/1/sparams/demuxed%2Cgcr%2Cgo%2Chfr%2Cid%2Cip%2Cipbits%2Citag%2Cmaudio%2Cplaylist_type%2Cratebypass%2Crequiressl%2Csource%2Cexpire/upn/zJp5w1NOoCs/id/MYdPVuUX874.1/itag/0/signature/D0BD5DC7D08522A3007B187A816DF71B9242D397.A066C2400BA6A9A7F0813A04D439C8F25041FEEA/gcr/ca/sver/3/expire/1463029416/demuxed/1/keepalive/yes/playlist_type/LIVE/source/yt_live_broadcast/file/index.m3u8",
            parentId: "#player",
            poster: 'http://cors.io/?u=http://wallpaperhd.press/wp-content/uploads/2016/02/Sports-Wallpapers-L3O.jpg',
            width: "960px",
            height: "400px"
        });
    }

})
