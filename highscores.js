function Ctrl($scope){
	if(typeof localStorage['highScores'] == 'undefined') localStorage['highScores'] = '{"scores":[]}';
	$scope.localHS = JSON.parse(localStorage['highScores']).scores;
	if($scope.localHS == undefined) $scope.localHS = new Array();
	
    $scope.newHS = function(){
        console.log($scope);
		$scope.localHS.push({"name":$scope.newHSName, "score":distance});
        $scope.localHS = $scope.localHS.sort(highScoreSortFunction);
        if($scope.localHS.length > 10) $scope.localHS.splice(10);
        localStorage['highScores'] = JSON.stringify({"scores": $scope.localHS});
		if($scope.accomplishedGlobalHS){
			$.get("server.php",{"name":$scope.newHSName, "score":distance}, function(){
				location.reload();
			});
		}
    };

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
	
	$scope.reloadGlobal = function(){
		$.get("server.php",{action:"get"}, function(data){
			$scope.$apply(function(){
				$scope.globalHS = JSON.parse(data);
			});
		});
	};
	
	$scope.reloadGlobal();

}

function highScoreSortFunction(a,b){
    return Number(b.score) - Number(a.score);
}