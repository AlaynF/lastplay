/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', ['$scope', '$http', '$location', '$window', '$filter', function($scope, $http, $location, $window, $filter) {
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

    $scope.theatreMode = function(){
    	var overlay = document.getElementById('overlay');
    	var lightSwitch = document.getElementById('lightSwitch');
    	if(overlay.style.display == "block"){
    		overlay.style.display = "none";
    		lightSwitch.src = "images/light_switch_up.jpg";
    		lightSwitch.title = "Enter Theatre Mode";
    	} else {
    		overlay.style.display = "block";
    		lightSwitch.src = "images/light_switch_down.jpg";
    		lightSwitch.title = "Exit Theatre Mode";
    	}
    }

    $scope.logout = function () {
        console.log('her');
        session.userId = null;
        res.redirect('/login')
    };

    function func_onclick(){
        document.getElementById("initial_opacity_zero").style.opacity="0.6";
    }
}])
