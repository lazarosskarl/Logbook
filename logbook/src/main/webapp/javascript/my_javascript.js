function checkPassword() { 
    var password1 = document.getElementById("password1").value; 
    var password2 = document.getElementById("password2").value; 

    // If password not entered 
    if (password1 == '')
    { 
        document.getElementById("password_message").innerHTML= "Please enter Password"; 
        document.getElementById("password_message").style.color="red";
    }
          
    // If confirm password not entered 
    else if (password2 == '')  
    {
        document.getElementById("password_message").innerHTML="Please confirm password"; 
        document.getElementById("password_message").style.color="red";
    }     
    // If Not same return False.     
    else if (password1 != password2) { 
        document.getElementById("password_message").innerHTML="Passwords do not match";
        document.getElementById("password_message").style.color="red";
        return false; 
    } 

    // If same return True. 
    else{ 
        document.getElementById("password_message").innerHTML="Passwords match";
        document.getElementById("password_message").style.color="green";
        return true; 
    } 
}
var mapObj;
function check_location()
{
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    var complete_address= country + " "  + city + " " + address;
    var theUrl = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+complete_address;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            
            if(xmlHttp.responseText == "[]")
            {
                var button_container =  document.getElementById("map_button");
                var map_container =  document.getElementById("map");
                map_container.innerHTML="";
                map_container.style.height="0px";
                map_container.style.border="0px";
                map_container.style.width= "0px";
                button_container.innerHTML="";
                document.getElementById("address_message").innerHTML="Adress does not exist";
                document.getElementById("address_message").style.color="red";
            }
            else
            {
                document.getElementById("address_message").innerHTML="";
                var map_container =  document.getElementById("map");
                map_container.innerHTML="";
                map_container.style.height="0px";
                map_container.style.border="0px";
                map_container.style.width= "0px";
                mapObj = JSON.parse(xmlHttp.responseText);
                //create button
                var container =  document.getElementById("map_button");
                var button_type ="type = "+'"' +"button" +'" ';
                var button_action = "onclick ="+'"'+"show_map();"+"this.onclick=null;"+'"';
                var button_class = "class ="+ '"'+"mybutton"+'"';
                container.innerHTML="<br><button "+button_type+button_action+button_class+">Show map </button>";
            }
            console.log(xmlHttp.responseText);
        }
        //else throw new Error(xmlHttp.response);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function show_map() {
    document.getElementById("map").style.width="600px";
    document.getElementById("map").style.height="400px";
    document.getElementById("map").style.border="6px solid #1c6082";
    document.getElementById("map").style.borderRadius="7px";

    var map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    var lon=parseFloat(mapObj[0].lon);
    var lat=parseFloat(mapObj[0].lat);
    var lonLat = new OpenLayers.LonLat(lon,lat).transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    map.getProjectionObject() // to Spherical Mercator Projection
    );

    var zoom = 16;

    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);

    markers.addMarker(new OpenLayers.Marker(lonLat));

    map.setCenter(lonLat, zoom);
}
function autocompletion() {
    var lat;
    var lon;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat= position.coords.latitude; 
            lon= position.coords.longitude;
            var Url="https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&"+"&lat="+lat+"&lon="+lon;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                
                if(xmlHttp.responseText == "[]")
                {
                    alert("Location could not be found.");
                }
                else
                {
                    var location = JSON.parse(xmlHttp.responseText);
                    var container =  document.getElementById("autocompl");
                    var button_type ="type = "+'"' +"button" +'" ';
                    var button_action = "onclick ="+'"'+"complete();"+'this.onclick=null;"';
                    var button_class = "class ="+ '"'+"mybutton"+'"';
                    container.innerHTML="<br><button "+button_type+button_action+button_class+">Autocomplete location </button><br>";
                }
            console.log(xmlHttp.responseText);
        }
        //else throw new Error(xmlHttp.response);
    };
    xmlHttp.open("GET", Url, true); // true for asynchronous 
    xmlHttp.send(null);
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}
function complete(location) {
    var lat;
    var lon;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat= position.coords.latitude; 
            lon= position.coords.longitude;
            var Url="https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&"+"&lat="+lat+"&lon="+lon;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                
                if(xmlHttp.responseText == "[]")
                {
                    alert("Location could not be found.");
                }
                else
                {
                    var location = JSON.parse(xmlHttp.responseText);
                    document.getElementById("country").value = location.address.country;
                    document.getElementById("city").value = location.address.city;
                    document.getElementById("address").value = location.address.road;
                }
            console.log(xmlHttp.responseText);
        }
        //else throw new Error(xmlHttp.response);
    };
    xmlHttp.open("GET", Url, true); // true for asynchronous 
    xmlHttp.send(null);
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

function camerabutton(){

    var patt=new RegExp("[a-zA-Z]{8,}");
    var res=patt.test(document.getElementById("username").value);
    if(res==true)
    {
        document.getElementById("videospace").style.display="block";
    }
    else{
        alert("Enter a valid username");
        document.getElementById("uploadradio").checked = false;
    }

}

