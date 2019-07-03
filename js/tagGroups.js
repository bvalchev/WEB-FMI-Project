
let tagGroupsCRUD = new CRUD();
$(document).ready(getTagGroupsForUserAsync(4))
$(document).ready(buildGroupModals());

function getTagGroupsForUserAsync(userId){
	clearList();
	tagGroupsCRUD.getAsync("http://localhost/phpAPI/api.php/tagGroups/" + userId, appendGroupsAsOption); 
}
function addTagGroup(json){
	tagGroupsCRUD.addAsync("http://localhost/phpAPI/api.php/insertTagGroup", json, getTagGroupsForUserAsync(4));
	
}
function updateTagGroup(json){
	tagGroupsCRUD.updateAsync("http://localhost/phpAPI/api.php/updateTagGroup", json, getTagGroupsForUserAsync(4));
}
function deleteTagGroup(id){
	tagGroupsCRUD.deleteAsync("http://localhost/phpAPI/api.php/deleteTagGroup/" + id, getTagGroupsForUserAsync(4));
}

function getGroupByName(name){
	tagGroupsCRUD.getAsync("http://localhost/phpAPI/api.php/tagGroupByName/" + name, appendGroupsAsOption); 
}

function appendGroupsAsOption(group){
	let selection = document.getElementById('groupSelection');
	let optionGroup = buildOption(group);  
	selection.appendChild(optionGroup)
}

function clearList(){
	let selection = document.getElementById('groupSelection');
	selection.innerHTML = '';
	let defaultOption = document.createElement("option");
	defaultOption.setAttribute("value", "null");
	defaultOption.appendChild(document.createTextNode('Моля изберете група'))
	selection.appendChild(defaultOption);
}

function buildOption(group){
	let optionGroup = document.createElement("option");
	optionGroup.setAttribute("value", group.id);
	optionGroup.appendChild(document.createTextNode(group.tagGroupName));
	return optionGroup;
}

function getSelectedOptionData(){
	let selectionDropdown = document.getElementById('groupSelection');
	let selectedOption = new Object();
	if(selectionDropdown.options[selectionDropdown.selectedIndex].value == 'null'){
		return null;
	}
	selectedOption['id'] = selectionDropdown.options[selectionDropdown.selectedIndex].value;
	selectedOption['text'] = selectionDropdown.options[selectionDropdown.selectedIndex].text;
	return selectedOption;
}

function buildGroupModals(){
	let editGroupModal = document.getElementById("editGroupModal");
	var addGroupModal = document.getElementById("addGroupModal");
	var spanCloseAdd = document.getElementsByClassName("closeAddGroup")[0];
	var spanCloseEdit = document.getElementsByClassName("closeEditGroup")[0];
	var addGroupBtn = document.getElementById("addGroupBtn");
	let editGroupBtn = document.getElementById('editGroupBtn');
	let deleteGroupBtn = document.getElementById('deleteGroupBtn');
	addGroupBtn.onclick = function() {
	  addGroupModal.style.display = "block";
	}
	editGroupBtn.onclick = function(){
		editGroupModal.style.display = "block";
		fillEditGroupModal();
	}
	deleteGroupBtn.onclick= function(){
		let selectedOption = getSelectedOptionData();
		if(selectedOption == null){
			return;
		}
		deleteTagGroup(selectedOption.id);
	}
	spanCloseAdd.onclick = function() {
	  addGroupModal.style.display = "none";
	}
	spanCloseEdit.onclick = function() {
	  editGroupModal.style.display = "none";
	}
	window.onclick = function(event) {
	  if (event.target == editGroupModal) {
		editGroupModal.style.display = "none";
	  }else if(event.target == addGroupModal){
		addGroupModal.style.display = "none";  
	  }
	}
}

function fillEditGroupModal(){
	let selectedOption = getSelectedOptionData();
	if(selectedOption == null){
		return;
	}
	document.getElementById('editTagGroupName').value = selectedOption['text'];
	document.getElementById('editGroupId').value = selectedOption['id'];
}

let addGroupForm = document.getElementById('addGroupForm');
let editGroupForm = document.getElementById('еditGroupForm');
addGroupForm.addEventListener('submit', onAddGroupHandler);
editGroupForm.addEventListener('submit', onEditGroupHandler);

function onAddGroupHandler(e){
	e.preventDefault();
	e.stopPropagation();
	clearTableAndLists();

	let object = new Object();
	object["userId"] = 4;
	object["tagGroupName"] = document.getElementById('addTagGroupName').value;

	let jsonInput = JSON.stringify(object);
	addTagGroup(jsonInput);
	addGroupForm.reset();
	let modal = document.getElementById('addGroupModal');
	modal.style.display = 'none';
}

function onEditGroupHandler(e){
	e.preventDefault();
	e.stopPropagation();
	clearTableAndLists();

	let object = new Object();
	object["id"] = parseInt(document.getElementById('editGroupId').value);
	object["userId"] = 4;
	object["tagGroupName"] = document.getElementById('addTagGroupName').value;

	let jsonInput = JSON.stringify(object);
	editTagGroup(jsonInput);
	editGroupForm.reset();
	let modal = document.getElementById('editGroupModal');
	modal.style.display = 'none';
}

