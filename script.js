const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillcolor = document.querySelector("#fill-color");
const sizeslider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const saveImg = document.querySelector(".save-img");
const ctx = canvas.getContext("2d");

let prevX, prevY, snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  selectedColor = "#000";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawRec = (x, y) => {
  if (!fillcolor.checked) {
    ctx.strokeRect(x, y, prevX - x, prevY - y);
  } else {
    ctx.fillRect(x, y, prevX - x, prevY - y);
  }
};

const drawCircle = (x, y) => {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow((prevX - x), 2) + Math.pow((prevY - y), 2));
  ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI);
  fillcolor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (x, y) => {
  ctx.beginPath()
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.lineTo(prevX * 2 - x, y);
  ctx.closePath()
  fillcolor.checked ? ctx.fill() : ctx.stroke();
}



function startDraw(x, y) {
  isDrawing = true;
  prevX = x;
  prevY = y;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (x, y) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRec(x, y);
  } else if (selectedTool === "circle") {
    drawCircle(x, y);
  } else {
    drawTriangle(x, y)
  }
};

const getMousePos = (canvas, mouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const x = mouseEvent.clientX - rect.left;
  const y = mouseEvent.clientY - rect.top;
  return { x, y };
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".option",".active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

sizeslider.addEventListener("change", () => (brushWidth = sizeslider.value));

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".option",".selected").classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveImg.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

canvas.addEventListener("mousedown", (e) => {
  const { x, y } = getMousePos(canvas, e);
  startDraw(x, y);
});

canvas.addEventListener("mousemove", (e) => {
  const { x, y } = getMousePos(canvas, e);
  drawing(x, y);
});

canvas.addEventListener("mouseup", () => (isDrawing = false));

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const { x, y } = getMousePos(canvas, touch);
  startDraw(x, y);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const { x, y } = getMousePos(canvas, touch);
  drawing(x, y);
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  isDrawing = false;
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
