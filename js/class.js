class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Recta {
    constructor(Punto, angulo){
        this.Punto = Punto;
        this.angulo = angulo;
    }
}

class Wall {
    constructor(puntoA, puntoB){        //  A    D
        this.A = puntoA;                //
        this.B = puntoB;                //
        this.calcularLados();           //  C    B
    }

    calcularLados(){
        this.ladoIzquierda();
        this.ladoDerecha();
        this.ladoArriba();
        this.ladoAbajo();
    }
    
    ladoIzquierda(){
        this.LadoIzquierda = {A:this.A ,B:new Point(this.A.x, this.B.y)};
    }

    ladoDerecha(){
        this.LadoDerecha = {A:new Point(this.B.x,this.A.y) ,B:this.B};
    }

    ladoArriba(){
        this.LadoArriba = {A:this.A ,B:new Point(this.B.x, this.A.y)};
    }

    ladoAbajo(){
        this.LadoAbajo = {A:new Point(this.A.x, this.B.y) ,B:this.B};
    }

    colision(P, rayo = false){
        var hayColision = P.x > this.A.x && P.x < this.B.x
        &&  P.y > this.B.y && P.y < this.A.y;

        var lado = null;
        
        //calcular lado de colision.

        if(hayColision && !rayo){
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
        
        return {hayColision: hayColision, lado:lado, Pared: this};
    }

    colisionRecta(Punto, angulo){

        var PuntoColision = false;
        var dis = null;
        var lado = null;

        //diferenciar hacia donde miro (angulo) saber que lado mirar si hay colision
        if(angulo == 0 || angulo == 360){
            if(this.LadoIzquierda.A.y >= Punto.y && this.LadoIzquierda.B.y <= Punto.y && Punto.x < this.LadoIzquierda.A.x)
                PuntoColision = new Point(this.LadoIzquierda.A.x,Punto.y);
                lado = "izquierda";
        }else if(angulo == 180){
            if(this.LadoDerecha.A.y >= Punto.y && this.LadoDerecha.B.y <= Punto.y && Punto.x > this.LadoDerecha.A.x)
                PuntoColision = new Point(this.LadoDerecha.A.x,Punto.y);
                lado = "derecha";
        }else if(angulo == 90){
            if(this.LadoAbajo.A.x <= Punto.x && this.LadoAbajo.B.x >= Punto.x && Punto.y < this.LadoAbajo.A.y)
                PuntoColision = new Point(Punto.x, this.LadoAbajo.A.y);
                lado = "abajo";
        }else if(angulo == 270){
            if(this.LadoArriba.A.x <= Punto.x && this.LadoArriba.B.x >= Punto.x && Punto.y > this.LadoArriba.A.y)
                PuntoColision = new Point(Punto.x, this.LadoArriba.A.y);
                lado = "arriba";
        }

        //funcion de una recta con angulo => y=(sen(a)/cos(a))x
        else if(angulo > 0 && angulo < 90){     // MIRANDO ARRIBA DERECHA
            if(Punto.x < this.A.x || Punto.y < this.B.y){
                var a = Punto.y-TanAng(angulo)*Punto.x;
                var x = (this.LadoAbajo.A.y-a)/TanAng(angulo);                          //pared abajo
                var y = (this.LadoIzquierda.A.x*TanAng(angulo)+a);                      //pared izquierda
                if(this.LadoIzquierda.A.y >= y && this.LadoIzquierda.B.y <= y){   //CALCULAR PARED IZQUIERDA
                    PuntoColision = new Point(this.LadoIzquierda.A.x, y);
                    lado = "izquierda";
                }else if(this.LadoAbajo.A.x <= x && this.LadoAbajo.B.x >= x){   //CALCULAR PARED ABAJO
                    PuntoColision = new Point(x, this.LadoAbajo.A.y);
                    lado = "abajo";
                }
            }

        }else if(angulo > 90 && angulo < 180){  //MIRANDO ARRIBA IZQUIERDA
            if(Punto.x > this.B.x || Punto.y < this.B.y){
                var a = Punto.y-TanAng(angulo)*Punto.x;
                var x = (this.LadoAbajo.A.y-a)/TanAng(angulo);                          //pared abajo
                var y = (this.LadoDerecha.A.x*TanAng(angulo)+a);                      //pared derecha
                if(this.LadoDerecha.A.y >= y && this.LadoDerecha.B.y <= y){   //CALCULAR PARED DERECHA
                    PuntoColision = new Point(this.LadoDerecha.A.x, y);
                    lado = "derecha";
                }else if(this.LadoAbajo.A.x <= x && this.LadoAbajo.B.x >= x){   //CALCULAR PARED ABAJO
                    PuntoColision = new Point(x, this.LadoAbajo.A.y);
                    lado = "abajo";
                }
            }
        
        }else if(angulo > 180 && angulo < 270){  //MIRANDO ABAJO DERECHA
            if(Punto.x > this.B.x || Punto.y > this.A.y){
                var a = Punto.y-TanAng(angulo)*Punto.x;
                var x = (this.LadoArriba.A.y-a)/TanAng(angulo);                          //pared arriba
                var y = (this.LadoDerecha.A.x*TanAng(angulo)+a);                      //pared derecha
                if(this.LadoDerecha.A.y >= y && this.LadoDerecha.B.y <= y){   //CALCULAR PARED DERECHA
                    PuntoColision = new Point(this.LadoDerecha.A.x, y);
                    lado = "derecha";
                }else if(this.LadoArriba.A.x <= x && this.LadoArriba.B.x >= x){   //CALCULAR PARED ARRIBA
                    PuntoColision = new Point(x, this.LadoArriba.A.y);
                    lado = "arriba";
                }
            }

        }else if(angulo > 270 && angulo < 360){  //MIRANDO ABAJO DERECHA
            if(Punto.x < this.A.x || Punto.y > this.A.y){
                var a = Punto.y-TanAng(angulo)*Punto.x;
                var x = (this.LadoArriba.A.y-a)/TanAng(angulo);                          //pared arriba
                var y = (this.LadoIzquierda.A.x*TanAng(angulo)+a);                      //pared izquierda
                if(this.LadoIzquierda.A.y >= y && this.LadoIzquierda.B.y <= y){   //CALCULAR PARED IZQUIERDA
                    PuntoColision = new Point(this.LadoIzquierda.A.x, y);
                    lado = "izquierda";
                }else if(this.LadoArriba.A.x <= x && this.LadoArriba.B.x >= x){   //CALCULAR PARED ARRIBA
                    PuntoColision = new Point(x, this.LadoArriba.A.y);
                    lado = "arriba";
                }
            }

        }

        //calcular punto interseccion
        if(PuntoColision)
            dis = calcularDistanciaPuntos(Punto, PuntoColision)

        return {Punto: PuntoColision, dis: dis, lado: lado, Pared: this}
    }
    
    draw(){
        this.drawViewAerea();
    }

    drawViewAerea(color = 'brown', width = 1) {
        //drawRect(viewAerea, this.A, this.B.x-this.A.x, this.A.y-this.B.y, color, width);
        drawLine(viewAerea, this.LadoDerecha.A, this.LadoDerecha.B);
        drawLine(viewAerea, this.LadoIzquierda.A, this.LadoIzquierda.B);
        drawLine(viewAerea, this.LadoAbajo.A, this.LadoAbajo.B);
        drawLine(viewAerea, this.LadoArriba.A, this.LadoArriba.B);
    }

    update(){
        this.draw()
    }
}

class Player{
    constructor(punto, angulo=0, fov = 60, r=5, speed = 2){
        this.Pos = punto;
        this.dx = 0;
        this.dy = 0;
        this.r = r;
        this.speed = speed;
        this.normalSpeed = speed;
        this.ladosColision = {u:false, d:false, l:false, r:false};
        this.angulo = angulo;
        this.dangulo;
        this.fov = fov;
        this.Rayos = [];
        this.crearRayos();
        //console.log(this.Rayos)
        //new Rayo(this.Pos, this.angulo);
    }

