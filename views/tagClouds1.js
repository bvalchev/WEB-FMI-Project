let radius = 180;
let d = 200;
let toRadians = Math.PI / 180;
let cssPropertiesArray = [];
let lasta = 1;
let lastb = 1;
let distributed = true;
let transitionSpeed = 11;
let size = 1200;
let mouseX = 0;
let mouseY = 10;
let howElliptical = 1; 
let anchorElementsArray = null;
let divCloudObject = null;
//window.onload= sphereTags();
function sphereTags()
{
	let i=0;
	let cssProperties=null;
	divCloudObject=document.getElementById('tagscloud');
	anchorElementsArray=divCloudObject.getElementsByTagName('a');
	for(i=0;i<anchorElementsArray.length;i++)
	{
		cssProperties={};		
		anchorElementsArray[i].onmouseover = (function (obj) {
			return function () {
				obj.on = true;
				this.style.zIndex = 9999;
				this.style.color = '#fff';
				this.style.padding = '5px 5px';
				this.style.filter = "alpha(opacity=100)";
				this.style.opacity = 1;
			}
		})(cssProperties)
		anchorElementsArray[i].onmouseout = (function (obj) {
			return function () {
				obj.on = false;
				this.style.zIndex = obj.zIndex;
				this.style.color = '#fff';
				this.style.padding = '5px';
				this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
				this.style.opacity = obj.alpha;
				this.style.zIndex = obj.zIndex;
			}
		})(cssProperties)
		cssProperties.offsetWidth = anchorElementsArray[i].offsetWidth;
		cssProperties.offsetHeight = anchorElementsArray[i].offsetHeight;
		cssPropertiesArray.push(cssProperties);
	}
	
	calculateSinAndCos( 0,0,0 );
	positionAll();
	(function () {
            update();
		   
            setTimeout(arguments.callee, 40);
        })();
};
function update()
{
	let a, b, c = 0;
	a = (Math.min(Math.max(-mouseY, -size), size) / radius) * transitionSpeed;
	b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * transitionSpeed;
	lasta = a;
	lastb = b;
	if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
		return;
	}
	calculateSinAndCos(a, b, c);
	for (let i = 0; i < cssPropertiesArray.length; i++) {
		if (cssPropertiesArray[i].on) {
			continue;
		}
		transformSphericalCoordinatesToCartesian(cssPropertiesArray[i].sphereX, cssPropertiesArray[i].sphereY, cssPropertiesArray[i].sphereZ, cssPropertiesArray[i]);
		
		per = d / (d + cssPropertiesArray[i].sphereZ);
		
		getCenterCoordinates(cssPropertiesArray[i].sphereX, cssPropertiesArray[i].sphereY, per, cssPropertiesArray[i]);
		
		let alpha = per;
		alpha = (alpha - 0.6) * (10 / 6);
		cssPropertiesArray[i].alpha = alpha * alpha * alpha - 0.2;
		cssPropertiesArray[i].zIndex = Math.ceil(100 - Math.floor(cssPropertiesArray[i].sphereZ));
	}
	doPosition();
}
function positionAll()
{
	let phi = 0;
    let theta = 0;
    let max = cssPropertiesArray.length;
    for (let i = 0; i < max; i++) {
        if (distributed) {
            phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
        } else {
            phi = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
        }
       
	   //Calculate spherical coordinates
        calculateSphericalCoordinates(phi, theta, cssPropertiesArray[i]);

		/*if(!anchorElementsArray[i]){
			return;
		}*/
			anchorElementsArray[i].style.left = cssPropertiesArray[i].sphereX + divCloudObject.offsetWidth / 2 - cssPropertiesArray[i].offsetWidth / 2 + 'px';
			anchorElementsArray[i].style.top = cssPropertiesArray[i].sphereY + divCloudObject.offsetHeight / 2 - cssPropertiesArray[i].offsetHeight / 2 + 'px';
		
	}
}
function doPosition()
{
	for (let i = 0; i < cssPropertiesArray.length; i++) {
		if (cssPropertiesArray[i].on) {
			continue;
		}
		/*if(anchorElementsArray[i]){
			return;
		}*/
		let anchorElementStyle = anchorElementsArray[i].style;
		if (cssPropertiesArray[i].alpha > 0.1) {
			if (anchorElementStyle.display != '')
				anchorElementStyle.display = '';
		} else {
			if (anchorElementStyle.display != 'none')
				anchorElementStyle.display = 'none';
			continue;
		}
		//add css here
		addProperCssStyle(anchorElementStyle, cssPropertiesArray[i])
	}
}

function getCenterCoordinates(cartesianX, cartesianY, per, resultObject){
	resultObject.x = (howElliptical * cartesianX * per) - (howElliptical * 2);
	resultObject.y = cartesianY * per;
	resultObject.scale = per;
}

function calculateSphericalCoordinates(phi, theta, resultObject){
	resultObject.sphereX = radius * Math.cos(theta) * Math.sin(phi);
    resultObject.sphereY = radius * Math.sin(theta) * Math.sin(phi);
    resultObject.sphereZ = radius * Math.cos(phi);
}

function transformSphericalCoordinatesToCartesian(sphericalX, sphericalY, sphericalZ, resultObject){
	let rx1 = sphericalX;
	let ry1 =  sphericalY * cosA + sphericalZ * (-sinA);
	let rz1 = sphericalY * sinA + sphericalZ * cosA;

	let rx2 = rx1 * cosB + rz1 * sinB;
	let ry2 = ry1;
	let rz2 = rx1 * (-sinB) + rz1 * cosB;

	let rx3 = rx2 * cosC + ry2 * (-sinC);
	let ry3 = rx2 * sinC + ry2 * cosC;
	let rz3 = rz2;

	resultObject.sphereX = rx3;
	resultObject.sphereY = ry3;
	resultObject.sphereZ = rz3;
}
function addProperCssStyle(elementToAddCssTo, objectToGetCssPropertiesFrom){
	let cloudObjectHalfWidth = divCloudObject.offsetWidth / 2;
	let cloudObjectHalfHeight = divCloudObject.offsetHeight / 2;
	
	elementToAddCssTo.left = objectToGetCssPropertiesFrom.sphereX + cloudObjectHalfWidth - objectToGetCssPropertiesFrom.offsetWidth / 2 + 'px';
	elementToAddCssTo.top = objectToGetCssPropertiesFrom.sphereY + cloudObjectHalfHeight - objectToGetCssPropertiesFrom.offsetHeight / 2 + 'px';
   
	elementToAddCssTo.filter = "alpha(opacity=" + 100 * objectToGetCssPropertiesFrom.alpha + ")";
	elementToAddCssTo.zIndex = objectToGetCssPropertiesFrom.zIndex;
	elementToAddCssTo.opacity = objectToGetCssPropertiesFrom.alpha;
}

function calculateSinAndCos( a, b, c)
{
	sinA = Math.sin(a * toRadians);
    cosA = Math.cos(a * toRadians);
    sinB = Math.sin(b * toRadians);
    cosB = Math.cos(b * toRadians);
	sinC = Math.sin(c * toRadians);
	cosC = Math.cos(c * toRadians);
}