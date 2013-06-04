localStorage['highScores'] = JSON.stringify({"scores": [{"name":"Abc", "score":"100"},{"name":"Bef", "score":"50"},{"name":"Cac", "score":"10"}] });

function localHSCtrl($scope){
    $scope.localHS = JSON.parse(localStorage['highScores']).scores;
}
