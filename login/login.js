
//swiper
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper-container', {
    effect: 'cards',
    cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate : 2,
        rotate: true,
        slideShadows: true 
    },
  });

//variables
const userLogin = document.getElementById("user-login"),
passwordLogin = document.getElementById("password-login"),
sendButtonLogin = document.getElementById("send-button-login");
let enter = {
    userValueFull : false,
    passwordValueFull : false
},
errorLoginCard = document.getElementById("errorLogin"),
greenColorVerification = "1px solid rgb(44, 255, 29)",
redColorVerification = "1px solid rgb(255, 30, 30";

//codigo 
//ver si no falta ningun dato por ingresar

intoWebSiteWithButton();


 function intoWebSiteWithButton(){
    sendButtonLogin.addEventListener("click", async ()=>{
        const validALl = new validInputLogin(userLogin,passwordLogin);
    
        validALl.validUserLogin(userLogin.value);
        validALl.validPasswordLogin(passwordLogin.value);

        if(enter.passwordValueFull == true && enter.userValueFull == true ){
            await axios({
                method : "post",
                url : "http://localhost:3000/api/enterToWebSite",
                data : {
                    user : `${userLogin.value}`,
                    password : `${passwordLogin.value}`
                }
            }).then(response=>{
                if(response.data == true){
                    window.location.href = "index.html";
                }else {
                    userLogin.style.border = redColorVerification;
                    passwordLogin.style.border = redColorVerification;
                    errorLoginCard.innerHTML = "El usuario no esta registrado";
                }
            }).catch(error =>{
                console.log(error);
            })
        }
    });
}

class validInputLogin{
    constructor (User,Password){
        this.user = User;
        this.password = Password;
    }

    validUserLogin(user){
        if(user !== ""){
            enter.userValueFull = true;
        }else{
            enter.userValueFull =false;
        }
    }
    validPasswordLogin(password){
        if(password.length < 8 ){
            errorLoginCard.innerHTML = "La contraseña debe contener 8 caracteres";
            enter.passwordValueFull =false
        }else if(password !== ""){
            enter.passwordValueFull = true
        }else{
            enter.passwordValueFull =false
        }
    }
}