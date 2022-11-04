var viewAerea;
var Mapa = [];
var Pared;
var Jugador;
var EsquinasMapa;

function onload(){
    puntoA = new Point(400, 500);
    puntoB = new Point(420, 300);
    Pared = new Wall(puntoA, puntoB);
    cargarVariables();
    Jugador = new Player(new Point(300,300));
    start();
    //update();
}

function cargarVariables(){
    viewAerea = document.getElementById('ViewAerea');
    EsquinasMapa = [
        new Point(0,0),
        new Point(viewAerea.width-1, 0),
        new Point(viewAerea.width-1, viewAerea.height-1),
        new Point(0, viewAerea.height-1)
    ]
    crearBordes(1.51);
    Mapa.push(Pared);
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
    limpiarCanvas(viewAerea);
    updateAll();
    console.log(Mapa)
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
    // number of frames per second
    let framePerSecond = 50;

    //call the game function 50 times every 1 Sec
    let loop = setInterval(update,1000/framePerSecond);
}
