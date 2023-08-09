
//variables
const emailRegister = document.getElementById("email-register"),
userRegister = document.getElementById("user-register"),
passwordRegister = document.getElementById("password-register"),
confirmPasswordRegister = document.getElementById("confirm-password-register"),
sendButtonRegister = document.getElementById("send-button-register");

let sendDataDB={
    emailCorrect : false,
    userNotNull : false,
    passwordCorrect : false
},
id,errorRegisterCard = document.getElementById("errorRegister"),
greenColorVerification = "1px solid rgb(44, 255, 29)",
redColorVerification = "1px solid rgb(255, 30, 30";

window.addEventListener("load",async ()=>{
   await axios({
        method : "get",
        url : "http://localhost:3000/api/getIDFromDB",
        responseType : "json"
    }).then(response =>{
        data = response.data
        id = data.length
    })
})

sendButtonRegister.addEventListener("click", async ()=>{
   const valid = new validAllInputFromWeb(emailRegister,userRegister,passwordRegister,confirmPasswordRegister);
   
    //validar todo lo correspondiente al email
    valid.validEmailClass(emailRegister.value);

    //validar todo lo correspondiente al user
    valid.validUserClass(userRegister.value);

    //validar todo lo correspondiente a la contraseña  y la confirmacion de esta
    valid.validPassword();

    //verificar las validaciones
    if(sendDataDB.emailCorrect === true && sendDataDB.userNotNull === true && sendDataDB.passwordCorrect === true){
        errorRegisterCard.innerHTML = "";   
        await axios({
            method: "post",
            url: "http://localhost:3000/api/sendRegisterData",
            data : {
                id : `${id}`,
                user: `${userRegister.value}`,
                password : `${passwordRegister.value}`,
                email : `${emailRegister.value}`
            }
        }).then(response =>{
            if(response.data == true){
                errorRegisterCard.innerHTML = "El usuario ya esta registrado";
                emptyInputRegister();
                normalBorder();

            }else{
                errorRegisterCard.innerHTML = "El usuario se registro correctamente";
                emptyInputRegister();
                normalBorder();
            }
        })
    }
})

//vaciar el value de todos los input del register
function emptyInputRegister(){
    let allInputs = document.querySelectorAll(".allRegister"),
    length = allInputs.length;

    for(let i = 0;  i < length; i++){
        allInputs[i].value = "";
    }
}

function normalBorder(){
    let allInputs = document.querySelectorAll(".allRegister"),
    length = allInputs.length;

    for(let i = 0;  i < length; i++){
        allInputs[i].style.border = "1px solid white";
        allInputs[i].style.borderBottom = "1px solid black";
    }
}

function validEmailFunction(email){
    return new Promise((resolve,reject)=>{
        //expresion para validar el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(emailRegex.test(email)){
            resolve(true);
        }else{
            resolve(false);
        }
    });
}

function validUserFunction(user){
    return new Promise((resolve,reject)=>{
        if(user !== ""){
            resolve(true);
        }else{
            resolve(false);
        }
    })
}

//validar cada una de los input para verificar si estan correctos y mandar los errores necesarios
class validAllInputFromWeb{
    constructor(Email,User,Password,ConfirmPassword){
        this.email = Email;
        this.user = User;
        this.password = Password;
        this.confirmPassword = ConfirmPassword;
    }

    validEmailClass(emailValue){
        validEmailFunction(emailValue)
        .then((valid)=>{
            if(valid){
                this.email.style.border = greenColorVerification;
                sendDataDB.emailCorrect = true;
            }else{
                sendDataDB.emailCorrect = false;
                this.email.style.border = redColorVerification;
                errorRegisterCard.innerHTML = "Email no valido"
            }
        }).catch((error)=>{
            console.log("error al validar el correo", error);
        })
    }

    validUserClass(userValue){
        validUserFunction(userValue)
        .then((valid)=>{
            if(valid){
                sendDataDB.userNotNull = true
                this.user.style.border = greenColorVerification;
            }else{
                sendDataDB.userNotNull = false
                this.user.style.border = redColorVerification;
                errorRegisterCard.innerHTML = "Usuario no valido";
            }
        }).catch((error)=> console.log("Error al validar el user", error));
    }

    validPassword(){
        if(this.password.value.length < 8 ){
            sendDataDB.passwordCorrect = false
            this.password.style.border = redColorVerification;
            this.confirmPassword.style.border = redColorVerification;
            errorRegisterCard.innerHTML = "La debe de contener 8 caracteres min";
        }else if(this.password.value !== "" && this.confirmPassword.value == ""){
            sendDataDB.passwordCorrect = false
            this.password.style.border = greenColorVerification;
            this.confirmPassword.style.border = redColorVerification;
            errorRegisterCard.innerHTML = "Las contraseñas no son iguales";
        }else if(this.password.value !== this.confirmPassword.value){
            sendDataDB.passwordCorrect = false
            this.password.style.border = greenColorVerification;
            this.confirmPassword.style.border = redColorVerification;
            errorRegisterCard.innerHTML = "Las contraseñas no son iguales";
        }else if(this.password.value === this.confirmPassword.value){
            sendDataDB.passwordCorrect = true
            this.password.style.border = greenColorVerification;
            this.confirmPassword.style.border = greenColorVerification;
        }else{
            sendDataDB.passwordCorrect = false
            this.confirmPassword.style.border = redColorVerification;
            errorRegisterCard.innerHTML = "La contraseña no es valida";
        }
    }
}