    crearRayos(){
        var i;
        var ancho=view3d.width;
        var incrementoAngulo = this.fov/2;
        for(i=0;i<ancho; i++){
            incrementoAngulo -= this.fov/ancho;
            this.Rayos[i]=new Rayo(this.Pos, this.angulo, incrementoAngulo, i, this.fov);
        }
    }

    actualizarRayos(){
        for(var i=0; i<this.Rayos.length;  i++){
            this.Rayos[i].update(this.Pos, this.angulo);
        } 
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

    calcularVelocidad(){

        var dUp = (Controles.up)?1:0;
        var dLeft = (Controles.left)?1:0;
        var dDown = (Controles.down)?1:0;
        var dRight = (Controles.right)?1:0;
        this.speed = (Controles.shift)?this.normalSpeed*1.5:this.normalSpeed;
        this.dy = dUp-dDown;
        this.dx = dRight-dLeft;
        this.anguloMov = calcularAnguloPuntos(new Point(0,0),new Point(this.dx,this.dy));
        if(this.anguloMov != null){
            this.anguloMov = restarAng(this.anguloMov,90);
            this.anguloMov = sumarAng(this.angulo,this.anguloMov);
            this.dx = CosAng(this.anguloMov)*this.speed;
            this.dy = SenAng(this.anguloMov)*this.speed;
        }
    }

    actualizarPos(){
        var FuturaPos = new Point(this.dx+this.Pos.x,this.dy+this.Pos.y);
        this.colisionMapa(FuturaPos);
        var colisionFuturaPos = this.hayColisiones();

        var MitadFuturaPos = new Point(this.dx*0.5+this.Pos.x,this.dy*0.5+this.Pos.y);
        this.colisionMapa(MitadFuturaPos);
        var colisionMitadFuturaPos = this.hayColisiones();
        
        //console.log(this.ladosColision);
        if(colisionFuturaPos || colisionMitadFuturaPos){
            FuturaPos = this.ajustarVelocidad();    
        }
        this.Pos = FuturaPos;
    }

    ajustarVelocidad(){
        if(this.ladosColision.u){
            if(this.dy>0)
                this.dy = 0;
        }
        if(this.ladosColision.d){
            if(this.dy<0)
                this.dy = 0;
        }
        if(this.ladosColision.l){
            if(this.dx<0)
                this.dx = 0;
        }
        if(this.ladosColision.r){
            if(this.dx>0)
                this.dx = 0;
        }
        return new Point(this.dx+this.Pos.x,this.dy+this.Pos.y);
    }

    calcularVelocidadAngular(){
        var dLeft = (Controles.arrowLeft)?this.normalSpeed:0;
        var dRight = (Controles.arrowRight)?this.normalSpeed:0; 
        this.dangulo = dLeft-dRight;
    }

    actualizarAngulo(){
        this.angulo += this.dangulo;
        if(this.angulo<0)
            this.angulo += 360;
        if(this.angulo>360)
            this.angulo -= 360;
    }

    hayColisiones(){
        return this.ladosColision.u||this.ladosColision.d||this.ladosColision.l||this.ladosColision.r;
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
        this.calcularVelocidadAngular();
        this.actualizarAngulo();
        drawRect(view3d, new Point(0, view3d.height), view3d.width, view3d.height/2, "DarkBlue");
        drawRect(view3d, new Point(0, view3d.height/2), view3d.width, view3d.height/2, "DarkGreen");
        this.actualizarRayos(this.Pos, this.angulo);
        this.draw();
    }

}

class Rayo{
    constructor(Pos, angulo, incrementoAngulo=0, i, fov){
        this.Pos = Pos;
        this.anguloJugador = angulo;
        this.angulo = sumarAng(angulo, incrementoAngulo);;
        this.incrementoAngulo = incrementoAngulo;
        this.fov = fov;
        //calcular punto de colision;
        //y distancia
        //this.calcularPuntoColision();
        this.calcularPuntoColisionRecta();
        this.numero = i
        this.calcularDistancia();
    }

