

const btnAwait = document.getElementById('btnAwait');
const btnPromise = document.getElementById('btnPromise');
const btnGetUsers = document.getElementById('btnGetUsers');
const btnDelete = document.getElementById('btnDelete');
const userList = document.getElementById('userList');
let users = [];
let listUsers = [];

let promesse = undefined;
function promess() {
  let notreSuperPromesse = new Promise((resolve, reject) => {
    // Code de la promesse
    console.log("Début de la promesse");
    setTimeout(() => {
      // La promesse sera terminée au bout de 2 secondes
      console.log("C'est la fin");
      if (window.confirm("Entrer dans le système ? ")) {
        resolve("Webman");
      } else {
        reject("Error Fatal");
      }
    }, 2000);
  });
  return notreSuperPromesse;
}

function theDelete() {
  let notreFonctionDelete = new Promise((resolve, reject) => {
    // Code de la promesse
    console.log("Début de la suppression");
    setTimeout(() => {
      // La promesse sera terminée au bout de 2 secondes
      if (window.confirm("Voulez-vous effacer les utilisateurs ? ")) {
        fetch("http://localhost:3000/users", { method: "DELETE" })
          .then(response => {
            if (response.ok) {
              resolve("Les utilisateurs ont été effacés avec succès");
            } else {
              reject("Erreur lors de la suppression des utilisateurs");
            }
          })
          .catch(error => {
            reject("Erreur lors de la suppression des utilisateurs : " + error.message);
          });
      } else {
        reject("Vos données n'ont pas été effacées !");
      }
    }, 2000);
  });
  return notreFonctionDelete;
}
// function fetch qui retourn automatiquement une request
// la creation d'une new request peut etre utile si on a des besoin speciphique .ex: le headears ou body..
// function theDelete() {
//   let notreFonctionDelete = new Promise((resolve, reject) => {
//     // Code de la promesse
//     console.log("Début de la suppression");
//     setTimeout(() => {
//       // La promesse sera terminée au bout de 2 secondes
//       if (window.confirm("Voulez-vous effacer les utilisateurs ? ")) {
//         resolve(request = new Request("http://localhost:3000/users", { method: "DELETE" }));
//         console.log("Requête HTTP");
//       } else {
//         reject("Vos données n'ont pas été effacées !");
//       }
//     }, 2000);
//   });
//   return notreFonctionDelete;
// }

btnPromise.addEventListener('click', () => {
  // On fait joujou
  let thePromesse = promess();
  thePromesse.then(result => console.log(`Bienvenue ${result}`));
  // Résultat : "Bienvenue Webman"
  thePromesse.catch(error => console.error(`Redémarrer le PC ${error}`));
  // Rejet : "Redémarrer le PC Error Fatal"
});

btnDelete.addEventListener('click', () => {
  // On fait joujou
  let theDeleted = theDelete();
  theDeleted.then(result => console.log(`Effacement : ${result}`));
  // Résultat : "Effacement : [object Request]"
  theDeleted.catch(error => console.error(`Erreur : ${error}`));
  // Rejet : "Erreur : Vos données n'ont pas été effacées !"
});

async function notreSuperFonction() {
  let result = await promess();
  console.log(result);
  if (window.confirm("Voulez-vous faire planter le programme ?")) {
    throw new Error("Plantage, va lancer un rejet de la promesse");
    // Si oui, alors plantage système volontaire
  }
  // throw new Error("Error Fatal"); // Je suis dans une fonction async
  return result; // Ici, le resolve
}

btnAwait.addEventListener('click', async () => {
  console.log("Click sur Await");
  try {
    let devine = await notreSuperFonction();
    console.log(`La réponse est : ${devine}`);
    // Cela va retourner l'objet promesse
  } catch (error) {
    console.log(`Une erreur s'est produite et a été attrapée : ${error.message}`);
    
    // On récupère l'erreur => "Erreur programme"
  } finally {
    // Exécuter dans tous les cas
  }
});
async function getAllUsers () {
let response = await fetch("http://127.0.0.1:3000/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  users = await response.json();
 
  users.forEach(user => listUsers.push(`<li>${user.username}</li>`))
    console.log("listUsers", listUsers);
    userList.innerHTML = `${listUsers.join("")}`
   
}



btnGetUsers.addEventListener('click', async () => {
  // Click sur le bouton

  console.log("Click sur le bouton");
  getAllUsers();
  


});
// console.log(listUsers);
  // userList.innerHTML = `toto ${users.username}`

  // console.log(promesse);

  // promesse.then(data => {
  //   // Code exécuté quand la promesse est accomplie
  //   console.log("La promesse est accomplie ",data);
  // });

  // promesse.catch(error => {
  //   console.log("Code exécuté en cas de rejet");
  //   // En cas d'erreur du fetch, par exemple "http://127.0.0.1:3000/titi"
  // });

  // promesse.finally(() => {
  //   // Code exécuté dans tous les cas : accompli ou rejet
  //   console.log("Fermeture du test");
  // });
