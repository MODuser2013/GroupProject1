var app = angular.module("RunningGame", []);

app.controller("Ctrl", function($scope){

    $scope.newHS = function(){
        var data = getGameData();
        var curNT = numTracks;
        numTracks = 0;
        if(cheatCheck(data)){
            alert('You cheated');
            return false;
        }
        $scope.localHS.push({"name":$scope.newHSName, "score":distance});
        $scope.localHS = $scope.localHS.sort(highScoreSortFunction);
        if($scope.localHS.length > 10) $scope.localHS.splice(10);
        localStorage['highScores-'+curNT] = JSON.stringify({"scores": $scope.localHS});
        if($scope.accomplishedGlobalHS){
            $.post("server.php",{"name":$scope.newHSName, "score":distance, "tracks":curNT,"data":data}, function(){
                location.reload();
            },function(){
                location.reload();
            });
        }
    };

    $scope.play3 = function(){
        numTracks = 3;
        SCENE_WIDTH = 350;
        $('#menu').hide();
        paused = false;
        main();
        $scope.reloadGlobal(3);
        $scope.reloadLocal(3);
    }

    $scope.play5 = function(){
        numTracks = 5;
        SCENE_WIDTH = 600;
        $('#menu').hide();
        paused = false;
        main();
        $scope.reloadGlobal(5);
        $scope.reloadLocal(5);
    }

    $scope.number = function(){
        return $scope.localHS.length;
    };

    $scope.accomplishedLocalHS = function(newScore){
        if($scope.localHS.length < 10) return true;
        return newScore > $scope.localHS[$scope.localHS.length-1].score;
    };

    $scope.accomplishedGlobalHS = function(newScore){
        if($scope.globalHS.length < 10) return true;
        return newScore > $scope.globalHS[$scope.globalHS.length-1].score;
    };

    $scope.reloadLocal = function(tracks){
        if(typeof localStorage['highScores-'+tracks] == 'undefined') localStorage['highScores-'+tracks] = '{"scores":[]}';
        $scope.localHS = JSON.parse(localStorage['highScores-'+tracks]).scores;
        if($scope.localHS == undefined) $scope.localHS = new Array();
    }

    $scope.reloadGlobal = function(tracks){
        $.get("server.php",{action:"get", "tracks":tracks}, function(data){
            $scope.$apply(function(){
                $scope.globalHS = JSON.parse(data);
            });
        });
    };

});

function highScoreSortFunction(a,b){
    return Number(b.score) - Number(a.score);
}

function cheatCheck(data){
  if(playerLoc<0 || playerLoc >=numTracks) return true;
    if(distance > 500) return true;
    return false;
}