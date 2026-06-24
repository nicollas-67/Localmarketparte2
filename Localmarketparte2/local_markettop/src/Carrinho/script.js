$(document).ready(function () {
    const listElement = $("#lista");
    const totalElement = $("#total");

    function exibirCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        listElement.empty();

        let totalPreco = 0;

        $.each(carrinho, function (index, item) {
            const valor = Number(item.valor) || 0;

            const listItem = $("<li>").text(
                `${item.valor} - Preço: R$ ${valor.toFixed(2)}`
            );

            const removeButton = $("<button>")
                .text("❌")
                .css("margin-left", "10px")
                .click(function () {
                    removerItem(index);
                });

            listItem.append(removeButton);
            listElement.append(listItem);

            totalPreco += valor;
        });

        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`);
    }

    function removerItem(index) {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho.splice(index, 1);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        exibirCarrinho();
    }

    exibirCarrinho();
});

function gerar() {
    const listElement = document.getElementById("lista");
    const totalElement = document.getElementById("total");

    const listaClone = listElement.cloneNode(true);

    $(listaClone).find("button").remove();

    const conteudoHtml = `
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Pedido</title>
        </head>
        <body>
            <h1>PEDIDO CONFIRMADO</h1>
            <h3>Agradecemos a sua compra e preferência.</h3>

            <ul>
                ${listaClone.innerHTML}
            </ul>

            <br>

            <h3>${totalElement.innerHTML}</h3>
        </body>
    </html>
    `;

    const blob = new Blob(
        [conteudoHtml],
        { type: "application/msword" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "pedido.doc";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    document.getElementById("pedido").style.display = "block";
}

function successClose() {
    document.getElementById("pedido").style.display = "none";
}