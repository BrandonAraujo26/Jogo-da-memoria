<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>🧠 Jogo da Memória</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #1e293b;
      color: #fff;
      text-align: center;
      margin: 0;
      padding: 20px;
    }

    h1 {
      margin-bottom: 10px;
    }

    .tabuleiro {
      display: grid;
      grid-template-columns: repeat(4, 100px);
      grid-gap: 15px;
      justify-content: center;
      margin: 30px auto;
    }

    .carta {
      background-color: #334155;
      border-radius: 10px;
      width: 100px;
      height: 100px;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background 0.3s;
      user-select: none;
    }

    .carta.revelada {
      background-color: #38bdf8;
    }

    .carta.certa {
      background-color: #22c55e;
      cursor: default;
    }

    #movimentos {
      margin-top: 10px;
      font-size: 1.1rem;
    }

    button {
      margin-top: 20px;
      background: #38bdf8;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      color: #1e293b;
    }

    button:hover {
      background: #0ea5e9;
    }
  </style>
</head>
<body>
  <h1>🧠 Jogo da Memória</h1>
  <p>Encontre todos os pares!</p>
  <div id="movimentos">Movimentos: 0</div>
  <div class="tabuleiro" id="tabuleiro"></div>
  <button onclick="iniciarJogo()">🔄 Reiniciar</button>

  <script>
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐼", "🐵"];
    let cartas = [];
    let primeiraCarta = null;
    let bloqueado = false;
    let movimentos = 0;

    function embaralhar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function iniciarJogo() {
      const tabuleiro = document.getElementById("tabuleiro");
      tabuleiro.innerHTML = "";
      primeiraCarta = null;
      bloqueado = false;
      movimentos = 0;
      document.getElementById("movimentos").textContent = "Movimentos: 0";

      const pares = [...emojis, ...emojis];
      embaralhar(pares);

      cartas = pares.map((emoji, index) => {
        const div = document.createElement("div");
        div.classList.add("carta");
        div.dataset.valor = emoji;
        div.dataset.index = index;
        div.addEventListener("click", () => virarCarta(div));
        tabuleiro.appendChild(div);
        return div;
      });
    }

    function virarCarta(carta) {
      if (bloqueado || carta.classList.contains("certa") || carta.classList.contains("revelada")) return;

      carta.classList.add("revelada");
      carta.textContent = carta.dataset.valor;

      if (!primeiraCarta) {
        primeiraCarta = carta;
      } else {
        movimentos++;
        document.getElementById("movimentos").textContent = `Movimentos: ${movimentos}`;
        bloqueado = true;

        if (carta.dataset.valor === primeiraCarta.dataset.valor) {
          carta.classList.add("certa");
          primeiraCarta.classList.add("certa");
          primeiraCarta = null;
          bloqueado = false;

          // Checar vitória
          const todasCertas = cartas.every(c => c.classList.contains("certa"));
          if (todasCertas) {
            setTimeout(() => {
              alert(`🎉 Parabéns! Você venceu em ${movimentos} movimentos!`);
            }, 300);
          }

        } else {
          setTimeout(() => {
            carta.classList.remove("revelada");
            carta.textContent = "";
            primeiraCarta.classList.remove("revelada");
            primeiraCarta.textContent = "";
            primeiraCarta = null;
            bloqueado = false;
          }, 1000);
        }
      }
    }

    iniciarJogo();
  </script>
</body>
</html>