    calcularPuntoColisionRecta(){
        var colision;
        var puntos = [];

        for(var i=0;i<Mapa.length;i++){
            colision = Mapa[i].colisionRecta(this.Pos, this.angulo);
            if(colision.Punto){     //SI HAY COLISION CON UNA PARED
                puntos.push(colision);
            }
        }

        var min = puntos[0].dis;
        var n=0;       
        for(var i=0; i<puntos.length;i++){
            if(min>puntos[i].dis){
                n = i;
                min = puntos[i].dis
            }
        }
        
        this.PuntoColision = puntos[n].Punto;
        this.ladoColision = puntos[n].lado;
        this.ParedColision = puntos[n].Pared;
    }

    calcularPuntoColision(){
        //se puede mejorar con algoritmo

        var hayColision = false;
        var x=2, puntoCheck;
        var colision;

        do{
            puntoCheck = new Point(x*CosAng(this.angulo)+this.Pos.x  ,   x*SenAng(this.angulo)+this.Pos.y);
            for(var i=0;i<Mapa.length;i++){
                colision = Mapa[i].colision(puntoCheck)
                if(colision.hayColision){     //SI HAY COLISION CON UNA PARED
                    hayColision = true;
                    break;
                }
            }
            x+=1;
        }while(!hayColision);

        // x-=2*2;
        // hayColision = false;

        // do{
        //     puntoCheck = new Point(x*CosAng(this.angulo)+this.Pos.x  ,   x*SenAng(this.angulo)+this.Pos.y);
        //     for(var i=0;i<Mapa.length;i++){
        //         colision = Mapa[i].colision(puntoCheck)
        //         if(colision.hayColision){     //SI HAY COLISION CON UNA PARED
        //             hayColision = true;
        //             break;
        //         }
        //     }
        //     x+=0.5;
        // }while(!hayColision);

        this.PuntoColision = puntoCheck;
        this.ladoColision = colision.lado;
        this.ParedColision = colision.Pared;
        // if(this.angulo  == this.anguloJugador)
        //     console.log(this.ladoColision)
    }

