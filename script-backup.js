// State Management
let currentCategory = '';
let currentDifficulty = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

// Audio Elements
const bgMusic = document.getElementById('bg-music');
const sfxClick = document.getElementById('sfx-click');
const sfxCorrect = document.getElementById('sfx-correct');
const sfxWrong = document.getElementById('sfx-wrong');

// Question Bank
const questions = {
    kimia: {
        mudah: [
            { q: "Apa simbol kimia untuk air?", a: ["H2O", "O2", "CO2", "NaCl"], c: 0 },
            { q: "Apa nama gas yang kita hirup untuk hidup?", a: ["Oksigen", "Helium", "Nitrogen", "Klorin"], c: 0 },
            { q: "Benda padat yang mencair karena panas disebut?", a: ["Meleleh", "Membeku", "Menguap", "Menyublim"], c: 0 },
            { q: "Cuka rasanya?", a: ["Manis", "Asin", "Asam", "Pahit"], c: 2 },
            { q: "Garam dapur terasa?", a: ["Pahit", "Asam", "Pedas", "Asin"], c: 3 },
            { q: "Logam yang cair pada suhu ruang adalah?", a: ["Emas", "Raksa", "Besi", "Perak"], c: 1 },
            { q: "Apa warna tembaga?", a: ["Merah bata", "Biru", "Kuning", "Putih"], c: 0 },
            { q: "Sabun biasanya bersifat?", a: ["Asam", "Basa", "Netral", "Pahit"], c: 1 },
            { q: "Bagian terkecil dari suatu benda disebut?", a: ["Molekul", "Sel", "Atom", "Partikel"], c: 2 },
            { q: "Gula yang dilarutkan dalam air disebut?", a: ["Campuran", "Larutan", "Kental", "Kristal"], c: 1 }
        ],
        sedang: [
            { q: "Simbol kimia untuk Emas adalah?", a: ["Au", "Ag", "Fe", "Cu"], c: 0 },
            { q: "Nomor atom Hidrogen adalah?", a: ["1", "2", "3", "4"], c: 0 },
            { q: "Gas yang dihasilkan saat pernapasan manusia adalah?", a: ["Oksigen", "Karbondioksida", "Metana", "Neon"], c: 1 },
            { q: "Zat yang mempercepat reaksi tanpa ikut bereaksi disebut?", a: ["Reaktan", "Katalis", "Produk", "Senyawa"], c: 1 },
            { q: "pH untuk larutan netral adalah?", a: ["1", "7", "14", "0"], c: 1 },
            { q: "Unsur paling melimpah di alam semesta adalah?", a: ["Oksigen", "Karbon", "Hidrogen", "Helium"], c: 2 },
            { q: "Campuran minyak dan air dapat dipisahkan dengan?", a: ["Penyaringan", "Distilasi", "Corong Pisah", "Sublimasi"], c: 2 },
            { q: "Lambang kimia untuk Besi adalah?", a: ["Be", "Bi", "Fe", "F"], c: 2 },
            { q: "Proses perubahan gas menjadi cair disebut?", a: ["Menguap", "Mengembun", "Mencair", "Membeku"], c: 1 },
            { q: "Gas yang digunakan dalam balon terbang (ringan) adalah?", a: ["Oksigen", "Hidrogen", "Helium", "Argon"], c: 2 }
        ],
        sulit: [
            { q: "Zat tunggal yang tidak dapat diuraikan lagi disebut?", a: ["Unsur", "Senyawa", "Campuran", "Molekul"], c: 0 },
            { q: "Hukum Kekekalan Massa dikemukakan oleh?", a: ["Dalton", "Lavoisier", "Newton", "Bohr"], c: 1 },
            { q: "Ikatan antara logam dan non-logam disebut?", a: ["Kovalen", "Ion", "Logam", "Hidrogen"], c: 1 },
            { q: "Apa nama alat untuk mengukur massa jenis zat cair?", a: ["Termometer", "Hidrometer", "Barometer", "Anemometer"], c: 1 },
            { q: "Reaksi kimia yang melepaskan panas disebut?", a: ["Eksoterm", "Endoterm", "Isoterm", "Fototerm"], c: 0 },
            { q: "Partikel penyusun inti atom adalah?", a: ["Proton & Elektron", "Proton & Neutron", "Neutron & Elektron", "Hanya Proton"], c: 1 },
            { q: "Apa nama senyawa NaCl?", a: ["Natrium klorida", "Kalium klorida", "Kalsium klorida", "Magnesium klorida"], c: 0 },
            { q: "Gas mulia yang digunakan dalam lampu reklame?", a: ["Argon", "Helium", "Neon", "Kripton"], c: 2 },
            { q: "Siapa penemu tabel periodik unsur?", a: ["Mendeleev", "Einstein", "Curie", "Nobel"], c: 0 },
            { q: "Asam yang ada dalam lambung manusia adalah?", a: ["H2SO4", "HCl", "CH3COOH", "HNO3"], c: 1 }
        ]
    },
    biologi: {
        mudah: [
            { q: "Tumbuhan bernapas menggunakan?", a: ["Stomata", "Paru-paru", "Insang", "Kulit"], c: 0 },
            { q: "Hewan yang memakan tumbuhan disebut?", a: ["Karnivora", "Herbivora", "Omnivora", "Insektivora"], c: 1 },
            { q: "Bagian tumbuhan yang menyerap air adalah?", a: ["Daun", "Batang", "Akar", "Bunga"], c: 2 },
            { q: "Proses tumbuhan memasak makanan disebut?", a: ["Respirasi", "Fotosintesis", "Reproduksi", "Oksidasi"], c: 1 },
            { q: "Alat pernapasan ikan adalah?", a: ["Paru-paru", "Trakhea", "Kulit", "Insang"], c: 3 },
            { q: "Mamalia berkembang biak dengan cara?", a: ["Bertelur", "Melahirkan", "Membelah diri", "Spora"], c: 1 },
            { q: "Tempat hidup makhluk hidup disebut?", a: ["Habitat", "Populasi", "Komunitas", "Ekosistem"], c: 0 },
            { q: "Zat hijau daun disebut?", a: ["Klorofil", "Hemoglobin", "Melanin", "Karoten"], c: 0 },
            { q: "Hewan yang hidup di air dan darat disebut?", a: ["Reptil", "Amfibi", "Mamalia", "Aves"], c: 1 },
            { q: "Contoh hewan karnivora adalah?", a: ["Sapi", "Kelinci", "Harimau", "Kambing"], c: 2 }
        ],
        sedang: [
            { q: "Alat ekskresi pada manusia kecuali?", a: ["Paru-paru", "Hati", "Kulit", "Jantung"], c: 3 },
            { q: "Penyakit kurang darah disebut?", a: ["Anemia", "Hipertensi", "Diabetes", "Influenza"], c: 0 },
            { q: "Bagian sel yang mengatur seluruh kegiatan sel?", a: ["Sitoplasma", "Inti sel", "Vakuola", "Dinding sel"], c: 1 },
            { q: "Simbiosis antara lebah dan bunga adalah?", a: ["Mutualisme", "Komensalisme", "Parasitisme", "Netralisme"], c: 0 },
            { q: "Pembuluh darah yang membawa darah keluar dari jantung?", a: ["Vena", "Arteri", "Kapiler", "Aorta"], c: 1 },
            { q: "Uretra adalah bagian dari sistem?", a: ["Pernapasan", "Pencernaan", "Ekskresi", "Saraf"], c: 2 },
            { q: "Metamorfosis sempurna dialami oleh?", a: ["Belalang", "Kecoak", "Kupu-kupu", "Jangkrik"], c: 2 },
            { q: "Bagian bunga yang berfungsi sebagai alat kelamin jantan?", a: ["Putik", "Benang sari", "Mahkota", "Kelopak"], c: 1 },
            { q: "Bakteri penyebab penyakit TBC adalah?", a: ["Mycobacterium", "Salmonella", "Amoeba", "Virus Corona"], c: 0 },
            { q: "Vitamin yang larut dalam air?", a: ["A & D", "E & K", "B & C", "Semua salah"], c: 2 }
        ],
        sulit: [
            { q: "Siapa bapak genetika dunia?", a: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Robert Hooke"], c: 1 },
            { q: "Tempat terjadinya fertilisasi pada manusia?", a: ["Ovarium", "Uterus", "Tuba Fallopi", "Vagina"], c: 2 },
            { q: "Hormon yang mengatur kadar gula darah?", a: ["Adrenalin", "Insulin", "Tiroksin", "Estrogen"], c: 1 },
            { q: "Berapa jumlah kromosom pada sel tubuh manusia?", a: ["23 buah", "46 buah", "22 buah", "44 buah"], c: 1 },
            { q: "Organel sel yang berfungsi sebagai tempat respirasi?", a: ["Ribosom", "Mitokondria", "Lisosom", "Badan Golgi"], c: 1 },
            { q: "Enzim yang ada di mulut (air liur) adalah?", a: ["Pepsin", "Amilase", "Lipase", "Renin"], c: 1 },
            { q: "Peredaran darah kecil adalah?", a: ["Jantung-Paru-Jantung", "Jantung-Seluruh Tubuh-Jantung", "Hati-Jantung-Paru", "Seluruh Tubuh-Paru"], c: 0 },
            { q: "Tipe tulang tengkorak manusia adalah?", a: ["Tulang pipa", "Tulang pipih", "Tulang pendek", "Tulang tak beraturan"], c: 1 },
            { q: "Jaringan pengangkut air pada tumbuhan?", a: ["Xilem", "Floem", "Kambium", "Epidermis"], c: 0 },
            { q: "Reaksi gelap dalam fotosintesis terjadi di?", a: ["Grana", "Stroma", "Klorofil", "Membran"], c: 1 }
        ]
    },
    anatomi: {
        mudah: [
            { q: "Berapa jumlah mata manusia?", a: ["1", "2", "3", "4"], c: 1 },
            { q: "Organ untuk bernapas adalah?", a: ["Hati", "Jantung", "Paru-paru", "Lambung"], c: 2 },
            { q: "Organ untuk memompa darah?", a: ["Jantung", "Otak", "Paru-paru", "Ginjal"], c: 0 },
            { q: "Bagian tubuh untuk mendengar?", a: ["Mata", "Telinga", "Hidung", "Lidah"], c: 1 },
            { q: "Rangka tubuh berfungsi untuk?", a: ["Bernapas", "Melindungi organ", "Mencerna makanan", "Mendengar"], c: 1 },
            { q: "Jumlah jari tangan normal manusia?", a: ["5", "10", "15", "20"], c: 1 },
            { q: "Hidung berfungsi untuk?", a: ["Melihat", "Mengecap", "Mencium bau", "Mendengar"], c: 2 },
            { q: "Bagian tubuh yang paling keras adalah?", a: ["Kuku", "Tulang", "Gigi (Email)", "Otot"], c: 2 },
            { q: "Tempat makanan dicerna pertama kali?", a: ["Lambung", "Usus", "Mulut", "Hati"], c: 2 },
            { q: "Pusat sistem saraf manusia adalah?", a: ["Jantung", "Paru-paru", "Otak", "Sumsum"], c: 2 }
        ],
        sedang: [
            { q: "Tulang terkecil manusia ada di?", a: ["Kaki", "Tangan", "Telinga", "Hidung"], c: 2 },
            { q: "Berapa jumlah ruas tulang belakang manusia?", a: ["33", "20", "12", "5"], c: 0 },
            { q: "Organ yang berfungsi menyaring darah?", a: ["Hati", "Ginjal", "Jantung", "Limpa"], c: 1 },
            { q: "Cairan empedu dihasilkan oleh?", a: ["Pankreas", "Lambung", "Hati", "Empedu"], c: 2 },
            { q: "Lapisan kulit paling luar disebut?", a: ["Dermis", "Epidermis", "Hipodermis", "Subkutan"], c: 1 },
            { q: "Bagian mata yang mengatur cahaya masuk?", a: ["Retina", "Iris", "Pupil", "Lensa"], c: 2 },
            { q: "Sendi pada bahu termasuk jenis?", a: ["Sendi putar", "Sendi pelana", "Sendi peluru", "Sendi engsel"], c: 2 },
            { q: "Berapa pasang tulang rusuk manusia?", a: ["10", "12", "14", "24"], c: 1 },
            { q: "Otot yang bekerja secara sadar?", a: ["Otot polos", "Otot jantung", "Otot lurik", "Semua benar"], c: 2 },
            { q: "Tempat penyerapan sari makanan?", a: ["Usus halus", "Usus besar", "Lambung", "Esofagus"], c: 0 }
        ],
        sulit: [
            { q: "Bagian otak yang mengatur keseimbangan?", a: ["Cerebrum", "Cerebellum", "Medula", "Talamus"], c: 1 },
            { q: "Nama medis tulang kering adalah?", a: ["Femur", "Tibia", "Fibula", "Patella"], c: 1 },
            { q: "Katup antara serambi kiri dan bilik kiri jantung?", a: ["Trikuspidalis", "Bikuspidalis", "Semilunaris", "Vena"], c: 1 },
            { q: "Sel darah yang berfungsi melawan kuman?", a: ["Eritrosit", "Leukosit", "Trombosit", "Plasma"], c: 1 },
            { q: "Apa nama tulang tempurung lutut?", a: ["Femur", "Patella", "Scapula", "Sternum"], c: 1 },
            { q: "Saraf yang membawa pesan dari mata ke otak?", a: ["Olfaktori", "Optik", "Auditori", "Vagus"], c: 1 },
            { q: "Istilah untuk tulang selangka adalah?", a: ["Scapula", "Clavicula", "Radius", "Ulna"], c: 1 },
            { q: "Kelenjar Master of Glands adalah?", a: ["Tiroid", "Pituitari (Hipofisis)", "Adrenal", "Timus"], c: 1 },
            { q: "Ujung saraf peraba banyak terdapat di?", a: ["Punggung", "Sikut", "Ujung jari", "Lengan"], c: 2 },
            { q: "Fungsi utama sumsum tulang belakang?", a: ["Berpikir", "Gerak refleks", "Memompa darah", "Bernapas"], c: 1 }
        ]
    }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const gamesBtn = document.getElementById('games-btn');

    startBtn.addEventListener('click', () => {
        playSFX('click');
        tryPlayMusic();
        showView('category-view');
    });

    gamesBtn.addEventListener('click', () => {
        playSFX('click');
        tryPlayMusic();
        showView('games-menu-view');
    });
});

