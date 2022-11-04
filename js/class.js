class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Wall {
    constructor(puntoA, puntoB){        //  A    D
        this.A = puntoA;                //
        this.B = puntoB;                //
                                        //  C    B
    }
    
    colision(P){
        var hayColision = P.x > this.A.x && P.x < this.B.x
        &&  P.y > this.B.y && P.y < this.A.y;

        var lado = null;
        
        if(hayColision){
            var difArriba = this.A.y-P.y;
            var difAbajo = P.y-this.B.y;
            var difIzquierda = P.x-this.A.x;
            var difDerecha = this.B.x-P.x;

            if(difArriba < 0)
                difArriba = 100;
            if(difAbajo < 0)
                difAbajo = 100;
            if(difIzquierda < 0)
                difIzquierda = 100;
            if(difDerecha < 0)
                difDerecha = 100;

            var menor = (difArriba<difAbajo)?difArriba:difAbajo;
            menor = (difIzquierda<menor)?difIzquierda:menor;
            menor = (difDerecha<menor)?difDerecha:menor;
            
            if(menor == difArriba)
                lado = "abajo";
            if(menor == difAbajo)
                lado = "arriba";
            if(menor == difIzquierda)
                lado = "derecha";
            if(menor == difDerecha)
                lado = "izquierda";
        }
        

        return {hayColision: hayColision, lado:lado};
    }
    
    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'brown', width = 1) {
        drawRect(viewAerea, this.A, this.B.x-this.A.x, this.A.y-this.B.y, color, width);
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
        this.ladosColision = {u:false, d:false, l:false, r:false};
    }

    limpiarLadosColision(){
        this.ladosColision = {u:false, d:false, l:false, r:false};
    }

    colisionMapa(Pos){
        this.limpiarLadosColision();
        for(var i=0;i<Mapa.length;i++)
            this.colisionConObjeto(Mapa[i], Pos);
    }

    colisionConObjeto(pared, Pos){
        var esquinaA = sumarPuntos(Pos, new Point(-this.r,-this.r));        //D      C
        var esquinaB = sumarPuntos(Pos, new Point(this.r,-this.r));         //
        var esquinaC = sumarPuntos(Pos, new Point(this.r,this.r));          //
        var esquinaD = sumarPuntos(Pos, new Point(-this.r,this.r));         //A      B

        var colisionA = pared.colision(esquinaA);
        var colisionB = pared.colision(esquinaB);
        var colisionC = pared.colision(esquinaC);
        var colisionD = pared.colision(esquinaD);
        
        // if(colisionC && colisionD)
        //     this.ladosColision.u=true;
        
        // if(colisionB && colisionC)
        //     this.ladosColision.r=true;

        // if(colisionA && colisionB)
        //     this.ladosColision.d=true;

        // if(colisionD && colisionA)
        //     this.ladosColision.l=true;

        if(colisionA.hayColision)
            this.addLadosColision(colisionA.lado);
        
        if(colisionB.hayColision)
            this.addLadosColision(colisionB.lado);

        if(colisionC.hayColision)
            this.addLadosColision(colisionC.lado);

        if(colisionD.hayColision)
            this.addLadosColision(colisionD.lado);
    
    }

    addLadosColision(lado){
        switch (lado) {
            case "arriba":
                this.ladosColision.u=true;
                break;

            case "abajo":
                this.ladosColision.d=true;  
                break;
            case "izquierda":
                this.ladosColision.l=true;  
                break;
            case "derecha":
                this.ladosColision.r=true;  
                break;
        
            default:
                break;
        }
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
        if(this.anguloMov != null){
            this.anguloMov = restarAng(this.anguloMov,90);
            this.anguloMov = sumarAng(this.Vista.angulo,this.anguloMov);
            this.dx = CosAng(this.anguloMov)*this.speed;
            this.dy = SenAng(this.anguloMov)*this.speed;
        }
    }

    actualizarPos(){
        var FuturaPos = new Point(this.dx+this.Pos.x,this.dy+this.Pos.y);
        this.colisionMapa(FuturaPos);
        console.log(this.ladosColision)
        if(!this.hayColisiones())
            this.Pos = FuturaPos;
    }

    hayColisiones(){
        return this.ladosColision.u||this.ladosColision.d||this.ladosColision.l||this.ladosColision.r;
    }

}

