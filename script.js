const canvas = document.querySelector("canvas")
toolBtns = document.querySelectorAll(".tool")
const ctx = canvas.getContext("2d")

let prevMouseX, prevMouseY,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5;

window.addEventListener("load", () =>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRec = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) =>{
    isDrawing = true
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = (e) => {
    if(!isDrawing) return;

    if(selectedTool === "brush"){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
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

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false )