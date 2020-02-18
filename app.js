const linkCategory = document.getElementById('linkCategory');
const submitButton = document.querySelector("#submitButton");
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelButton');
const addLinkPanel = document.getElementById('addLinkPannel');
const addedCategories = document.getElementById('addedCategories');
const linksList = document.getElementById('linksList');

let editIndex = -1;
let linkCategories = [];
let links = [
	{
		title: "New Link 1",
		url: "url.con1",
		categories: ['node', 'angular']
	},
	{
		title: "New Link 2",
		url: "url.con2",
		categories: ['js', 'angular']
	},
	{
		title: "New Link 3",
		url: "url.con3",
		categories: ['node', 'bootstrap']
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

	addLinkPanel.classList.remove("hidden");

	displayLinkCategories();
}

function hideFormPanel () {

	addLinkPanel.classList.add("hidden");
	clearLinkForm ()
}

linkCategory.addEventListener("keydown", function(event){
	console.log(event)

	if(event.keyCode === 188){
		event.preventDefault();

		linkCategories.push(linkCategory.value);
		linkCategory.value = "";

		// Display the updated categories
		displayLinkCategories();
	}
})

function displayLinkCategories(){
	console.log("Displaying Link Categories");
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
	
	const newLink = {
		title,
		url,
		categories
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
					<p class="link-date">${Date.now()}</p>

					<div class="categories">
						Categories:`;
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

function deleteLink (index) {
	console.log("Deleting link at index", index);
	links.splice(index,1);
	console.log(links);
	displayLinks();

}

function editLink (index) {
	console.log("Editing link at index",index);

	editIndex = index;
	linkTitle.value = links[index].title;
	linkUrl.value = links[index].url;
	linkCategories = links[index].categories;

	showFormPanel();

}
