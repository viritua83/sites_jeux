const cases = document.querySelectorAll('[data-cell]');
const statutJeu = document.querySelector(".statutJeu");
const rejouerBouton = document.querySelector(".rejouer");
const joueur1 = 'X';
const joueur2 = 'O';
let joueurJoue = joueur1;
const parterneVictoire = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
let jeuFini = false;

cases.forEach(Case => {
    Case.addEventListener('click', jouePartie, {once : true});
});

rejouerBouton.addEventListener('click', rejouer);

function jouePartie(e){
    if(jeuFini){
        return;
    }
    e.target.innerHTML = joueurJoue;
    if(victoire(joueurJoue)){
        noveauStatutJeu("victoire" + joueurJoue);
        jeuFini = true;
    }
    else if (egalite()){
        noveauStatutJeu("egalite");
        jeuFini = true;
    }
    else{
        noveauStatutJeu(joueurJoue);
    }
    joueurJoue == joueur1 ? joueurJoue = joueur2 : joueurJoue = joueur1;
};

function victoire(joueurJoue){
    return parterneVictoire.some(combinaison => {
        return combinaison.every(index => {
            return cases[index].innerHTML == joueurJoue;
        })
    })
};

function egalite(){
    return [...cases].every(Cases => {
        return Cases.innerHTML == joueur1 || Cases.innerHTML == joueur2;
    })
};

function noveauStatutJeu(statut){
    let texteStatut;

    switch(statut){
        case 'X':
            texteStatut = "Au tour du joueur 2 (O)";
            break;
        case 'O':
            texteStatut = "Au tour du joueur 1 (X)";
            break;
        case 'victoireX':
            texteStatut = "Victoire du joueur 1 ! (X)";
            break;
        case 'victoireO':
            texteStatut = "Victoire du joueur 2 ! (O)";
            break;
        case 'egalite':
            texteStatut = "Egalité";
             break;
    }
    statutJeu.innerHTML = texteStatut;
}

function rejouer(){
    jeuFini = false;
    joueurJoue = joueur1;
    cases.forEach(Case => {
        Case.innerHTML = "";
    })
    statutJeu.innerHTML = "Le joueur 1 commence ! (X)";

    cases.forEach(Case => {
        Case.addEventListener('click', jouePartie, {once : true});
    });
}