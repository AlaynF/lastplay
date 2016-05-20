window.app.controller('login', function($scope, $http, $window) {
    document.title="Login";


    $scope.login = function() {
      var data = {
          username: $scope.username,
          password: $scope.password
      };

      console.log(data)
      $http.post("api/login/authenticate", data).success(function(data) {
            if (data.success == true) {
                $window.location.href = "/home";
            }
            else {
                sweetAlert("Oops...", "Incorrect Username/Email", "error");
            return;
            }
        });
    }
})
