let cvsElement = document.getElementById("canvas");
let context = cvsElement.getContext("2d");

let oksana = new Image();
let background = new Image();
let floor = new Image();
let topCol = new Image();
let botCol = new Image();

oksana.src = "img/player.png";
background.src = "img/background.png";
floor.src = "img/bottom.png";
topCol.src = "img/top_column.png";
botCol.src = "img/bot_column.png";
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 23;
}

let pipes = [];
let count = 0;
pipes[0] = {
  x: cvsElement.width,
  y: 0
};
let diff = 90;
let xPos = 10;
let yPos = 150;
let diffY = 1.5;
function draw() {
  context.drawImage(background, 0, 0);
  for (let i = 0; i < pipes.length; i++) {
    context.drawImage(topCol, pipes[i].x, pipes[i].y);
    context.drawImage(botCol, pipes[i].x, pipes[i].y + topCol.height + diff);

    pipes[i].x--;
    if (pipes[i].x === 125) {
      pipes.push({
        x: cvsElement.width,
        y: Math.random() * topCol.height - topCol.height
      });
    }
    if(pipes[i].x == 5) count++;
    if (
      (xPos + oksana.width >= pipes[i].x &&
        xPos <= pipes[i].x + topCol.width &&
        (yPos <= pipes[i].y + topCol.height ||
          yPos + oksana.height >= pipes[i].y + topCol.height + diff)) ||
      (yPos + oksana.height >= cvsElement.height - floor.height + 20)
    ) {
      location.reload();
    }
  }
  context.drawImage(floor, 0, cvsElement.height - floor.height + 20);
  context.drawImage(oksana, xPos, yPos);
  yPos += diffY;
  context.fillStyle = "white";
  context.font = "24px Verdana";
  context.fillText("Счет: " + count, 10, cvsElement.height - 20);
  requestAnimationFrame(draw);
}
background.onload = draw;
