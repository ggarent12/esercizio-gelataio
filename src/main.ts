
// RECUPERIAMO GLI ELEMENTI HTML

const quantita = document.getElementById("quantità") as HTMLInputElement;
const gusto = document.getElementById("gusto") as HTMLSelectElement;

const panna = document.getElementById("panna") as HTMLInputElement;
const caramello = document.getElementById("caramello") as HTMLInputElement;
const cioccolato = document.getElementById("cioccolato") as HTMLInputElement;

const scontrino = document.getElementById("scontrino") as HTMLButtonElement;
const fine = document.getElementById("fine") as HTMLButtonElement;

const risultato = document.getElementById("risultato") as HTMLDivElement;
const riepilogo = document.getElementById("riepilogo") as HTMLDivElement;


// MAGAZZINO: 5000 GRAMMI PER OGNI GUSTO

let nocciola: number = 5000;
let pistacchio: number = 5000;
let vaniglia: number = 5000;
let fragola: number = 5000;
let cioccolatoGelato: number = 5000;


// INCASSO GIORNALIERO

let incasso: number = 0;


// PULSANTE SCONTRINO

scontrino.addEventListener("click", function () {

    let numeroPalline: number = Number(quantita.value);

    // CONTROLLO NUMERO PALLINE

    if (!Number.isInteger(numeroPalline) || numeroPalline < 1 || numeroPalline > 3) {
        risultato.innerHTML = "Inserisci da 1 a 3 palline!";
        return;
    }

    // CALCOLO GRAMMI

    let grammi: number = numeroPalline * 110;

    // PREZZO PALLINE

    let totale: number = numeroPalline * 1.20;

    // CONTENITORE

    let contenitore = document.querySelector(
        'input[name="contenitore"]:checked'
    ) as HTMLInputElement | null;

    if (contenitore === null) {
        risultato.innerHTML = "Seleziona cono o coppetta!";
        return;
    }

    if (contenitore.value === "Cono") {
        totale += 0.10;
    } else {
        totale += 0.20;
    }

    // TOPPING

    let topping: string = "";

    if (panna.checked) {
        totale += 0.50;
        topping += "Panna ";
    }

    if (caramello.checked) {
        totale += 0.50;
        topping += "Caramello ";
    }

    if (cioccolato.checked) {
        totale += 0.50;
        topping += "Cioccolato ";
    }

    // CONTROLLO E SCALAMENTO DEL GUSTO

    let nomeGusto: string = gusto.value;

    if (nomeGusto === "Nocciola") {

        if (nocciola < grammi) {
            risultato.innerHTML = "Nocciola esaurita!";
            return;
        }

        nocciola -= grammi;

    } else if (nomeGusto === "Pistacchio") {

        if (pistacchio < grammi) {
            risultato.innerHTML = "Pistacchio esaurito!";
            return;
        }

        pistacchio -= grammi;

    } else if (nomeGusto === "Vaniglia") {

        if (vaniglia < grammi) {
            risultato.innerHTML = "Vaniglia esaurita!";
            return;
        }

        vaniglia -= grammi;

    } else if (nomeGusto === "Fragola") {

        if (fragola < grammi) {
            risultato.innerHTML = "Fragola esaurita!";
            return;
        }

        fragola -= grammi;

    } else if (nomeGusto === "Cioccolato") {

        if (cioccolatoGelato < grammi) {
            risultato.innerHTML = "Cioccolato esaurito!";
            return;
        }

        cioccolatoGelato -= grammi;

    }

    // AGGIORNIAMO L'INCASSO

    incasso += totale;

    // STAMPIAMO LO SCONTRINO

    risultato.innerHTML =
        "<h3>SCONTRINO</h3>" +
        "Gusto: " + nomeGusto + "<br>" +
        "Palline: " + numeroPalline + "<br>" +
        "Contenitore: " + contenitore.value + "<br>" +
        "Topping: " + (topping || "Nessuno") + "<br>" +
        "Totale: " + totale.toFixed(2) + " €";

    // RESET TOPPING

    panna.checked = false;
    caramello.checked = false;
    cioccolato.checked = false;

});


// FINE GIORNATA

fine.addEventListener("click", function () {

    riepilogo.innerHTML =
        "<h3>RESOCONTO GIORNALIERO</h3>" +

        "Nocciola rimasta: " + nocciola + " grammi<br>" +
        "Pistacchio rimasto: " + pistacchio + " grammi<br>" +
        "Vaniglia rimasta: " + vaniglia + " grammi<br>" +
        "Fragola rimasta: " + fragola + " grammi<br>" +
        "Cioccolato rimasto: " + cioccolatoGelato + " grammi<br><br>" +

        "<strong>Incasso totale: " + incasso.toFixed(2) + " €</strong>";

});
