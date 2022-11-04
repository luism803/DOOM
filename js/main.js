function onload(){
    cargarVariables();
    puntoA = new Point(450, 120);
    puntoB = new Point(450, 240);
    Pared = new Wall(puntoA, puntoB);
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
}

function update(){  
    limpiarCanvas(viewAerea);
    updateAll();
}

function updateAll(){
    Jugador.update()
    Pared.update()
}

function start(){
    // number of frames per second
    let framePerSecond = 50;

    //call the game function 50 times every 1 Sec
    let loop = setInterval(update,1000/framePerSecond);
}
