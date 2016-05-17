window.app.controller('contact', function($scope, $http, $window) {
    document.title="Contact";

    var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;




    $scope.message = function() {
        if (!$scope.email || !$scope.contact) {
            sweetAlert("Oops...", "Please enter information", "error");
            console.log($scope.email)
            return;
        } else {
            if (!email_reg.test($scope.email)) {
                sweetAlert("Oops...", "E-mail not valid", "error");
                return;
            }
        }

        console.log($scope.email)
        var data = {
            email: $scope.email,
            message: $scope.contact
        };

        $http.post('/api/Authentication/contactmail', data);

        $scope.clear()

        swal({
            title: "Thanks!",
            text: "Your message was sent!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#A5DC86",
            confirmButtonText: "Awesome!",
            closeOnConfirm: true
        }, function(){
            $window.location.href="/home";
        });
    }

    $scope.clear = function() {
        $scope.email = "";
        $scope.contact = ""
    }

    $scope.invite = function() {
        if (!$scope.email || !$scope.contact) {
            sweetAlert("Oops...", "Please enter information", "error");
            console.log($scope.email)
            return;
        } else {
            if (!email_reg.test($scope.email)) {
                sweetAlert("Oops...", "E-mail not valid", "error");
                return;
            }
        }


        var data = {
            email: $scope.email,
            message: $scope.contact
        };

        $http.post('/api/Authentication/invite', data);
        console.log(data);

        $scope.clear()

        swal({
            title: "Thanks!",
            text: "Your message was sent!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#A5DC86",
            confirmButtonText: "Awesome!",
            closeOnConfirm: true
        }, function(){
            $window.location.href="/home";
        });
    }


});
