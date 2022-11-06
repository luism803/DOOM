Controles = {
    up: false,
    down: false,
    left: false,
    right: false,
    arrowLeft: false,
    arrowRight: false
}

document.addEventListener("keydown", function(event){

    if (event.key === "w" || event.key === "W") {
        Controles.up = true;
    }else if (event.key === "a" || event.key === "A") {
        Controles.left = true;
    }else if (event.key === "s" || event.key === "S") {
        Controles.down = true;
    }else if (event.key === "d" || event.key === "D") {
        Controles.right = true;
    }else if (event.key === "ArrowLeft") {
        Controles.arrowLeft = true;
    }else if (event.key === "ArrowRight") {
        Controles.arrowRight = true;
    }else if (event.key === "Shift") {
        Controles.shift = true;
    }

});

document.addEventListener("keyup", function(event){

    if (event.key === "w"  || event.key === "W") {
        Controles.up = false;
    }else if (event.key === "a"  || event.key === "A") {
        Controles.left = false;
    }else if (event.key === "s"  || event.key === "S") {
        Controles.down = false;
    }else if (event.key === "d"  || event.key === "D") {
        Controles.right = false;
    }else if (event.key === "ArrowLeft") {
        Controles.arrowLeft = false;
    }else if (event.key === "ArrowRight") {
        Controles.arrowRight = false;
    }else if (event.key === "Shift") {
        Controles.shift = false;
    }

});