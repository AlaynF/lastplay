window.app.controller('register', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
    document.title="Register";

    var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    $scope.submitInfo = function() {
        var data = {
            username: $scope.username,
            password: $scope.password,
            confirmPassword: $scope.confirmPassword,
            name: $scope.name,
            email: $scope.email
        };

        if (!email_reg.test($scope.email)) {
            sweetAlert("Oops...", "E-mail not valid", "error");
            return;
        }

        if(!data.username || !data.password || !data.confirmPassword || !data.email || !data.name){
            sweetAlert("Oops...", "Missing information", "error");
            return;
        }

        $http.post("api/login/register", data).success(function(data,err) {
            if (data.success == true) {
                swal({
                    title: "Thanks!",
                    text: "You're all signed up!",
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
                sweetAlert("Oops...", "Username unavailable", "error");
            }

        });
    }

}]);
