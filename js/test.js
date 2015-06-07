var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var ballot = [];
var numberOfBallots = 5489;


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function vote(){
	for (var i=0; i<numberOfBallots; i++){
    var temp_arr = [];
    temp_arr = shuffle(arr);
    ballot[i] = temp_arr;
	}	
}

function getVotes() {
  var countArray = [];
	vote();
	
  for(var i=0; i<ballot.length; i++){
    for(var j=0;j<arr.length;j++){
      if(ballot[i][j]==j){
        countArray[j] = countArray[j] + 1;
      }
    }
  }
  
  console.log(countArray);
}

console.log(arr);
getVotes();

