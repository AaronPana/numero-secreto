const title = document.querySelector("h1");
const paragraph = document.getElementsByClassName("texto__parrafo")[0];

const userInput = document.getElementsByClassName("container__input")[0];
const tryButton = document.getElementsByClassName("button--try")[0];
const replayButton = document.getElementsByClassName("button--replay")[0];

let counter;
let randomNumber;
let randomNumbersGenerated = [];

const generateRandomNumber = (limit) => {
	const randomNumber = Math.floor(Math.random() * limit) + 1;

	if (randomNumbersGenerated.includes(randomNumber)) {
		return generateRandomNumber(limit);
	}
	if (randomNumbersGenerated.length > limit / 2) randomNumbersGenerated = [];

	randomNumbersGenerated.push(randomNumber);

	return randomNumber;
};

const resetAll = () => {
	replayButton.setAttribute("disabled", true);
	tryButton.removeAttribute("disabled");

	title.innerText = "Adivina el numero secreto!";
	paragraph.innerHTML = "Ingresa un numero del 1 al 10:";
	userInput.value = "";

	counter = 0;
	randomNumber = generateRandomNumber(10);
};

const checkNumber = () => {
	const userNumber = parseInt(userInput.value);

	if (isNaN(userNumber) || userNumber < 1 || userNumber > 10) {
		paragraph.innerHTML = "El numero secreto esta entre 1 y 10";
		return;
	}

	counter++;

	if (userNumber === randomNumber) {
		paragraph.innerHTML = `Adivinaste el numero secreto en ${counter} intento/s`;
		tryButton.setAttribute("disabled", true);
		replayButton.removeAttribute("disabled");
	} else if (userNumber > randomNumber) {
		paragraph.innerHTML = `El numero secreto es menor a ${userNumber}`;
	} else {
		paragraph.innerHTML = `El numero secreto es mayor a ${userNumber}`;
	}

	userInput.value = "";
};

resetAll();

tryButton.addEventListener("click", checkNumber);
replayButton.addEventListener("click", resetAll);
