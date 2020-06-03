const game = {
    currentSentence : null,
    currentSentenceLetters: null,
    attempts : 5,
    elemBoardElem : document.querySelector('.game-board'),
    elemSentence : document.querySelector('.game-sentence'),
    elemAttempts: document.querySelector('.game-attempts'),
    elemLetters: document.querySelector('.game-letters'),

    sentences : [
        "Fantomas",
        "Super Szamson",
        "Hasło",
        "Myszka",
        "Super bohaterowie",
        "Super pies",
        "Przyjaciel",
        "Kurs JavaScript",
        "Terminator",
        "Superman",
        "Herkules",
        "Batman",
        "Spiderman",
        "Kapitan Ameryka"
    ],

    generateLetterButtons(){
        const alphabet = ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j",
        "k","l","ł","m","n","ń","o","ó",
        "p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"];

        alphabet.forEach(letter => {
            const button = document.createElement('button');
            button.classList.add('game-letter');
            button.type = 'button';
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);

        });
    },

    enableLetters(){
        const letters = this.elemLetters.querySelectorAll('.game-letter');
        letters.forEach(letter => letter.disabled = false);
    },
    disabledLetters(){
        const letters = this.elemLetters.querySelectorAll('.game-letter');
        letters.forEach(letter => letter.disabled = true);
    },
    showAttempts(){
        this.elemAttempts.innerText = this.attempts;
    },
    randomSentence(){
        const max = this.sentences.length-1;
        const min = 0;
        const rand = Math.floor(Math.random()*(max-min+1)+min);

        this.currentSentence = this.sentences[rand].toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/ /g, '');

        this.elemSentence.innerText = '';

        const letters = this.currentSentence.split('');
        letters.forEach(letter =>{
            const div = document.createElement('div');
            div.classList.add('game-sentence-box');
            if(letter===''){
                div.classList.add('game-sentence-box-space');
            }
            this.elemSentence.appendChild(div);

        });
    },

    isLetterExists(){
        return this.currentSentenceLetters.length;
    },

    gameOver() {
        alert("Niestety nie udało ci się odgadnąć hasła. Ps: brzmi ono: \n\n" + this.currentSentence);
        this.disableLetters();
    },

    gameComplete() {
        alert("Udało ci się zgadnąć hasło :)");
        this.disableLetters();
    },

    checkLettersInSentence(letter){
        if(this.currentSentence.includes(letter)){
            for (let i=0; i<this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    this.elemSentence.querySelectorAll('.game-sentence-box')[i].innerText = letter;
        }
    }
    this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter,"g"),"");

    if(!this.isLetterExists()){
        this.gameComplete();
    }
    }else{
        this.attempts--;
        this.showAttempts();

        if(this.attempts<=0){
            this.gameOver();
        }
    }
},

    bindEvents(){
        this.elemLetters.addEventListener('click', e =>{
            if(e.target.nodeName.toUpperCase()=== 'BUTTON' && e.target.classList.contains('game-letter')){
                const letter = e.target.dataset.letter;
                this.checkLettersInSentence(letter.toUpperCase());
                e.target.disabled = true;
            }
        });
    },

    initBoard(){
        this.generateLetterButtons();
        this.bindEvents();
        this.disabledLetters();
    },
    
    startGame(){
        this.attempts = 5;
        this.randomSentence();
        this.showAttempts();
        this.enableLetters(); 
    },
};

game.initBoard();

document.querySelector('.game-start').addEventListener('click',()=> game.startGame());