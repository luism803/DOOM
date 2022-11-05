var viewAerea
var view3d;
var Mapa = [];
var Pared;
var Jugador;
var EsquinasMapa;
var imgMuro = new Image();
imgMuro.src = "textures/blocks1.jpg"

function onload(){
    cargarVariables();
    //start();
    update();
}

function cargarVariables(){
    viewAerea = document.getElementById('ViewAerea');
    view3d = document.getElementById('View3d');
    EsquinasMapa = [
        new Point(0,0),
        new Point(viewAerea.width-1, 0),
        new Point(viewAerea.width-1, viewAerea.height-1),
        new Point(0, viewAerea.height-1)
    ];
    puntoA = new Point(400, 500);
    puntoB = new Point(420, 300);
    Pared = new Wall(puntoA, puntoB);
    crearBordes();
    Mapa.push(Pared);

    Jugador = new Player(new Point(300,300));
}

function crearBordes(ancho = 5){
    Borde = new Wall(new Point(0,ancho), new Point(viewAerea.width-1,0));
    Mapa.push(Borde);
    Borde = new Wall(new Point(0,viewAerea.height-1), new Point(ancho,0));
    Mapa.push(Borde);
    Borde = new Wall(new Point(0,viewAerea.height-1), new Point(viewAerea.width-1,viewAerea.height-1-ancho));
    Mapa.push(Borde);
    Borde = new Wall(new Point(viewAerea.width-1-ancho,viewAerea.height-1), new Point(viewAerea.width-1,0));
    Mapa.push(Borde);
}

function update(){  
    limpiarAll();
    updateAll();
}

function limpiarAll(){
    limpiarCanvas(viewAerea);
    limpiarCanvas(view3d);
}

function updateAll(){
    Jugador.update();
    updateMapa();
}

function updateMapa(){
    for(i=0;i<Mapa.length;i++)
        Mapa[i].update()
}

function start(){

    console.log("start")
    // number of frames per second
    let framePerSecond = 50;

    //call the game function 50 times every 1 Sec
    let loop = setInterval(update,1000/framePerSecond);
}
