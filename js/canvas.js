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

/*__________CALCULOS___________*/

function convertirPuntoCanvas(view ,punto){
    res = new Point(punto.x, punto.y)
    res.y = view.height-res.y;
    return res;
}

function calcularDistanciaPuntos(PuntoA, PuntoB){
    x = PuntoA.x-PuntoB.x;
    y = PuntoA.y-PuntoB.y;
    dis = Math.pow(x, 2)+Math.pow(y, 2);
    dis = Math.sqrt(dis)
    return dis;
}

function calcularAnguloPuntos(puntoA, puntoB){
    adyacente = puntoB.x-puntoA.x;
    opuesto = puntoB.y-puntoA.y;
    if(adyacente == 0){
        angulo =(opuesto>0)?90:270;
        if(opuesto<0.000001 && opuesto>-0.000001)
            angulo = null;
    }else if(opuesto == 0){
        angulo = (adyacente < 0)?180:0;
    }else{
        tan = opuesto/adyacente;
        angulo = Math.atan(tan);
        angulo = RadToAng(angulo);
        if(opuesto<0 && adyacente<0 || opuesto>0 && adyacente<0)
            angulo +=180;
        if(angulo < 0)
            angulo +=360
    }    
    return angulo;
}

function RadToAng(angulo){
    return (angulo * 180)/Math.PI;
}

function AngToRad(angulo){
    return (angulo * Math.PI)/180;
}

function calcularAngulosEsquinasMapa(punto){
    angulos = [];
    for(i=0; i<EsquinasMapa.length;i++){
        ang = calcularAnguloPuntos(punto, EsquinasMapa[i]);
        angulos.push(ang);
    }
    return angulos;
}

function SenAng(angulo){
    return Math.sin(AngToRad(angulo));
}

function CosAng(angulo){
    return Math.cos(AngToRad(angulo));
}

function diferenciaAng(a,b){
    dif=a-b;
    dif = Math.abs(dif);
    if(dif>180){
        if(a<b)
            dif = diferenciaAng(a+360,b);
        else
            dif = diferenciaAng(a,b+360);
    }
    return dif;
}

function AngEntreAngs(a,b,c){
    difTotal = diferenciaAng(a,b);
    sumaDifs = diferenciaAng(a,c)+diferenciaAng(b,c);

    return Math.abs(difTotal-sumaDifs)<0.000001; //tener encuenta que hay error al sumar y restar
}

function sumarPuntos(A, B){
    return new Point(A.x+B.x,A.y+B.y);
}