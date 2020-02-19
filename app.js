const linkCategory = document.getElementById('linkCategory');
const submitButton = document.querySelector("#submitButton");
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelButton');
const addLinkPanel = document.getElementById('addLinkPannel');
const addedCategories = document.getElementById('addedCategories');
const linksList = document.getElementById('linksList');
const addLinkContainer = document.getElementById('addLinkContainer');

let editIndex = -1;
let linkCategories = [];
let links = [
{
	title: "New Link 1",
	url: "url.com",
	categories: ['node', 'angular'],
	date: new Date()
},
{
	title: "New Link 2",
	url: "url.ua",
	categories: ['js', 'angular'],
	date: new Date()
},
{
	title: "New Link 3",
	url: "url.ru",
	categories: ['node', 'bootstrap'],
	date: new Date()
}
];

displayLinks()

addBtn.addEventListener("click", (event) =>{

	showFormPanel();
});

cancelBtn.addEventListener("click", (event) =>{

	event.preventDefault();

	hideFormPanel();
});

function showFormPanel () {

	addLinkContainer.classList.remove("hidden");
	addLinkPanel.classList.remove("hidden");

	displayLinkCategories();
}

function hideFormPanel () {

	addLinkContainer.classList.add("hidden");
	addLinkPanel.classList.add("hidden");
	clearLinkForm ()
}

linkCategory.addEventListener("keydown", function(event){

	if(event.keyCode === 188){
		event.preventDefault();

		linkCategories.push(linkCategory.value);
		linkCategory.value = "";

		// Display the updated categories
		displayLinkCategories();
	}
})

function displayLinkCategories(){

	addedCategories.innerHTML = "";
	for (let category of linkCategories){
		var categoryHTMLString = `<span class="category">${category}</span>`;
		addedCategories.innerHTML += categoryHTMLString;
	}

}

function clearLinkForm () {
	linkTitle.value = "";
	linkUrl.value = "";
	linkCategory.value = ""
	linkCategories = [];
	addedCategories.innerHTML = "";
}	

submitButton.addEventListener("click", (event) => {
	
	// Stop form from submitting
	event.preventDefault();

	const title = linkTitle.value;
	const url = linkUrl.value;
	const categories = linkCategories;
 
	if((linkTitle.value == 0 || linkUrl.value == 0) && linkCategories.length == 0){
		alert("Insert field or push CANCEL");

		showFormPanel();
		
	}else{

		 let checkHost= /^https:\/\/|\.[a-z]{2,6}$/;
	
		if(checkHost.test(linkUrl.value)){
			const newLink = {
			title,
			url,
			categories,
			date: new Date()
		}

		if(editIndex === -1){
				// Push new link to array
				links.unshift(newLink);

		}else{
				links[editIndex] = newLink;
				editIndex = -1;
			}

			clearLinkForm();
			displayLinkCategories();

			hideFormPanel();

			displayLinks();
		}
			else{
				alert("Insert right link (URL)");
				showFormPanel();
			}
	}
});

function displayLinks () {
	linksList.innerHTML = "";

	let index = 0;
	for(let link of links){
		let linkHTMLString = `
		<div class="flex-item">
		<div class="link panel">
		<div class="link-options">
		<button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
		<button class="btn-sm" onclick="editLink(${index})">Edit</button>
		</div>

		<a href="${link.url}"><h1 class="header">${link.title}</h1></a>
		<p class="link-date">${formatDate(link.date)}</p>

		<div class="categories">
		`;

		if(link.categories.length == 0){
			linkHTMLString +=
						`</div>
						</div>
						</div>`;

						linksList.innerHTML += linkHTMLString;
						index++;
		}else{
			linkHTMLString += `Categories:`;
			for(let category of link.categories){
				linkHTMLString += `<span class="category">${category}</span>`;
			}

						// <span class="category">Javascript</span>
						linkHTMLString +=
						`</div>
						</div>
						</div>`;

						linksList.innerHTML += linkHTMLString;
						index++;
		}
		
	}
}

function deleteLink (index) {

	links.splice(index,1);
	console.log(links);
	displayLinks();

}

function editLink (index) {

	editIndex = index;
	linkTitle.value = links[index].title;
	linkUrl.value = links[index].url;
	linkCategories = links[index].categories;

	showFormPanel();
}

function formatDate (date) {
	return `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
}