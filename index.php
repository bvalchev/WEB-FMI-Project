<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tag Cloud</title>
    <link href="./css/tagClouds.css" rel="stylesheet">
	<link href="./css/modal.css" rel="stylesheet"> 
	<link href="./css/index.css" rel="stylesheet"> 
	<link href="./css/staticCloud.css" rel="stylesheet"> 
  <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="./dom-to-image-master/dist/dom-to-image.min.js"></script>
  
  </head>

  <body>
  <div>
		
		<div> 
			<select id="groupSelection" onchange="getTagsAsync()"  class="select-css" placeholder="Моля изберете група">
			</select>
		</div>
		<div class = "groupButtonGroup" >
			<button class="addGroupButton" id="addGroupBtn">Добави група</button>
			<button class="editGroupButton" id="editGroupBtn">Редактирай избаната група</button>
			<button class="deleteGroupButton" id="deleteGroupBtn">Изтрий избаната група</button>
		</div>
		<div style="overflow-x:auto;">
			<button id="addBtn" class="addTagButton" hidden >Добави проект</button>
			<table id="tagTable" class="tagTable" hidden>
				<tr>
					<th>Проект</th>
					<th>Линк</th> 
					<th>Точки</th>
					<th>Дейсвтия</th>
			    </tr>		
			</table>
		</div>
		<div>
			<select id="cloudSelection" onchange="chooseCloud()" hidden class="select-css">	
				<option value="default" selected>Изберете начин на представяне</option>
				<option value="static" >Статичен</option>
				<option value="alternative">Алтернативен статичен</option>
				<option value="rotation">Въртене</option>
				<option value="sphere">Сфера</option>
			</select>
		</div>
		
		<div id="list" hidden style="margin-left: 15%; width: 70%">
			 <ul id="myList">
				<!--li><a href="#">request</a></li>
				// <li><a href="#">scala</a></li-->
			
			</ul>
		</div>
		<div id="rotationButtonGroup" class="buttonGroup" hidden>
			<button id="rotateDownwards" class="rotationButton" onClick="rotationUpwards()">Върти надолу</button>
			<button id="rotateUpwards" class="rotationButton" onClick="rotationDownwards()">Върти нагоре</button>
		</div>
		
		<div id="staticCloudDiv" hidden>
			<!--ul id="staticCloud" class="cloud">	
			</ul-->
		</div>
		
		<div id="alternativeStaticCloud" hidden>
		
		</div>
		
		
		
		<div id="tagscloud" style="margin-top: 100px" hidden>
			<!--a href="#" class="tagc1">request</a>
	  <a href="/banner-tags-%E7%AE%80%E6%B4%81.html" target="_blank" class="tagc2" >ммм</a!--> 
		</div>
	
		<div class="buttonGroup">
			<button id="saveAlternative" class="saveButton" onclick="saveAlternative()" hidden>Запази облака</button>
			<button id="saveStatic" class="saveButton" onclick="saveStatic()" hidden>Запази облака</button>
		</div>
		


	<!-- EDIT Modal -->
<div id="editModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span class="closeEdit close-modal" >&times;</span>
			</button>
			<div class="modal-header">
				<h2 class="modal-title">Промени проект</h2>
			</div>
			<div class="modal-body">
				<form id="editForm" method="POST" action="return onSubmitHandler()">
					<section>
					  <input id="editId" type="number" hidden required/>
					  <input id="editTagName" placeholder="Име на проекта" required/>
					  <div id="errorUsername"></div>
					  <input id="editPoints" type="number" placeholder="Брой точки" required/>
					  <div id="errorPassword"></div>
					  <input id="editLink" placeholder="Линк към проекта" />
					  <button id="editSubmitButton" type="submit" class="submitButton">Изпрати</button>
					</section>
				</form>
			</div>
		</div>
    </div>
</div>
	
	<!-- Add Modal -->
<div id="addModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span class="closeAdd close-modal" >&times;</span>
			</button>
			<div class="modal-header">
				<h2 class="modal-title">Добави проект</h2>
			</div>
			<div class="modal-body">
				<form id="addForm" method="POST" >
					<section>
					  <input id="addTagName" placeholder="Име на проекта" required/>
					  <div id="errorUsername"></div>
					  <input id="addPoints" type="number" placeholder="Брой точки" required/>
					  <div id="errorPassword"></div>
					  <input id="addLink" placeholder="Линк към проекта" />
					  <button id="submitButton" type="submit" class="submitButton">Изпрати</button>
			   
					</section>
				</form>
			</div>
		</div>
    </div>
</div>
	  
	  <!-- Add Group Modal -->
<div id="addGroupModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span class="closeAddGroup close-modal" >&times;</span>
			</button>
			<div class="modal-header">
				<h2 class="modal-title">Добави група</h2>
			</div>
			<div class="modal-body">
				<form id="addGroupForm" method="POST" >
					<section>
					  <input id="addTagGroupName" placeholder="Име на групата" required/>
					  <button id="addGroupSubmitButton" type="submit" class="submitButton">Изпрати</button>
					</section>
				</form>
			</div>
		</div>
    </div>
</div>
	  
	    <!-- Edit Group Modal -->
<div id="editGroupModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span class="closeEditGroup close-modal" >&times;</span>
			</button>
			<div class="modal-header">
				<h2 class="modal-title">Редактирай група</h2>
			</div>
			<div class="modal-body">
				<form id="еditGroupForm" method="POST" >
					<section>
					  <input id="editGroupId" type="number" hidden required/>
					  <input id="editTagGroupName" placeholder="Име на групата" required/>
					  <button id="editGroupSubmitButton" type="submit" class="submitButton">Изпрати</button>
					</section>
				</form>
			</div>
		</div>
    </div>
</div>
	  
	  <!--div class="modal-sandbox"></div>
  <div class="modal-box">
    <div class="modal-header">
      <div class="close-modal">&#10006;</div> 
      <h1>Simple modal box</h1>
    </div>
    <div class="modal-body">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic soluta saepe, atque, iure quidem maiores non dolores, fuga eaque voluptatibus corporis accusantium quas. Eligendi velit eum fugiat eius? Distinctio reiciendis sint error, repellat ut soluta doloremque, accusamus vitae placeat?</p>
      <p>Laboriosam voluptas, iure rem provident laborum culpa atque fugit inventore sit. Corrupti dolore architecto inventore officia, odit totam voluptatem laboriosam tempore reiciendis, et neque, consequuntur. Non, tenetur? Tempore reprehenderit tenetur nemo asperiores alias commodi assumenda architecto minima numquam repellendus debitis nulla, rerum officia itaque, sunt nihil sequi quod perspiciatis, animi quas voluptates velit aperiam voluptatem.</p>
      <br />
      <button class="close-modal">Close!</button>
    </div>
  </div-->

	</div>
	
	
	
	
		
  </body>
	<script src="./js/rotatingCloud.js"></script>
	<script src="./js/sphereCloud.js"></script>
	<script src="./js/CRUD.mjs"></script>
	<!--script src="tagClouds2.js"></script-->
	<script src="./js/tags.js"></script>
	<script src="./js/tagGroups.js"></script>
	<script src="./js/saveCloud.js"></script>
</html>