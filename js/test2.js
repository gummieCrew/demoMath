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

function compareNumbers(a, b) {
  return a - b;
}

function vote(){
  var numberOfBallots = 100000;
  
	for (var i=0; i<numberOfBallots; i++){
    var arr = [];

    for(var j=0;j<numberOfCand;j++){
      arr[j] = j;
    } 

    ballot[i] = shuffle(arr);
	}
  
  return ballot;
}

 var countArray = 
 [0,0,4000,0,0,2996,0,0,0,0,0,0,0,0,0]
 //[10001,10001,4000,6000,12000,2996,8000,10001,7000,6000,6000,10001,9000,6000,3000];
 var electedOfficial = [];

function firstRound() {
  var ballot = vote();
  var singledBallot = countArray;
  
 loop1:  
	for(var i=0; i<ballot.length; i++){
		loop2:
    	for(var z=0;z<numberOfCand;z++){
      	if(ballot[i][0]==z){ // if the first choice of a ballot is equal to z then it is added to the zth index of the countArray, (what we had before was if j==z then add to zth index of the countArray) 
       			countArray[z] = countArray[z] + 1
       			break loop2;
      	}
      }
  	}
  console.log(countArray);
}

 

/* not completed*/function firstElect(){
var electOff = []; // reference array for elected officials, when distributing surplus ballots, ballots will not go to candidates already elected (example if electOff[1]==ballot[45][j] then j++)
	for (var k=0; k<countArray.length; k++){
		if (countArray[k]>=10001){
			electOff.push(k);
			}
	}
	console.log(electOff);
}

for (var j=0; j<countArray.length; j++){// if 
	if (countArray[j]>=10001){
		surplus = countArray[j] % 10001;
		console.log(surplus);
		
		}
	}
function defeatedCand(){ // after surplus ballots have been distributed candidate with least amount of votes is declared defeated and there votes are then distributed (example 100 votes = quota, 180 votes /quota = surplus "distributable ballots")
			minVal = Math.min.apply(null, countArray);//min value of array
			minIndex = countArray.indexOf(minVal);//index of min value in countArray
			countArray.splice(minIndex,1);//removes value from countArray
			
	loop1://just figured out how to label things and its been helping me so i continued it here
		for(var i=0; i<ballot.length; i++){
		 loop2:	
			if (ballot[i][0]==minIndex){ 
				loop3:
  				for(var j=1;j<numberOfCand;j++){
      			if (countArray[ballot[i][j]]!==10001){    
      				z = ballot[i][j] 
       				countArray[z] = countArray[z] + 1;
       			} 
       		}
        }
      }
  	}
  console.log(countArray);
}













firstRound();
firstElect();
