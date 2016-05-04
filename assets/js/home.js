/* SHIT IS IN SCRAPE.JS FOR LOGIN CONTROL */

window.app.controller('home', function($scope, $http, $location, $window) {
    document.title="Home";

    $http.get("/allgames")
    .then(function(response) {
        $scope.teamnames = response.data;
    });

    console.log($scope.teamnames)

});
