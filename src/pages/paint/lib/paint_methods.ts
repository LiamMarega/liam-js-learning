import { Modes } from "../types/modes";

// Type declaration for EyeDropper API
declare global {
  interface Window {
    EyeDropper: new () => {
      open(): Promise<{ sRGBHex: string }>;
    };
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
const colorPicker = document.getElementById("color-picker") as HTMLInputElement | null;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement | null;
const saveBtn = document.getElementById("save-btn") as HTMLButtonElement | null;
const drawBtn = document.getElementById("draw-btn") as HTMLButtonElement | null;
const eraseBtn = document.getElementById("erase-btn") as HTMLButtonElement | null;
const rectangleBtn = document.getElementById("rectangle-btn") as HTMLButtonElement | null;
const circleBtn = document.getElementById("ellipse-btn") as HTMLButtonElement | null;
const pickerBtn = document.getElementById("picker-btn") as HTMLButtonElement | null;

// STATE
let isDrawing: boolean = false;
let startX: number, startY: number;
let lastX: number = 0;
let lastY: number = 0;
let mode: Modes = Modes.DRAW;
let previousMode: Modes = Modes.DRAW;
let color: string = colorPicker ? colorPicker.value : "#000000";
let imageData: ImageData | undefined;

// Modularized: Color Picker Handler
function handleColorChange() {
  if (!colorPicker) return;
  colorPicker.addEventListener("change", () => {
    console.log("change ", colorPicker.value);
    color = colorPicker.value;
    if (ctx) ctx.strokeStyle = color;
  });
}

// Modularized: Get Mouse Coordinates
function getMouseCoordinates(e: MouseEvent): { x: number; y: number } {
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

// Modularized: Mouse Down Handler
function handleMouseDown(e: MouseEvent) {
  isDrawing = true;

  const { x, y } = getMouseCoordinates(e);
  startX = x;
  startY = y;
  lastX = x;
  lastY = y;

  imageData = ctx?.getImageData(0, 0, canvas?.width || 0, canvas?.height || 0);
}

// Modularized: Mouse Up Handler
function handleMouseUp(_e: MouseEvent) {
  isDrawing = false;
  lastX = 0;
  lastY = 0;
}

// Modularized: Mouse Move Handler
function draw(e: MouseEvent) {
  if (!isDrawing || !ctx) return;

  const { x, y } = getMouseCoordinates(e);

  if (mode === Modes.DRAW || mode === Modes.ERASE) {
    
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
  return;
}

  if (mode === Modes.RECTANGLE) {
    if (imageData) {
      ctx.putImageData(imageData, 0, 0);
    }

    const width = x - startX;
    const height = y - startY;
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.stroke();

  }

  if (mode === Modes.ELLIPSE) {
    if (imageData) {
      ctx.putImageData(imageData, 0, 0);
      const width = Math.abs(x - startX);
      const height = Math.abs(y - startY);
      const centerX = startX + (x - startX) / 2;
      const centerY = startY + (y - startY) / 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
   
  }
}

// Modularized: Clear Canvas
 function clearCanvas() {
  console.log("clearCanvas");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
}

function changeMode(newMode: Modes, btn: HTMLButtonElement) {
  previousMode = mode;
  mode = newMode;
  const activeBtn = document.querySelector(".active");
  if (activeBtn) activeBtn.classList.remove("active");
  btn.classList.add("active");

  if (ctx && canvas) {
  if (newMode === Modes.SAVE) {
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.href = canvas.toDataURL()
    link.download = 'my-paint.png';
    link.click()
    changeMode(Modes.DRAW, drawBtn!);
    return
  }

  if (newMode === Modes.DRAW) {
    canvas.style.cursor = "url(../../../../../../assets/cursors/draw.png), auto";
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 2;
  }

  if (newMode === Modes.ERASE) {
    canvas.style.cursor = "url(../../../../../../assets/cursors/erase.png), auto";
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 25;
  }

  if (newMode === Modes.PICKER) {
    console.log("picker");
    canvas.style.cursor = "url(../../../../../../assets/cursors/picker.png), auto";
    const eyeDropper = new window.EyeDropper()

        eyeDropper.open().then(result => {
          const { sRGBHex } = result
          ctx.strokeStyle = sRGBHex
          colorPicker!.value = sRGBHex
          changeMode(Modes.DRAW, drawBtn!)
        }).catch(e => {
          // si ha habido un error o el usuario no ha recuperado ningún color
        })
  }
}

// set pickercolor function 
function setPickerColor(color: string) {
  if (!colorPicker) return;
  colorPicker.value = color;
  if (ctx) ctx.strokeStyle = color;
}



}



// Modularized: Attach All Event Listeners
export function attachEventListeners() {
  if (canvas) {
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", draw);
    clearBtn?.addEventListener("click", clearCanvas);
    drawBtn?.addEventListener("click", () => changeMode(Modes.DRAW, drawBtn));
    eraseBtn?.addEventListener("click", () => changeMode(Modes.ERASE, eraseBtn));
    rectangleBtn?.addEventListener("click", () => changeMode(Modes.RECTANGLE, rectangleBtn));
    circleBtn?.addEventListener("click", () => changeMode(Modes.ELLIPSE, circleBtn));
    pickerBtn?.addEventListener("click", () => changeMode(Modes.PICKER, pickerBtn));
    saveBtn?.addEventListener("click", () => changeMode(Modes.SAVE, saveBtn));
  }
  handleColorChange();
}

