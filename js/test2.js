var numberOfCand = 15;
var ballot = [];

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
  var numberOfBallots = 5489;
  
	for (var i=0; i<numberOfBallots; i++){
    var arr = [];

    for(var j=0;j<numberOfCand;j++){
      arr[j] = j;
    } 

    ballot[i] = shuffle(arr);
	}
  
  return ballot;
}

function getVotes() {
  var countArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var ballot = vote();
  var singledBallot = countArray;
  
  for(var j=0;j<numberOfCand;j++){
    countArray[j] = 0;
  } 
	
  for(var i=0; i<ballot.length; i++){
    for(var z=0;z<numberOfCand;z++){
      if(ballot[i][z]==z){ //Checking if that entry is equal to some pick (example, #2);
       //singledBallot[z] = [];
       //for(var z=0;z<numberOfCand;z++){
       
       //countArray[z] = ;
       countArray[z] = countArray[z] + 1;
      }
    }
  }
}

getVotes();