function check_formdata(){
    document.getElementById("prof_message").innerHTML = "";
    document.getElementById("address2_message").innerHTML = "";
    document.getElementById("address_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("lastname_message").innerHTML = "";
    document.getElementById("firstname_message").innerHTML = "";
    document.getElementById("password_message").innerHTML = "";
    document.getElementById("email_message").innerHTML = "";
    document.getElementById("username_message").innerHTML = "";
    
    var gender;
    if(document.getElementById("male").checked) gender="Male";
    else if(document.getElementById("female").checked) gender = "Female";
    else gender="Other";
    
    
    var patt_username = new RegExp("[a-zA-Z]{8,}");
    var res_username=patt_username.test(document.getElementById("username").value);
    if (res_username === false) {
      document.getElementById("username_message").innerHTML ="Please enter a valid Username";
      document.getElementById("username_message").style.color = "red";
    }

    var patt_email=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res_email=patt_email.test(document.getElementById("email").value);
    if (res_email === false) {
        document.getElementById("email_message").innerHTML ="Please enter a valid Email";
        document.getElementById("email_message").style.color = "red";
    }

    var patt_password=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/);
    var res_password=patt_password.test(document.getElementById("password1").value);
    if (res_password === false) {
        document.getElementById("password_message").innerHTML ="Please enter a valid Password";
        document.getElementById("password_message").style.color = "red";
    }

    var patt_name=new RegExp("[a-zA-Z]{3,15}");
    var res_name=patt_name.test(document.getElementById("firstname").value);
    if (res_name == false) {
        document.getElementById("firstname_message").innerHTML ="Please enter a valid First Name";
        document.getElementById("firstname_message").style.color = "red";
    }
    var res_surname=patt_name.test(document.getElementById("lastname").value);
    if (res_surname == false) {
        document.getElementById("lastname_message").innerHTML ="Please enter a valid Last Name";
        document.getElementById("lastname_message").style.color = "red";
    }

    var date=document.getElementById("birthday").value;
    if (date == '') {
        document.getElementById("birthday_message").innerHTML ="Please enter a valid Date";
        document.getElementById("birthday_message").style.color = "red";
    }
    var today = new Date();
    var birthdate = new Date(date);
    var age = today.getFullYear() - birthdate.getFullYear();
    var res_age=true;
    if (age < 18) {
        document.getElementById("birthday_message").innerHTML ="You must over 18.";
        document.getElementById("birthday_message").style.color = "red";
        res_age=false;
    }

    var patt_city=new RegExp("[a-zA-Z]{3,15}");
    var res_city=patt_city.test(document.getElementById("city").value);
    if (res_city == false) {
        document.getElementById("address_message").innerHTML ="Please enter a valid City";
        document.getElementById("address_message").style.color = "red";
    }

    var patt_addr=new RegExp("[a-zA-Z0-9\s]{1,50}");
    var address;
    var res_addr=patt_addr.test(document.getElementById("address").value);
    if (res_addr == false) {
        if(document.getElementById("address").value=="")
        {
            res_addr=true;
            address="";
        }
        else
        {
        document.getElementById("address2_message").innerHTML ="Please enter a valid Address";
        document.getElementById("address2_message").style.color = "red";
        }
    }
    else if(document.getElementById("address").value=="undefined")
    {
            res_addr=true;
            address="";
    }
    else{
        address=document.getElementById("address").value;
    }

    var patt_prof=new RegExp("[a-zA-Z]{3,15}");
    var res_prof=patt_prof.test(document.getElementById("prof").value);
    if (res_prof == false) {
        document.getElementById("prof_message").innerHTML ="Please enter a valid profession";
        document.getElementById("prof_message").style.color = "red";
    }

    if(res_username==true && res_email==true && res_password==true && checkPassword() &&
    res_name==true  && res_surname==true && res_age==true && res_city==true && res_addr==true && res_prof==true) 
    {
        
        var username="username="+document.getElementById("username").value;
        var email="email=" + document.getElementById("email").value;
        var password="password=" + document.getElementById("password1").value;
        var firstname="firstname=" + document.getElementById("firstname").value;
        var lastname="lastname=" + document.getElementById("lastname").value;
        var birthdate1="birthdate=" + document.getElementById("birthday").value;
        var country="country=" + document.getElementById("country").value;
        var city="city=" + document.getElementById("city").value;
        var address1="address=" + address;
        var gender1="gender=" + gender;
        var prof="prof=" + document.getElementById("prof").value;
        var interests="interests=" + document.getElementById("interests").value;
        var info="info=" + document.getElementById("info").value;
        var toServer=username+'&'+email+'&'+password+'&'+firstname+'&'+lastname+'&'+birthdate1+'&'+gender1+'&'+
                country+'&'+city+'&'+address1+'&'+prof+'&'+interests+'&'+info;
     
        var http = new XMLHttpRequest();
        http.open('POST', '/logbook/SignUpServlet',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            document.getElementById("form2").innerHTML=http.responseText;
        };
        http.send(toServer);
        document.getElementById("form2").style.display="block";
        document.getElementById("form1").style.display="none";
    }

    else
    {
        alert("Oops,something went wrong!!");
    }

}
function checkValidUsername()
{
     var username=document.getElementById("username").value;
     var params="username="+username;
     document.getElementById("username_message").innerHTML=" ";
     var http = new XMLHttpRequest();
        http.open('POST', '/logbook/CheckValidUsername',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            // Do whatever with response
            console.log(http.responseText);
            if(http.status===400){
                document.getElementById("username_message").innerHTML="Username already in use";
                document.getElementById("username_message").style.color = "red";
            }
        };
        http.send(params);
}

