
/*********************** VARIABLES ***************************************/

var numberOfCand = 15;
var electOff = [];
var defeatOff = [];
var ballot = [];
var countArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var maxBallot = [];
var minBallot = [0];
var distCand = [];
var defeatCount = 0;



/******** REFERENCE ARRAY ****************************************/
// arr = [2,11,1,3] arr.sort() = [1,11,2,3], arr.sort(compareNumbers) = [1,2,3,11]

function ballotArray() {
		temp_arr = [];
  	for (i=0; i<countArray.length; i++){
			temp_arr.push(i);
		}
		return temp_arr.sort()
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

/*********************** REPLICATES ARRAY ***************************************/

function createArr() {
	arr =[]
	for (i=0; i<countArray.length; i++){
		arr.push(countArray[i]);
	}
	return arr;
}

/*********************** COMPARES NUMBERS ***************************************/

function compareNumbers(a,b) {
    return a - b;
}

/*********************** REARANGES ***************************************/

function rearrange(arr) {
	
	temp_arrA = [];
	temp_arrB = [] 
	
	for (i=0; i<countArray.length; i++){
		temp_arrA.push(i);
		temp_arrB.push(arr[i])
		
		}
		
		temp_arrA.sort();
		
	for (i=0; i<countArray.length; i++){	
		
		a = temp_arrA[i];
		b = temp_arrB[a];
		c = temp_arrB[i];
		d = temp_arrA.indexOf(i);
		arr[i]=b;
		arr[d]=c;
		}
}

/*********************** MAX RANGE  ***************************************/
// Places the last ballot index (ballot[i]) for a respective candidate into a respective array (maxBallot)


function ballotMax() {
	var max = 0;
		for (var i=0;i<countArray.length; i++){
		
			temp_arr = ballotArray();
			a = temp_arr[i]
			max = max + countArray[a];
			maxBallot.push(max-1);
		}	
}

/*********************** MIN RANGE ***************************************/
// Places the first ballot index (ballot[i]) for a respective candidate into a respective array (minBallot)

function ballotMin() {
	var min = 0;
		for (var i=0;i<countArray.length-1; i++){
		
			temp_arr = ballotArray();
			a = temp_arr[i]
			min = min + countArray[a];
			minBallot.push(min);
		}	
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
		if (countArray[k]>=10001 && electOff.indexOf(k)==-1){
			electOff.push(k);
			}
		}
}
/*********************** FIRST DISTRIBUTION  ***************************************/
//Any candidate who has first place votes > the quota are determined to be surplus
// The surplus is then distributed to the next choice on a random ballot 

function initDistribute() {
	
	for (var x=0; x<countArray.length; x++) {
	
		if (countArray[x]>=10001 && distCand.indexOf(x)==-1) {
		
			surplus = countArray[x]%10001;
			
			loop1:
			for (var s=0; s<surplus; s++) {
				
				temp_arr = ballotArray();
				a = temp_arr.indexOf(i)
				b = randomBallot(minBallot[a],maxBallot[a]);
					
				loop2:
				for (var j=1; j<numberOfCand; j++) {
					
				loop3:
				for(var z=0;z<numberOfCand;z++) {
			
					if(ballot[b][j]==z){ 
					
							if (countArray[z]==10001 && electOff.indexOf(z)==-1){
								electOff.push(z);
								break loop3;
							}
				
							else if(electOff.indexOf(z)==-1 && defeatOff.indexOf(z)==-1) {
					
							countArray[z] = countArray[z] + 1
							break loop2;
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
}
/*********************** DECLARING A CANDIDATE DEFEATED  ***************************************/
// after surplus ballots have been distributed candidate with least amount of votes is declared defeated
// their votes are then distributed (example 100 votes = quota, (180 votes /quota) = surplus "distributable ballots")

function defeatedCand() { 
	
	gradientArr = createArr();
	gradientArr.sort(compareNumbers);
	minVal = gradientArr[defeatCount];//min value of array
	minIndex = countArray.indexOf(minVal);//index of min value in countArray
	defeatOff.push(minIndex);
	
	loop1:
	for (var s=0; s<minVal; s++) {
		
		temp_arr = ballotArray();
		a = temp_arr.indexOf(minIndex)
		b = randomBallot(minBallot[a],maxBallot[a]);

		loop2:
		for (var j=1; j<numberOfCand; j++) {

			loop3:
			for(var z=0;z<numberOfCand;z++) {
				
				if(ballot[b][j]==z){ 
					
					 if(electOff.indexOf(z)==-1 && defeatOff.indexOf(z)==-1) {
				
						countArray[z] = countArray[z] + 1
						break loop2;
					
					}
	
					else { 
						break loop3;
					}
				}
			}	
		}
	}
	defeatCount++;
}
/*********************** THE WHOLE SHEBANG ***************************************/

function complete() {



	console.log(electOff);
	countVotes();
	ballotMax();
	ballotMin();
	ballot.sort();

	while (electOff.length<9){
		elect();
		initDistribute()
		defeatedCand();
		}
	}

//complete();

// 	countVotes();
// 	ballotMax();
// 	ballotMin();
// 	elect();
// 	initDistribute();
// 	defeatedCand();