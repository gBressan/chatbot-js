let chatbotState = "awaitingChoice";

// Respostas predefinidas com palavras-chave associadas
const responses = [
    { keywords: ["oi", "ola", "e aí", "opa"], response: "Olá, sou o Bob. Como posso ajudar?" },
    { keywords: ["tudo bem", "como vai"], response: "Sim, estou bem! E você?" },
    { keywords: ["tudo sim", "sim"], response: "Que bom, como posso ajudar você hoje?" },
    { keywords: ["seu nome", "quem é você"], response: "Meu nome é Bob, e fui criado para responder suas dúvidas" },
    { keywords: ["adeus", "tchau", "até logo"], response: "Até logo! Volte sempre!" },
    { keywords: ["o que é 5g", "5g"], response: "O 5G é a quinta geração de tecnologia de redes móveis, oferecendo alta velocidade e baixa latência para conectividade de dispositivos." },
    { keywords: ["distribuição de 5g em santa catarina", "5g em santa catarina", "distribuição"], response: "A rede 5G está em expansão em Santa Catarina, especialmente nas principais cidades como Florianópolis, Joinville e Blumenau. A cobertura ainda é limitada em áreas rurais." },
    { keywords: ["cidades com 5g em santa catarina", "5g cidades sc", "cidades"], response: "As cidades de Santa Catarina com maior cobertura 5G são Florianópolis, Joinville, Blumenau, Itajaí e Chapecó. Outras cidades também estão recebendo gradualmente essa infraestrutura." },
    { keywords: ["vantagens do 5g", "benefícios 5g"], response: "O 5G oferece maior velocidade de download e upload, menor latência e maior capacidade de conexão simultânea de dispositivos, o que é essencial para o avanço de tecnologias como IoT." },
    { keywords: ["5g e iot", "iot"], response: "O 5G facilita o desenvolvimento de tecnologias de Internet das Coisas (IoT), permitindo uma conectividade constante e de alta velocidade para dispositivos inteligentes em áreas urbanas e industriais." },
    { keywords: ["desafios da implementação do 5g em santa catarina", "dificuldades do 5g em santa catarina", "dificuldades"], response: "Os desafios incluem altos custos de infraestrutura, regulamentações e a necessidade de expandir a cobertura para regiões mais afastadas das áreas urbanas." },
    { keywords: ["dados", "base de dados", "quais dados", "informações"], response: "Utilizamos como base a tabela da Agência Nacional de Telecomunicações Gaispi, chamada 'Liberação e planejamento 3,5GHz', disponibilizada pela Anatel no início de 2024."},
    { keywords: ["o que é 3,5ghz", "frequência 3,5ghz", "3,5ghz"], response: "A frequência de 3,5GHz representa a velocidade de dados transportados em ondas de rádio, sendo usada para a implementação do 5G no estado de Santa Catarina, incluindo nossa internet móvel."},
    { keywords: ["planejamento", "implementação", "como foi planejado", "etapas"], response: "O planejamento e implementação do 5G em 3,5GHz no estado são divididos em fases, cada uma indicando as cidades contempladas, as datas e os avanços no desenvolvimento."},
    { keywords: ["quais cidades", "municípios", "locais"], response: "As cidades contempladas para a implementação da frequência de 3,5GHz estão organizadas em fases, como indicado na tabela Gaispi. Você gostaria de saber mais sobre alguma cidade específica?"},
    { keywords: ["fases", "etapas do 5g", "cronograma"], response: "As fases de desenvolvimento do 5G em Santa Catarina são baseadas nas datas e municípios presentes no cronograma disponibilizado pela Anatel."},
    { keywords: ["gráficos", "representação visual", "dados visualizados"], response: "A implementação do 5G pode ser representada por gráficos que mostram as fases, as datas e os municípios contemplados em Santa Catarina. Deseja ver algum gráfico específico?"},
    { keywords: ["anatel", "tabela gaispi", "fonte dos dados"], response: "Os dados utilizados neste planejamento foram retirados da tabela Gaispi, da Agência Nacional de Telecomunicações (Anatel), lançada no início de 2024."},
    { keywords: ["métricas", "dados temporais", "liberação", "planejamento"], response: "Analisamos as métricas temporais da Liberação e Planejamento da frequência 3,5GHz, cruzando variáveis como 'Fase' e 'Cidade' para facilitar a compreensão." },
    { keywords: ["como calcular", "cálculo realizado", "cálculo baseado"], response: "O cálculo foi realizado com base na região geográfica, cruzando as variáveis 'Fase' e 'Cidade' e usando as 'Regiões' como filtro." },
    { keywords: ["variáveis", "fase e cidade", "cruzamento de dados"], response: "As variáveis 'Fase' e 'Cidade' foram analisadas para entender a correlação entre a implementação do 5G nas regiões de Santa Catarina." },
    { keywords: ["regiões", "filtros", "filtro regiões"], response: "Utilizamos as regiões como filtro para facilitar a análise e melhor representar os dados referentes à implementação da frequência de 3,5GHz." },
    { keywords: ["análise", "como foi analisado", "método de análise"], response: "Realizamos uma análise cruzada entre as variáveis geográficas e temporais, obtendo uma média final da correlação entre os parâmetros." },
    { keywords: ["média final", "resultado", "correlação"], response: "O resultado da análise foi a obtenção da média final da correlação entre as variáveis 'Fase' e 'Cidade', utilizando filtros regionais." },
    { keywords: ["parâmetros", "variáveis analíticas", "cruzamento de parâmetros"], response: "Os parâmetros analisados incluem 'Fase', 'Cidade' e 'Região', permitindo identificar tendências e correlações no planejamento do 5G." },
    { keywords: ["tecnologia 3,5ghz", "estado de santa catarina", "3,5ghz aplicado", "aplicado"], response: "Santa Catarina é um dos poucos estados com a tecnologia 3,5GHz aplicada em todo o território, implementada gradualmente conforme a demanda." },
    { keywords: ["regiões destacadas", "litoral catarinense", "grande florianópolis", "litoral norte"], response: "O litoral catarinense, especialmente a Grande Florianópolis e o Litoral Norte, foi destaque na implementação da tecnologia 3,5GHz devido à alta demanda de dados nessas áreas." },
    { keywords: ["desenvolvimento no oeste", "última fase", "regiões periféricas"], response: "O Oeste catarinense recebeu a tecnologia 3,5GHz apenas na última fase do processo, mostrando que regiões periféricas crescem em menor ritmo em comparação às metropolitanas." },
    { keywords: ["expansão da tecnologia", "volume de dados", "prioridade"], response: "A expansão da tecnologia 3,5GHz ocorreu de acordo com o volume de dados transitados, priorizando regiões como a Grande Florianópolis e Joinville, que possuem maior densidade de uso." }
];

