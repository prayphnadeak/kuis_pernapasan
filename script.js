let quiz = [
  {
    "question": "Urutan organ penyusun sistem pernapasan pada manusia secara struktural dari bagian luar ke dalam yang benar adalah...",
    "options": [
      "Hidung – faring – trakea – laring – bronkus – paru-paru",
      "Hidung – laring – faring – trakea – bronkus – paru-paru",
      "Hidung – faring – laring – trakea – bronkus – paru-paru",
      "Hidung – trakea – faring – laring – bronkus – paru-paru",
      "Hidung – laring – trakea – faring – bronkus – paru-paru"
    ],
    "answer": 2
  },
  {
    "question": "Fungsi dari hidung dalam sistem pernapasan adalah...",
    "options": [
      "Membunuh kuman dan bakteri penyebab infeksi",
      "Sebagai tempat utama pertukaran gas oksigen dan karbon dioksida",
      "Menjadi tempat beresonansinya pita suara",
      "Menyamakan suhu udara yang terhirup dari luar dengan suhu tubuh",
      "Menyaring partikel debu dan kotoran ukuran besar yang masuk"
    ],
    "answer": 3
  },
  {
    "question": "Jaringan di dalam paru-paru yang menjadi tempat pertukaran gas oksigen (O2) dan karbon dioksida (CO2) adalah...",
    "options": [
      "Trakea",
      "Bronkus",
      "Pleura",
      "Bronkiolus",
      "Alveolus"
    ],
    "answer": 4
  },
  {
    "question": "organ yang membantu menopang mekanisme kontraksi dan relaksasi dalam pernapasan manusia adalah...",
    "options": [
      "Diafragma",
      "Pleura",
      "Meninges",
      "Perikardium",
      "Membran mukosa"
    ],
    "answer": 0
  },
  {
    "question": "Berikut ini tujuan dari manusia untuk bernapas, kecuali ",
    "options": [
      "Menghasilkan energi",
      "Melancarkan peredaran darah",
      "Membuang karbon dioksida",
      "Membuang zat sisa metabolisme",
      "Menghirup oksigen"
    ],
    "answer": 1
  },
  {
    "question": "Yang terjadi saat menghembuskan nafas (ekspirasi) pada diafragma adalah...",
    "options": [
      "diafragma berkontraksi",
      "diafragma beretensi",
      "diafragma beresesi",
      "diafragma berekreasi",
      "diafragma berelaksasi"
    ],
    "answer": 4
  },
  {
    "question": "Berikut ini yang merupakan jenis pernapasan yang terjadi dalam tubuh manusia, kecuali",
    "options": [
      "Pernapasan eksternal",
      "Pernapasan internal",
      "Pernapasan intraseluler",
      "a, b dan c benar",
      "Pernapasan buatan"
    ],
    "answer": 4
  },
  {
    "question": "Dalam organ ini terjadi proses menutup saluran makan sewaktu kita menelan makanan atau minuman, sehingga benda asing tidak masuk ke trakea. Organ ini adalah...",
    "options": [
      "Daring",
      "Faring",
      "Laring",
      "Garing",
      "Saring"
    ],
    "answer": 1
  },
  {
    "question": "Berikut penyakit yang menyerang saluran pernapasan manusia, kecuali..",
    "options": [
      "Asma",
      "Kanker Paru-paru",
      "TBC",
      "Flu",
      "Konstipasi"
    ],
    "answer": 4  
  },
  {
    "question": "Yang terjadi saat menarik nafas (inspirasi) pada diafragma adalah...",
    "options": [
      "diafragma berkontraksi",
      "diafragma berkonfrontasi",
      "diafragma berkonsolidasi",
      "diafragma berkonsentrasi",
      "diafragma berelaksasi"
    ],
    "answer": 0
  },
];
let answerStatus = []; // 'correct', 'wrong', or null
let currentQuestion = 0;


function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${String.fromCharCode(97 + i)}. ${option}`;
    btn.onclick = () => selectAnswer(btn, i);
    choicesDiv.appendChild(btn);
  });

  renderPagination();
}

function selectAnswer(button, index) {
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(btn => btn.classList.add("locked"));

  const audioTrue = document.getElementById("audioTrue");
  const audioFalse = document.getElementById("audioFalse");

  if (index === quiz[currentQuestion].answer) {
    button.classList.add("correct");
    answerStatus[currentQuestion] = 'correct';
    audioTrue.currentTime = 0;
    audioTrue.play();
  } else {
    button.classList.add("wrong");
    buttons[quiz[currentQuestion].answer].classList.add("correct");
    answerStatus[currentQuestion] = 'wrong';
    audioFalse.currentTime = 0;
    audioFalse.play();
  }

  document.getElementById("nextBtn").style.display = currentQuestion < quiz.length - 1 ? "inline-block" : "none";
  renderPagination(); // tambahkan ini untuk memperbarui warna pagination
}


function nextQuestion() {
  if (currentQuestion < quiz.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function renderPagination() {
  const paginationDiv = document.getElementById("pagination");
  if (!paginationDiv) return;

  paginationDiv.innerHTML = "";

  for (let i = 0; i < quiz.length; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i + 1;
    pageBtn.className = "page-btn";
    pageBtn.style.marginRight = "8px";

    if (i === currentQuestion) pageBtn.classList.add("active");
    if (answerStatus[i] === 'wrong') pageBtn.classList.add("wrong-page");
    if (answerStatus[i] === 'correct') pageBtn.classList.add("correct-page");

    pageBtn.onclick = () => {
      currentQuestion = i;
      loadQuestion();
    };
    paginationDiv.appendChild(pageBtn);
  }
}


window.onload = () => {
  answerStatus = Array(quiz.length).fill(null);

  const container = document.querySelector(".question-box");

  let nextBtn = document.getElementById("nextBtn");
  if (!nextBtn) {
    const btnContainer = document.createElement("div");
    btnContainer.id = "navButtons";
    btnContainer.style.marginTop = "20px";

    nextBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    nextBtn.innerText = "Soal Berikutnya";
    nextBtn.onclick = nextQuestion;
    nextBtn.style.padding = "10px 20px";
    nextBtn.style.fontSize = "18px";
    nextBtn.style.borderRadius = "8px";
    nextBtn.style.background = "#007BFF";
    nextBtn.style.color = "white";
    nextBtn.style.border = "none";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.display = "none";

    btnContainer.appendChild(nextBtn);
    container.appendChild(btnContainer);
  }

  renderPagination();
  loadQuestion();
};
