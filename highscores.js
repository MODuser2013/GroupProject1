function Ctrl($scope){
    $scope.localHS = JSON.parse(localStorage['highScores']).scores;

    $scope.newHS = function(){
        $scope.localHS.push({"name":$scope.newHSName, "score":distance});
        $scope.localHS = $scope.localHS.sort(highScoreSortFunction);
        if($scope.localHS.length > 10) $scope.localHS.splice(10);
        localStorage['highScores'] = JSON.stringify({"scores": $scope.localHS});
    };

    $scope.number = function(){
        return $scope.localHS.length;
    };

}

function highScoreSortFunction(a,b){
    return Number(b.score) - Number(a.score);
}