
let tagCRUD = new CRUD();
let tagsArray = [];
//$(document).ready(getTagsAsync(4))


/* ------------ API CALLS-------------*/
function getTagsAsync(){
	tagsArray = [];
	clearTableAndLists();
	let groupId = getGroupId();
	tagCRUD.getAsync(basePath + "/api.php/tags/" + groupId, appendTagWhereNeeded, buildAlternativeStaticCloud);
	//buildAlternativeStaticCloud();		
}
function addTag(json){
	tagCRUD.addAsync(basePath + "/api.php/addTag", json, getTagsAsync);
	
}
function updateTag(json){
	tagCRUD.updateAsync(basePath + "/api.php/updateTag", json, getTagsAsync);
}
function deleteTag(id){
	tagCRUD.deleteAsync(basePath + "/api.php/deleteTag/" + id, getTagsAsync);
}
/* ------------END OF API CALLS-------------*/

/* ------------Functions related to HIDING or CLEARING elements-------------*/
function clearTableAndLists(){
	leaveOnlyFirstRowInTable();
	clearListItems();
	clearDivItems();
	clearStaticItems();
	clearAlternativeStaticCloud();
}

function hideTagRelatedElements(){
	let table = document.getElementById('tagTable');
	let addTagButton = document.getElementById('addBtn');
	let cloudSelect = document.getElementById('cloudSelection');
	table.setAttribute('hidden', false);
	addTagButton.setAttribute('hidden', false);
	cloudSelect.setAttribute('hidden', false);
}

function leaveOnlyFirstRowInTable(){
	var tableRef = document.getElementById("tagTable");
	while(tableRef.rows.length > 1){
		tableRef.deleteRow(tableRef.rows.length-1);
	}
	hideTagRelatedElements();
}

function clearListItems(){
	let myList = document.getElementById('myList');
	myList.innerHTML = '';
}

function clearStaticItems(){
	let staticCloudDiv = document.getElementById('staticCloudDiv');
	staticCloudDiv.innerHTML = '';
}

function clearAlternativeStaticCloud(){
	let alternativeStaticCloud = document.getElementById('alternativeStaticCloud');
	alternativeStaticCloud.innerHTML = '';
}

function clearDivItems(){
	let sphereCloudObject = document.getElementById('tagscloud');
	sphereCloudObject.innerHTML = '';
}
/* ------------END of functions related to HIDING or CLEARING elements-------------*/

/* ------------Functions related to SHOWING elements-------------*/

function showTagRelatedElements(){
	let table = document.getElementById('tagTable');
	let addTagButton = document.getElementById('addBtn');
	let cloudSelect = document.getElementById('cloudSelection');
	table.removeAttribute('hidden');
	addTagButton.removeAttribute('hidden');
	cloudSelect.removeAttribute('hidden');
}
/* ------------Functions related to SHOWING elements-------------*/

/* ------------Functions related to BUILDING or CREATING elements-------------*/

function buildAlternativeStaticCloud(){
	let itemArray = JSON.parse(JSON.stringify(tagsArray))
	let alternativeStaticCloud = document.getElementById('alternativeStaticCloud');
	let itemCounter = 0;
	let randomItemsPerRow = Math.floor(Math.random() * 4) + 3; 
	let tagsRow = document.createElement('Div');
	while(itemArray.length > 0){
		if(itemCounter == 0){
			var cloning = tagsRow.cloneNode(true);
		}
		let tag = itemArray.pop();
		if(itemCounter < randomItemsPerRow && itemArray.length >=0){
			let tagAnchor = createAnchorElement(tag, true);
			cloning.appendChild(tagAnchor);
			itemCounter++;
			if(itemArray.length == 0){
				alternativeStaticCloud.appendChild(cloning)
			}
		}else{
			alternativeStaticCloud.appendChild(cloning);
			itemCounter = 0;
			randomItemsPerRow = Math.floor(Math.random() * 4) + 3;
		}
	}
}

