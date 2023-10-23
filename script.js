const btnElt = document.getElementById('btn');

btnElt.addEventListener('click', () => {
  fetch('http://localhost:3000/').then(res => res.json()).then(data => console.log(data))
})