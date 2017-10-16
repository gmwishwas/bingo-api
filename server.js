var restify = require('restify');

function respond(req, res, next) {
  function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

for (var a=[],i=0;i<100;++i) a[i]=i+1;
var randomRows = shuffle(a);
  res.send(randomRows);
  next();
}

function checkWinner(req, res, next){
if (req.body == undefined) {
	console.log("no body");
		res.send({"result":false});
    	next();	
    } else {
    console.log(typeof req.body);
    	res.send({"result":winCheck(JSON.parse(req.body))});
    	next();		
    }
    
    
}

function winCheck(bingo)
{
  var winner = false;
  for (i=0; i<5; i++)
    if(winner = (bingo[i][0]==1) && (bingo[i][1]==1) && (bingo[i][2]==1)&& (bingo[i][3]==1)&& (bingo[i][4]==1))
      break;
    else if(winner = (bingo[0][i]==1) && (bingo[1][i]==1) && (bingo[2][i]==1)&& (bingo[3][i]==1)&& (bingo[4][i]==1))
      break;

  if(!winner)
    if(bingo[2][2]==1)
      if(!(winner = (bingo[0][0]==1) && (bingo[1][1]==1)) && (bingo[3][3]==1) && (bingo[4][4]==1) )
        winner = (bingo[0][4]==1) && (bingo[1][3]==1) && (bingo[3][1]==1) && (bingo[4][0]==1);

   return winner;
 }

var server = restify.createServer();
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true,
    requestBodyOnGet: true
}));
server.get('/initGrid', respond);
server.post('/checkWinner', checkWinner);

server.listen(9000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
