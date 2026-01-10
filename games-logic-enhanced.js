// ===== GAMES LOGIC =====

// Expanded Game Data
const molecules = [
    { name: 'H₂O', atoms: ['H', 'H', 'O'], display: 'Air', desc: 'Molekul penting untuk kehidupan' },
    { name: 'CO₂', atoms: ['C', 'O', 'O'], display: 'Karbon Dioksida', desc: 'Hasil pernapasan' },
    { name: 'O₂', atoms: ['O', 'O'], display: 'Oksigen', desc: 'Gas untuk bernapas' },
    { name: 'H₂', atoms: ['H', 'H'], display: 'Hidrogen', desc: 'Gas paling ringan' },
    { name: 'NH₃', atoms: ['N', 'H', 'H', 'H'], display: 'Amonia', desc: 'Senyawa nitrogen' },
    { name: 'CH₄', atoms: ['C', 'H', 'H', 'H', 'H'], display: 'Metana', desc: 'Gas alam' },
    { name: 'NaCl', atoms: ['Na', 'Cl'], display: 'Garam Dapur', desc: 'Natrium Klorida' },
    { name: 'HCl', atoms: ['H', 'Cl'], display: 'Asam Klorida', desc: 'Asam kuat' }
];

const foodChains = [
    { chain: ['Rumput', 'Belalang', 'Katak', 'Ular', 'Elang'], name: 'Rantai Padang Rumput', emoji: '🌾' },
    { chain: ['Fitoplankton', 'Zooplankton', 'Ikan Kecil', 'Ikan Besar', 'Hiu'], name: 'Rantai Laut', emoji: '🌊' },
    { chain: ['Padi', 'Tikus', 'Ular', 'Burung Hantu'], name: 'Rantai Sawah', emoji: '🌾' },
    { chain: ['Alga', 'Udang', 'Ikan', 'Penguin', 'Anjing Laut'], name: 'Rantai Antartika', emoji: '❄️' },
    { chain: ['Pohon', 'Ulat', 'Burung', 'Kucing Hutan'], name: 'Rantai Hutan', emoji: '🌳' },
    { chain: ['Plankton', 'Krill', 'Ikan Paus'], name: 'Rantai Laut Dalam', emoji: '🐋' },
    { chain: ['Jagung', 'Ayam', 'Rubah', 'Serigala'], name: 'Rantai Pertanian', emoji: '🌽' },
    { chain: ['Ganggang', 'Siput', 'Bebek', 'Buaya'], name: 'Rantai Rawa', emoji: '🦆' }
];

const bodySystemsData = [
    { organ: '❤️ Jantung', system: 'Sistem Peredaran Darah', id: 1, desc: 'Memompa darah' },
    { organ: '🫁 Paru-paru', system: 'Sistem Pernapasan', id: 2, desc: 'Tempat pertukaran gas' },
    { organ: '🧠 Otak', system: 'Sistem Saraf', id: 3, desc: 'Pusat kendali tubuh' },
    { organ: '🦴 Tulang', system: 'Sistem Rangka', id: 4, desc: 'Penyangga tubuh' },
    { organ: '🍖 Lambung', system: 'Sistem Pencernaan', id: 5, desc: 'Mencerna makanan' },
    { organ: '👃 Hidung', system: 'Sistem Pernapasan', id: 6, desc: 'Menghirup udara' },
    { organ: '🦷 Gigi', system: 'Sistem Pencernaan', id: 7, desc: 'Mengunyah makanan' },
    { organ: '💪 Otot', system: 'Sistem Gerak', id: 8, desc: 'Menggerakkan tubuh' },
    { organ: '🩸 Pembuluh Darah', system: 'Sistem Peredaran Darah', id: 9, desc: 'Mengalirkan darah' },
    { organ: '🧬 Sumsum Tulang', system: 'Sistem Rangka', id: 10, desc: 'Membuat sel darah' }
];

// Game State
let currentMolecule = null;
let currentFoodChain = null;
let selectedOrgan = null;
let matches = [];
let gameScore = 0;

