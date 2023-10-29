const btnAwait = document.getElementById('btnAwait')
const btnPormise = document.getElementById('btnPromise');
const btnGetUsers = document.getElementById('btnGetUsers');
const btnDelete = document.getElementById('btnDelete');

let promesse = undefined; 
function promess(){
  let notreSuperPromes = new Promise((resolve, reject) => {
    // code de la promesse
    console.log("début de la promesse"); 
    setTimeout(() => {
      // la promesse sera terminé au bout de 2 seconde
      console.log("c'est la fin"); 
      if (window.confirm("entrer dans le systeme ? ")) {
        resolve("Webman"); 
      }
      else {
        reject("Error Fatal"); 
      }
    }, 2000); 
    
  
  }); 
  return notreSuperPromes
}
function theDelete(){
  let notreFonctionDelete = new Promise((resolve, reject) => {
    // code de la promesse
    console.log("début de la supression"); 
    setTimeout(() => {
      // la promesse sera terminé au bout de 2 seconde
      
      if (window.confirm("voulez vous effacer les utilisateurs ? ")) {
        resolve( request = new Request("http://localhost:3000/users"  ,{method: "DELETE"})); 
      }
      else {
        reject("vos données ne sont pas effacer !"); 
      }
    }, 2000); 
    
  
  }); 
  return notreFonctionDelete
}

btnPormise.addEventListener('click',()=>{
  // on fait joujou 
  let thePromesse = promess(); 
  thePromesse.then(result => console.log(`bienvenue ${result}`));
  //result webman
  thePromesse.catch(error =>console.error(`redemarrer le pc ${error}`))
  //reject error fatal
  
})
btnDelete.addEventListener('click',()=>{
  // on fait joujou 
  let theDelete = theDelete(); 
  theDelete.then(result => console.log(`effacement`));
  //result webman
  theDelete.catch(error =>console.error(`erreur ${error}`))
  //reject error fatal
  
})

async function notreSuperFonction() {
  let result = await promess(); 
  console.log(result); 
  if (window.confirm("veut tu faire planter le programme")) {
    throw new Error("Plantage, va lancer un rejet de la promise"); 
    //si oui  alors plantage system volontaire
  }
  // throw new Error("Error Fatal"); // je suis dans une fonction Async 
  return result; // ici le resolve 
};

btnAwait.addEventListener('click' ,()=>{
  console.log("click sur Await"); 
  let devine = notreSuperFonction();
  // encapsule dans une variable pour applique  de s methode js  pour exemple = .then 
  console.log(`la réponse est : ${devine}`); 
  //cela  va retourner [objet promess]
  devine.then(titi => console.log(` ${titi} refuse le plantage`));  //  (resolve)  de la promess() = webman
  devine.catch(error => console.log(`error: ${error}`)) // si une erreur se produit dans la fonction async (reject)
  try {
    // ici du code qui peu potentionemenbt faire planter le programme 
    //on provoque une erreur
    throw new Error("Erreur programme"); // on fait une erreur volontaire pour la démo. 
  }
  catch (error) {
    console.log(`une erreur c'est produit est attraper: voici l'erreur  + ${error.message}`); 
    //on recupere l 'erreur  => erreur programme
  }
  finally {
    // executer dans tous les cas 
  }
  devine.catch(toto => console.log(toto));
  //code erreur de la promess = notreSuperPromes = reject =>erreur fatal
})

btnGetUsers.addEventListener('click', () => {
  // click sur le bouton
  console.log("click sur le bouton"); 
  promesse = fetch("http://127.0.0.1:3000/users"); 

  console.log(promesse); 

  promesse.then(data => {
    // code executer quand la promess est accomplie 
    console.log("la promesse est accomplie "); 
  }); 

  promesse.catch(error => {
    console.log("code executer en cas de rejet"); 
    //en cas de error du fetch exemple ="ht://127.0.0.1:3000/titi"
  }); 

  promesse.finally(() => {
   //code executer dans tous les cas: accompli ou rejet
    console.log("fermeture du test"); 
  })


  
});

