<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tag Cloud</title>
    <link href="./views/tagClouds.css" rel="stylesheet">
	<link href="./views/modal.css" rel="stylesheet"> 
  <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  </head>

  <body>
		<div>
			<select id="groupSelection" onchange="getTagsAsync()">
			</select>
		</div>
		<div>
			<button id="addBtn">Добави проект</button>
			<table id="tagTable">
				<tr>
					<th>Проект</th>
					<th>Линк</th> 
					<th>Точки</th>
					<th>Дейсвтия</th>
			    </tr>		
			</table>
		</div>
		<div>
			<h3>Изберете начин на представяне</h3>
			<select id="cloudSelection" onchange="chooseCloud()">
				<option value="rotation" selected>Въртене</option>
				<option value="sphere">Сфера</option>
			</select>
		</div>
		
		<div id="list" >
			<ul id="myList">
				<!--li><a href="#">request</a></li>
				<li><a href="#">css</a></li>
				<li><a href="#">design</a></li>
				<li><a href="#">browser</a></li>
				<li><a href="#">blurb</a></li>
				<li><a href="#">html</a></li>
				<li><a href="#">python</a></li>
				<li><a href="#">golang</a></li>
				<li><a href="#">PHP</a></li>
				<li><a href="#">SEO</a></li>
				<li><a href="#">tensor</a></li>
				<li><a href="#">quantum</a></li>
				<li><a href="#">babel</a></li>
				<li><a href="#">scala</a></li-->
			
			</ul>
		</div>
		
			<!--div id="myList">
				<div id="div1" class="tagc1">request</div>
				<div  id="div2"class="tagc2">css</div>
				<div id="div3" class="tagc3">design</div>
			</div-->	
			

		
		<div id="tagscloud" style="margin-top: 30px">
			<!--a href="#" class="tagc1">request</a>
				<a href="#"class="tagc1">css</a>
				<a href="#" class="tagc1">design</a>
				<a href="#" class="tagc1">browser</a>
				<a href="#" class="tagc1">blurb</a>
				<a href="#" class="tagc1">html</a>
				<a href="#" class="tagc1">python</a>
				<a href="#" class="tagc1">golang</a>
				<a href="#"class="tagc1">PHP</a>
				<a href="#" class="tagc1">SEO</a>
				<a href="#" class="tagc1">tensor</a>
				<a href="#" class="tagc1">quantum</a>
				<a href="#" class="tagc1">babel</a>
				<a href="#" class="tagc1">scala</a>
      <a href="/banner-tags-%E7%81%B0%E8%89%B2.html" target="_blank" class="tagc1" >Pesho</a>
	  <a href="/banner-tags-%E8%8A%B1%E6%9C%B5.html" target="_blank" class="tagc3" >Smth</a>
	  <a href="/banner-tags-%E8%93%9D%E8%89%B2.html" target="_blank" class="tagc3" >String</a>
	  <a href="/banner-tags-%E5%A5%B3%E5%AD%A9.html" target="_blank" class="tagc1" >Oще нещо</a>
	  <a href="/banner-tags-%E5%A5%B3%E9%9E%8B.html" target="_blank" class="tagc3" >12893719827</a>
	  <a href="/banner-tags-%E7%AE%80%E6%B4%81.html" target="_blank" class="tagc2" >ммм</a!-->
	       
		</div>


	<!-- EDIT Modal -->
	<div id="editModal" class="modal">
	  <div class="modal-header">
		<span class="closeEdit">&times;</span>
		<h2>Промени проект</h2>
	  </div>
	  <!-- Modal content -->
	  <div class="modal-content">
	  <span class="closeAdd">&times;</span>
		<p>Some text in the Modal..</p>
	  </div>

	</div>
	
	<!-- Add Modal -->
	<div id="addModal" class="modal">
		<div class="modal-header">
			<span class="closeAdd">&times;</span>
			<h2>Добави проект</h2>
	  </div>
	  <!-- Modal content -->
	  <div class="modal-content">
	  <span class="closeAdd">&times;</span>
		<p>Some text in the Modal..</p>
	  </div>

	</div>
	
	
		
  </body>
	<script src="./views/tagClouds.js"></script>
	<script src="./views/tagClouds1.js"></script>
	<script src="./js/CRUD.mjs"></script>
	<!--script src="tagClouds2.js"></script-->
	<script src="./js/tags.js"></script>
	<script src="./js/tagGroups.js"></script>
</html>