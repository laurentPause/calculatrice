addOnEcran();
AddOperator();
calcul();
displayHistorique();
remettreAzero();
effacer()

function addOnEcran() {
    const zero = document.getElementById('0');
    const un = document.getElementById('1');
    const deux = document.getElementById('2');
    const trois = document.getElementById('3');
    const quatre = document.getElementById('4');
    const cinq = document.getElementById('5');
    const six = document.getElementById('6');
    const sept = document.getElementById('7');
    const huit = document.getElementById('8');
    const neuf = document.getElementById('9');
    const virgule = document.getElementById('V');

    zero.addEventListener('click', () => addNb(0));
    un.addEventListener('click', () => addNb(1));
    deux.addEventListener('click', () => addNb(2));
    trois.addEventListener('click', () => addNb(3));
    quatre.addEventListener('click', () => addNb(4));
    cinq.addEventListener('click', () => addNb(5));
    six.addEventListener('click', () => addNb(6));
    sept.addEventListener('click', () => addNb(7));
    huit.addEventListener('click', () => addNb(8));
    neuf.addEventListener('click', () => addNb(9));
    virgule.addEventListener('click', () => addNb('.'));
}

function addNb(nb) {
    const ecran = document.getElementById('ecran');
    const minEcran = document.getElementById('minEcran');
    const NB = document.getElementById('NB');
    const dernier = minEcran.value[minEcran.value.length - 1];
    if ((dernier == '+' || dernier == '-' || dernier == '*' || dernier == '/') && NB.value == 0) {
        ecran.value = 0;
        NB.value = 1
    }
    if (NB.value == 2) {
        ecran.value = 0
        NB.value = 0
    }
    console.log(dernier);
    if (ecran.value == 0) {
        ecran.value = '';
    }
    ecran.value += nb;
}

function AddOperator() {
    const division = document.getElementById('D');
    const multiplication = document.getElementById('M');
    const addition = document.getElementById('A');
    const soustraction = document.getElementById('S');

    division.addEventListener('click', () => addOp('/'));
    multiplication.addEventListener('click', () => addOp('*'));
    addition.addEventListener('click', () => addOp('+'));
    soustraction.addEventListener('click', () => addOp('-'));
}

function addOp(operator) {
    const ecran = document.getElementById('ecran');
    const minEcran = document.getElementById('minEcran');
    const NB = document.getElementById('NB');

    NB.value = 0

    minEcran.value += ecran.value + ' ' + operator;

}

function calcul() {
    const egal = document.getElementById('E');
    const ecran = document.getElementById('ecran');
    const minEcran = document.getElementById('minEcran');
    const NB = document.getElementById('NB');

    egal.addEventListener('click', () => {
        if (minEcran.value != '') {
            const aCalculer = minEcran.value.split(' ');
            console.log(aCalculer);
            let number = 0;
            aCalculer.forEach(element => {
                switch (element) {
                    case '+':
                        number = number + parseFloat(ecran.value)
                        break;
                    case '-':
                        number = number - parseFloat(ecran.value)
                        break;
                    case '/':
                        number = number / parseFloat(ecran.value)
                        break;
                    case '*':
                        number = number * parseFloat(ecran.value)
                        break;

                    default:
                        number = parseFloat(element);
                        break;
                }

            });
            addHistorique(ecran.value, minEcran.value, number);
            ecran.value = number;
            minEcran.value = '';
            NB.value = 2;
        }
    })
}

function addHistorique(ecran, minEcran, result) {
    const historique = localStorage.getItem('calculs');
    const calcul = minEcran + ' ' + ecran + ' = ' + result;

    if (historique) {
        const calculs = JSON.parse(historique);
        if (calculs.length < 10) {
            calculs.push(calcul);
            const calculString = JSON.stringify(calculs);
            localStorage.setItem('calculs', calculString);
        }else{
            calculs[0] = calcul;
            const calculString = JSON.stringify(calculs);
            localStorage.setItem('calculs', calculString);
        }
    } else {
        const calculs = [];
        calculs.push(calcul);
        const calculString = JSON.stringify(calculs);
        localStorage.setItem('calculs', calculString);
    }
    displayHistorique();
}

function displayHistorique() {
    const listeHistorique = document.getElementById('liste-historique');
    const historique = localStorage.getItem('calculs');
    const calculs = JSON.parse(historique);
    listeHistorique.innerHTML = '';
    calculs.forEach(calcul => {
        const li = document.createElement('li');
        li.innerHTML = calcul;
        listeHistorique.append(li);
    });
}

function remettreAzero() {
    const btnCE = document.getElementById('CE');
    const ecran = document.getElementById('ecran');

    btnCE.addEventListener('click', () => {
        ecran.value = 0;
    });
}

function effacer() {
    const btnC = document.getElementById('C');
    const ecran = document.getElementById('ecran');
    const minEcran = document.getElementById('minEcran');


    btnC.addEventListener('click', () => {
        ecran.value = 0;
        minEcran.value = '';
    });
}

