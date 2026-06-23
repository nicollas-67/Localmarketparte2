$(document).ready(function () {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listElement = $("#lista");
    const totalElement = $("#total");

    function exibirCarrinho() {
        listElement.empty();
        let totalPreco = 0;

        $.each(carrinho, function (index, item) {
            const listItem = $("<li>").text(
                `${item.desc} - Preço: $${item.valor.toFixed(2)}`
            );

            const removeButton = $("<button>")
                .text("❌")
                .css("margin-left", "10px")
                .click(function () {
                    removerItem(index);
                });

            listItem.append(removeButton);
            listElement.append(listItem);

            totalPreco += item.preco;
        });

        totalElement.text(`Total: $${totalPreco.toFixed(2)}`);
    }

    function removerItem(index) {
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

    const listaHtml = listaClone.innerHTML;
    const totalHtml = totalElement.innerHTML;

    const conteudoHtml = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>PEDIDO CONFIRMADO</h1>
            <h3>Agradecemos a sua compra e sua preferência.</h3>
            <br>
            ${listaHtml}
            <br><br>
            ${totalHtml}
        </body>
    </html>
    `;

    const blob = new Blob([conteudoHtml], {
        type: "application/msword"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "pedido.doc";
    link.click();

    document.getElementById("pedido").style.display = "block";
}

function successClose() {
    document.getElementById("pedido").style.display = "none";
}