function Ctrl($scope){
    $scope.localHS = JSON.parse(localStorage['highScores']).scores;

    $scope.newHS = function(){
        $scope.localHS.push({"name":$scope.newHSName, "score":distance});
        $scope.localHS = $scope.localHS.sort(highScoreSortFunction);
        if($scope.localHS.length > 10) $scope.localHS.splice(10);
        localStorage['highScores'] = JSON.stringify({"scores": $scope.localHS});
        location.reload();
    };

    $scope.number = function(){
        return $scope.localHS.length;
    };

    $scope.accomplishedLocalHS = function(newScore){
        if($scope.localHS.length > 10) return true;
        return newScore > $scope.localHS[$scope.localHS.length-1].score;
    };

}

function highScoreSortFunction(a,b){
    return Number(b.score) - Number(a.score);
}