// ===== MOLECULE GAME =====
function startGame(gameType) {
    playSFX('click');
    gameScore = 0;

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
    document.getElementById('target-molecule').innerHTML = `${currentMolecule.name} <small>(${currentMolecule.display})</small>`;

    const atomsContainer = document.getElementById('atoms-container');
    const dropZone = document.getElementById('molecule-drop-zone');

    atomsContainer.innerHTML = '';
    dropZone.innerHTML = '';
    document.getElementById('molecule-result').className = 'game-result';
    document.getElementById('molecule-result').style.display = 'none';

    // Create available atoms with more variety
    const extraAtoms = ['N', 'C', 'He', 'Na', 'Cl', 'S', 'P'];
    const randomExtras = extraAtoms.sort(() => 0.5 - Math.random()).slice(0, 3);
    const availableAtoms = [...currentMolecule.atoms, ...randomExtras];
    shuffleArray(availableAtoms);

    availableAtoms.forEach((atom, idx) => {
        const atomEl = document.createElement('div');
        atomEl.className = 'atom';
        atomEl.textContent = atom;
        atomEl.draggable = true;
        atomEl.id = `atom-${idx}`;
        atomEl.style.animationDelay = `${idx * 0.1}s`;

        atomEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', atom);
            e.dataTransfer.setData('elementId', e.target.id);
            atomEl.style.opacity = '0.5';
        });

        atomEl.addEventListener('dragend', () => {
            atomEl.style.opacity = '1';
        });

        atomsContainer.appendChild(atomEl);
    });

    // Setup drop zone (remove old listeners by cloning)
    const newDropZone = dropZone.cloneNode(true);
    dropZone.parentNode.replaceChild(newDropZone, dropZone);
    const finalDropZone = document.getElementById('molecule-drop-zone');

    finalDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        finalDropZone.classList.add('drag-over');
    });

    finalDropZone.addEventListener('dragleave', () => {
        finalDropZone.classList.remove('drag-over');
    });

    finalDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        finalDropZone.classList.remove('drag-over');

        const atom = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('elementId');

        const atomEl = document.createElement('div');
        atomEl.className = 'atom';
        atomEl.textContent = atom;
        atomEl.onclick = () => {
            atomEl.remove();
            playSFX('click');
        };
        atomEl.title = 'Klik untuk menghapus';

        finalDropZone.appendChild(atomEl);

        const originalEl = document.getElementById(elementId);
        if (originalEl) originalEl.remove();

        playSFX('click');
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
        gameScore += 10;
        resultEl.innerHTML = `
            <div class="result-icon">⚛️</div>
            <strong>Sempurna!</strong><br>
            Kamu berhasil membentuk ${currentMolecule.name} (${currentMolecule.display})<br>
            <small>${currentMolecule.desc}</small><br>
            <button class="btn primary-btn" onclick="initMoleculeGame()" style="margin-top: 15px;">Molekul Baru</button>
        `;
        playSFX('correct');
    } else {
        resultEl.innerHTML = `
            <div class="result-icon">❌</div>
            <strong>Belum tepat.</strong><br>
            Molekul ${currentMolecule.name} terdiri dari: ${currentMolecule.atoms.join(', ')}<br>
            <small>Coba lagi!</small>
        `;
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

    organismsContainer.innerHTML = `<div class="chain-title">${currentFoodChain.emoji} ${currentFoodChain.name}</div>`;
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
        orgEl.style.animationDelay = `${idx * 0.1}s`;

        orgEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', organism);
            e.dataTransfer.setData('elementId', e.target.id);
            orgEl.style.opacity = '0.5';
        });

        orgEl.addEventListener('dragend', () => {
            orgEl.style.opacity = '1';
        });

        organismsContainer.appendChild(orgEl);
    });

    // Setup drop zone
    const newDropZone = dropZone.cloneNode(true);
    dropZone.parentNode.replaceChild(newDropZone, dropZone);
    const finalDropZone = document.getElementById('chain-drop-zone');

    finalDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        finalDropZone.classList.add('drag-over');
    });

    finalDropZone.addEventListener('dragleave', () => {
        finalDropZone.classList.remove('drag-over');
    });

    finalDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        finalDropZone.classList.remove('drag-over');

        const organism = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('elementId');

        const orgEl = document.createElement('div');
        orgEl.className = 'organism';
        orgEl.textContent = organism;
        orgEl.onclick = () => {
            orgEl.remove();
            playSFX('click');
        };
        orgEl.title = 'Klik untuk menghapus';

        finalDropZone.appendChild(orgEl);

        const originalEl = document.getElementById(elementId);
        if (originalEl) originalEl.remove();

        playSFX('click');
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
        gameScore += 10;
        resultEl.innerHTML = `
            <div class="result-icon">${currentFoodChain.emoji}</div>
            <strong>Luar Biasa!</strong><br>
            Kamu berhasil menyusun ${currentFoodChain.name} dengan benar!<br>
            <small>Produsen → Konsumen → Konsumen Puncak</small><br>
            <button class="btn primary-btn" onclick="initFoodChainGame()" style="margin-top: 15px;">Rantai Baru</button>
        `;
        playSFX('correct');
    } else {
        resultEl.innerHTML = `
            <div class="result-icon">❌</div>
            <strong>Belum tepat.</strong><br>
            Urutan yang benar:<br>
            <strong>${currentFoodChain.chain.join(' → ')}</strong>
        `;
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

    // Randomly select 6 items for variety
    const selectedItems = [...bodySystemsData].sort(() => 0.5 - Math.random()).slice(0, 6);

    const shuffledOrgans = [...selectedItems];
    const shuffledSystems = [...selectedItems];
    shuffleArray(shuffledOrgans);
    shuffleArray(shuffledSystems);

    shuffledOrgans.forEach((item, idx) => {
        const organEl = document.createElement('div');
        organEl.className = 'organ-item';
        organEl.innerHTML = `${item.organ}<br><small>${item.desc}</small>`;
        organEl.dataset.id = item.id;
        organEl.style.animationDelay = `${idx * 0.1}s`;
        organEl.onclick = () => selectOrgan(organEl, item.id);
        organsContainer.appendChild(organEl);
    });

    shuffledSystems.forEach((item, idx) => {
        const systemEl = document.createElement('div');
        systemEl.className = 'system-item';
        systemEl.textContent = item.system;
        systemEl.dataset.id = item.id;
        systemEl.style.animationDelay = `${idx * 0.1}s`;
        systemEl.onclick = () => matchSystem(systemEl, item.id);
        systemsContainer.appendChild(systemEl);
    });
}

