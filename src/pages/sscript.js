// Array para armazenar os itens cadastrados
const itens = [];

// Função para adicionar um item
function adicionarItem() {
    const itemInput = document.getElementById("item");
    const selectItens = document.getElementById("Recorrencia");

    const novoItem = itemInput.value.trim();

    if (novoItem === "") {
        alert("Por favor, digite um nome de item válido.");
        return;
    }

    // Adicionar o novo item ao array
    itens.push(novoItem);

    // Limpar o campo de entrada
    itemInput.value = "";

    // Atualizar o select com os itens cadastrados
    atualizarSelect(selectItens);
}

// Função para atualizar o select com os itens cadastrados
function atualizarSelect(select) {
    // Limpar todas as opções existentes no select
    select.innerHTML = "";

    // Adicionar uma opção vazia (opcional)
    const optionVazia = document.createElement("option");
    optionVazia.value = "";
    optionVazia.textContent = "Selecione um item";
    select.appendChild(optionVazia);

    // Adicionar cada item como uma opção no select
    for (const item of itens) {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    }
}