function startGame(gameType) {
    playSFX('click');
    alert(`Permainan ${gameType} sedang dalam pengembangan!`);
    // TODO: Implement individual games
}

function showView(viewId) {
    playSFX('click');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function selectCategory(cat) {
    currentCategory = cat;
    showView('difficulty-view');
}

function selectDifficulty(diff) {
    currentDifficulty = diff;
    startQuiz();
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    if (currentCategory === 'campuran') {
        // Combine all questions for the level
        currentQuestions = [
            ...questions.kimia[currentDifficulty],
            ...questions.biologi[currentDifficulty],
            ...questions.anatomi[currentDifficulty]
        ];
    } else {
        currentQuestions = [...questions[currentCategory][currentDifficulty]];
    }

    // Shuffle and pick 10
    currentQuestions = currentQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

    showView('quiz-view');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Soal ${currentQuestionIndex + 1}/10`;
    document.getElementById('question-text').innerText = q.q;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.a.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-fadeIn';

        let icon = '🔹';
        if (currentCategory === 'kimia') {
            const icons = ['🧪', '🔬', '⚗️', '⚛️'];
            icon = icons[idx % icons.length];
        } else if (currentCategory === 'biologi') {
            icon = '🌿';
        } else if (currentCategory === 'anatomi') {
            icon = '🫁';
        }

        btn.innerHTML = `<span class="option-icon">${icon}</span> ${opt}`;
        btn.onclick = () => checkAnswer(idx, btn);
        container.appendChild(btn);
    });

    updateProgressBar();
    startTimer();
}

function checkAnswer(selectedIdx, btn) {
    clearInterval(timerInterval);
    const correctIdx = currentQuestions[currentQuestionIndex].c;
    const allBtns = document.querySelectorAll('.option-btn');

    allBtns.forEach(b => b.onclick = null); // Disable buttons

    if (selectedIdx === correctIdx) {
        btn.classList.add('correct');
        score += 10;
        playSFX('correct');
    } else {
        btn.classList.add('wrong');
        allBtns[correctIdx].classList.add('correct');
        playSFX('wrong');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    playSFX('wrong');
    const correctIdx = currentQuestions[currentQuestionIndex].c;
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.onclick = null);
    allBtns[correctIdx].classList.add('correct');

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex) / 10) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById('final-score').innerText = score;

    let msg = "";
    if (score === 100) msg = "Luar Biasa! Kamu Jenius Sains!";
    else if (score >= 70) msg = "Hebat! Kamu Paham Banyak Hal!";
    else if (score >= 40) msg = "Bagus! Teruslah Belajar!";
    else msg = "Jangan Menyerah, Ayo Coba Lagi!";

    document.getElementById('result-message').innerText = msg;
    showView('result-view');
}

function restartQuiz() {
    startQuiz();
}

function playSFX(type) {
    const sfx = document.getElementById(`sfx-${type}`);
    if (sfx) {
        sfx.currentTime = 0;
        sfx.play().catch(e => console.log("SFX play blocked"));
    }
}

function tryPlayMusic() {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log("Music play blocked by browser policy"));
}
// ===== GAMES LOGIC =====

// Game Data
const molecules = [
    { name: 'H₂O', atoms: ['H', 'H', 'O'], display: 'Air' },
    { name: 'CO₂', atoms: ['C', 'O', 'O'], display: 'Karbon Dioksida' },
    { name: 'O₂', atoms: ['O', 'O'], display: 'Oksigen' },
    { name: 'H₂', atoms: ['H', 'H'], display: 'Hidrogen' }
];

const foodChains = [
    { chain: ['Rumput', 'Belalang', 'Katak', 'Ular', 'Elang'], name: 'Rantai Padang Rumput' },
    { chain: ['Fitoplankton', 'Zooplankton', 'Ikan Kecil', 'Ikan Besar', 'Hiu'], name: 'Rantai Laut' },
    { chain: ['Padi', 'Tikus', 'Ular', 'Burung Hantu'], name: 'Rantai Sawah' }
];

const bodySystemsData = [
    { organ: '❤️ Jantung', system: 'Sistem Peredaran Darah', id: 1 },
    { organ: '🫁 Paru-paru', system: 'Sistem Pernapasan', id: 2 },
    { organ: '🧠 Otak', system: 'Sistem Saraf', id: 3 },
    { organ: '🦴 Tulang', system: 'Sistem Rangka', id: 4 },
    { organ: '🍖 Lambung', system: 'Sistem Pencernaan', id: 5 }
];

// Game State
let currentMolecule = null;
let currentFoodChain = null;
let selectedOrgan = null;
let matches = [];

// ===== MOLECULE GAME =====
function startGame(gameType) {
    playSFX('click');

    if (gameType === 'molecule') {
        showView('molecule-game-view');
        initMoleculeGame();
    } else if (gameType === 'foodchain') {
        showView('foodchain-game-view');
        initFoodChainGame();
    } else if (gameType === 'bodysystem') {
        showView('bodysystem-game-view');
        initBodySystemGame();
    }
}

function initMoleculeGame() {
    currentMolecule = molecules[Math.floor(Math.random() * molecules.length)];
    document.getElementById('target-molecule').textContent = `${currentMolecule.name} (${currentMolecule.display})`;

    const atomsContainer = document.getElementById('atoms-container');
    const dropZone = document.getElementById('molecule-drop-zone');

    atomsContainer.innerHTML = '';
    dropZone.innerHTML = '';
    document.getElementById('molecule-result').className = 'game-result';
    document.getElementById('molecule-result').style.display = 'none';

    // Create available atoms (with extras)
    const availableAtoms = [...currentMolecule.atoms, 'N', 'C', 'He'];
    shuffleArray(availableAtoms);

    availableAtoms.forEach((atom, idx) => {
        const atomEl = document.createElement('div');
        atomEl.className = 'atom';
        atomEl.textContent = atom;
        atomEl.draggable = true;
        atomEl.id = `atom-${idx}`;

        atomEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', atom);
            e.dataTransfer.setData('elementId', e.target.id);
        });

        atomsContainer.appendChild(atomEl);
    });

    // Setup drop zone
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const atom = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('elementId');

        const atomEl = document.createElement('div');
        atomEl.className = 'atom';
        atomEl.textContent = atom;
        atomEl.onclick = () => atomEl.remove();

        dropZone.appendChild(atomEl);

        // Remove from palette
        const originalEl = document.getElementById(elementId);
        if (originalEl) originalEl.remove();
    });
}

function checkMolecule() {
    const dropZone = document.getElementById('molecule-drop-zone');
    const atoms = Array.from(dropZone.children).map(el => el.textContent);

    const sortedAtoms = [...atoms].sort();
    const sortedTarget = [...currentMolecule.atoms].sort();

    const isCorrect = JSON.stringify(sortedAtoms) === JSON.stringify(sortedTarget);

    const resultEl = document.getElementById('molecule-result');
    resultEl.style.display = 'block';
    resultEl.className = `game-result show ${isCorrect ? 'correct' : 'incorrect'}`;

    if (isCorrect) {
        resultEl.innerHTML = `✅ <strong>Benar!</strong> Kamu berhasil membentuk ${currentMolecule.name} (${currentMolecule.display})!`;
        playSFX('correct');
    } else {
        resultEl.innerHTML = `❌ <strong>Belum tepat.</strong> Molekul ${currentMolecule.name} terdiri dari: ${currentMolecule.atoms.join(', ')}`;
        playSFX('wrong');
    }
}

function resetMolecule() {
    initMoleculeGame();
}

// ===== FOOD CHAIN GAME =====
function initFoodChainGame() {
    currentFoodChain = foodChains[Math.floor(Math.random() * foodChains.length)];

    const organismsContainer = document.getElementById('organisms-container');
    const dropZone = document.getElementById('chain-drop-zone');

    organismsContainer.innerHTML = '';
    dropZone.innerHTML = '';
    document.getElementById('foodchain-result').className = 'game-result';
    document.getElementById('foodchain-result').style.display = 'none';

    const shuffled = [...currentFoodChain.chain];
    shuffleArray(shuffled);

    shuffled.forEach((organism, idx) => {
        const orgEl = document.createElement('div');
        orgEl.className = 'organism';
        orgEl.textContent = organism;
        orgEl.draggable = true;
        orgEl.id = `org-${idx}`;

        orgEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', organism);
            e.dataTransfer.setData('elementId', e.target.id);
        });

        organismsContainer.appendChild(orgEl);
    });

    // Setup drop zone
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const organism = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('elementId');

        const orgEl = document.createElement('div');
        orgEl.className = 'organism';
        orgEl.textContent = organism;
        orgEl.onclick = () => orgEl.remove();

        dropZone.appendChild(orgEl);

        const originalEl = document.getElementById(elementId);
        if (originalEl) originalEl.remove();
    });
}

function checkFoodChain() {
    const dropZone = document.getElementById('chain-drop-zone');
    const chain = Array.from(dropZone.children).map(el => el.textContent);

    const isCorrect = JSON.stringify(chain) === JSON.stringify(currentFoodChain.chain);

    const resultEl = document.getElementById('foodchain-result');
    resultEl.style.display = 'block';
    resultEl.className = `game-result show ${isCorrect ? 'correct' : 'incorrect'}`;

    if (isCorrect) {
        resultEl.innerHTML = `✅ <strong>Sempurna!</strong> Kamu berhasil menyusun ${currentFoodChain.name} dengan benar!`;
        playSFX('correct');
    } else {
        resultEl.innerHTML = `❌ <strong>Belum tepat.</strong> Urutan yang benar: ${currentFoodChain.chain.join(' → ')}`;
        playSFX('wrong');
    }
}

function resetFoodChain() {
    initFoodChainGame();
}

// ===== BODY SYSTEM GAME =====
function initBodySystemGame() {
    selectedOrgan = null;
    matches = [];

    const organsContainer = document.getElementById('organs-container');
    const systemsContainer = document.getElementById('systems-container');

    organsContainer.innerHTML = '';
    systemsContainer.innerHTML = '';
    document.getElementById('bodysystem-result').className = 'game-result';
    document.getElementById('bodysystem-result').style.display = 'none';

    const shuffledOrgans = [...bodySystemsData];
    const shuffledSystems = [...bodySystemsData];
    shuffleArray(shuffledOrgans);
    shuffleArray(shuffledSystems);

    shuffledOrgans.forEach(item => {
        const organEl = document.createElement('div');
        organEl.className = 'organ-item';
        organEl.textContent = item.organ;
        organEl.dataset.id = item.id;
        organEl.onclick = () => selectOrgan(organEl, item.id);
        organsContainer.appendChild(organEl);
    });

    shuffledSystems.forEach(item => {
        const systemEl = document.createElement('div');
        systemEl.className = 'system-item';
        systemEl.textContent = item.system;
        systemEl.dataset.id = item.id;
        systemEl.onclick = () => matchSystem(systemEl, item.id);
        systemsContainer.appendChild(systemEl);
    });
}

function selectOrgan(element, id) {
    document.querySelectorAll('.organ-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedOrgan = id;
}

function matchSystem(element, systemId) {
    if (!selectedOrgan) {
        alert('Pilih organ terlebih dahulu!');
        return;
    }

    if (selectedOrgan === systemId) {
        element.classList.add('matched');
        document.querySelector(`.organ-item[data-id="${selectedOrgan}"]`).style.opacity = '0.5';
        matches.push({ organ: selectedOrgan, system: systemId });
        selectedOrgan = null;
        playSFX('correct');
    } else {
        playSFX('wrong');
        alert('Pasangan tidak cocok! Coba lagi.');
    }
}

function checkBodySystem() {
    const resultEl = document.getElementById('bodysystem-result');
    resultEl.style.display = 'block';

    if (matches.length === bodySystemsData.length) {
        resultEl.className = 'game-result show correct';
        resultEl.innerHTML = '✅ <strong>Luar Biasa!</strong> Semua organ telah dicocokkan dengan sistem tubuh yang tepat!';
        playSFX('correct');
    } else {
        resultEl.className = 'game-result show incorrect';
        resultEl.innerHTML = `❌ Kamu baru mencocokkan ${matches.length} dari ${bodySystemsData.length} pasangan. Coba lagi!`;
        playSFX('wrong');
    }
}

function resetBodySystem() {
    initBodySystemGame();
}

// Utility
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
