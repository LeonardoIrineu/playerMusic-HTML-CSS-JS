let musicas = [
    {
        titulo: 'Vem e Vai', artista: '5 a Seco', source: '/assets/musicas/5 a Seco - Vem e Vai.mp3',
        img:'/assets/img/5aseco.jpg'
    },
    {
        titulo: '31/12', artista: 'Jorge & Mateus', source: '/assets/musicas/Jorge e Mateus - 31_12.mp3',
        img:'/assets/img/jorgeematheus.png'
    },
    {
        titulo: 'N', artista: 'Nando Reis', source: '/assets/musicas/Nando Reis - N.mp3',
        img:'/assets/img/nandoreis.jpg'
    },
    {
        titulo: 'A Voz E O Violão', artista: 'Projota', source: '/assets/musicas/Projota - A Voz E O Violão.mp3',
        img:'/assets/img/vozeviolao.jpg'
    },
    {
        titulo: 'Reflections', artista: 'The Neighbourhood', source: '/assets/musicas/The Neighbourhood - Reflections.mp3',
        img:'/assets/img/tnbh.jpg'
    },
]

// INICIO
let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao p');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

nomeMusica.textContent = musicas[musicaIndex].titulo;
nomeArtista.textContent = musicas[musicaIndex].artista;
imagem.setAttribute('src', musicas[musicaIndex].img);
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    musicaIndex--;
    if (musicaIndex < 0) {
        musicaIndex = 4;
    }
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
    renderizarMusica(musicaIndex);
});

document.querySelector('.proximo').addEventListener('click', () => {
    musicaIndex++;
    if (musicaIndex > 4) {
        musicaIndex = 0;
    }
    musica.play();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
    renderizarMusica(musicaIndex);
});

// FUNÇÕES

function renderizarMusica(musicaIndex) {
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;

        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    document.body.append(musica);
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}