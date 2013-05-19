/**
 * @author Zac Croasmun
 */

var checkAlcDrink,
	checkDrink;

	//get is function from vids
	function $(x){
		var elementId = document.getElementById(x);
		return elementId;
	};
	
	function checkboxSoftDrink () {
		var softCheck = $("softDrinkList")
		for(var i=0, j=softCheck.length; i<j; i++){
			if(softCheck[i].checked){
				checkDrink = softCheck[i].value;
			};
		};
		
	};
	
	function checkboxAlcohol (){
		var alcCheck = $("alcoholicDrinkList")
		for(var i=0, j=alcCheck.length; i<j; i++){
			if(alcCheck[i].checked){
				checkAlcDrink = alcCheck[i].value;
			};
		};
		
		
	};
	

 function storage (key) {
	if(!key){
	var id = Math.floor(Math.random()*1000000001);
	}else{
		id = key;
	}
	//checkboxSoftDrink();
	//checkboxAlcohol();
	var drinks = {};
   	   drinks.name = ["Drink Name", $("drinkName").value];
   	   drinks.type = ["Drink Type", $("drinkType").value];
   	   drinks.nonAlc = ["soft Drinks", checkDrink];
   	   drinks.alcoholic = ["Alcoholic Drinks", checkAlcDrink];
   	   drinks.date = ["Date Drank", $("date").value];
   	   drinks.note = ["Notes taken", $("note").value];
   	   localStorage.setItem(id, JSON.stringify(drinks));
   	   alert("saved drink")
 };

// after trying for a while to find my own way i am using the video way 
function getStorage (){
	if(localStorage.length === 0){
		alert("nothing to see here. so i added some for you to look cool");
		autoFill();
		};
		
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id","drinks");
	var makeList = document.createElement("ul");
	makeList.setAttribute("id", "savedDrink");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = document.createElement("li");
		var linkLi = document.createElement("li");
		makeList.appendChild(makeLi);
		var key =localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		//getImage(obj, makeSubList);
		for (var n in obj){
			var makeSubli = document.createElement("li");
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linkLi);
		}
		
		itemlinksBut(localStorage.key(i), linkLi);
		
	}
	
};

// i connot get my images to work properly so i commented them out


/*

function getImage(picName, makeSubList){
	var imgLi = document.createElement("li");
	makeSubList.appendChild(imgLi);
	var newImg = document.createElement("img");
	var setSrc = newImg.setAttribute("src", "images/" + picName + ".png")
	imgLi.appendChild(newImg);
};*/




function autoFill (){
	for(var n in json){
	var id = Math.floor(Math.random()*1000000001);
	localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

function itemlinksBut(key, linkLi){
	
	var edit = document.createElement("a");
	edit.href = "#";
	edit.key = key;
	var textEdit = "Edit Drink";
	edit.addEventListener("click" , itemEdit);
	edit.innerHTML = textEdit;
	linkLi.appendChild(edit);
	
	var lineBreak = document.createElement("br");
	linkLi.appendChild(lineBreak);
	
	var deleteLink = document.createElement("a");
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteTextEdit = "deleteItem"
	deleteLink.addEventListener("click", deleteDrink);
	deleteLink.innerHTML = deleteTextEdit;
	linkLi.appendChild(deleteLink);
	
};
function itemEdit(){
	var value = localStorage.getItem(this.key);
	var drinks = JSON.parse(value);
		
		$("drinkName").value = drinks.name[1];
		$("drinkType").value = drinks.type[1];
		//$("nonAlc").value = drinks.nonAlc[1];
		//$("alcoholic").value = drinks.alcholic[1];
		$("date").value = drinks.date[1];
		$("note").value = drinks.note[1];
	
	var checkbox = document.forms[0];
		for(var i=0; i<checkbox.length; i++){
			if (checkbox[i].value == "Yes"){
			$("softDrinkList", "alcoholicDrinkList").setAttribute("checked", "checked");
			
			save.removeEventListener("click", storeData);
			$("submit").value = "editDrink";
			var editSubmit = $("submit");
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
			
			};
		};
	
};


function deleteDrink (){
	var askUser = confirm("Are you 100% on that?")
	if(askUser){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else{
		alert("Drink is safe.")
	}
}


function clearStorage (){
	if(localStorage.length === 0){
		alert("storage is empty");
	}else{
		localStorage.clear();
		alert("drinks Deleted");
		window.location.reload();
		return false;
	}
		
};

function validate(e){
	
	var getName = $("drinkName")
	var getType = $("drinkType");
	
	
	
	err.innerHTML = "";
	getName.style.border = "1px solid black";
	getType.style.border = "1px solid black";
	
	
	var errorMess = [];
	
	if(getName.value === ""){
		var nameError = "Chose a Drink Name Bro, Man, Dude!";
		getName.style.border = "1px solid red";
		errorMess.push(nameError);
	};
	
	
	if(getType.value === "--Chose Your Drink Type--"){
		var typeError = "Chose a Drink Type Bro, Man, Dude!";
		getType.style.border = "1px solid red";
		errorMess.push(typeError);
	};
	
	if (errorMess.length >= 1){
		for(i=0; i<errorMess.length; i++){
			var txt = document.createElement("li");
			txt.innerHTML = errorMess[i];
			err.appendChild(txt);
		};
		e.preventDefault();
		return false;
	}else{
		storage(this.key);
	}
	
};



var err = $("error");
var save = $("submit");
save.addEventListener("click", validate);

var displayLink = $("displyStorage")
displayLink.addEventListener("click", getStorage);

var clearLink = $("clearStorage");
clearLink.addEventListener("click", clearStorage);

var storageAzLink = $("azLink")
storageAzLink.addEventListener("click", getStorage);



