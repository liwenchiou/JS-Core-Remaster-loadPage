const dialogueData = [
    {
        text: "年輕的冒險者，歡迎來到<b>『JS 核心重構公會』</b>。我是導師 Antigravity。",
        action: () => {}
    },
    {
        text: "這場 30 天的冒險，分成了五個嚴密的里程碑，從整潔術、資料流到瀏覽器機制，我們將一步步揭開底層真相。",
        action: () => {}
    },
    {
        text: "但你可能在想：『我們該如何進行這場修煉？』。別擔心，公會已經為你準備好了完整的 SOP。",
        action: () => {}
    },
    {
        text: "<b>第一步：每日任務書</b>。每天，我都會在 <a href='https://ithelp.ithome.com.tw/' target='_blank'>iThome 鐵人賽平台</a> 與 <a href='https://garden.liwen.studio/' target='_blank'>數位花園部落格</a> 同步發布新的任務內容，那是你的指引。" ,
        action: () => {}
    },
    {
        text: "<b>第二步：代碼演武場</b>。閱讀完原理後，請務必前往任務書末尾的 CodePen 進行實戰操練，那是將知識轉化為肌肉記憶的唯一途徑。",
        action: () => {}
    },
    {
        text: "<b>第三步：冒險者酒館</b>。修煉路上絕不孤單，若遇到瓶頸，隨時歡迎回到酒館與其他勇者交流、切磋。",
        action: () => {}
    },
    {
        text: "這就是我們的冒險節奏。當你完成了 30 天的循環，你將會遇見那把<b>『隱藏在迷霧後的聖劍』</b>，完成終極轉職。",
        action: () => {}
    },
    {
        text: "準備好了嗎？冒險之門已經開啟，如果你有任何疑問，現在就先去<b>『冒險者酒館』</b>打聲招呼吧：<br><a href='https://liwenchiou.github.io/QuestBoard-Remaster/' target='_blank' class='tavern-link'>👉 進入冒險者酒館 (QuestBoard)</a><br><br>或是回到導師的<b>『數位花園』</b>：<br><a href='https://garden.liwen.studio/' target='_blank' class='tavern-link'>👉 訪問數位花園部落格</a>",
        action: () => {}
    },
    {
        text: "祝你在這 30 天的征途中，覺醒屬於你的 JS 原力。我們在 Day 01 見！",
        action: () => {}
    }
];

let currentStep = 0;
let isTyping = false;
const textTarget = document.getElementById('text-target');
const trigger = document.getElementById('dialogue-trigger');
const prevBtn = document.getElementById('prev-btn');
const endControls = document.getElementById('end-controls');
const restartBtn = document.getElementById('restart-btn');

function typeWriter(text, i = 0) {
    if (i === 0) {
        textTarget.innerHTML = "";
        isTyping = true;
    }

    if (i < text.length) {
        if (text.substring(i, i + 3) === "<b>") {
            const endTag = text.indexOf("</b>", i);
            const boldText = text.substring(i, endTag + 4);
            textTarget.innerHTML += boldText;
            setTimeout(() => typeWriter(text, endTag + 4), 15);
        } else if (text.substring(i, i + 2) === "<a") {
            const endTag = text.indexOf("</a>", i);
            const linkText = text.substring(i, endTag + 4);
            textTarget.innerHTML += linkText;
            setTimeout(() => typeWriter(text, endTag + 4), 15);
        } else if (text.substring(i, i + 4) === "<br>") {
            textTarget.innerHTML += "<br>";
            setTimeout(() => typeWriter(text, i + 4), 15);
        } else {
            textTarget.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 15);
        }
    } else {
        isTyping = false;
        updateUI();
    }
}

function updateUI() {
    // Show/Hide Prev Button
    if (currentStep > 1) {
        prevBtn.classList.add('visible');
    } else {
        prevBtn.classList.remove('visible');
    }

    // Show End Controls
    if (currentStep >= dialogueData.length && !isTyping) {
        endControls.classList.add('visible');
        trigger.style.pointerEvents = 'none';
        trigger.style.opacity = '0.5';
    } else {
        endControls.classList.remove('visible');
        trigger.style.pointerEvents = 'auto';
        trigger.style.opacity = '1';
    }
}

function nextDialogue() {
    if (isTyping) return;

    if (currentStep < dialogueData.length) {
        const step = dialogueData[currentStep];
        typeWriter(step.text);
        step.action();
        currentStep++;
    } else {
        updateUI();
    }
}

function prevDialogue() {
    if (isTyping || currentStep <= 1) return;
    
    currentStep -= 2; // Go back two steps because currentStep was incremented at the end of nextDialogue
    nextDialogue();
}

function restartDialogue() {
    currentStep = 0;
    nextDialogue();
}

// Event Listeners
trigger.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') {
        nextDialogue();
    }
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevDialogue();
});

restartBtn.addEventListener('click', restartDialogue);

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (isTyping) return;

    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (currentStep < dialogueData.length) {
            nextDialogue();
        }
    } else if (e.code === 'Backspace' || e.code === 'ArrowLeft') {
        e.preventDefault();
        prevDialogue();
    } else if (e.code === 'KeyR') {
        restartDialogue();
    }
});

// Initial trigger
window.onload = () => {
    setTimeout(nextDialogue, 800);
};
