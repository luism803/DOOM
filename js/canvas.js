function drawLine(view, begin, end, stroke = 'black', width = 1){
    beginCanvas = convertirPuntoCanvas(view, begin);
    endCanvas = convertirPuntoCanvas(view, end);
    //if(end.y == 0)
        //console.log(endCanvas)

    ctx = view.getContext('2d');
    if (stroke)
        ctx.strokeStyle = stroke;
    if (width)
        ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(beginCanvas.x+0.5, beginCanvas.y+0.5);
    ctx.lineTo(endCanvas.x+0.5, endCanvas.y+0.5);
    ctx.stroke();
}

function drawRect(view, punto, w, h, color){
    puntoCanvas = convertirPuntoCanvas(view, punto);
    ctx = view.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(puntoCanvas.x, puntoCanvas.y, w, h);
}

function drawCircle(view, punto, r, color){
    puntoCanvas = convertirPuntoCanvas(view, punto);
    ctx = view.getContext("2d");
    ctx.beginPath();
    ctx.arc(puntoCanvas.x, puntoCanvas.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function dibujarFondo(view){
    drawRect(view, new Point(0, view.height-1), view.width-1, view.height-1, "white");
}

function limpiarCanvas(view) {
    ctx = view.getContext('2d');
    ctx.clearRect(0, 0, view.width, view.height);
    dibujarFondo(view);
}