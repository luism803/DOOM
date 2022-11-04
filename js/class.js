var viewAerea;
var Pared;
var Jugador;
var EsquinasMapa;

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Wall {
    constructor(puntoA, puntoB){
        this.PuntoA = puntoA; 
        this.PuntoB = puntoB;
        this.dis = calcularDistanciaPuntos(this.PuntoA, this.PuntoB)
    }
    
    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'red', width = 1) {
        drawLine(viewAerea, this.PuntoA, this.PuntoB, color, width);
    }

    update(){
        this.draw()
    }
}

class Vision{
    constructor(punto, angulo = 90, speed = 1){
        this.Pos = punto;
        this.angulo = angulo;
        this.angulos=calcularAngulosEsquinasMapa(this.Pos);
        this.calcularPared();
        this.calcularPuntoPared();
        this.dangulo = 0;
        this.speed = speed;
    }

    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(){
        this.angulos = calcularAngulosEsquinasMapa(this.Pos);
        this.calcularPared();
        this.drawVisionAerea();
    }

    drawVisionAerea(){
        this.calcularPuntoPared();
        drawLine(viewAerea, this.Pos, this.PuntoPared)
    }

    calcularPuntoPared(){
        var rel;
        if(this.pared == 0){
            rel = this.Pos.y;
            var ang = 90-(360-this.angulo);
            rel /= CosAng(ang);
            var x = SenAng(ang)*rel+this.Pos.x;
            this.PuntoPared = new Point(x,0);
        }else if(this.pared == 1){
            rel = viewAerea.width-1-this.Pos.x;
            rel /= CosAng(this.angulo);
            var x = SenAng(this.angulo)*rel+this.Pos.y;
            this.PuntoPared = new Point(viewAerea.width-1 ,x);
        }else if(this.pared == 2){
            rel = viewAerea.height-1-this.Pos.y;
            rel /= SenAng(this.angulo);
            var x = CosAng(this.angulo)*rel+this.Pos.x;
            this.PuntoPared = new Point(x ,viewAerea.height-1);
        }else if(this.pared == 3){
            rel = this.Pos.x;
            var ang = 180-this.angulo;
            rel /= CosAng(ang);
            var x = SenAng(ang)*rel+this.Pos.y;
            this.PuntoPared = new Point(0,x);
        }
    }

    calcularPared(){
        this.angulo
        this.pared = 3;
        for(var i=0; i<EsquinasMapa.length-1; i++){
            var a = this.angulos[i];
            var b = this.angulos[i+1];
            if(AngEntreAngs(a, b, this.angulo))
                this.pared = i;
        }
    }

    update(Pos){
        this.Pos = Pos;
        this.calcularVelocidad();
        this.actualizarAngulo();
        this.draw();
        //console.log(this.angulo, calcularAnguloPuntos(this.Pos,this.PuntoPared));
    }

    calcularVelocidad(){
        var dLeft = (Controles.arrowLeft)?this.speed:0;
        var dRight = (Controles.arrowRight)?this.speed:0; 
        this.dangulo = dLeft-dRight;
    }

    actualizarAngulo(){
        this.angulo += this.dangulo;
        if(this.angulo<0)
            this.angulo += 360;
        if(this.angulo>360)
            this.angulo -= 360;
    }
}

class Player{
    constructor(punto, r=5, speed = 1.5){
        this.Pos = punto;
        this.dx = 0;
        this.dy = 0;
        this.r = r;
        this.speed = speed;
        this.Vista = new Vision(this.Pos);
    }

    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'black') {
        drawCircle(viewAerea, this.Pos, this.r, color);
    }

    update(){
        this.calcularVelocidad();
        this.actualizarPos();
        this.draw();
        this.Vista.update(this.Pos);
    }

    calcularVelocidad(){

        var dUp = (Controles.up)?1:0;
        var dLeft = (Controles.left)?1:0;
        var dDown = (Controles.down)?1:0;
        var dRight = (Controles.right)?1:0; 
        this.dy = dUp-dDown;
        this.dx = dRight-dLeft;
        this.anguloMov = calcularAnguloPuntos(new Point(0,0),new Point(this.dx,this.dy));
        var vel = calcularDistanciaPuntos(new Point(0,0), new Point(this.dx, this.dy));
        console.log(this.anguloMov)
    }

    actualizarPos(){
        this.Pos.x+=this.dx;
        this.Pos.y+=this.dy;
    }

}

