

  /*('./js/CRUD.mjs').then(module => {
      console.log('In the game');
    });*/

	//let CRUD = require('./js/CRUD.mjs');


let tagCRUD = new CRUD();
//$(document).ready(getTagsAsync(4))

function getTagsAsync(){
	clearTableAndLists();
	let groupId = getGroupId();
	tagCRUD.getAsync("http://localhost/phpAPI/api.php/tags/" + groupId, appendTagWhereNeeded) 
	/*chooseCloud();
		RotatingCloud();
		sphereTags();*/
}
function addTag(json){
	tagCRUD.addAsync("http://localhost/phpAPI/api.php/insertTag", json, getTagsAsync(4));
	
}
function updateTag(json){
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	var theUrl = "http://localhost/phpAPI/api.php/updateTag";
	xmlhttp.open("PUT", theUrl, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(json);
}
function deleteTag(id){
	tagCRUD.deleteAsync("http://localhost/phpAPI/api.php/deleteTag/" + id, getTagsAsync(4));
}

function clearTableAndLists(){
	leaveOnlyFirstRowInTable();
	clearListItems();
	clearDivItems();
}

function getGroupId(){
	let groupSelection = document.getElementById('groupSelection');
	let value = groupSelection.options[groupSelection.selectedIndex].value;
	return value;
}

function appendTagWhereNeeded(tag){
	console.log(tag);
	appendTagsToList(tag);
	appendTagToTable(tag);
	appendTagAsAnchors(tag);
	chooseCloud();
}
function appendTagsToList(tag){
	let list = document.getElementById('myList');
	let node = document.createElement("LI");  
	let insideAnchor = createAnchorElement(tag);
	node.appendChild(insideAnchor);
	list.appendChild(node)
}

function appendTagAsAnchors(tag){
	let sphereCloudObject = document.getElementById('tagscloud');
	let anchorElement = createAnchorElement(tag, true);
	sphereCloudObject.appendChild(anchorElement);
}

function appendTagToTable(tag){
	let table = document.getElementById('tagTable');
	let row = buildTableRow(tag);  
	table.appendChild(row)
}

function buildTableRow(tag){
	buildModals();
	let row = document.createElement("tr");  
	let tagName = document.createElement("td");
	let link = document.createElement("td");
	let points = document.createElement("td");
	let actions = document.createElement("td"); 
	let editButton = createEditButton();
	let deleteButton = createDeleteButton(tag.id);
	tagName.appendChild(document.createTextNode(tag.tagName));
	link.appendChild(document.createTextNode(tag.link));
	points.appendChild(document.createTextNode(tag.points));
	actions.appendChild(editButton);
	actions.appendChild(deleteButton);
	row.appendChild(tagName);
	row.appendChild(link);
	row.appendChild(points);
	row.appendChild(actions);
	return row;
}

function createAnchorElement(tag, shouldHaveClass){
	let anchorElement = document.createElement("a");
	let textNode = document.createTextNode(tag.tagName);
	anchorElement.appendChild(textNode); 
	anchorElement.href = tag.link;
	if(shouldHaveClass){
		var randomClassNum = Math.floor(Math.random() * 4) + 1;   
		anchorElement.classList.add("tagc" + randomClassNum);
	}
	return anchorElement;
}

function createEditButton(){
	let editButton = document.createElement("button");  
	let editText = document.createTextNode("Edit"); 
	editButton.appendChild(editText);
	//editButton.onclick = openModal();
	let modal = document.getElementById("editModal");
	editButton.onclick = function() {
	  modal.style.display = "block";
	}
	return editButton;	
}

function createDeleteButton(id){
	let deleteButton = document.createElement("button");  
	let deleteText = document.createTextNode("Delete"); 
	deleteButton.appendChild(deleteText);
	deleteButton.onclick = function(){
		deleteTag(id);
	}
	return deleteButton;	
}

function leaveOnlyFirstRowInTable(){
	var tableRef = document.getElementById("tagTable");
	while(tableRef.rows.length > 1){
		tableRef.deleteRow(tableRef.rows.length-1);
	}
}

function clearListItems(){
	let myList = document.getElementById('myList');
	myList.innerHTML = '';
}

function clearDivItems(){
	let sphereCloudObject = document.getElementById('tagscloud');
	sphereCloudObject.innerHTML = '';
}

function chooseCloud(){
	let sphereCloud = document.getElementById('tagscloud');
	let rotatingCloud = document.getElementById('list');
	sphereCloud.setAttribute('hidden', true);
	rotatingCloud.setAttribute('hidden', true);
	let selectionValue = document.getElementById('cloudSelection');
	let value = selectionValue.options[selectionValue.selectedIndex].value;
	if(value === 'rotation'){
		rotatingCloud.removeAttribute('hidden');
		RotatingCloud();
		
	}else if(value === 'sphere'){
		sphereCloud.removeAttribute('hidden');
		sphereTags();
	}
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