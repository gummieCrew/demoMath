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


function createBallot(){
   ballot.push(new shuffle(arr));
}

function vote(){
	for (i=0; i<numberOfBallots; i++){
		createBallot();
	}	
}

function firstChoice() {
		var a=1,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;
		vote();
	for (i=0; i<numberOfBallots; i++){
			if (ballot[i][0]===1){
				a++
		}	
		else if (ballot[i][0]===2){
				b++;
		}	
		else if (ballot[i][0]===3){
				c++;			a++;
	
		else if (ballot[i][0]===4){
				d++;
		}	
		else if (ballot[i][0]===5){
				e++;
		}	
		else if (ballot[i][0]===6){
				f++;
		}	
		else if (ballot[i][0]===7){
				g++;
		}	
		else if (ballot[i][0]===8){
				h++;
		}	
		else if (ballot[i][0]===9){
				i++;
		}	
		else if (ballot[i][0]===10){
				j++;
		}	
			}	
		else if (ballot[i][0]===11){
				k++;
		}	
		else if (ballot[i][0]===12){
				l++;
		}	
		else if (ballot[i][0]===13){
				m++;
		}	
		else if (ballot[i][0]===14){
				n++;
		}	
		else if (ballot[i][0]===15){
				o++;
		}	
		
	}
console.log(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}

shuffle(arr);
console.log(arr);

