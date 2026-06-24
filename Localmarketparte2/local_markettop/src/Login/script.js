function login(){
    var nome= $("#nome").val()
    var senha=$("#senha").val()

    if (nome & senha && nome === "admin" && senha === "12345"){
        const user = {
            name: nome,
            DataEntrada:new Date (),
            id:Math.florr(Math.random() * 100000)
        }
        localStorage.setItem("usuario", JSON.stringify(user))
        window.location.href = "../Loja"
    }else{
        document.getElementById("error-modal").style.display = "none"
        document.getElementById("nome").style.borderbottom = "3px solid rgba(0, 0, 0, 0)"
        document.getElementById("senha").style.borderbottom = "3px solid rgb(0, 0, 0)"


    }
}
function showPassword(){
    var inputSenha = document.querySelector ('#senha')
    var img_eye = document.querySelector ('#eye')

    if(inputSenha.getAttribute("type") === "password"){
        inputSenha.setAttribute("type", "text")
        img_eye.setAttribute("src", "../../public/hide.png")
    }else{
        inputSenha.setAttribute("type", "password" )
        img_eye.setAttribute("src", "../../public/view.png")
    }
}