// Battle System — handles turn-based SAT battles
class Battle {
    constructor(player, challenger, onWin, onLose) {
        this.player = player;
        this.challenger = challenger;
        this.onWin = onWin;
        this.onLose = onLose;
        this.playerHP = 100;
        this.enemyHP = challenger.hp;
        this.turn = 'player';
        this.questionPool = this.buildQuestionPool();
        this.questionsAnswered = 0;
        this.maxQuestions = challenger.questionsToWin;
        this.usedQuestions = [];
        this.battleOver = false;
        this.currentQuestion = null;
    }

    buildQuestionPool() {
        let pool = [];
        const cats = this.challenger.categories || ['math', 'reading', 'writing'];
        const diffRange = this.challenger.diffRange || [1, 5];
        cats.forEach(cat => {
            pool = pool.concat(getQuestions(cat, diffRange[0], diffRange[1]));
        });
        return pool;
    }

    getRandomQuestion() {
        let available = this.questionPool.filter(q => !this.usedQuestions.includes(q));
        if (available.length === 0) {
            this.usedQuestions = [];
            available = this.questionPool;
        }
        const q = getRandomQuestion(available);
        this.usedQuestions.push(q);
        this.currentQuestion = q;
        return q;
    }

    playerAttack(question, selectedAnswer) {
        if (this.battleOver) return;
        const isCorrect = selectedAnswer === question.ans;
        this.questionsAnswered++;

        if (isCorrect) {
            const damage = this.calculateDamage(question.diff);
            this.enemyHP = Math.max(0, this.enemyHP - damage);
            return { correct: true, damage, explanation: question.exp };
        } else {
            const damage = this.calculateDamage(question.diff, true);
            this.playerHP = Math.max(0, this.playerHP - damage);
            return { correct: false, damage, explanation: question.exp, correctAnswer: question.opts[question.ans] };
        }
    }

    calculateDamage(diff, isWrong = false) {
        const base = 15 + (diff * 5);
        return isWrong ? Math.floor(base * 0.5) : base;
    }

    enemyAttack() {
        if (this.battleOver) return;
        const damage = this.challenger.damage || (8 + Math.floor(Math.random() * 8));
        this.playerHP = Math.max(0, this.playerHP - damage);
        return damage;
    }

    isBattleOver() {
        if (this.enemyHP <= 0) {
            this.battleOver = true;
            return 'win';
        }
        if (this.playerHP <= 0) {
            this.battleOver = true;
            return 'lose';
        }
        if (this.questionsAnswered >= this.maxQuestions) {
            this.battleOver = true;
            return this.enemyHP < this.playerHP ? 'win' : 'lose';
        }
        return null;
    }

    getPlayerHP() { return this.playerHP; }
    getEnemyHP() { return this.enemyHP; }
    getQuestionsAnswered() { return this.questionsAnswered; }
    getMaxQuestions() { return this.maxQuestions; }
    getCurrentQuestion() { return this.currentQuestion; }
}
