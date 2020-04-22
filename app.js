//documentacion

//https://firebase.google.com/docs/firestore/quickstart

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBWArmjmTamyGUO1i1n0wO52hRfKb_nfd4',
    authDomain: 'crud-2e82e.firebaseapp.com',
    projectId: 'crud-2e82e'
});

var db = firebase.firestore();

//AGREGAR DOCUMENTOS de forma dinamica

function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function(docRef) {

            console.log("Document written with ID: ", docRef.id);

            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}


//Leer documentos de firebase

var tabla = document.getElementById('tabla');


db.collection("users").onSnapshot((querySnapshot) => {

    //limpiar tabla

    tabla.innerHTML = '';

    querySnapshot.forEach((doc) => {

        console.log(`${doc.id} => ${doc.data().first}`);

        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-warning" onClick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button></td>
            <td><button class="btn btn-danger" onClick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        
        `;
    });
});


//BORRAR O ELIMINAR DATOS
function eliminar(id) {
    //pasar id
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

//EDITAR DATOS O DOCUMENTOS

function editar(id, nombre, apellido, fecha) {

    //para pasar al formulario
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    //para que el boton cambie de guardar a editar

    var boton = document.getElementById('boton');

    //crear boton Editar

    boton.innerHTML = 'Editar';

    //y al presionar el boton editar ejecuta la siguiente instruccion

    boton.onclick = function() {

        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'

        //LOS CAMPOS SE MODIFICAN
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;

        return washingtonRef.update({

                /****traer objetos*/
                first: nombre,
                last: apellido,
                born: fecha

            })
            .then(function() {
                console.log("Document successfully updated!");
                //PARA QUE DESPUES DE EDITAR SE VUELVA A MOSTRAR EL BOTON GUARDAR
                boton.innerHTML = 'Guardar';

                //SE LIMPIEN LOS CAMPOS

                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';


            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }


}