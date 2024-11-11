from flask import Flask, request, jsonify, render_template, send_from_directory
from googletrans import Translator

app = Flask(__name__)

# Configurando o caminho para os templates
app.template_folder = '.'  # Define o diretório de templates como a raiz do projeto

# Lista de idiomas
languages = [
    { 'code': 'es', 'name': 'Selecione' },
    { 'code': 'en', 'name': 'Inglês' },
    { 'code': 'pt', 'name': 'Português' },
    { 'code': 'es', 'name': 'Espanhol' },
    { 'code': 'fr', 'name': 'Francês'},
    { 'code': 'tr', 'name': 'Turco' },
    { 'code': 'ja', 'name': 'Japonês' },
    { 'code': 'de', 'name': 'Alemão' },
    { 'code': 'id', 'name': 'Indonésio' },
    { 'code': 'ru', 'name': 'Russo' },
    { 'code': 'ur', 'name': 'Urdu' },
    { 'code': 'te', 'name': 'Telugo' },
    { 'code': 'zh-CN', 'name': 'Chinês mandarim' },
    { 'code': 'sw', 'name': 'Suaíli' },
    { 'code': 'mr', 'name': 'Marati' },
]

@app.route('/')
def index():
    return render_template('index.html', languages=languages)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data['text']
    source_lang = data['source_lang']
    target_lang = data['target_lang']

    translated_text = translate_text(text, source_lang, target_lang)
    return jsonify({'translated_text': translated_text})


def translate_text(text, source_lang, target_lang):
    translator = Translator()
    translation = translator.translate(text, src=source_lang, dest=target_lang)
    return translation.text

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)






