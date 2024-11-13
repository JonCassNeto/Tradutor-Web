document.addEventListener("DOMContentLoaded", function() {
    // Adiciona um listener de evento ao botão de tradução que chama a função translateText quando clicado.
    document.getElementById('translateButton').addEventListener('click', translateText);
});

function translateText() {
    // Obtém o texto inserido pelo usuário na área de texto com id 'inputText'.
    const inputText = document.getElementById('inputText').value;
    // Obtém o valor do idioma de entrada selecionado pelo usuário no seletor com id 'sourceLang'.
    const sourceLang = document.getElementById('sourceLang').value;
    // Obtém o valor do idioma de saída selecionado pelo usuário no seletor com id 'targetLang'.
    const targetLang = document.getElementById('targetLang').value;

    // Verifica se todos os campos foram preenchidos.
    if (!inputText || !sourceLang || !targetLang) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Adiciona um ícone de carregamento enquanto a tradução está sendo realizada (pode ser uma animação ou texto).
    document.getElementById('outputText').value = "Traduzindo...";

    // Envia uma requisição HTTP POST para o endpoint '/translate'.
    fetch('/translate', {
        method: 'POST', // Define o método HTTP como POST.
        headers: {
            'Content-Type': 'application/json' // Define o cabeçalho para indicar que o corpo da requisição é JSON.
        },
        // Converte o objeto com o texto, idioma de origem e idioma de destino em uma string JSON e define como o corpo da requisição.
        body: JSON.stringify({
            text: inputText,
            source_lang: sourceLang, // Corrigido para enviar 'source_lang' em vez de 'sourceLang'.
            target_lang: targetLang  // Corrigido para enviar 'target_lang' em vez de 'targetLang'.
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
        document.getElementById('outputText').value = "Erro na tradução. Tente novamente.";
    });
}