function buildTableRow(tag){
	buildModals();
	let row = document.createElement("tr");  
	let tagName = document.createElement("td");
	let link = document.createElement("td");
	let points = document.createElement("td");
	let actions = document.createElement("td"); 
	let editButton = createEditButton(tag);
	let deleteButton = createDeleteButton(tag.id);
	//let rowCssClass = isRowEven ? 'even' : 'odd';
	tagName.appendChild(document.createTextNode(tag.tagName));
	link.appendChild(document.createTextNode(tag.link));
	points.appendChild(document.createTextNode(tag.points));
	actions.appendChild(editButton);
	actions.appendChild(deleteButton);
	row.appendChild(tagName);
	row.appendChild(link);
	row.appendChild(points);
	row.appendChild(actions);
	//row.classList.add(rowCssClass);
	return row;
}

function createAnchorElement(tag, shouldHaveClass){
	let anchorElement = document.createElement("a");
	let textNode = document.createTextNode(tag.tagName);
	anchorElement.appendChild(textNode); 
	anchorElement.href = tag.link;
	anchorElement.target="_blank";
	if(shouldHaveClass){
		let randomClassNum = Math.floor(Math.random() * 6) + 1;   
		anchorElement.classList.add("tagc" + randomClassNum);
	}
	anchorElement.style.fontSize = tag.points*0.6 + "px";
	return anchorElement;
}

function createEditButton(tag){
	let editButton = document.createElement("button");  	
	let editText = document.createTextNode("Редактирай"); 
	editButton.appendChild(editText);
	editButton.classList.add('editTagButton');
	//editButton.onclick = openModal();
	let modal = document.getElementById("editModal");
	editButton.onclick = function() {
		modal.style.display = "block";
		 fillModal(tag); 
	}
	
	return editButton;	
}

function createDeleteButton(id){
	let deleteButton = document.createElement("button");  	
	let deleteText = document.createTextNode("Изтрий"); 
	deleteButton.appendChild(deleteText);
	deleteButton.classList.add('deleteTagButton');
	deleteButton.onclick = function(){
		deleteTag(id);
	}
	return deleteButton;	
}

function buildModals(){
	let editModal = document.getElementById("editModal");
	var addModal = document.getElementById("addModal");
	var spanCloseAdd = document.getElementsByClassName("closeAdd")[0];
	var spanCloseEdit = document.getElementsByClassName("closeEdit")[0];
	var addBtn = document.getElementById("addBtn");
	addBtn.onclick = function() {
	  addModal.style.display = "block";
	}
	spanCloseAdd.onclick = function() {
	  addModal.style.display = "none";
	}
	spanCloseEdit.onclick = function() {
	  editModal.style.display = "none";
	}
	window.onclick = function(event) {
	  if (event.target == editModal) {
		editModal.style.display = "none";
	  }else if(event.target == addModal){
		addModal.style.display = "none";  
	  }
	}
}

/* ------------End of functions related to BUILDING or CREATING elements-------------*/


/* ------------Functions related to APPENDING elements-------------*/

function appendTagWhereNeeded(tag){
	console.log(tag);
	appendTagsToList(tag);
	appendTagToTable(tag);
	appendTagAsAnchors(tag);
	appendTagToStaticList(tag);
	tagsArray.push(tag);
}
function appendTagsToList(tag){
	let list = document.getElementById('myList');
	let node = document.createElement("LI");  
	let insideAnchor = createAnchorElement(tag, true);
	insideAnchor.style.color = 'white';
	node.appendChild(insideAnchor);
	node.style.color = 'white'
	list.appendChild(node)
	
}

function appendTagToStaticList(tag){
	let staticCloudList = document.getElementById('staticCloudDiv');
	//let node = document.createElement("LI");  
	let tagButton = document.createElement('button');
	let randomClassNum = Math.floor(Math.random() * 4) + 1;   
	
	let insideAnchor = createAnchorElement(tag, true);
	insideAnchor.setAttribute('type', 'button');
	//tagButton.appendChild(insideAnchor);
	//tagButton.classList.add("tagc" + randomClassNum);
	//node.appendChild(insideAnchor);
	staticCloudList.appendChild(insideAnchor);
}

function appendTagAsAnchors(tag){
	let sphereCloudObject = document.getElementById('tagscloud');
	let anchorElement = createAnchorElement(tag, true);
	sphereCloudObject.appendChild(anchorElement);
}

