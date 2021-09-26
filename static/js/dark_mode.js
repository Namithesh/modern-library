let dark = false;

if(localStorage.getItem('darkMode') == 'enabled'){
	dark = true;
	var element = document.body;
	element.classList.toggle("dark-mode");

	var list = document.getElementsByTagName("table")[0];
	console.log('list', list)

	list.classList.toggle("dark-mode");
} else {
	localStorage.setItem('darkMode', 'disabled');
}

function myFunction() {
	var element = document.body;
	element.classList.toggle("dark-mode");

	var list = document.getElementsByTagName("table")[0];

	if (list !== undefined) list.classList.toggle("dark-mode");

	// if (!dark)	{
	// 	localStorage.setItem('darkMode', 'enabled');
	// 	dark = true;
	// } else {
	// 	localStorage.setItem('darkMode', 'disabled');
	// 	localStorage.removeItem('darkMode');
	// 	dark = false;
	// }

	dark = !dark;
	localStorage.setItem('darkMode', dark ? 'enabled' : 'disabled');
}

// {
	// list.map(x => {
	// 	x.classList.toggle("dark-mode")
	// });
	// list.getElementsByTagName("LI")[0].innerHTML = "Milk";

	// element = document.body;
	
	// element.classList.toggle("dark-mode");

	
// }
