let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//patrones ganadores
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Jugador 'X' Juega primero
let xTurn = true;
let count = 0;

//Deshabilitar todos los botones
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //habilitar ventana emergente
  popupRef.classList.remove("hide");
};

//Habilitar todos los botones (para jugar y reiniciar)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //desactivar ventana emergente
  popupRef.classList.add("hide");
};

//Esta función se ejecuta cuando un jugador gana.
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Gana!";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Gana!";
  }
};

//Función para dibujar
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//Nuevo juego
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Logica para ganar
const winChecker = () => {
  //Recorre todos los patrones ganadores
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
//Comprueba si los elementos están llenos
    //Si 3 elementos vacíos son iguales dan como resultado una partida ganada
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //Si los 3 botones tienen los mismos valores entonces pasa el valor a winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;