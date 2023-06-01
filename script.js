const canvas = document.querySelector("canvas")
toolBtns = document.querySelectorAll(".tool")
fillcolor = document.querySelector("#fill-color")
sizeslider = document.querySelector("#size-slider")
colorBtns = document.querySelectorAll(".colors .option")
colorPicker = document.querySelector("#color-picker")
clearCanvas = document.querySelector(".clear-canvas")
saveImg = document.querySelector(".save-img")
const ctx = canvas.getContext("2d")

let prevMouseX, prevMouseY, snapshot, lastX, lastY,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

window.addEventListener("load", () =>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRec = (e) => {
    if(!fillcolor.checked){
       return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) =>{
    isDrawing = true
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const touch = e.touches[0];
    lastX = touch.pageX - canvas.offsetLeft;
    lastY = touch.pageY - canvas.offsetTop;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if(selectedTool === "brush" || selectedTool === "eraser"){
        const touch = e.touches[0];
        const currentX = touch.pageX - canvas.offsetLeft;
        const currentY = touch.pageY - canvas.offsetTop;
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        context.moveTo(lastX, lastY);
        context.lineTo(currentX, currentY);
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
    } else if(selectedTool === "rectangle"){
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

colorBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        document.querySelector(".option", ".selected").classList.remove("selected");
        btn.classList.add("selected");    
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");   
    });
});

colorPicker.addEventListener("change", () =>{
    colorPicker.parentElement.style.background = colorPicker.value
    colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

})

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = '$(date.now()).jpg';
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("touchstart", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("touchmove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false )
canvas.addEventListener("touchend", () => isDrawing = false )
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