    calcularDistancia(){
        var dis;
        dis = calcularDistanciaPuntos(this.Pos, this.PuntoColision)*CosAng(this.anguloJugador-this.angulo);
        this.d = dis;
    }

    drawView3d(){

        var ctx = view3d.getContext('2d');
        var begin, end, mitad;
        var alturaMuroReal = view3d.height;
        var distanciaPlanoProyeccion = (view3d.width/2)/Math.tan(this.fov/2);
        var alturaMuro = (alturaMuroReal/this.d) * distanciaPlanoProyeccion;
        mitad = view3d.height/2;
        end = new Point(this.numero, mitad-(alturaMuro/2));
        begin = new Point(this.numero, mitad+(alturaMuro/2));

        var p, lado = this.ladoColision;

        if(lado=="derecha" || lado=="izquierda")
            p = this.ParedColision.A.y - this.PuntoColision.y;
        else
            p = this.PuntoColision.x - this.ParedColision.A.x;

        var alturaImg = imgMuro.naturalWidth-1;
        var pImg;
        var alturaPared = 60;
        var resto = p % alturaPared;

        pImg = (alturaImg*resto)/alturaPared;
        
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            imgMuro,
            pImg,
            0,
            1,
            alturaImg,
            begin.x,
            begin.y,
            1,
            end.y-begin.y
        );



        //drawLine(view3d, begin, end, "red");
    
    }
    
    drawViewAerea(){
        drawLine(viewAerea, this.Pos, this.PuntoColision, "yellow");
    }

    draw(){
        this.drawViewAerea();
        this.drawView3d();
    }

    update(Pos, angulo){
        this.Pos = Pos;
        this.anguloJugador = angulo;
        this.angulo = sumarAng(angulo, this.incrementoAngulo);
        //this.calcularPuntoColision();
        this.calcularPuntoColisionRecta();
        this.calcularDistancia();
        this.calcularDistancia();
        this.draw();
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

    calcularVelocidadAngular(){
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