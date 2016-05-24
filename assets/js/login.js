window.app.controller('login', function($scope, $http, $window, $location) {
    document.title="Login";
    $scope.modal = "modal";

    $scope.login = function() {
      var data = {
          username: $scope.username,
          password: $scope.password
        };


      $http.post("api/login/authenticate", data).success(function(data) {
            if (data.success == true) {
                $window.location.href = "/home";
            } else {
                sweetAlert("Oops...", "Incorrect Username/Password", "error");
                return;
            }
        });
    }

    $scope.open = function() {
        if
        ($scope.modal === "modal")
        $scope.modal = "modal is-active";
        else
        $scope.modal = "modal";
    }

    $scope.recover = function() {
        console.log('hey');
        var data = {
            email: $scope.emailpassword.toLowerCase()
          };

          console.log(data);

        $http.post("api/login/passwordrecovery", data).success(function(data) {
            if (data.success == true) {
                swal({
                    title: "Thanks!",
                    text: "Email has ben sent!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#A5DC86",
                    confirmButtonText: "Awesome!",
                    closeOnConfirm: true
                }, function(){
                    $window.location.href="/login";
                });
            } else {
              swal({
                  title: "Oops...",
                  text: "Invalid Email",
                  type: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#A5DC86",
                  confirmButtonText: "Awesome!",
                  closeOnConfirm: true
              }, function(){
                  $window.location.href="/login";
              });
              return;
            }
        });

    }

    $scope.submitInfo = function () {
        var data = {
            password: $scope.password,
            confirmPassword: $scope.confirmPassword,
            token: location.search.split('token=')[1]
        };

        console.log(data);

        if(!data.password) {
            sweetAlert("Oops...", "Missing information", "error");
            return;
        }

        $http.post("api/login/password", data).success(function(data,err) {
            if (data.success == true) {
                swal({
                    title: "Thanks!",
                    text: "You're all set!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#A5DC86",
                    confirmButtonText: "Awesome!",
                    closeOnConfirm: true
                }, function(){
                    $window.location.href="/login";
                });
            } else

            if(status == false){
                sweetAlert("Oops...", "Passwords don't match", "error");
            }

        });
    }

})
