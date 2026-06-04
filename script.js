/* ==========================================================================
   PSICOVOZES - LÓGICA DE INTERATIVIDADE (VANILLA JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LINHA DE PROGRESSO SUPERIOR & NAVBAR MOBILE
       ========================================================================== */
    const pageProgressBar = document.getElementById('pageProgressBar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Menu Mobile
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em algum link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (pageProgressBar) {
            pageProgressBar.style.width = scrollPercent + '%';
        }
    });


    /* ==========================================================================
       2. WIDGET DE COMENTÁRIOS E REAÇÕES
       ========================================================================== */
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    const reactionButtons = document.querySelectorAll('.reaction-btn');

    // Reações Rápidas
    reactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const span = button.querySelector('span');
            let count = parseInt(span.textContent);
            
            if (button.classList.contains('active')) {
                span.textContent = count + 1;
            } else {
                span.textContent = count - 1;
            }
        });
    });

    // Submissão de Comentários
    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userNameInput = document.getElementById('commentUserName');
            const commentTagSelect = document.getElementById('commentTag');
            const commentTextInput = document.getElementById('commentText');

            let userName = userNameInput.value.trim();
            if (!userName.startsWith('@')) {
                userName = '@' + userName;
            }

            const text = commentTextInput.value.trim();
            const tagValue = commentTagSelect.value;
            const tagText = commentTagSelect.options[commentTagSelect.selectedIndex].text;

            // Iniciais do Avatar
            const avatarLetters = userName.replace('@', '').substring(0, 2).toUpperCase();

            // Criar Elemento
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.style.opacity = '0';
            commentItem.style.transform = 'translateY(15px)';
            commentItem.style.transition = 'all 0.4s ease';

            commentItem.innerHTML = `
                <div class="comment-avatar" style="background-color: var(--primary);">${avatarLetters}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-user">${userName}</span>
                        <span class="comment-badge ${tagValue}">${tagText}</span>
                    </div>
                    <p class="comment-text">${text}</p>
                </div>
            `;

            commentsList.appendChild(commentItem);

            // Trigger animation
            setTimeout(() => {
                commentItem.style.opacity = '1';
                commentItem.style.transform = 'translateY(0)';
            }, 50);

            // Resetar form
            userNameInput.value = '';
            commentTagSelect.selectedIndex = 0;
            commentTextInput.value = '';
        });
    }


    /* ==========================================================================
       3. ANIMAÇÕES DE REVELAÇÃO NO SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const revealOnScrollOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, revealOnScrollOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });


    /* ==========================================================================
       4. TRANSIÇÃO EMOCIONAL - EFEITO DE TEXTO NO SCROLL
       ========================================================================== */
    const quoteText = document.getElementById('quoteText');
    const quoteSub = document.getElementById('quoteSub');
    const emotionalSection = document.querySelector('.emotional-transition');

    const phrases = [
        { text: "“O processo avançou. O diálogo, não.”", sub: "Talvez o conflito nunca tenha sido apenas jurídico." },
        { text: "“Cinco anos de audiências judiciais...”", sub: "E nenhuma palavra sincera foi trocada na mesa da sala." },
        { text: "“A dor que se cala dentro de uma casa...”", sub: "Mais tarde se transforma em uma petição de quinhentos mil reais." }
    ];

    let currentPhraseIndex = 0;
    
    if (emotionalSection && quoteText && quoteSub) {
        let isTransitioning = false;
        
        const changeQuote = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            quoteText.style.opacity = '0';
            quoteSub.style.opacity = '0';
            
            setTimeout(() => {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                quoteText.textContent = phrases[currentPhraseIndex].text;
                quoteSub.textContent = phrases[currentPhraseIndex].sub;
                
                quoteText.style.opacity = '1';
                quoteSub.style.opacity = '1';
                isTransitioning = false;
            }, 600);
        };

        // Troca a frase automaticamente a cada 6 segundos quando a seção está visível
        let quoteInterval;
        const emotionalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quoteInterval = setInterval(changeQuote, 5000);
                } else {
                    clearInterval(quoteInterval);
                }
            });
        }, { threshold: 0.1 });

        emotionalObserver.observe(emotionalSection);
    }


    /* ==========================================================================
       5. SISTEMA DE ESCOLHAS E CONSEQUÊNCIAS NARRATIVAS (INTERAÇÕES 1 A 5)
       ========================================================================== */
    const choiceButtons = document.querySelectorAll('.choice-btn');

    const choiceConsequences = {
        // Interação 1 - Início do Conflito
        "1": {
            "A": {
                narrative: "A família decide internar Neto imediatamente. Eles acreditam estar agindo em proteção, mas o diálogo familiar é quebrado de forma fatal. Neto é conduzido à força, a raiva acumula-se e a barreira emocional entre pais e filho solidifica-se em um abismo jurídico.",
                quote: "“Nem todo cuidado consegue escutar.”"
            },
            "B": {
                narrative: "Os pais buscam alternativas de acolhimento psicológico aberto e promovem espaços de diálogo em casa. Neto sente que sua subjetividade e voz são respeitadas, participando ativamente de seu processo de saúde. O sofrimento familiar é tratado sem trancar o filho.",
                quote: "“Escuta também pode ser proteção.”"
            },
            "C": {
                narrative: "A família escolhe ignorar a posse da maconha e fingir que tudo está perfeito. O silêncio doméstico se aprofunda, a angústia de Neto permanece sem apoio ou escuta, e o abismo afetivo entre pais e filho aumenta a cada dia.",
                quote: "“O silêncio também produz consequências.”"
            }
        },
        // Interação 2 - O Manicômio
        "2": {
            "A": {
                narrative: "A instituição psiquiátrica foca na restrição de visitas e medicação dopante de Neto. O comportamento físico é regulado, mas ele perde progressivamente a autonomia, sua voz é tratada apenas como sintoma e ele se sente profundamente anulado como ser humano.",
                quote: "“Quando o cuidado vira contenção, o sofrimento muda de forma.”"
            },
            "B": {
                narrative: "A instituição psiquiátrica prioriza a escuta ativa e o acolhimento terapêutico individualizado. Neto não é reduzido a um diagnóstico frio; ele encontra um espaço seguro para expressar medos e desabafos, mantendo sua integridade de cidadão livre.",
                quote: "“Humanizar também é tratar.”"
            }
        },
        // Interação 3 - O Processo Judicial
        "3": {
            "A": {
                narrative: "A justiça tradicional foca na determinação fria de culpados sob regras processuais, definindo o valor da indenização civil. O processo burocrático chega a uma conclusão, mas o ressentimento, as mágoas ocultas e as feridas familiares permanecem intocados e abertos.",
                quote: "“Nem toda sentença encerra uma dor.”"
            },
            "B": {
                narrative: "O sistema de justiça opta por encaminhar o caso para canais de diálogo e Justiça Restaurativa. O foco deixa de ser culpabilizar legalmente e passa a abranger a escuta das mágoas e danos invisíveis criados, focando em responsabilização e reparação real.",
                quote: "“Conflitos atingem pessoas antes de atingir processos.”"
            }
        },
        // Interação 4 - Justiça Restaurativa
        "4": {
            "A": {
                narrative: "O facilitador prioriza ouvir Neto expor os traumas sofridos no isolamento. Ele finalmente consegue verbalizar o sofrimento e o desamparo de se sentir abandonado pela própria família, encontrando a validação emocional que desejava.",
                quote: "“Ser ouvido também pode ser reparação.”"
            },
            "B": {
                narrative: "As partes decidem assinar um acordo rápido de conciliação financeira para encerrar o processo. O conflito jurídico formal é resolvido, mas as quebras de confiança e os sentimentos de rejeição familiar continuam reprimidos e intocados.",
                quote: "“Nem toda pressa resolve o sofrimento.”"
            },
            "C": {
                narrative: "Realiza-se um encontro onde a facilitadora guia a família na compreensão de como o medo dos pais e a falta de comunicação geral causaram o colapso do lar. Wilson e Meire finalmente enxergam a violência institucional a que submeteram o filho.",
                quote: "“Às vezes o conflito começa muito antes do processo.”"
            }
        },
        // Interação 5 - Luta Antimanicomial
        "5": {
            "A": {
                narrative: "O Diagnóstico Psiquiátrico Clínico: Ao reduzir o indivíduo a uma patologia psíquica ou rótulo moral, a sociedade anula sua história de vida e aniquila sua capacidade de participação comunitária e autonomia."
            },
            "B": {
                narrative: "A Falta de Escuta do Sofrimento: Silenciar a dor do outro e negar o direito de verbalizar angústias transforma a atenção em saúde mental em uma imposição autoritária de comportamento considerado 'normal'."
            },
            "C": {
                narrative: "O Isolamento Psíquico e Social: Acreditar que fechar pessoas em muros asilares é um cuidado de saúde, quando na verdade representa uma forma histórica de excluir indivíduos indesejáveis do convívio social."
            }
        }
    };

    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const interactionNum = button.getAttribute('data-interaction');
            const option = button.getAttribute('data-option');
            
            // Destacar o botão clicado
            const siblings = button.parentElement.querySelectorAll('.choice-btn');
            siblings.forEach(sib => sib.classList.remove('selected'));
            button.classList.add('selected');

            // Renderizar Consequência
            const feedbackContainer = document.getElementById(`feedback-i${interactionNum}`);
            const narrativeEl = document.getElementById(`narrative-i${interactionNum}`);
            const quoteEl = document.getElementById(`quote-i${interactionNum}`);

            const data = choiceConsequences[interactionNum][option];
            
            if (feedbackContainer && data) {
                narrativeEl.textContent = data.narrative;
                if (quoteEl && data.quote) {
                    quoteEl.textContent = data.quote;
                }
                
                feedbackContainer.classList.remove('hidden');
                
                // Rolar suavemente para a resposta se ela estiver longe da vista
                const rect = feedbackContainer.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });


    /* ==========================================================================
       6. QUIZ INTERATIVO (PRÁTICAS MANICOMIAIS)
       ========================================================================== */
    const quizSlide1 = document.getElementById('quiz-q1');
    const quizSlide2 = document.getElementById('quiz-q2');
    const quizResultPanel = document.getElementById('quiz-result-panel');
    const quizScoreText = document.getElementById('quiz-score-text');
    const btnRestartQuiz = document.getElementById('btnRestartQuiz');
    
    let score = 0;

    const setupQuizSlide = (slideEl, nextAction) => {
        if (!slideEl) return;
        const optButtons = slideEl.querySelectorAll('.quiz-opt-btn');
        const feedbackEl = slideEl.querySelector('.quiz-feedback');

        optButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Desabilitar botões após escolha
                optButtons.forEach(btn => btn.disabled = true);
                
                const isCorrect = button.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    score++;
                    button.classList.add('correct');
                    feedbackEl.className = 'quiz-feedback success';
                    feedbackEl.innerHTML = '<strong>Correto!</strong> O isolamento clínico desestrutura as redes de apoio do sujeito, gera estresse pós-traumático severo e agrava o sofrimento psíquico de forma destrutiva.';
                } else {
                    button.classList.add('wrong');
                    feedbackEl.className = 'quiz-feedback error';
                    feedbackEl.innerHTML = '<strong>Incorreto.</strong> A história da Reforma Psiquiátrica prova que o enclausuramento asilar funciona como violência higienista e anulação do sujeito, não como terapia.';
                }
                feedbackEl.classList.remove('hidden');

                // Passar para a próxima pergunta após um tempo
                setTimeout(nextAction, 3000);
            });
        });
    };

    // Fluxo do Quiz
    setupQuizSlide(quizSlide1, () => {
        quizSlide1.classList.add('hidden');
        quizSlide2.classList.remove('hidden');
    });

    setupQuizSlide(quizSlide2, () => {
        quizSlide2.classList.add('hidden');
        quizResultPanel.classList.remove('hidden');
        
        if (score === 2) {
            quizScoreText.innerHTML = `<strong>Você acertou 2 de 2 perguntas!</strong><br>Excelente reflexão! Você demonstra uma sólida compreensão dos direitos humanos e do modelo de cuidado aberto e humanizado preconizado pela Reforma Psiquiátrica.`;
        } else {
            quizScoreText.innerHTML = `<strong>Você acertou ${score} de 2 perguntas.</strong><br>O sofrimento mental exige escuta e convívio comunitário. A lógica asilar do confinamento ainda permeia muitas decisões domésticas e institucionais, gerando exclusão em vez de cuidado.`;
        }
    });

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener('click', () => {
            score = 0;
            
            // Resetar slides e botões
            [quizSlide1, quizSlide2].forEach(slide => {
                const optButtons = slide.querySelectorAll('.quiz-opt-btn');
                const feedbackEl = slide.querySelector('.quiz-feedback');
                
                optButtons.forEach(btn => {
                    btn.disabled = false;
                    btn.className = 'quiz-opt-btn';
                });
                feedbackEl.classList.add('hidden');
            });

            quizResultPanel.classList.add('hidden');
            quizSlide2.classList.add('hidden');
            quizSlide1.classList.remove('hidden');
        });
    }


    /* ==========================================================================
       7. NAVEGAÇÃO DE DOSSIÊ: DOCUMENTOS VAZADOS
       ========================================================================== */
    const docTabButtons = document.querySelectorAll('.doc-tab-btn');
    const docContents = document.querySelectorAll('.doc-content');

    docTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDocId = button.getAttribute('data-doc');

            // Trocar classe ativa nas abas
            docTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Trocar documento exibido
            docContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetDocId) {
                    content.classList.add('active');
                }
            });
        });
    });


    /* ==========================================================================
       8. ENTREVISTAS DINÂMICAS: SISTEMA DE PERGUNTAS E EFEITO DATILOGRAFIA
       ========================================================================== */
    const interviewQuestions = document.querySelectorAll('.q-btn');

    const speakerReplies = {
        neto: {
            q1: "Eu achei que estavam me levando pra conversar com alguém. Eu entrei no carro do meu pai achando que finalmente teríamos uma conversa franca sobre o nosso afastamento. Quando a porta daquela clínica fechou e o cadeado bateu, percebi que ninguém ali ia me perguntar nada. A pior parte não era o frio e o isolamento lá dentro... era saber que meus próprios pais tinham assinado o papel concordando com aquilo.",
            q2: "As pessoas olham o valor de 500 mil e acham que é ganância ou ingratidão de filho. Nunca foi sobre dinheiro. Se eles me dessem uma sentença escrita pelo juiz reconhecendo o que sofri, eu rasgaria o dinheiro. Eu quero que meu pai e minha mãe entendam a dor do isolamento que me causaram. A indenização é a única linguagem que a justiça convencional entende, mas a dor do silêncio não tem preço."
        },
        parents: {
            q1: "Naquele momento de desespero, achei que era a única saída para o Neto. Eu via ele se afastando de nós, tudo em casa virava grito e porta batida. Eu cresci numa época em que sofrimento psíquico não era discutido. Achei que os hospitais psiquiátricos fossem locais seguros de tratamento médico. Hoje eu vejo coisas que antes eu não via. É devastador ser tratado como inimigo por quem você tentou proteger.",
            q2: "Eu sentia que estava perdendo meu filho aos poucos, que ele estava se destruindo. Eu tinha medo de um dia ter que enterrar meu próprio filho. Até hoje eu lembro do olhar dele me pedindo socorro quando os enfermeiros o seguraram no portão. A culpa me corrói todas as noites. Uma parte de mim sabe que tentei proteger no desespero do medo, mas a outra se pergunta todos os dias por que eu não o abracei em vez de entregá-lo."
        }
    };

    interviewQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const speaker = button.getAttribute('data-speaker');
            const questionKey = button.getAttribute('data-question');
            
            // Destacar o botão
            const siblings = button.parentElement.querySelectorAll('.q-btn');
            siblings.forEach(sib => sib.classList.remove('active'));
            button.classList.add('active');

            // Selecionar painel de resposta
            const answerDisplay = document.getElementById(`ans-${speaker}`);
            const textEl = answerDisplay.querySelector('.typing-text');
            
            answerDisplay.classList.remove('hidden');
            
            // Interromper qualquer digitação anterior
            if (button.typingTimeout) {
                clearTimeout(button.typingTimeout);
            }

            const textToType = speakerReplies[speaker][questionKey];
            typeTextEffect(textEl, textToType, 15);
        });
    });

    // Função de Efeito Typewriter
    function typeTextEffect(element, text, speed = 20) {
        element.textContent = "";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                // Armazenar o timeout no elemento para poder pará-lo
                element.typingTimeout = setTimeout(type, speed);
            }
        }
        
        // Limpar qualquer timeout anterior pendente no elemento
        if (element.typingTimeout) {
            clearTimeout(element.typingTimeout);
        }
        type();
    }


    /* ==========================================================================
       9. SIMULADOR DE CÍRCULO RESTAURATIVO
       ========================================================================== */
    const circleNodes = document.querySelectorAll('.circle-node');
    const circleSpeechBubble = document.getElementById('circleSpeechBubble');
    const speakerNameEl = circleSpeechBubble.querySelector('.speech-speaker-name');
    const speechTextEl = circleSpeechBubble.querySelector('.speech-text');
    const speechIntroEl = circleSpeechBubble.querySelector('.speech-intro');

    const circleQuotes = {
        facilitator: {
            name: "Facilitadora de Justiça Restaurativa",
            text: "“Sejam bem-vindos a este círculo restaurativo. O nosso propósito aqui não é definir culpados perante a lei ou julgar condutas, mas sim abrir um espaço seguro de escuta para compreender como este conflito familiar e a internação impactaram a vida de cada um de vocês. Quem gostaria de iniciar compartilhando suas dores?”"
        },
        neto: {
            name: "Neto (Filho)",
            text: "“Por cinco anos no tribunal, eu fui tratado como um processo frio e uma indenização. Mas a verdade é que eu me senti excluído e trancado como se fosse um lixo. O laudo clínico me rotulou como violento, mas eu só queria ser ouvido por vocês em casa. A dor de ver meus próprios pais me entregando para uma clínica psiquiátrica foi maior do que qualquer contenção física.”"
        },
        wilson: {
            name: "Wilson (Pai)",
            text: "“Filho... eu fui criado em uma realidade dura onde sentimentos eram sinônimo de fraqueza e rigidez era sinônimo de amor. Quando vi aquele cigarro nas suas coisas, entrei em desespero absoluto. Achei que estava salvando você de se perder. Eu não fazia ideia de que a clínica funcionava daquele jeito violento por trás dos muros. Eu errei tentando te proteger. Perdoe-me.”"
        },
        meire: {
            name: "Meire (Mãe)",
            text: "“Neto, meu querido... eu visitava você lá dentro e via seus olhos vazios pelo excesso de medicação. Eu chorava em silêncio no ônibus de volta. Eu agi guiada pelo pânico absoluto de perder você para a violência ou para as drogas. Mas hoje eu entendo que ao te afastar de nós, acabei te entregando para o abandono. Eu amo você, mesmo quando não soube cuidar.”"
        }
    };

    circleNodes.forEach(node => {
        node.addEventListener('click', () => {
            const memberKey = node.getAttribute('data-member');
            
            // Destacar node ativo
            circleNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            // Atualizar balão de diálogo
            const data = circleQuotes[memberKey];
            if (data) {
                if (speechIntroEl) speechIntroEl.classList.add('hidden');
                
                speakerNameEl.textContent = data.name;
                
                // Aplicar efeito de digitação suave no balão
                typeTextEffect(speechTextEl, data.text, 15);
            }
        });
    });


    /* ==========================================================================
       10. FINAL INTERATIVO: CONCEITO DE JUSTIÇA
       ========================================================================== */
    const finalTagButtons = document.querySelectorAll('.final-tag-btn');
    const btnRevealJustice = document.getElementById('btnRevealJustice');
    const justiceRevealPanel = document.getElementById('justiceRevealPanel');

    let selectedTags = new Set();

    finalTagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const word = button.getAttribute('data-word');
            
            button.classList.toggle('selected');
            
            if (button.classList.contains('selected')) {
                selectedTags.add(word);
            } else {
                selectedTags.delete(word);
            }

            // Habilitar ou desabilitar o botão de revelação
            if (selectedTags.size > 0) {
                btnRevealJustice.removeAttribute('disabled');
                btnRevealJustice.classList.remove('disabled');
            } else {
                btnRevealJustice.setAttribute('disabled', 'true');
                btnRevealJustice.classList.add('disabled');
            }
        });
    });

    if (btnRevealJustice && justiceRevealPanel) {
        btnRevealJustice.addEventListener('click', () => {
            // Rolar suavemente para o painel antes de mostrar
            justiceRevealPanel.classList.remove('hidden');
            
            // Feedback visual no botão
            btnRevealJustice.textContent = "CONCEITO REVELADO";
            btnRevealJustice.setAttribute('disabled', 'true');
            btnRevealJustice.classList.add('disabled');
            
            // Rolar suavemente
            setTimeout(() => {
                justiceRevealPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
    }

});
