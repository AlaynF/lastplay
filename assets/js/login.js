window.app.controller('login', function($scope, $http, $window) {
    document.title="Login";

    var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    $scope.info = {}

   $scope.emailsubmit = function() {
        if (!$scope.info.email) {
            sweetAlert("Oops...", "Please enter E-mail", "error");
            return;
        }
            else

        if (!email_reg.test($scope.info.email)) {
            sweetAlert("Oops...", "E-mail not valid", "error");
            return;
        }

        swal({
            title: "Thanks!",
            text: "You're all signed up!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#A5DC86",
            confirmButtonText: "Awesome!",
            closeOnConfirm: true
        },
            function(){
            $http.post('/api/authentication/email', {
            email: $scope.info.email
            });
            $window.location.href="/home";
        });
    }
});
