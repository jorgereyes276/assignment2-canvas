const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("btn-clear");

//canvas size
canvas.width = 600;
canvas.height = 400;


let currentColor = "#000000";

//start with false
let isDrawing = false;

//mouse position in canvas
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

//start a new drawing path
canvas.addEventListener("mousedown", function (e) {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

//draw line if isDrawing true
canvas.addEventListener("mousemove", function (e) {
  if (!isDrawing) return;

  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
});

//mouseup stop drawing
canvas.addEventListener("mouseup", function () {
  isDrawing = false;
});

//stop drawing if mouse exits the canvas
canvas.addEventListener("mouseleave", function () {
  isDrawing = false;
});

//erasing canvas
clearBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//updates currentColor when  different color is clicked
const swatches = document.querySelectorAll(".color-swatch");
swatches.forEach(function (swatch) {
  swatch.addEventListener("click", function () {
    currentColor = swatch.dataset.color;
    swatches.forEach(function (s) { s.classList.remove("active"); });
    swatch.classList.add("active");
  });
});