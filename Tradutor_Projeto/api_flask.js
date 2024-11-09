// Espera que o DOM (Document Object Model) esteja completamente carregado antes de executar a função.
document.addEventListener("DOMContentLoaded", function() {
    // Adiciona um listener de evento ao botão de tradução que chama a função translateText quando clicado.
    document.getElementById('translateButton').addEventListener('click', translateText);
});

// Define a função translateText que será chamada quando o botão de tradução for clicado.
function translateText() {
    // Obtém o texto inserido pelo usuário na área de texto com id 'inputText'.
    const inputText = document.getElementById('inputText').value;
    // Obtém o valor do idioma de destino selecionado pelo usuário no seletor com id 'targetLang'.
    const destLang = document.getElementById('targetLang').value;

    // Envia uma requisição HTTP POST para o endpoint '/translate'.
    fetch('/translate', {
        method: 'POST', // Define o método HTTP como POST.
        headers: {
            'Content-Type': 'application/json' // Define o cabeçalho para indicar que o corpo da requisição é JSON.
        },
        // Converte o objeto com o texto e o idioma de destino em uma string JSON e define como o corpo da requisição.
        body: JSON.stringify({
            text: inputText,
            dest_lang: destLang
        })
    })
    .then(response => response.json()) // Converte a resposta do servidor para JSON.
    .then(data => {
        // Se a resposta contém um erro, exibe um alerta com a mensagem de erro.
        if (data.error) {
            alert(data.error);
        } else {
            // Caso contrário, define o texto traduzido no elemento com id 'outputText'.
            document.getElementById('outputText').value = data.translated_text;
        }
    })
    .catch(error => {
        // Se ocorrer um erro durante a requisição, exibe o erro no console do navegador.
        console.error('Error:', error);
    });
}