function checkValidEmail()
{
     var email=document.getElementById("email").value;
     var params="email="+email;
     document.getElementById("email_message").innerHTML=" ";
     var http = new XMLHttpRequest();
        http.open('POST', '/logbook/CheckValidEmail',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            // Do whatever with response
            console.log(http.responseText);
            if(http.status===400){
                document.getElementById("email_message").innerHTML="Email already in use";
                document.getElementById("email_message").style.color = "red";
            }
        };
        http.send(params);
}
function check_login()
{
    document.getElementById("login_message").innerHTML="";
    var patt_username = new RegExp("[a-zA-Z]{8,}");
    var res_username=patt_username.test(document.getElementById("usernamelogin").value);
    var patt_password=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/);
    var res_password=patt_password.test(document.getElementById("passwordlogin").value);
    alert(res_password);
     alert(res_username);
    var loged=false;
    
    if(res_password == true)
    {
        var username="username="+document.getElementById("usernamelogin").value;
        var password="password="+document.getElementById("passwordlogin").value;
        var params=username+'&'+password;
        var http = new XMLHttpRequest();
        http.open('POST', '/logbook/LoginServlet',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            if(http.status===200){
                
                var button_type1 ="type = "+'"' +"button" +'" '+" id="+'"'+"showusers"+'"';
                var button_action1 = "onclick ="+'"'+"show_users()"+'"';
                var button_class1 = "class ="+ '"'+"mybutton"+'"';
                var showusers="<button "+button_type1+button_action1+button_class1+">Show users</button>";
                
                var button_type2 ="type = "+'"' +"button" +'" '+" id="+'"'+"updateuser"+'"';
                var button_action2 = "onclick ="+'"'+"show_user_info()"+'"';
                var button_class2 = "class ="+ '"'+"mybutton"+'"';
                var updateuser="<button "+button_type2+button_action2+button_class2+">Update Account Info</button>";
                
                var button_type ="type = "+'"' +"button" +'" '+" id="+'"'+"indexlogout"+'"';
                var button_action = "onclick ="+'"'+"check_logout()"+'"';
                var button_class = "class ="+ '"'+"mybutton"+'"';
                var logout="<button "+button_type+button_action+button_class+">Logout</button>";
                
                var button_type3 ="type = "+'"' +"button" +'" '+" id="+'"'+"homepage"+'"';
                var button_action3 = "onclick ="+'"'+"show_posts(0)"+'"';
                var button_class3 = "class ="+ '"'+"mybutton"+'"';
                var show_posts="<button "+button_type3+button_action3+button_class3+">LogBook</button>";
                
                var button_type4 ="type = "+'"' +"button" +'" '+" id="+'"'+"showprofile"+'"';
                var button_action4 = "onclick ="+'"'+"show_posts(1)"+'"';
                var button_class4 = "class ="+ '"'+"mybutton"+'"';
                var showprofile="<button "+button_type4+button_action4+button_class4+">Show Profile</button>";
                
                var button_type5 ="type="+'"'+"text"+'" '+" id="+'"'+"DiffUserPosts"+'"'+"title="+'"'+"Search for another User";                
                var button_class5 ="class="+'"'+"search user"+'"';
                var input="<input "+button_type5+button_class5+"/>";
                
                var button_type6 ="type = "+'"' +"button" +'" '+" id="+'"'+"searchuser"+'"';
                var button_action6 = "onclick ="+'"'+"show_posts(2)"+'"';
                var button_class6 = "class ="+ '"'+"mybutton"+'"';
                var searchuser="<button "+button_type6+button_action6+button_class6+">Search User</button>";
                
                var dropdownbutton="<button class="+'"'+"dropbtn"+'"'+">User Menu "+"<i class="+'"'+
                        "fa fa-caret-down"+'"'+"></i></button>";
                
                var dropdownbutton2="<button class="+'"'+"dropbtn2"+'"'+">Search User "+"<i class="+'"'+
                        "fa fa-caret-down"+'"'+"></i></button>";
                          
                document.getElementById("actionbuttons").innerHTML=
                        "<div class="+'"'+"dropdown2"+'"'+">"+
                        dropdownbutton2+"<div class="+'"'+"dropdown-content2"+'"'+'>'+
                        input+searchuser+"</div>"+"</div>"+                       
                        show_posts+
                        "<div class="+'"'+"dropdown"+'"'+">"+
                        dropdownbutton+"<div class="+'"'+"dropdown-content"+'"'+'>'+
                        showprofile+showusers+updateuser+logout+"</div>"+"</div>";
                document.getElementById("loginscreen").style.display="block";
                loged=true;
                document.getElementById("login").style.display="none";
                document.getElementById("form2").style.display="none";
            }
            else if(http.status===400){
                alert(http.responseText);
                document.getElementById("login_message").innerHTML="Couldn't Log in";
                document.getElementById("login_message").style.color = "red";
            }
        };
        http.send(params);
        setTimeout(function(){
            if(loged==true){
                show_posts(0);
            }
        }, 2000);
    }
    //else{alert("Oops something went wrong");}
}
function check_logout()
{
    var http = new XMLHttpRequest();
    http.open('GET', '/logbook/LogoutServlet',true);
        http.onload = function() {
            // Do whatever with response
            console.log(http.responseText);
            document.getElementById("username").value=" ";
            document.getElementById("email").value=" ";
            document.getElementById("password1").value="";
            document.getElementById("firstname").value=" ";
            document.getElementById("lastname").value=" ";
            document.getElementById("birthday").value="";
            //document.getElementById("country").value=" ";
            document.getElementById("city").value=" ";
            document.getElementById("address").value=" ";
            document.getElementById("prof").value=" ";
            document.getElementById("interests").value=" ";
            document.getElementById("info").value=" ";
            document.getElementById("login").style.display="none";
            document.getElementById("form1").style.display="none";
            document.getElementById("loginscreen").style.display="none";
            document.getElementById("intro").style.display="block";
            var button_type ="type = "+'"' +"button" +'" '+" id="+'"'+"indexlogin"+'"';
            var button_action = "onclick ="+'"'+"login()"+'"';
            var button_class = "class ="+ '"'+"mybutton"+'"';
            var login="<button "+button_type+button_action+button_class+">Login</button>";
            var button_type1 ="type = "+'"' +"button" +'" '+" id="+'"'+"indexsign"+'"';
            var button_action1 = "onclick ="+'"'+"signup()"+'"';
            var button_class1 = "class ="+ '"'+"mybutton"+'"';
            var signup="<button "+button_type1+button_action1+button_class1+">Sign Up</button>";
            document.getElementById("actionbuttons").innerHTML=login + signup;
        };
        http.send();
}
function show_user_info()
{
    document.getElementById("username").value=" ";
    document.getElementById("email").value=" ";
    document.getElementById("password1").value="";
    document.getElementById("password2").value="";
    document.getElementById("firstname").value=" ";
    document.getElementById("lastname").value=" ";
    document.getElementById("birthday").value="";
    document.getElementById("country").value=" ";
    document.getElementById("city").value=" ";
    document.getElementById("address").value=" ";
    document.getElementById("prof").value=" ";
    document.getElementById("interests").value=" ";
    document.getElementById("info").value=" ";
    document.getElementById("prof_message").innerHTML = "";
    document.getElementById("address2_message").innerHTML = "";
    document.getElementById("address_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("lastname_message").innerHTML = "";
    document.getElementById("firstname_message").innerHTML = "";
    document.getElementById("password_message").innerHTML = "";
    document.getElementById("email_message").innerHTML = "";
    document.getElementById("username_message").innerHTML = "";
    var http = new XMLHttpRequest();
        http.open('GET', '/logbook/GetUserInfo',true);
        http.onload = function() {
            if(http.status===200){
                console.log(http.responseText);
                var response=JSON.parse('{'+http.responseText+'}');
                console.log(http.responseText);
                document.getElementById("username").value=response.username;
                document.getElementById("email").value=response.email;
                document.getElementById("password1").value=response.password;
                document.getElementById("password2").value=response.password;
                document.getElementById("firstname").value=response.firstname;
                document.getElementById("lastname").value=response.lastname;
                var date=new Date(response.birthdate);
                
                if(response.gender == "Male") document.getElementById("male").checked=true;
                else if(response.gender == "Female") document.getElementById("female").checked=true;
                else if(response.gender == "Other") document.getElementById("other").checked=true;
                    
                document.getElementById("birthday").valueAsDate=date;
                document.getElementById("country").value=response.country;
                document.getElementById("city").value=response.city;
                document.getElementById("address").value=response.address;
                document.getElementById("prof").value=response.profession;
                document.getElementById("interests").value=response.interests;
                document.getElementById("info").value=response.info;
                
                var button_typeDEL ="type = "+'"' +"button" +'" '+" id="+'"'+"deleteuser"+'"';
                var button_actionDEL = "onclick ="+'"'+"delete_user()"+'"';
                var button_classDEL = "class ="+ '"'+"mybutton"+'"';
                var deleteuser="<button "+button_typeDEL+button_actionDEL+button_classDEL+">Delete account</button>";
                
                var button_type ="type = "+'"' +"button" +'" '+" id="+'"'+"updateuser"+'"';
                var button_action = "onclick ="+'"'+"update_user()"+'"';
                var button_class = "class ="+ '"'+"mybutton"+'"';
                var update="<button "+button_type+button_action+button_class+">Update account</button>";
            
                document.getElementById("buttonarea").innerHTML=update+deleteuser;
                document.getElementById("form1").style.display="block";
                document.getElementById("form2").style.display="none";
                document.getElementById("intro").style.display="none";
                document.getElementById("loginscreen").style.display="none";
            }
        };
        http.send();
}
function update_user(){
    document.getElementById("prof_message").innerHTML = "";
    document.getElementById("address2_message").innerHTML = "";
    document.getElementById("address_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("lastname_message").innerHTML = "";
    document.getElementById("firstname_message").innerHTML = "";
    document.getElementById("password_message").innerHTML = "";
    document.getElementById("email_message").innerHTML = "";
    document.getElementById("username_message").innerHTML = "";
    
    var gender;
    if(document.getElementById("male").checked) gender="Male";
    else if(document.getElementById("female").checked) gender = "Female";
    else gender="Other";
    
    var patt_username = new RegExp("[a-zA-Z]{8,}");
    var res_username=patt_username.test(document.getElementById("username").value);
    if (res_username === false) {
      document.getElementById("username_message").innerHTML ="Please enter a valid Username";
      document.getElementById("username_message").style.color = "red";
    }

    var patt_email=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res_email=patt_email.test(document.getElementById("email").value);
    if (res_email === false) {
        document.getElementById("email_message").innerHTML ="Please enter a valid Email";
        document.getElementById("email_message").style.color = "red";
    }

    var patt_password=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/);
    var res_password=patt_password.test(document.getElementById("password1").value);
    if (res_password === false) {
        document.getElementById("password_message").innerHTML ="Please enter a valid Password";
        document.getElementById("password_message").style.color = "red";
    }

    var patt_name=new RegExp("[a-zA-Z]{3,15}");
    var res_name=patt_name.test(document.getElementById("firstname").value);
    if (res_name == false) {
        document.getElementById("firstname_message").innerHTML ="Please enter a valid First Name";
        document.getElementById("firstname_message").style.color = "red";
    }
    var res_surname=patt_name.test(document.getElementById("lastname").value);
    if (res_surname == false) {
        document.getElementById("lastname_message").innerHTML ="Please enter a valid Last Name";
        document.getElementById("lastname_message").style.color = "red";
    }

    var date=document.getElementById("birthday").value;
    if (date == '') {
        document.getElementById("birthday_message").innerHTML ="Please enter a valid Date";
        document.getElementById("birthday_message").style.color = "red";
    }
    var today = new Date();
    var birthdate = new Date(date);
    var age = today.getFullYear() - birthdate.getFullYear();
    var res_age=true;
    if (age < 18) {
        document.getElementById("birthday_message").innerHTML ="You must over 18.";
        document.getElementById("birthday_message").style.color = "red";
        res_age=false;
    }

    var patt_city=new RegExp("[a-zA-Z]{3,15}");
    var res_city=patt_city.test(document.getElementById("city").value);
    if (res_city == false) {
        document.getElementById("address_message").innerHTML ="Please enter a valid City";
        document.getElementById("address_message").style.color = "red";
    }

    var patt_addr=new RegExp("[a-zA-Z0-9\s]{1,50}");
    var address;
    var res_addr=patt_addr.test(document.getElementById("address").value);
    if (res_addr == false) {
        if(document.getElementById("address").value=="")
        {
            res_addr=true;
            address="";
        }
        else
        {
        document.getElementById("address2_message").innerHTML ="Please enter a valid Address";
        document.getElementById("address2_message").style.color = "red";
        }
    }
    else if(document.getElementById("address").value=="undefined")
    {
            res_addr=true;
            address="";
    }
    else{
        address=document.getElementById("address").value;
    }

    var patt_prof=new RegExp("[a-zA-Z]{3,15}");
    var res_prof=patt_prof.test(document.getElementById("prof").value);
    if (res_prof == false) {
        document.getElementById("prof_message").innerHTML ="Please enter a valid profession";
        document.getElementById("prof_message").style.color = "red";
    }

    if(res_username==true && res_email==true && res_password==true && checkPassword() &&
    res_name==true  && res_surname==true && res_age==true && res_city==true && res_addr==true && res_prof==true) 
    {
        
        var username="username="+document.getElementById("username").value;
        var email="email=" + document.getElementById("email").value;
        var password="password=" + document.getElementById("password1").value;
        var firstname="firstname=" + document.getElementById("firstname").value;
        var lastname="lastname=" + document.getElementById("lastname").value;
        var birthdate1="birthdate=" + document.getElementById("birthday").value;
        var country="country=" + document.getElementById("country").value;
        var city="city=" + document.getElementById("city").value;
        var address1="address=" + address;
        var gender1="gender=" + gender;
        var prof="prof=" + document.getElementById("prof").value;
        var interests="interests=" + document.getElementById("interests").value;
        var info="info=" + document.getElementById("info").value;
        var toServer=username+'&'+email+'&'+password+'&'+firstname+'&'+lastname+'&'+birthdate1+'&'+gender1+'&'+
                country+'&'+city+'&'+address1+'&'+prof+'&'+interests+'&'+info;
     
        var http = new XMLHttpRequest();
        http.open('POST', '/logbook/UpdateUser',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            if(http.status==200)
            {
                alert(http.responseText);
            }
            
            else{
                alert("Oops,something went wrong:"+http.responseText);
            }
        };
        http.send(toServer);
    }

    else
    {
        alert("Oops,something went wrong!!");
    }

}

function show_users(){
    var http = new XMLHttpRequest();
        http.open('GET', '/logbook/ShowUsers',true);
        http.onload = function() {
            // Do whatever with response
            document.getElementById("addpost").style.display="none";
            document.getElementById("postareabutton").style.display="none";
            document.getElementById("infoscreen").innerHTML=(http.responseText);
        };
        http.send();
    
    document.getElementById("loginscreen").style.display="block";
    document.getElementById("form1").style.display="none";
    document.getElementById("form2").style.display="none";
    document.getElementById("intro").style.display="none";
}
function check_session()
{
    document.getElementById("intro").style.display="none";
    var loged=false;
    var http = new XMLHttpRequest();
        http.open('GET', '/logbook/CheckSession',true);
        http.onload = function() {
            console.log(http.responseText);
            if(http.status==200)
            {
                var button_type1 ="type = "+'"' +"button" +'" '+" id="+'"'+"showusers"+'"';
                var button_action1 = "onclick ="+'"'+"show_users()"+'"';
                var button_class1 = "class ="+ '"'+"mybutton"+'"';
                var showusers="<button "+button_type1+button_action1+button_class1+">Show users</button>";
                
                var button_type2 ="type = "+'"' +"button" +'" '+" id="+'"'+"updateuser"+'"';
                var button_action2 = "onclick ="+'"'+"show_user_info()"+'"';
                var button_class2 = "class ="+ '"'+"mybutton"+'"';
                var updateuser="<button "+button_type2+button_action2+button_class2+">Update Account Info</button>";
                
                var button_type ="type = "+'"' +"button" +'" '+" id="+'"'+"indexlogout"+'"';
                var button_action = "onclick ="+'"'+"check_logout()"+'"';
                var button_class = "class ="+ '"'+"mybutton"+'"';
                var logout="<button "+button_type+button_action+button_class+">Logout</button>";
                
                var button_type3 ="type = "+'"' +"button" +'" '+" id="+'"'+"homepage"+'"';
                var button_action3 = "onclick ="+'"'+"show_posts(0)"+'"';
                var button_class3 = "class ="+ '"'+"mybutton"+'"';
                var show_posts="<button "+button_type3+button_action3+button_class3+">LogBook</button>";
                
                var button_type4 ="type = "+'"' +"button" +'" '+" id="+'"'+"showprofile"+'"';
                var button_action4 = "onclick ="+'"'+"show_posts(1)"+'"';
                var button_class4 = "class ="+ '"'+"mybutton"+'"';
                var showprofile="<button "+button_type4+button_action4+button_class4+">Show Profile</button>";
                
                var button_type5 ="type="+'"'+"text"+'" '+" id="+'"'+"DiffUserPosts"+'"'+"title="+'"'+"Search for another User";                
                var button_class5 ="class="+'"'+"search user"+'"';
                var input="<input "+button_type5+button_class5+"/>";
                
                var button_type6 ="type = "+'"' +"button" +'" '+" id="+'"'+"searchuser"+'"';
                var button_action6 = "onclick ="+'"'+"show_posts(2)"+'"';
                var button_class6 = "class ="+ '"'+"mybutton"+'"';
                var searchuser="<button "+button_type6+button_action6+button_class6+">Search User</button>";
                
                var dropdownbutton="<button class="+'"'+"dropbtn"+'"'+">User Menu "+"<i class="+'"'+
                        "fa fa-caret-down"+'"'+"></i></button>";
                
                var dropdownbutton2="<button class="+'"'+"dropbtn2"+'"'+">Search User "+"<i class="+'"'+
                        "fa fa-caret-down"+'"'+"></i></button>";
                          
                document.getElementById("actionbuttons").innerHTML=
                        "<div class="+'"'+"dropdown2"+'"'+">"+
                        dropdownbutton2+"<div class="+'"'+"dropdown-content2"+'"'+'>'+
                        input+searchuser+"</div>"+"</div>"+                       
                        show_posts+
                        "<div class="+'"'+"dropdown"+'"'+">"+
                        dropdownbutton+"<div class="+'"'+"dropdown-content"+'"'+'>'+
                        showprofile+showusers+updateuser+logout+"</div>"+"</div>";
                document.getElementById("loginscreen").style.display="block";
                loged=true;
                document.getElementById("login").style.display="none";
                document.getElementById("form2").style.display="none";
            }
            else document.getElementById("intro").style.display="block";
        };
        http.send();
        setTimeout(function(){
            if(loged==true){
                show_posts(0);
            }
        }, 1000);
        
}
function signup(){
    document.getElementById("username").value=" ";
    document.getElementById("email").value=" ";
    document.getElementById("password1").value="";
    document.getElementById("password2").value="";
    document.getElementById("firstname").value=" ";
    document.getElementById("lastname").value=" ";
    document.getElementById("birthday").value="";
    //document.getElementById("country").value="";
    document.getElementById("city").value=" ";
    document.getElementById("address").value=" ";
    document.getElementById("prof").value=" ";
    document.getElementById("interests").value=" ";
    document.getElementById("info").value=" ";
    document.getElementById("prof_message").innerHTML = "";
    document.getElementById("address2_message").innerHTML = "";
    document.getElementById("address_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("birthday_message").innerHTML = "";
    document.getElementById("lastname_message").innerHTML = "";
    document.getElementById("firstname_message").innerHTML = "";
    document.getElementById("password_message").innerHTML = "";
    document.getElementById("email_message").innerHTML = "";
    document.getElementById("username_message").innerHTML = "";
    
    var button_type ="type = "+'"' +"button" +'" '+" id="+'"'+"signup"+'"';
    var button_action = "onclick ="+'"'+"check_formdata()"+'"';
    var button_class = "class ="+ '"'+"mybutton"+'"';
    var signup="<button "+button_type+button_action+button_class+">Sign Up</button>";
    document.getElementById("buttonarea").innerHTML=signup;
    document.getElementById("form1").style.display="block";
    document.getElementById("intro").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("form2").style.display="none";
    document.getElementById("loginscreen").style.display="none";
}
function login(){
    document.getElementById("form1").style.display="none";
    document.getElementById("intro").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("form2").style.display="none";
    document.getElementById("loginscreen").style.display="none";
}

function check_post(mode){
    var desc=document.getElementById("postdescription").value;
    var descres=true;
    if(desc=="")
    {
        descres=false;
    }
    
    var lon=document.getElementById("lon").value;
    var patt_lon = new RegExp(/^[-+]?[0-9]+\.[0-9]+$/);
    var res_lon=patt_lon.test(lon);
    if (res_lon!=true){
        alert("Enter a valid lon value");
    }
    var lat=document.getElementById("lat").value;
    var res_lat=patt_lon.test(lat);
    if (res_lat!=true){
        alert("Enter a valid lat value");
    }
    
    var imurl=document.getElementById("picurl").value;
    var patt_url=new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    var res_imurl=patt_url.test(imurl);
    if(imurl== "")
    {
        res_imurl=true;
    }
    
    if(res_imurl==false)
    {
        alert("Enter a valid image url value");
    }
    var linkurl=document.getElementById("linkurl").value;
    var res_linkurl=patt_url.test(linkurl);
    if(linkurl== "")
    {
        res_linkurl=true;
    }
    
    if(res_linkurl==false)
    {
        alert("Enter a valid link url value");
    }
    var base64="";
    if(document.getElementById("imagefile").value!="")
        {
            document.getElementById("picurl").value="";
            imurl="";
            document.getElementById("imagefromurl").src="";
            base64=document.getElementById("initcanvas").toDataURL("image/jpeg",1);
            console.log(base64);
            alert("only 1 picture is valid,so base64 is used and URL is discarded");
        }
    if(descres && res_lon && res_lat && res_imurl && res_linkurl){
        var toServer="description="+desc+"&lon="+lon+"&lat="+lat+"&imageurl="+imurl+"&base64="+base64+"&resourceurl="+linkurl;
        
        var http = new XMLHttpRequest();
        http.open('POST', '/logbook/PostServlet',true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            if(http.status==200)
            {
                console.log(http.responseText);
                show_posts(mode);
            }
            
            else{
                alert("Oops,something went wrong:"+http.responseText);
            }
        };
        http.send(toServer);
    }
}

function render_image(){
    document.getElementById("imagefromurl").src="";
    var obj = new Image();
    var imurl=document.getElementById("picurl").value;
    var patt_url=new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    var res_imurl=patt_url.test(imurl);
    
    if(imurl== "")
    {
        res_imurl=true;
    }
    if(res_imurl==true)
    {
        obj.src = document.getElementById("picurl").value;
        obj.onload = function() {
            document.getElementById("imagefromurl").src=obj.src;
            document.getElementById("imagefromurl").style.display="block";
        };
        obj.onerror = function() {
            document.getElementById("imagefromurl").style.display="none";
            document.getElementById("imagefromurl").src="";
            document.getElementById("picurl").value="";
            alert("image failed to load fron online resource");
        };
    }
}
function show_post_area(){
    var x = document.getElementById("addpost");
    if (window.getComputedStyle(x).display === "none") {
        document.getElementById("addpost").style.display="block";
    }
    else{
        document.getElementById("addpost").style.display="none";
    }
}
function show_posts(mode){
  document.getElementById("loginscreen").style.display="block";
  document.getElementById("form1").style.display="none";
  document.getElementById("form2").style.display="none";
  document.getElementById("intro").style.display="none";
  var username;
  var flag=false;
  if(mode==0){
      username="";
      flag=true;
      document.getElementById("postareabutton").style.display="inline-block";
      document.getElementById("postbutton").onclick=function(){check_post(0);show_posts(0);};
      alert("Show top 10 post in general");
  }
  else if(mode==1){
      username="";
      flag=true;
      document.getElementById("postareabutton").style.display="inline-block";
      document.getElementById("postbutton").onclick=function(){check_post(1);show_posts(1);};
      alert("Show my top 10 posts");
  }
  
  else if(mode==2){
      document.getElementById("addpost").style.display="none";
      document.getElementById("postareabutton").style.display="none";
      username=document.getElementById("DiffUserPosts").value;
      var patt_username = new RegExp("[a-zA-Z]{8,}");
      var res_username=patt_username.test(document.getElementById("DiffUserPosts").value);
      if(!res_username){
            flag=false;
           alert("Enter a valid username");
      }
      else{
          flag=true;
      }
  }
  if(flag){
    var toServer = "username=" + username + "&mode=" + mode;
    var session;
            var http2 = new XMLHttpRequest();
            http2.open('GET', '/logbook/getSession', true);
                http2.onload = function () {
                // Do whatever with response
                    if(http2.status==200){
                        session=http2.responseText;
                    }
                };
            http2.send();
    var http = new XMLHttpRequest();
    http.open('POST', '/logbook/ShowPosts', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
        if (http.status == 200)
        {
            console.log(http.responseText);
            var html="";
            var tmpids=[];
            var tmplon=[];
            var tmplat=[];
            var response=JSON.parse('{'+http.responseText+'}');
            for (var i = 0; i < response.posts.length; i++) {
                var counter = response.posts[i];
                var createdAt=new Date(counter.createdAt);
                html=html+"<p><button type='button' class='mybutton2' onclick='pop_up("+counter.postID+");'>"+moment(createdAt).fromNow()+
                        " "+counter.username+" said:<br>"+counter.description+"<br>";
                if(counter.imageURL!="" && counter.imageURL!="null")html=html+"<image src='"+counter.imageURL+"' class='imagepost'>"; 
                if(counter.imageBase64!="" && counter.imageBase64!="null")html=html+"<image src='"+counter.imageBase64+"' class='imagepost'>";
                html=html+"<span id='"+counter.postID+"'></span>";
                html=html+"</button></p>";
                var uname=counter.username;
                if(session==uname){
                    html=html+"<button type='button' class='mybutton' onclick='delete_post("+counter.postID+','+mode+");'>Delete Post..</button><br>";
                }
                tmpids[i]=counter.postID;
                tmplon[i]=counter.longitude;
                tmplat[i]=counter.latitude;
            }
            document.getElementById("infoscreen").innerHTML=html;
        setTimeout(function(){
                for(var y = 0; y < tmpids.length; y++){
                post_address(tmplon[y],tmplat[y],tmpids[y]);
            }    
        }, 2000);
        } else {
            alert("Oops,something went wrong:" + http.responseText);
        }
    };
    http.send(toServer);
  }
}

function pop_up(postid){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    var toServer="postid="+postid;
    var http = new XMLHttpRequest();
    http.open('POST', '/logbook/GetPostByID', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
        if (http.status == 200)
        {
            var counter=JSON.parse(http.responseText);
            document.getElementById("modalmap").innerHTML="";
            document.getElementById("modalheader").innerHTML="PostID: "+ counter.postID;
            var html="";
            html=html+"<p id='modalpar'>"+"Username:<br>"+counter.username+"<br><br>Description:<br>"+counter.description;
            html=html+"<br><br>Created At:<br>"+counter.createdAt;
            if(counter.imageURL!="" && counter.imageURL!="null")html=html+"<br><br><image src='"+counter.imageURL+"' class='imagepost'>"; 
            if(counter.imageBase64!="" && counter.imageBase64!="null")html=html+"<image src='"+counter.imageBase64+"' class='imagepost'>";
            if (counter.resourceURL != "" && counter.resourceURL != "null")
                html = html + "<br><br>Resource URL:<br><a href='"+
                        counter.resourceURL + "' target='_blank'>" + counter.resourceURL + "</a>";
            html = html + "<br><br>Longitude: <br>" + counter.longitude + "<br><br>Latitude: <br>" + counter.latitude;
            html = html + "</p>";
            document.getElementById("modalinfo").innerHTML = html;

            

            var map = new OpenLayers.Map("modalmap");
            map.addLayer(new OpenLayers.Layer.OSM());
            var lon = parseFloat(counter.longitude);
            var lat = parseFloat(counter.latitude);
            var lonLat = new OpenLayers.LonLat(lon, lat).transform(
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    map.getProjectionObject() // to Spherical Mercator Projection
                    );

            var zoom = 16;

            var markers = new OpenLayers.Layer.Markers("Markers");
            map.addLayer(markers);

            markers.addMarker(new OpenLayers.Marker(lonLat));

            map.setCenter(lonLat, zoom);
        } else {
            alert("Oops,something went wrong:" + http.responseText);
        }
    };
    http.send(toServer);
}

function delete_post(postid,mode){
    var toServer="postid="+postid;
    var http = new XMLHttpRequest();
    http.open('POST', '/logbook/DeletePostByID', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
        if (http.status == 200)
        {
            alert(http.responseText);
        }
        else {
            alert("Oops,something went wrong:" + http.responseText);
        }
    };
    http.send(toServer);
    show_posts(mode);
}

function autocomplete_lonlat(){
    var lon;
    var lat;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat= position.coords.latitude; 
            lon= position.coords.longitude;
            document.getElementById("lon").value=lon;
            document.getElementById("lat").value=lat;
        });
    }
    else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

