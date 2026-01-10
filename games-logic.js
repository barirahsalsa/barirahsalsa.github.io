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
