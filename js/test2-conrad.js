
/*********************** VARIABLES ***************************************/

var numberOfCand = 15;
var numberOfSeats = 9;
var numberOfBallots = 100000;
var electOff = [];
var defeatOff = [];
var ballot = [];
var countArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var maxBallot = [];
var minBallot = [0];
var defCand = [];
var defeatCount = 0;

/******** REFERENCE ARRAY ****************************************/
// arr = [2,11,1,3] arr.sort() = [1,11,2,3] // we cannot sort the ballots any other way...
function ballotArray() {
		temp_arr = [];
  	for (i=0; i<countArray.length; i++){
			temp_arr.push(i);
		}
		return temp_arr.sort()
}

/*********************** Temporary ARRAY ***************************************/

function tempArr() { //cA = countArray
	var arr = [];
	for (i=0; i<numberOfCand; i++){
		arr.push(i);
	}
	return arr;
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

/*********************** CREATES (X) AMOUNT OF BALLOTS ****************************************/
// Used in conjunction with shuffle() to randomize the rank of the candidates
// this simulates "numberOfBallots" people voting

function vote() { //nB = numberOfBallots, nC = numberOfCand

	for (var i=0; i<numberOfBallots; i++){
	var temp = tempArr();
	ballot[i] = shuffle(temp);

		}
  return ballot;
}


/*********************** REPLICATES countARRAY ***************************************/

function createArr() { //cA = countArray
	arr =[]
	for (i=0; i<countArray.length; i++){
		arr.push(countArray[i]);
	}
	return arr;
}
/*********************** QUOTA ***************************************/

function quota() {
	q = (numberOfBallots/(numberOfSeats+1))+1;
	return q;
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
/* ballots have been arranged by first place votes [0,1,10,11,12,13,14,2,3,4,5,6,7,8,9],
this function creates an array "maxBallot", of the uppermost range of indexes for this ^ particular array "ballotArray" */ 
function ballotMax() {
	var max = 0;
		for (var i=0;i<countArray.length; i++){
			temp_arr = ballotArray(); // makes an array replicating the order of the ballots
			a = temp_arr[i] // stores the index of ballot in a variable
			max = max + countArray[a]; // uses "a" as index of array to add to counter variable "max"
			maxBallot.push(max-1); // pushes the uppermost value of a ballot place into array
		}	
}

/*********************** MIN RANGE ***************************************/
// Places the first ballot index (ballot[i]) for a respective candidate into a respective array (minBallot)

function ballotMin() {
	var min = 0;
		for (var i=0;i<countArray.length-1; i++){ //always starts at index zero
			temp_arr = ballotArray();
			a = temp_arr[i]
			min = min + countArray[a];
			minBallot.push(min);// same as "ballotMax" expect pushes the lowermost value of a ballot place into array
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

function elect() { //eO = electOff

	for (var k=0; k<countArray.length; k++){
		if (countArray[k]>=quota() && electOff.indexOf(k)==-1){
			electOff.push(k);
			}
		}
}
/*********************** FIRST DISTRIBUTION  ***************************************/
//Any candidate who has first place votes > the quota are determined to be surplus
// The surplus is then distributed to the next choice on a random ballot 

function initDistribute() {
	
	for (var x=0; x<countArray.length; x++) {
	
		if (countArray[x]>=quota() && defCand.indexOf(x)==-1) {
		
			surplus = countArray[x]%quota();
			
			loop1:
			for (var s=0; s<surplus; s++) {
				
				temp_arr = ballotArray();
				a = temp_arr.indexOf(x)
				c = randomBallot(minBallot[a],maxBallot[a]);
					
				loop2:
				for (var j=1; j<numberOfCand; j++) {
					
				loop3:
				for(var z=0;z<numberOfCand;z++) {
			
					if(ballot[c][j]==z){ 
					
							if (countArray[z]==quota() && electOff.indexOf(z)==-1){
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
		c = randomBallot(minBallot[a],maxBallot[a]);

		loop2:
		for (var j=1; j<numberOfCand; j++) {

			loop3:
			for(var z=0;z<numberOfCand;z++) {
				
				if(ballot[c][j]==z){ 
					
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
		console.log(electOff);
}

/**CONRAD quick code to be moved to a gui js file for handling front end stuff*/

/*To be moved, but will start up the code on the page*/
window.onload = function() {
	$('.start_algo').on('click', startAlgo);
}

/*Button init for algo stuff*/
function startAlgo(){
  //Re-init vars
  electOff = [];
  defeatOff = [];
  ballot = [];
  countArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  maxBallot = [];
  minBallot = [0];
  defCand = [];
  defeatCount = 0;

	numberOfCand = parseInt($('.candidates_input').val());
	numberOfBallots = parseInt($('.ballot_input').val());
	numberOfSeats = parseInt($('.seats_input').val());
	
	if(!isNaN(numberOfCand) &&
  !isNaN(numberOfBallots) &&
  !isNaN(numberOfSeats)){
		complete();
	} else{
	  console.error("The inputs for the algorithm are not all numbers!");
	}
}



//complete();
console.log(electOff);

// 	countVotes();
// 	ballotMax();
// 	ballotMin();
// 	elect();
// 	initDistribute();
// 	defeatedCand();