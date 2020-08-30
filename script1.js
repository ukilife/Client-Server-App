//using XMLHttpRequest
function addNote(){
  var title = document.getElementById("add-title").value;
  var text = document.getElementById("add-body").value;
  var params = "text="+text+"&title="+title;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("notes").innerHTML = "<tr><td id='id1'>"+data._id+"</td><td id='title1'></td><td id='body1'></td><td><button onclick='displayNote()'>Get Note</button></td><td><button onclick='editNote()'>Edit</button></td><td><button onclick='deleteNote()'>Delete</button></td></tr>";
      document.getElementById("add-title").value = "";
      document.getElementById("add-body").value = "";
    }
  };
  xhttp.open("POST", "http://localhost:8000/notes", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

function displayNote(){
  var id = document.getElementById ( "id1" ).innerText;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("title1").innerHTML = data.title;
      document.getElementById("body1").innerHTML =  data.text;
    }
  };
  xhttp.open("GET", "http://localhost:8000/notes/"+id, true);
  xhttp.send();
}

function editNote(){
  document.getElementById("edit-title").value = document.getElementById("title1").innerHTML;
  document.getElementById("edit-body").value = document.getElementById("body1").innerHTML;
  document.getElementById('spoiler').style.display = 'block';
}

function saveEdit(){
  var editTitle = document.getElementById("edit-title").value;
  var editText = document.getElementById("edit-body").value;
  var id = document.getElementById ( "id1" ).innerText;

  var params = "text="+editText+"&title="+editTitle;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("title1").innerHTML = data.title;
      document.getElementById("body1").innerHTML =  data.text;
      document.getElementById('spoiler').style.display = 'none';
    }
  };
  xhttp.open("PUT", "http://localhost:8000/notes/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

function deleteNote(){
  //console.log("in del");
  var id = document.getElementById ( "id1" ).innerText;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("id1").innerHTML = "";
      document.getElementById("title1").innerHTML = "";
      document.getElementById("body1").innerHTML =  "";
    }
  };
  xhttp.open("DELETE", "http://localhost:8000/notes/"+id, true);
  xhttp.send();
  //console.log("deleted");
}
