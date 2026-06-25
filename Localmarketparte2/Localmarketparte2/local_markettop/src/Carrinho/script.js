$(document).ready(function () {
    const listElement = $("#lista");
    const totalElement = $("#total");
    function converterValor(valor) {
        return parseFloat(
            String(valor)
                .replace("R$", "")
                .replace("$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        ) || 0;
    }
    function exibirCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        listElement.empty();
        let totalPreco = 0;
        $.each(carrinho, function (index, item) {
            const valor = converterValor(item.valor);

            const listItem = $(`
                <li style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:15px;
                    margin-bottom:10px;
                    background:#f5f5f5;
                    border-radius:8px;
                    list-style:none;
                ">
                    <span>
                        ${item.valor}
                    </span>

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:15px;
                    ">
                        <span style="
                            font-weight:bold;
                            min-width:120px;
                            text-align:right;
                        ">
                            ${valor.toLocaleString('pt-BR',{
                                style:'currency',
                                currency:'BRL'
                            })}
                        </span>

                        <button style="
                            background:#dc3545;
                            color:white;
                            border:none;
                            width:35px;
                            height:35px;
                            border-radius:6px;
                            cursor:pointer;
                        ">
                            ❌
                        </button>
                    </div>
                </li>
            `);
            listItem.find("button").click(function () {
                removerItem(index);
            });
            listElement.append(listItem);
            totalPreco += valor;
        });
        totalElement.text(
            `Total: ${totalPreco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}`
        );
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