function post_address(lon,lat,postID){
    var retval;
    var Url = "https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&" + "&lat=" + lat + "&lon=" + lon;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {

            if (xmlHttp.responseText == "[]" || xmlHttp.responseText == "")
            {
                alert("Location could not be found.");
            } else
            {
                var location = JSON.parse(xmlHttp.responseText);
                retval=location.display_name;
                document.getElementById(postID).innerHTML=retval;
                return retval;
            }
            console.log(xmlHttp.responseText);
        }
        //else throw new Error(xmlHttp.response);
    };
    xmlHttp.open("GET", Url, true); // true for asynchronous 
    xmlHttp.send();
}
function clear_input(){
    document.getElementById('imagefile').value="";
    var canvas = document.getElementById('initcanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
}
function check_image_file(){
    var imageLoader = document.getElementById('imagefile');
    var canvas = document.getElementById('initcanvas');
    var ctx = canvas.getContext('2d');
    if(imageLoader.files[0].size>400*1024){
        imageLoader.value=null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
        alert("Max image size is 400kb");
        return ;
    }
    imageLoader.addEventListener('change', handleImage, false);
    function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.style.display = "block";
            ctx.drawImage(img,0,0);
            document.getElementById("imagefromurl").src="";
            document.getElementById("picurl").value="";
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);     
    }
}

