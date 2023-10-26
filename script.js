const btnAwait = document.getElementById('btnAwait')
const btnPormise = document.getElementById('btnPromise');
const btnGetUsers = document.getElementById('btnGetUsers');
let promesse = undefined; 
function promess(){
  let notreSuperPromes = new Promise((resolve, reject) => {
    // code de la promesse
    console.log("début de la promesse"); 
    setTimeout(() => {
      // la promesse sera terminé au bout de 10 seconde
      console.log("c'est la fin"); 
      if (window.confirm("on accepte ? ")) {
        resolve("Webman"); 
      }
      else {
        reject("Error Fatal"); 
      }
    }, 10000); 
    
  
  }); 
  return notreSuperPromes
}


btnPormise.addEventListener('click',()=>{
  // on fait joujou 
  let thePromesse = promess(); 
  thePromesse.then(result => console.log(`vive ${result}`));
  thePromesse.catch(error =>console.error(`redemarrer le pc ${error}`))
  
})

async function notreSuperFonction() {
  let result = await promess(); 
  console.log(result); 
  if (window.confirm("veut tu faire planter le programme")) {
    throw new Error("Plantage, va lancer un rejet de la promise"); 
  }
  // throw new Error("Error Fatal"); // je suis dans une fonction Async 
  return result; // ici le resolve 
};

btnAwait.addEventListener('click' ,()=>{
  console.log("click sur Await"); 
  let devine = notreSuperFonction(); 
  console.log(`la réponse est : ${devine}`); 
  devine.then(titi => console.log(`la promesse titi est : ${titi}`));  // résultat du return si tout ce passe bien 
  devine.catch(error => console.log(`error: ${error}`)) // si une erreur se produit dans la fonction async 
  try {
    // ici du code qui peu potentionemenbt faire planter le programme 
    throw new Error("Erreur programme"); // on fait une erreur volontaire pour la démo. 
  }
  catch (error) {
    console.log(`une erreur c'est produit est attraper: voici l'erreur  + ${error.message}`); 
  }
  finally {
    // executer dans tous les cas 
  }
  devine.catch(toto => console.log(toto)); 
})

btnGetUsers.addEventListener('click', () => {
  // click sur le bouton
  console.log("click sur le bouton"); 
  promesse = fetch("http://127.0.0.1:3000/titi"); 

  console.log(promesse); 

  promesse.then(data => {
    // code executer quand la prommes est accomplie 
    console.log("la promesse est accomplie "); 
  }); 

  promesse.catch(error => {
    console.log("code executer en cas de rejet"); 
  }); 

  promesse.finally(() => {
    console.log("code executer dans tous les cas: accompli ou rejet"); 
    console.log(promesse); 
  })


  
});

