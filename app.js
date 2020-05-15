var app = angular.module("Hangman App", []);
app.controller("Controller",['$scope',function($scope){

var words=["apple","mango","grape"];
$scope.incorrectAlphabetChosen = [];
$scope.correctAlphabetChosen = [];
$scope.guesses = 6;
$scope.visibleWord = '';
$scope.input = {
	alphabet : ''
}

// to select the random word from the array
var selectRandomWord = function(){
	var i = Math.round(Math.random()*words.length);
	return words[i];
}

var startNewGame = function(){
	$scope.incorrectAlphabetChosen = [];
	$scope.correctAlphabetChosen = [];
	$scope.guesses = 6;
	$scope.visibleWord = '';

	selectedWord = selectRandomWord();
	var tempVisibleword = '';
	for (var i = 0; i < selectedWord.length; i++) {
		tempVisibleword +='*';
	}
	console.log(tempVisibleword);
	console.log(selectedWord);
	$scope.visibleWord = tempVisibleword;

}



$scope.alphabetChoosen = function(){

	// check user already pressed that letter or not(correct/incorrect)

	for (var i = 0; i < $scope.correctAlphabetChosen.length; i++) {
		if($scope.correctAlphabetChosen[i].toLowerCase() == $scope.input.alphabet.toLowerCase()){
			$scope.input.alphabet = "";
			return;
		}
	}

	for (var i = 0; i < $scope.incorrectAlphabetChosen.length; i++) {
		if($scope.incorrectAlphabetChosen[i].toLowerCase() == $scope.input.alphabet.toLowerCase()){
			$scope.input.alphabet = "";
			return;
		}
	}

	// check alphabet is present in random selectedWord or not

	var correct = false; // a boolean flag

	for (var i = 0; i < selectedWord.length; i++) {
		if(selectedWord[i].toLowerCase() == $scope.input.alphabet.toLowerCase()){
			// user guess is correct for this alphabet

			$scope.visibleWord = $scope.visibleWord.slice(0,i)+$scope.input.alphabet.toLowerCase()+$scope.visibleWord.slice(i+1);
				// with above line 
				//apple
				//*****
				//***l*
			correct = true;
		}
	}
	if(correct){
		$scope.correctAlphabetChosen.push($scope.input.alphabet.toLowerCase());
	}
	else{
		$scope.guesses--;
		$scope.incorrectAlphabetChosen.push($scope.input.alphabet.toLowerCase());
	}

	// clearup the input

	$scope.input.alphabet = "";

	if($scope.guesses ==0){
		alert("You lost man !")
	}

	if($scope.visibleWord.indexOf("*")==-1){
		alert("hurrah, You won man !!!!")
	}
} 


startNewGame();


}]);