function delete_user(){
    var r = confirm("Delete User?");
    if (r == true) {
        var http = new XMLHttpRequest();
        http.open('GET', '/logbook/DeleteUser', true);
        http.onload = function () {
            // Do whatever with response
            console.log(http.responseText);
            document.getElementById("username").value = " ";
            document.getElementById("email").value = " ";
            document.getElementById("password1").value = "";
            document.getElementById("firstname").value = " ";
            document.getElementById("lastname").value = " ";
            document.getElementById("birthday").value = "";
            //document.getElementById("country").value=" ";
            document.getElementById("city").value = " ";
            document.getElementById("address").value = " ";
            document.getElementById("prof").value = " ";
            document.getElementById("interests").value = " ";
            document.getElementById("info").value = " ";
            document.getElementById("login").style.display = "none";
            document.getElementById("form1").style.display = "none";
            document.getElementById("loginscreen").style.display = "none";
            document.getElementById("intro").style.display = "block";
            var button_type = "type = " + '"' + "button" + '" ' + " id=" + '"' + "indexlogin" + '"';
            var button_action = "onclick =" + '"' + "login()" + '"';
            var button_class = "class =" + '"' + "mybutton" + '"';
            var login = "<button " + button_type + button_action + button_class + ">Login</button>";
            var button_type1 = "type = " + '"' + "button" + '" ' + " id=" + '"' + "indexsign" + '"';
            var button_action1 = "onclick =" + '"' + "signup()" + '"';
            var button_class1 = "class =" + '"' + "mybutton" + '"';
            var signup = "<button " + button_type1 + button_action1 + button_class1 + ">Sign Up</button>";
            document.getElementById("actionbuttons").innerHTML = login + signup;
            console.log(http.responseText);
        }
        http.send();
    }
    else{
        alert("Deletion Cancelled");
    }
}