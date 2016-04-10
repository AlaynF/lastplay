window.app.controller('login', function($scope, $http, $location, $window) {
    document.title="Login";

    var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    $scope.info = {}

    $scope.emailsubmit = function() {
        if (!$scope.info.email) {
            alert("Please enter Email");
        } else {
            if (!email_reg.test($scope.info.email)) {
                alert("NOT VALID");
            } else {

                $http.post('/handle_email', {
                    email: $scope.info.email
                });

                window.location.href="/home";
            }
        }
    }
});
