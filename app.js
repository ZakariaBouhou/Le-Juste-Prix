// Etape 1 - Sélectionner nos éléments

let input = document.querySelector('#prix');

let erreur = document.querySelector('small');

let formulaire = document.querySelector('#formulaire');

let instructions = document.querySelector('#instructions');

// Etape 2 - Cacher l'erreur

erreur.style.display = 'none';

// Etape 3 - Générer un nombre aléatoire entre 0 et 1000. Le 1001 permet d'inclure 1000. 
// Math floor arrondit à l'entier et Math random génère un nombre entre 0 et 1 qu'on va multiplier par 1001 pour donner un nombre entier

let nombreAleatoire = Math.floor(Math.random() * 1001);

/*
Variables
coups : le nombre d'essais. Initialisé à 0 car au début pas d'essai
nombreChoisi : le prix choisi
-
*/
let coups           = 0;
let nombreChoisi;


// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
// Si c'est bien un nombre, on cache le message d'erreur, Sinon on l'affiche

input.addEventListener('keyup', () => {
    if (isNaN(input.value)) {
        erreur.style.display = 'block';     
    }
    
    else {       
        erreur.style.display = 'none';
    }
});

// Etape 5 - Agir à l'envoi du formulaire
// A la soumission, on annule le rechargement automatique de la page pour pouvoir traiter les valeurs envoyés
formulaire.addEventListener('submit', (e) => {

    e.preventDefault();

    // Si la valeur saisie n'est pas un nombre ou que le champ est vide, on affiche une bordure rouge autour de l'input
    if (isNaN(input.value) || input.value == '') {

        input.style.borderColor = '#f67280';
        input.style.borderWidth = '0.2em';
        
    }

    // Sinon on incrémente l'essai, ajoute une bordure grise, et appelle la focntion verifier
    else {
        
        coups++;
        input.style.borderColor = 'silver';
        nombreChoisi = input.value;
        input.value = '';
        verifier(nombreChoisi);

    }

});

// Etape 6 - Créer la fonction vérifier

function verifier(nombreChoisi) {

    // On crée une div qu'on va insérer par la suite à l'intérieur de son parent #instructions en tant que premier enfant
    let instruction = document.createElement('div');

    // Si nombre choisi est inférieur au nombre aléatoire on affiche dans la div créée un message en lui ajouant deux classes
    if (nombreChoisi < nombreAleatoire) {
        
        instruction.textContent = "Tentative numéro " + coups + " (" + nombreChoisi + ")" + " C'est plus !";
        instruction.className = 'instruction plus';
        
    }
    
    else if (nombreChoisi > nombreAleatoire) {
        
        instruction.textContent = "Tentative numéro " + coups + " (" + nombreChoisi + ")" + " C'est moins !";
        instruction.className = 'instruction moins';
    }
    
    else {
        
        instruction.textContent = "Tentative numéro " + coups + " (" + nombreChoisi + ")" + " Bravo, vous avez trouvé le juste prix !";
        instruction.className = 'instruction fini';
        input.disabled = true;
    
    }

    // On ajoute la div enfant à l'intérieur du parent en tant que premier élement pour avoir les dernieres valeurs saisies toujours en tête de liste
    instructions.prepend(instruction);
    
}