
// Get the modal
var modal = document.getElementById("login");

// When the user clicks anywhere outside of the modal, close it


function reply_click() {
  const rnum = document.querySelector("#rnum").value
  console.log(rnum)
  const passw = document.querySelector("#passw").value
  console.log(passw)
  const options = {
    method: 'POST',
    mode: 'no-cors',
    Headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(rnum, passw)
  };
  console.log("check1")
  fetch('http://localhost:3000/login',options)
  .then(response => response.json())
  .then(data => data);
  console.log("check")
}; 

/*
document.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; */