let jsonData = [];

// Carrega o JSON com as informações dos municípios
fetch('DadosPlanilha.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

// Opções de menu para a interação inicial
const options = {
    "1": "Você escolheu falar com o Bob, o que deseja perguntar a ele?",
    "2": "Iniciando análise de dados! Para fechar o PDF, digite 'voltar ao chat'",
    "3": "Por favor, informe o município para o qual deseja filtrar."
};

// Função que exibe as opções iniciais
function showOptions() {
    addMessage("Bem-vindo ao Chatbot 5G SC! Escolha uma das opções:<br><br>1 - Falar com o Bob<br>2 - Análise de Dados<br>3 - Filtrar por município<br><br> Para voltar a este menu digite: 'menu'", true, false);
}

function removeAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Função para encontrar a resposta mais relevante com base nas palavras-chave
function findResponse(userMessage) {
       // Remove os acentos e coloca em minúsculas
       const normalizedMessage = removeAcentos(userMessage).toLowerCase();

       for (const { keywords, response } of responses) {
           for (const keyword of keywords) {
               // Normaliza as palavras-chave também
               const normalizedKeyword = removeAcentos(keyword).toLowerCase();
   
               if (normalizedMessage.includes(normalizedKeyword)) {
                   return response;
               }
           }
       }
       return "Desculpe, não entendi a sua pergunta.";
   }




// Função para adicionar mensagens ao chat
function addMessage(message, isBot = false, showIcon = true) {
    const chatBox = document.getElementById("chat-box");

    // Criação do contêiner da mensagem
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message");
    messageContainer.classList.add(isBot ? "bot-message" : "user-message");

    // Adicionar o ícone do bot apenas se showIcon for verdadeiro
    if (isBot && showIcon) {
        const botIcon = document.createElement("img");
        botIcon.src = 'styles/bot.png';
        botIcon.alt = 'Bot Icon';
        botIcon.classList.add('bot-icon');
        messageContainer.appendChild(botIcon);
    }

    // Criação do elemento de texto
    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.innerHTML = message;
    messageContainer.appendChild(messageText);

    // Adiciona a mensagem ao chat
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função de envio de mensagem
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim().toLowerCase();

    // Evita envio de mensagem vazia
    if (message === "") {
        return; // Não faz nada se a entrada estiver vazia
    }

    // Exibe a mensagem do usuário
    addMessage(userInput.value, false);
    userInput.value = "";

    // Verifica se o comando "menu" foi digitado para voltar ao menu inicial
    if (message === "menu") {
        chatbotState = "awaitingChoice";
        showOptions();
        return;
    }

    if (message === "voltar ao chat") {
        closePDF(); // Fecha o PDF
        chatbotState = "awaitingChoice"; // Retorna ao estado inicial
        showOptions(); // Exibe as opções iniciais
        return;
    }

    // Processa a opção 3 - Escolher município
    if (message === "3" && chatbotState === "awaitingChoice") {
        chatbotState = "choosingMunicipality";
        addMessage("Por favor, informe o município para o qual deseja filtrar.", true);
        return;
    }

    // Processa a entrada para município
    if (chatbotState === "choosingMunicipality") {
        const selectedMunicipality = jsonData.find(item =>
            item["Município"].toLowerCase().trim() === message.toLowerCase().trim()
        );

        if (selectedMunicipality) {
            const formattedResponse = `
                <strong>Município:</strong> ${selectedMunicipality["Município"]}<br>
                <strong>UF:</strong> ${selectedMunicipality["UF"]}<br>
                <strong>Data da Liberação:</strong> ${selectedMunicipality["Data da Liberação"]}<br>
                <strong>IBGE:</strong> ${selectedMunicipality["IBGE"]}<br>
                <strong>Data de início:</strong> ${selectedMunicipality["Data de início das atividades de migração (EAF)"]}<br>
                <strong>Região:</strong> ${selectedMunicipality["Região"]}<br>
                <strong>FASE:</strong> ${selectedMunicipality["FASE"]}
            `;
            addMessage(formattedResponse, true);
        } else {
            addMessage("Município não encontrado. Tente novamente.", true);
        }

        // NÃO alterar para 'awaitingChoice' aqui, apenas exibe a resposta do município
        // Isso impede o chatbot de voltar para o menu imediatamente após mostrar os dados
        return;
    }

    if (message === "matrix") {
        startRain();
    } else if (message === "stop") {
        stopRain();
    }

    // Resposta padrão para as opções
    if (chatbotState === "awaitingChoice") {
        if (options[message]) {
            addMessage(options[message], true);
            if (message === "2") {
                showPDF();
            }
            chatbotState = "chatting";
        } else {
            addMessage("Opção inválida. Por favor, escolha uma opção válida.", true);
        }
    } else {
        const response = findResponse(message);
        addMessage(response, true);
    }
}



// Função para exibir o PDF
function showPDF() {
    const mainContainer = document.querySelector(".main-container");
    const pdfContainer = document.getElementById("pdf-container");
    const chatContainer = document.querySelector(".chat-container");
    const pdfFrame = document.getElementById("pdf-frame");

    // Define o caminho do PDF
    pdfFrame.src = 'analise.pdf';

    if (pdfContainer.classList.contains("active")) {
        pdfContainer.classList.remove("active");
        chatContainer.classList.remove("reduced");
        chatContainer.classList.add("centered");
    } else {
        pdfContainer.classList.add("active");
        chatContainer.classList.remove("centered");
        chatContainer.classList.add("reduced");
    }

    mainContainer.classList.toggle("pdf-active");
}

// Função para fechar o PDF
function closePDF() {
    const mainContainer = document.querySelector(".main-container");
    const pdfContainer = document.getElementById("pdf-container");
    const chatContainer = document.querySelector(".chat-container");

    pdfContainer.classList.remove("active");
    chatContainer.classList.remove("reduced");
    chatContainer.classList.add("centered");
    mainContainer.classList.remove("pdf-active");
}

// Exibe as opções iniciais ao carregar a página
showOptions();

// Adiciona o evento para enviar a mensagem ao pressionar Enter
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});


