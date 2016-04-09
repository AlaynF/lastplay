window.app.controller('register', function($scope, $http, $location, $window) {
    document.title="Register";

    $scope.submitInfo = function() {
        var data = {
            username: $scope.info.username,
            password: $scope.info.password,
            name: $scope.info.fullname,
            email: $scope.info.email
        };


        $http.post("/register", data).success(function(data,status) {

          if (data.success == true) {
               $window.location.href  = "/login";
          } else {
                alert("Missing Information");
          }
    });
  }

});
