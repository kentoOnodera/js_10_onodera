

//フィールドサイズ
const FIELD_COL = 10;
const FIELD_ROW = 20;

//ブロックのサイズ
const blockSize = 30;

//スクリーンサイズ
const SCREEN_W = blockSize * FIELD_COL;
const SCREEN_H = blockSize * FIELD_ROW;

// テトロミノのサイズ
const TTR_SIZE = 4;

const START_X = FIELD_COL/2 -TTR_SIZE/2;
const START_Y = 0;
//ブロックの作成
let ttr ;

const TTR_COLORS = [
  "#011CD5", //0
  "#D50163", //1
  "#AC01D5", //2
  "#01D5B4", //3
  "#32D501", //4
  "#D5CD01", //5
  "#D55301", //6
  "#D50101", //7
]
const TTR_TYPES =[
  [],
  [//I 1
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ], 
  [//L 2
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [//J 3
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [//T 4
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [//0 5
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [//S 6
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [// Z 7
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
]

let ttr_t;
ttr_t = Math.floor(Math.random() * (TTR_TYPES.length-1))+1;
//テトロの種類
ttr = TTR_TYPES[ ttr_t ];
//ブロックの座標
let ttr_x = START_X;
let ttr_y = START_Y;

//落ちるスピード
let GAME_SPEED = 500;

//フィールド本体
const field = [];
console.log (field);

//ゲームオーバーフラグ
let over = false;

console.log (over);



//ブロック落ちる処理
setInterval( dropTtr, GAME_SPEED);

//下に行ったら動かないようにする処理
function fixTtr(){
  for(let y=0; y<TTR_SIZE; y++){
    for(let x=0; x<TTR_SIZE; x++){
      if(ttr[y][x]){
        field[ttr_y + y ][ttr_x + x ] = ttr_t;
      }
    }
  }
}


function dropTtr(){
  if(over)return;
  if(checkMove(0, 1))ttr_y++;
  else{
    fixTtr();
    checkLine();
    ttr_t = Math.floor(Math.random() * (TTR_TYPES.length -1)) +1;
    //テトロの種類
    ttr = TTR_TYPES[ ttr_t ];
    ttr_x = START_X;
    ttr_y = START_Y;

    if(!checkMove(0,0)){
      over = true ;
    }
  }
  drawAll();
}


//初期化
function init(){
  for(let y=0; y<FIELD_ROW; y++){
    field[y] = [];
    for(let x=0; x<FIELD_COL ; x++){
      field[y][x] = 0;
    }
  }
}

// ブロック一つを描画
function drawBlock(x,y,c){
  let px = x * blockSize;
  let py = y * blockSize;
  con.fillStyle = TTR_COLORS[c];
  // con.fillStyle="red";
  con.fillRect(px, py, blockSize, blockSize);
  con.strokeStyle="black";
  con.strokeRect(px, py, blockSize, blockSize);
}
//フィールドを表示
function drawAll(){
  con.clearRect(0,0,SCREEN_W,SCREEN_H);
  for(let y=0; y<FIELD_ROW; y++){
    for(let x=0; x<FIELD_COL; x++){
      if (field[y][x]){
        drawBlock(x,y, field[y][x]);
      }
    }
  }
  for(let y=0; y<TTR_SIZE; y++){
    for(let x=0; x<TTR_SIZE; x++){
      if (ttr[y][x]){
        drawBlock(ttr_x + x, ttr_y + y , ttr_t);
        // console.log(ttr)
      }
    }
  }
  if(over){
    let g = "診断終了";
    let textMsg = document.getElementById("result");
    console.log(textMsg.textContent);
    if(textMsg.textContent == "頑張れ"){
      document.querySelector("#keKka").innerText = "「フリーダム」";
    }if(textMsg.textContent == "やるね〜"){
      document.querySelector("#keKka").innerText = "「俺についてこい！」";
    }if(textMsg.textContent == "もうちょっと大胆に"){
      document.querySelector("#keKka").innerText = "「楽しみ追求、猪突猛進」";
    }if(textMsg.textContent == "そうそう"){
      document.querySelector("#keKka").innerText = "「妄想全開の空想家」";
    }if(textMsg.textContent == "君はどんな性格かな"){
      document.querySelector("#keKka").innerText = "「協調主体」";
    }if(textMsg.textContent == "さてさて"){
      document.querySelector("#keKka").innerText = "「昭和のオンナ」";
    }if(textMsg.textContent == "わかってきたかも"){
      document.querySelector("#keKka").innerText = "「歴史に名を残す軍師」";
    }if(textMsg.textContent == "あーそう"){
      document.querySelector("#keKka").innerText = "「人なつっこい」";
    }if(textMsg.textContent == "すごい消すじゃん"){
      document.querySelector("#keKka").innerText = "いつでもどこへでも！スーパーマン」";
    }if(textMsg.textContent == "はいはい"){
      document.querySelector("#keKka").innerText = "「考えること大好き」";
    }if(textMsg.textContent == "君ならできる"){
      document.querySelec
    tor("#keKka").innerText = "「職人かたぎ」";
    }
    
    con.font = "bold 40px 'メイリオ'";
    con.fillStyle = '#ffffff';
		let w = con.measureText(g).width;
		let x = SCREEN_W/2 - w/2;
		let y = SCREEN_H/2 - 20;
		con.lineWidth = 4;
		con.strokeText(g,x,y);
		con.fillText(g,x,y); 
  }
  }
var content_area = document.getElementById("line");
var pLine = content_area.querySelector("#line");

//キャンバス設定
let can = document.getElementById("can");
let con = can.getContext("2d"); 
can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "4px solid #555";
init();
drawAll();

//ブロックのある場所には移動できない処理
function checkMove(mx,my,nTtr){
  if(nTtr == undefined) nTtr = ttr;
  for(let y=0; y<TTR_SIZE; y++){
    for(let x=0; x<TTR_SIZE; x++){
      if (nTtr[y][x]){
        console.log(nTtr);
        let nx = ttr_x + mx + x;
        let ny = ttr_y + my + y; 
        if(ny < 0 || 
            nx < 0 ||
            ny >= FIELD_ROW || 
            nx >= FIELD_COL || 
            field[ny][nx] ){
          return false;
          // console.log(false);
        }
      }
    }
  }
  return true;
}

//テトロの回転
function rotate(){
  let nTtr = [];
  for(let y=0; y<TTR_SIZE; y++){
    nTtr[y]=[];
    for(let x=0; x<TTR_SIZE; x++){
      nTtr[y][x] = ttr[TTR_SIZE - x -1][y];
    }
  }
  return nTtr;
}
//キーボードが押されたときの処理
document.onkeydown = function(e){
  if(over)return;
  switch (e.keyCode) {
    case 37://←
    if(checkMove( -1, 0 ))ttr_x--;
    break;
    case 38://↑
    if(checkMove( 0, -1 ))ttr_y--;
    break;
    case 39://→
    if(checkMove( 1, 0 ))ttr_x++;
    break;
    case 40://↓
    if(checkMove(0, 1 ))ttr_y++;
    break;
    case 32:// スペース
    let nTtr = rotate();
    if(checkMove(0, 0, nTtr)) ttr = nTtr;
		break;
  }
  drawAll();
}


//ラインが揃ったかチェックして消す
function checkLine(){
  let keKka;
  let lineC = 0;
  for(let y=0; y<FIELD_ROW; y++){
    let flag = true;
    //チェック
    for(let x=0; x<FIELD_COL; x++){
      if( !field[y][x]){
        flag = false;
        break;
      }
    }
    
    if(flag){
      lineC++;
      document.querySelector("#line").innerText = lineC;
      console.log(lineC);
        if(lineC == 1){
          document.querySelector("#result").innerText = "やるね〜";
        }if(lineC == 2){
          document.querySelector("#result").innerText = "もうちょっと大胆に";
        }if(lineC == 3){
          document.querySelector("#result").innerText = "そうそう";
        }if(lineC == 4){
          document.querySelector("#result").innerText = "君はどんな性格かな";
        }if(lineC == 5){
          document.querySelector("#result").innerText = "さてさて";
        }if(lineC == 6){
          document.querySelector("#result").innerText = "わかってきたかも";
        }if(lineC == 7){
          document.querySelector("#result").innerText = "あーそう";
        }if(lineC == 8){
          document.querySelector("#result").innerText = "すごい消すじゃん";
        }if(lineC == 9){
          document.querySelector("#result").innerText = "はいはい";
        }if(lineC >= 10){
          document.querySelector("#result").innerText = "君ならできる";
        }
        
    }
  }
}


// function result(){
  
//   }

// result();
