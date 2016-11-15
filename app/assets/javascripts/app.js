        var app = angular.module('nbaApp', ['ngRoute']);
app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when("/partial1", {
            templateUrl: "/partials/partial1.html",
            controller: "playersController"
        })
        .when("/partial2", {
            templateUrl: "/partials/partial2.html",
            controller: "teamsController"
        })
        .when("/partial3", {
            templateUrl:"/partials/partial3.html",  
            controller: "associatesController"
        })
        .otherwise({ redirectTo: "/" });

     $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});


///////////Factories//////

app.factory("playerFactory", function($http){
    var factory = {};
    factory.index = function(callback) {
        $http.get("/players")
        .success(function(output){
            callback(output);
        })

    }

    factory.create = function(playerInfo, callback){
        console.log(playerInfo, "factory")
        $http.post("/players", playerInfo)
        .success(function(output){
            console.log(output)
            callback(output)
        })
        .error(function(output, status){
            console.log(output, status)
            callback(output)
        }) 
    }

    factory.destroy = function(id, callback){
        $http.delete("/players/" + id).success(function(output){
            callback(output)
        })
    }
    return factory;
});

app.factory("teamFactory",function($http){
    var factory = {};
    factory.index = function(callback) {
        $http.get("/teams").success(function(output){
            callback(output);
        })
    }

    factory.create = function(teamInfo, callback){
        $http.post("/teams", teamInfo)
        .success(function(output){
            console.log(output)
            callback(output);
        })
        .error(function(output, status){
            console.log(output,"error")
            callback(output)
        })
    }

    factory.destroy = function(id, callback){
        $http.delete("/teams/" + id).success(function(output){
            callback(output);
        })
    }

    return factory
});

app.factory("associateFactory", function($http){
    var factory = {}

    factory.show = function(id, callback){
        $http.get("/teams/" + id).success(function(output){
            callback(output)
        })
    }
    return factory
})


//////////controllers////

app.controller("playersController", function($scope, playerFactory, teamFactory){

    playerFactory.index(function(json){
        $scope.players = json;
    })
    teamFactory.index(function(json){
        $scope.teams = json;
    })


    $scope.createPlayer = function(newPlayer){
        console.log(newPlayer)
        if(newPlayer == undefined){
            $scope.errors= ["You can't leave the fields blank"]
        }else{
            playerFactory.create(newPlayer, function(json){
                
                if(json.errors){
                    $scope.errors = json.errors;
                }else{
                    $scope.players= json;
                    $scope.newPlayer= {};
                    $scope.errors = {};
                }
            })
        }
    }
    $scope.destroyPlayer = function(playerId){
        console.log(playerId)
        playerFactory.destroy(playerId, function(json){
            $scope.players = json;
        })
    }

})

app.controller("teamsController", function($scope, teamFactory){
    teamFactory.index(function(json){
        $scope.teams = json;
    })

    $scope.createTeam = function(newTeam){
        if(newTeam == undefined){
            $scope.errors = ["You can't leave name blank"];
        }else{
            teamFactory.create( newTeam, function(json){
                if(json.errors){
                    $scope.errors = json.errors;
                }else{
                    $scope.teams = json;
                    $scope.newTeam= {};
                    $scope.errors = {};
                }
            })
        }
    }

    $scope.destroyTeam = function(teamId){
        teamFactory.destroy(teamId, function(json){
            $scope.teams = json;
        })
    }


})

app.controller("associatesController", function($scope, teamFactory, playerFactory, associateFactory){
    teamFactory.index(function(json){
        $scope.teams = json;
    })

    $scope.showTeam = function(findTeam){
        
        associateFactory.show(findTeam.id, function(json){
            console.log(json)
            $scope.roster = json;
        })
    }
})