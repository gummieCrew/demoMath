
/*********************** VARIABLES ***************************************/

var numberOfCand = 15;
var electOff = [];
var defeatOff = [];
var ballot = [];
var countArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var maxBallot = [];
var minBallot = [];



/******** USED TO SORT BALLOTS PROPERLY ****************************************/
// arr = [2,11,1,3] arr.sort() = [1,11,2,3], arr.sort(compareNumbers) = [1,2,3,11]

function compareNumbers(a, b) {
  	return a - b;
}

/*********************** MAKES RANDOM BALLOT***********************************/
// Eventually we will will generate ballots using jquery in the web page

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

/*********************** CREATES (X) AMOUNT OF BALLOTS ***************************************/
// Used in conjunction with shuffle() to randomize the rank of the candidates
// this simulates "numberOfBallots" people voting

function vote() {
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

/*********************** MAX RANGE  ***************************************/
// Places the last ballot index (ballot[i]) for a respective candidate into a respective array (maxBallot)

function ballotMax() {
	var max = 0;
		for (i=0;i<countArray.length;i++){
			max = max + countArray[i];
			maxBallot.push(max);
		}	
		//console.log(maxBallot);
}

/*********************** MIN RANGE ***************************************/
// Places the first ballot index (ballot[i]) for a respective candidate into a respective array (minBallot)

function ballotMin() {
	var min = -(countArray[0]);
		for (i=0;i<countArray.length;i++){
			min = min + countArray[i];
			minBallot.push(min);
		}	
		//console.log(minBallot);
}

/*********************** PICKS A BALLOT TO DISTRIBUTE ***************************************/
// Used in conjunction with maxBallot and minBallot
// In order for the ballot distribution process to be valid you must pick the ballot at random

function randomBallot(min,max) {
	  return Math.floor(Math.random()*(max-min+1)+min);
}

/*********************** COUNTS 1ST PLACE VOTES ***************************************/
// Places the first place vote of each ballot into their respective index in "countArray", for each candidate.

function countVotes() {
  var ballot = vote();
  
 loop1:  
	for(var i=0; i<ballot.length; i++){
	
		loop2:
    	for(var z=0;z<numberOfCand;z++){
    	
      	if(ballot[i][0]==z){ 
       			countArray[z] = countArray[z] + 1
       			break loop2;
      	}
      }
  	}
  //console.log(countArray);
}

/*********************** ELECTS ***************************************/
// If a candidate has first place votes >= the quota they are elected. (Quota being 10,001)

function elect() {

	for (var k=0; k<countArray.length; k++){
		if (countArray[k]>=10001){
			electOff.push(k);
			}
		}
}
/*********************** FIRST DISTRIBUTION  ***************************************/
//Any candidate who has first place votes > the quota are determined to be surplus
// The surplus is then distributed to the next choice on a random ballot 

function initDistribute() {
	
	for (var x=0; x<countArray.length; x++) {
	
		if (countArray[x]>=10001) {
		
			surplus = countArray[x]%10001;
			ballot.sort(compareNumbers);
			
			loop1:
			for (var s=0; s<surplus; s++) {
				
				b = randomBallot(minBallot[x],maxBallot[x]);
					
				loop2:
				for (var j=1; j<numberOfCand; j++) {
					
				loop3:
				for(var z=0;z<numberOfCand;z++) {
			
					if(ballot[b][j]==z){ 
				
						if(electOff.indexOf(z)==-1 && defeatOff.indexOf(z)==-1) {
					
							countArray[z] = countArray[z] + 1
							break loop2;
							} 
							else if (countArray[z]==10001){
								electOff.push(z);
								break loop3;
							}
							else { 
								break loop3;
							}
						}	
					}	
				}
			}
		}
	}
	return countArray;
}
/*********************** DECLARING A CANDIDATE DEFEATED  ***************************************/
// after surplus ballots have been distributed candidate with least amount of votes is declared defeated
// their votes are then distributed (example 100 votes = quota, (180 votes /quota) = surplus "distributable ballots")

function defeatedCand(arr) { 

	minVal = Math.min.apply(null, arr);//min value of array
	minIndex = arr.indexOf(minVal);//index of min value in countArray
	arr.splice(minIndex,1);//removes value from countArray
	countArray = arr
	defeatOff.push(minIndex);
	loop1:
	for (var s=0; s<minVal; s++) {

		b = randomBallot(minBallot[minIndex],maxBallot[minIndex]);

		loop2:
		for (var j=1; j<numberOfCand; j++) {

			loop3:
			for(var z=0;z<numberOfCand;z++) {
				
				if(ballot[b][j]==z){ 
					
					if(electOff.indexOf(z)==-1 && defeatOff.indexOf(z)==-1) {
				
						arr[z] = arr[z] + 1
						break loop2;
					}
					else if (arr[z]==10001){
								electOff.push(z);
								break loop3;
							}
	
					else { 
						break loop3;
					}
				}
			}	
		}
	}
}
/*********************** THE WHOLE SHEBANG ***************************************/

function complete() {



	console.log(electOff);
	countVotes();
	ballotMax();
	ballotMin();
	elect();

	while (electOff.length<9){
		defeatedCand(initDistribute());
		}
	}
complete();

// 	countVotes();
// 	ballotMax();
// 	ballotMin();
// 	elect();
// 	initDistribute();
// 	defeatedCand();