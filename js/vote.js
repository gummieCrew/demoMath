var ballots = [];                        
var blueBallot = [[2,3,1],[2,1,3]];
var redBallot = [[3,2,1],[3,1,2]];
var greenBallot = [[1,2,3],[1,3,2]];
var numberOfBallots = 5489;
var greenVote = 0;
var blueVote = 0;
var redVote = 0;
var red;
var green;
var blue;
var rgbColor;




function randColor(){
return Math.floor(Math.random() * 236 + 20 );
}
/******* this function chooses which ballot the blue, red or green is assigned*****/
function whichArray(){
  var constant = Math.floor(Math.random()*100);
  var array;
  
  if (constant >=50){
    array = 0;
  }else{
    array = 1;
  }
  
  return array;
}

//***********VOTING FUNCTIONS**************************************//


function voterData(voterId,ballot){
  this.voterId = voterId;
  this.ballot = vote(ballot);

}

//********DIV FUNCTIONS*********************************************//


function redDiv(){
  red = 255;
  green = randColor();
  blue = green;
  rgbColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
  html = '<div id = ' +i+' style="background-color:' + rgbColor + '"></div>';
  document.write(html);
}

function greenDiv(){
  green = 255;
  red = randColor();
  blue = red;
  rgbColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
  html = '<div id = ' +i+' style="background-color:' + rgbColor + '"></div>';
  document.write(html)
}


function blueDiv(){
  blue = 255;
  red = randColor();
  green = red;
  rgbColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
  html = '<div id = ' +i+' style="background-color:' + rgbColor + '"></div>';
  document.write(html)
}


//***************VOTING SEQUENCE************************************************//


for (i=0; i < numberOfBallots; i++){
  var constant = Math.floor(Math.random()*100);
  
  if (constant>=41){
    new voterData(i,greenBallot[whichArray()]);
    console.log(constant+' ,is greater than 51. Green Vote!')
    greenVote++;
  }
  
  else if (41>constant && constant>=11 ){
    new voterData(i,blueBallot[whichArray()]);
    console.log(constant+' ,is in between 51 and 14. Blue Vote!');
    blueVote++;
    

  }
  else if ((11)>constant){  
    new voterData(i,redBallot[whichArray()]);
    console.log(constant+' ,is less than 14. Red Vote!');
    redVote++;
  } 
  
    
    }

/********** DATA FROM THE VOTING SEQUENCE ***********/ 

console.log('Green tally:'+greenVote+', Blue tally:'+blueVote+', Red tally:'+redVote); 

var numberOfCandidates = Math.floor((redVote/numberOfBallots)*100);
var quota = Math.floor(numberOfBallots/(numberOfCandidates+1))+1;

console.log('There should be '+numberOfCandidates+' candidates. The quota for each elected official should be '+ quota+' votes.');


/***** ELECTION SEQUENCE (STILL WORKING ON IT)**********/	

// if (greenVote>0){
// 	
// 	do {
// 	$("#green.first").innerHTML(greenDiv());
// 	greenVote--;
// 	} while (greenVote>quota)
// 	
// 	else{
// 		do{
// 		$("#green.second");
// 		greenVote--;
// 		}
// 
// 
// 
// 
// 

















