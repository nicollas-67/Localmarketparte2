function login() {
    var nome = $("#nome").val();
    var senha = $("#senha").val();

    if (nome && senha && nome === "admin" && senha === "12345") {
        const user = {
            name: nome,
            DataEntrada: new Date(),
            id: Math.floor(Math.random() * 100000)
        };

        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "../Loja";
    } else {
        document.getElementById("error-modal").style.display = "block";

        document.getElementById("nome").style.borderBottom =
            "3px solid rgba(0, 0, 0, 0)";

        document.getElementById("senha").style.borderBottom =
            "3px solid rgb(0, 0, 0)";
    }
}