function selectOrgan(element, id) {
    document.querySelectorAll('.organ-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedOrgan = id;
    playSFX('click');
}

function matchSystem(element, systemId) {
    if (!selectedOrgan) {
        const resultEl = document.getElementById('bodysystem-result');
        resultEl.style.display = 'block';
        resultEl.className = 'game-result show incorrect';
        resultEl.innerHTML = '⚠️ Pilih organ terlebih dahulu!';
        setTimeout(() => resultEl.style.display = 'none', 2000);
        return;
    }

    if (selectedOrgan === systemId) {
        element.classList.add('matched');
        const organEl = document.querySelector(`.organ-item[data-id="${selectedOrgan}"]`);
        organEl.classList.add('matched');
        organEl.style.opacity = '0.5';
        matches.push({ organ: selectedOrgan, system: systemId });
        selectedOrgan = null;
        playSFX('correct');

        // Auto-check if all matched
        if (matches.length === document.querySelectorAll('.organ-item').length) {
            setTimeout(checkBodySystem, 500);
        }
    } else {
        playSFX('wrong');
        const resultEl = document.getElementById('bodysystem-result');
        resultEl.style.display = 'block';
        resultEl.className = 'game-result show incorrect';
        resultEl.innerHTML = '❌ Pasangan tidak cocok! Coba lagi.';
        setTimeout(() => resultEl.style.display = 'none', 2000);
    }
}

function checkBodySystem() {
    const totalItems = document.querySelectorAll('.organ-item').length;
    const resultEl = document.getElementById('bodysystem-result');
    resultEl.style.display = 'block';

    if (matches.length === totalItems) {
        gameScore += 10;
        resultEl.className = 'game-result show correct';
        resultEl.innerHTML = `
            <div class="result-icon">🏆</div>
            <strong>Sempurna!</strong><br>
            Semua organ telah dicocokkan dengan sistem tubuh yang tepat!<br>
            <button class="btn primary-btn" onclick="initBodySystemGame()" style="margin-top: 15px;">Soal Baru</button>
        `;
        playSFX('correct');
    } else {
        resultEl.className = 'game-result show incorrect';
        resultEl.innerHTML = `❌ Kamu baru mencocokkan ${matches.length} dari ${totalItems} pasangan. Lanjutkan!`;
        setTimeout(() => resultEl.style.display = 'none', 3000);
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