// Adiciona o evento para enviar a mensagem ao pressionar Enter
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Se a tecla pressionada for Enter
        event.preventDefault(); // Evita a ação padrão (submeter um formulário)
        sendMessage(); // Envia a mensagem
    }
});




function addMessage(message, isBot = false, showIcon = true) {
    const chatBox = document.getElementById("chat-box");

    // Criação do contêiner da mensagem
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message", isBot ? "bot-message" : "user-message", "message-enter");

    // Adicionar o ícone do bot apenas se showIcon for verdadeiro
    if (isBot && showIcon) {
        const botIcon = document.createElement("img");
        botIcon.src = 'styles/bot.png';
        botIcon.alt = 'Bot Icon';
        botIcon.classList.add('bot-icon');
        messageContainer.appendChild(botIcon);
    }

    // Criação do elemento de texto
    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.innerHTML = message;
    messageContainer.appendChild(messageText);

    // Adiciona a mensagem ao chat
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Remove a classe de transição após a animação
    setTimeout(() => {
        messageContainer.classList.remove("message-enter");
    }, 500); // 500ms é o tempo da animação
}



// Função para gerar texto aleatório
function randomText() {
    const text = "1@uSx^()*";
    const letters = text[Math.floor(Math.random() * text.length)];
    return letters;
  }
  
// ___________________________________________________________________________________________________________

  let rainInterval; // Variável para armazenar o intervalo da chuva

  // Função para criar a chuva de caracteres
  function createRain() {
      const header = document.querySelector(".chat-header");
  
      // Criar uma nova "gota" de chuva
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Caracter aleatório
      header.appendChild(drop);
  
      // Configurar posição e tamanho da gota
      const left = Math.random() * header.offsetWidth; // Posição horizontal aleatória
      drop.style.left = `${left}px`;
      drop.style.fontSize = `${Math.random() * 1.5 + 0.5}em`; // Tamanhos variados
  
      // Remover a gota após a animação
      setTimeout(() => {
          drop.remove();
      }, 2000);
  }
  
  // Função para iniciar a chuva
  function startRain() {
      if (!rainInterval) { // Iniciar apenas se ainda não estiver ativo
          rainInterval = setInterval(createRain, 100);
      }
  }
  
  // Função para parar a chuva
  function stopRain() {
      clearInterval(rainInterval);
      rainInterval = null;
  }
  

