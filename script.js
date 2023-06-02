const canvas = document.querySelector("canvas")
toolBtns = document.querySelectorAll(".tool")
fillcolor = document.querySelector("#fill-color")
sizeslider = document.querySelector("#size-slider")
colorBtns = document.querySelectorAll(".colors .option")
colorPicker = document.querySelector("#color-picker")
clearCanvas = document.querySelector(".clear-canvas")
saveImg = document.querySelector(".save-img")
const ctx = canvas.getContext("2d")

let prevMouseX, prevMouseY, snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  selectedColor = "#000"

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawRec = (e) => {
  if (!fillcolor.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
  ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) => {
  isDrawing = true
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRec(e);
  }
}

toolBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".option", ".actve").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  })
});

sizeslider.addEventListener("change", () => brushWidth = sizeslider.value);

colorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".option", ".selected").classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value
  colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

})

saveImg.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = '$(date.now()).jpg';
  link.href = canvas.toDataURL();
  link.click();
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false)

let prevX = 0;
let prevY = 0;

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const { clientX, clientY } = touch;
  prevX = clientX;
  prevY = clientY;
  isDrawing = true;
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing) return;
  const touch = e.touches[0];
  const { clientX, clientY } = touch;
  const currentX = clientX;
  const currentY = clientY;

  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  ctx.moveTo(prevX, prevY);
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // ctx.lineTo(currentX, currentY);
  // ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

canvas.addEventListener("touchcancel", () => {
  isDrawing = false;
});
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

