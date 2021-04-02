function validation(user){
    var name = document.getElementById("name").value.trim();

    var valid = true;

    if(!name){
        valid = false;
        document.getElementById("p_name").innerHTML = "name can't be empty";
    }else{
        document.getElementById("p_name").innerHTML = "";
    }
    var birthDate =  new Date(document.getElementById("birth").value);
    var purchaseDate = new Date(document.getElementById("acquired").value);
    var instarDate = new Date(document.getElementById("l_date").value);

    if(birthDate>purchaseDate){
        document.getElementById("p_purchaseDate").innerHTML = "Purchase date before Date of birth!";
        valid=false;
    }else{
        document.getElementById("p_purchaseDate").innerHTML = "";
    }

    if(birthDate>instarDate){
         document.getElementById("p_instarDate").innerHTML = "Instar date before Date of birth!";
         valid=false;
    }else{
        document.getElementById("p_instarDate").innerHTML = "";
    }

    if(valid){
        edit(user);
    }
}

function edit(user){
    let invert = {
            "id" : document.getElementById("invert_id").value,
            "type" : document.getElementById("type").value,
            "name" : document.getElementById("name").value.trim(),
            "specie": document.getElementById("specie").value,
            "sex": document.getElementById("sex").value,
            "birth": document.getElementById("birth").value,
            "acquired": document.getElementById("acquired").value
        };

        let instar = {
            "id" : document.getElementById("instar_id").value,
            "l" : document.getElementById("l").value,
            "moltDate" : document.getElementById("l_date").value
        }

         invert["user"] = user;
         instar["invertebrate"] = invert;
         let json = JSON.stringify(instar);

         var token = document.querySelector('meta[name="_csrf"]').content;
         var header = document.querySelector('meta[name="_csrf_header"]').content;


        let xhr = new XMLHttpRequest();
             xhr.open("POST", '/api/updateInvert' , false);
             xhr.setRequestHeader(header, token);
             xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
             xhr.send(json);
        if(xhr.status = 200){
            var name =  document.getElementById("name").value;
            var type = document.getElementById("type").value;
            alert(type +" '" + name + "' updated.")
            window.location.replace(window.location.origin + "/myInverts")
        }
}