function appendTagToTable(tag){
	let table = document.getElementById('tagTable');
	let row = buildTableRow(tag);  
	table.appendChild(row);
	
}
/* ------------END of functions related to APPENDING elements-------------*/

/* ------------Functions related to HANDLING EVENTS-------------*/

function onAddHandler(e){
	e.preventDefault();
	e.stopPropagation();
	clearTableAndLists();
	
	

	let object = new Object();
	object["tagGroupId"] = parseInt(getGroupId());
	object["tagName"] = document.getElementById('addTagName').value;
	object["points"] = parseInt(document.getElementById('addPoints').value);
	object["link"] = document.getElementById('addLink').value;

	let jsonInput = JSON.stringify(object);
	addTag(jsonInput);
	addTagForm.reset();
	let modal = document.getElementById('addModal');
	modal.style.display = 'none';
	//getTagsAsync();
	//chooseCloud();
}

function onEditHandler(e){
	e.preventDefault();
	e.stopPropagation();
	clearTableAndLists();

	let object = new Object();
	object["id"] = parseInt(document.getElementById('editId').value);
	object["tagGroupId"] = parseInt(getGroupId());
	object["tagName"] = document.getElementById('editTagName').value;
	object["points"] = parseInt(document.getElementById('editPoints').value);
	object["link"] = document.getElementById('editLink').value;

	let jsonInput = JSON.stringify(object);
	updateTag(jsonInput);
	editTagForm.reset();
	let modal = document.getElementById('editModal');
	modal.style.display = 'none';
	//getTagsAsync();
	//chooseCloud();
}

/* ------------END of functions related to HANDLING EVENTS-------------*/

function getGroupId(){
	let groupSelection = document.getElementById('groupSelection');
	let value = groupSelection.options[groupSelection.selectedIndex].value;
	if(value != 'null'){
		showTagRelatedElements();
	}
	return value;
}



function fillModal(tag){
	document.getElementById("editId").value = tag.id;  
	document.getElementById("editTagName").value = tag.tagName;
	document.getElementById("editPoints").value = tag.points;
	document.getElementById("editLink").value = tag.link;
}

function chooseCloud(){
	let staticCloud = document.getElementById('staticCloudDiv');
	let sphereCloud = document.getElementById('tagscloud');
	let rotatingCloud = document.getElementById('list');
	let alternativeStaticCloud = document.getElementById('alternativeStaticCloud');
	let saveAlternativeButton = document.getElementById('saveAlternative');
	let saveStaticButton = document.getElementById('saveStatic');
	let rotationButtonGroup = document.getElementById('rotationButtonGroup')
	staticCloud.setAttribute('hidden', true);
	sphereCloud.setAttribute('hidden', true);
	rotatingCloud.setAttribute('hidden', true);
	saveAlternativeButton.setAttribute('hidden', true);
	saveStaticButton.setAttribute('hidden', true);
	alternativeStaticCloud.setAttribute('hidden', true);
	rotationButtonGroup.setAttribute('hidden', true);
	let selectionValue = document.getElementById('cloudSelection');
	let value = selectionValue.options[selectionValue.selectedIndex].value;
	if(value == 'static'){
		staticCloud.removeAttribute('hidden');
		saveStaticButton.removeAttribute('hidden');
	}else if(value == 'alternative'){
		alternativeStaticCloud.removeAttribute('hidden');
		saveAlternativeButton.removeAttribute('hidden');
	}else if(value === 'rotation'){
		rotatingCloud.removeAttribute('hidden');
		clearInterval(rotationInterval); 
		RotatingCloud(0.15);
		rotationButtonGroup.removeAttribute('hidden');
		
	}else if(value === 'sphere'){
		sphereCloud.removeAttribute('hidden');
		clearInterval(sphereTimeout);
		sphereTags();
	}
}

let addTagForm = document.getElementById('addForm');
let editTagForm = document.getElementById('editForm');
addTagForm.addEventListener('submit', onAddHandler);
editTagForm.addEventListener('submit', onEditHandler);



function rotationUpwards(){
		clearInterval(rotationInterval); 
		RotatingCloud(0.15)
	}
function rotationDownwards(){
	clearInterval(rotationInterval); 
	RotatingCloud(-0.15)
}  

