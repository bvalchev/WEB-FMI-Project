
let tagGroupsCRUD = new CRUD();
$(document).ready(getTagGroupsForUserAsync(4))

function getTagGroupsForUserAsync(userId){
	tagGroupsCRUD.getAsync("http://localhost/phpAPI/api.php/tagGroups/" + userId, appendGroupsAsOption) 
}
function addTagGroup(json){
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	var theUrl = "http://localhost/phpAPI/api.php/insertTag";
	xmlhttp.open("POST", theUrl, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(json);
}
function updateTag(json){
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	var theUrl = "http://localhost/phpAPI/api.php/updateTag";
	xmlhttp.open("PUT", theUrl, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(json);
}
function deleteTag(id){
	tagGroupsCRUD.deleteAsync("http://localhost/phpAPI/api.php/deleteTag/" + id, getTagsAsync(4));
}

function appendGroupsAsOption(group){
	let selection = document.getElementById('groupSelection');
	let optionGroup = buildOption(group);  
	selection.appendChild(optionGroup)
}

function buildOption(group){
	let optionGroup = document.createElement("option");
	optionGroup.setAttribute("value", group.id);
	optionGroup.appendChild(document.createTextNode(group.tagGroupName));
	return optionGroup;
}