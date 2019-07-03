let rotationInterval;
function RotatingCloud(stepping){
    
	let listElement = $('#list a');
	let offset = 0; 
	//let stepping = 0.15;
	let list = $('#list');
	let $list = $(list)

$list.mouseover(function(e){
	stepping = 0;
});
// $list.mouseleave(function(e){
		// stepping = 0.15;
// });


for (var i = listElement.length - 1; i >= 0; i--)
{
    listElement[i].elemAngle = i * Math.PI * 2 / listElement.length;
}

rotationInterval = setInterval(render, 100);

function render(){
    for (let i = listElement.length - 1; i >= 0; i--){  
		addProperCss(listElement[i]);   
    }
    offset += stepping;
}

function addProperCss(currentElement){
	let angle = currentElement.elemAngle + offset;
        
	x = 120 + Math.sin(angle) * 30;
	y = 45 + Math.cos(angle) * 40;
	size = Math.round(40 - Math.sin(angle) * 40);
	
	let elementCenter = $(currentElement).width() / 2;

	let leftValue = (($list.width()/2) * x / 100 - elementCenter) + "px"
	$(currentElement).css("fontSize", size + "pt");
	$(currentElement).css("opacity",size/100);
	$(currentElement).css("zIndex" ,size);
	$(currentElement).css("left" ,leftValue);
	$(currentElement).css("top", y - 2 + "%");
}
	
	
};

$(document).ready(RotatingCloud(0.15));
        