// Quiz Logic
let currentQuestion = 1;
const totalQuestions = 4;
const answers = {};

const recommendations = {
    energy: {
        name: "Dry Fruit Milkshake",
        price: "₹90",
        icon: "🌰",
        image: "pics/Dry-Fruit-Milk-Shake-1-scaled.jpg",
        benefits: [
            { icon: "⚡", text: "Long-lasting energy" },
            { icon: "💪", text: "Strength and stamina" },
            { icon: "🧠", text: "Supports brain health" }
        ]
    },
    cooling: {
        name: "Muskmelon Solid",
        price: "₹50",
        icon: "🍈",
        image: "pics/muskmelon.jpg",
        benefits: [
            { icon: "💧", text: "Hydrating fruit" },
            { icon: "❄️", text: "Cooling effect" },
            { icon: "🌿", text: "Easy digestion" }
        ]
    },
    immunity: {
        name: "Orange Solid",
        price: "₹60",
        icon: "🍊",
        image: "pics/orange.png",
        benefits: [
            { icon: "🛡️", text: "Immunity booster" },
            { icon: "🍊", text: "Rich in vitamin C" },
            { icon: "✨", text: "Improves skin health" }
        ]
    },
    light: {
        name: "Vanilla Lassi",
        price: "₹40",
        icon: "🍦",
        image: "pics/vanilla.jpg",
        benefits: [
            { icon: "😊", text: "Light and refreshing" },
            { icon: "❄️", text: "Cooling drink" },
            { icon: "🥛", text: "Calcium rich" }
        ]
    },
    digestion: {
        name: "Papaya Solid",
        price: "₹50",
        icon: "🥭",
        image: "pics/papaya.jpg",
        benefits: [
            { icon: "🌿", text: "Supports digestion" },
            { icon: "✨", text: "Improves skin" },
            { icon: "🛡️", text: "Boosts immunity" }
        ]
    },
    skin: {
        name: "Strawberry Milkshake",
        price: "₹60",
        icon: "🍓",
        image: "pics/strawberry-milkshake-4.jpg",
        benefits: [
            { icon: "✨", text: "Good for skin health" },
            { icon: "🛡️", text: "Rich in antioxidants" },
            { icon: "🍓", text: "Boosts immunity" }
        ]
    },
    strength: {
        name: "Sharjah Milkshake",
        price: "₹50",
        icon: "🍫",
        image: "pics/sharjah.jpeg",
        benefits: [
            { icon: "💪", text: "Strength booster" },
            { icon: "⚡", text: "High energy drink" },
            { icon: "🥛", text: "Rich and filling" }
        ]
    },
    detox: {
        name: "Wheatgrass Juice",
        price: "₹60",
        icon: "🥬",
        image: "pics/wheatgrass.jpg",
        benefits: [
            { icon: "🧹", text: "Natural detox" },
            { icon: "🩸", text: "Improves blood health" },
            { icon: "🌱", text: "Rich in nutrients" }
        ]
    }
};

function openQuiz() {
    document.getElementById('quizModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuiz() {
    document.getElementById('quizModal').classList.remove('active');
    document.body.style.overflow = '';
    resetQuiz();
}

function resetQuiz() {
    currentQuestion = 1;
    Object.keys(answers).forEach(key => delete answers[key]);
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector('.question[data-q="1"]').classList.add('active');
    document.getElementById('resultScreen').classList.remove('show');
    document.getElementById('quizNav').style.display = 'flex';
    document.querySelector('.progress-bar').style.display = 'block';
    document.querySelector('.btn-prev').classList.add('hidden');
    document.querySelector('.btn-next').textContent = 'Next';
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    updateProgress();
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function selectOption(element) {
    const question = element.closest('.question');
    question.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    answers[currentQuestion] = element.dataset.value;
}

function nextQuestion() {
    if (!answers[currentQuestion]) {
        // Shake animation for error
        const activeQ = document.querySelector('.question.active');
        activeQ.style.animation = 'shake 0.5s';
        setTimeout(() => activeQ.style.animation = '', 500);
        return;
    }

    if (currentQuestion < totalQuestions) {
        document.querySelector(`.question[data-q="${currentQuestion}"]`).classList.remove('active');
        currentQuestion++;
        document.querySelector(`.question[data-q="${currentQuestion}"]`).classList.add('active');
        updateProgress();

        document.querySelector('.btn-prev').classList.remove('hidden');

        if (currentQuestion === totalQuestions) {
            document.querySelector('.btn-next').textContent = 'Get Recommendation';
        }
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        document.querySelector(`.question[data-q="${currentQuestion}"]`).classList.remove('active');
        currentQuestion--;
        document.querySelector(`.question[data-q="${currentQuestion}"]`).classList.add('active');
        updateProgress();

        if (currentQuestion === 1) {
            document.querySelector('.btn-prev').classList.add('hidden');
        }
        document.querySelector('.btn-next').textContent = 'Next';
    }
}

function showResult() {
    // Determine recommendation based on answers
    const goal = answers[1] || answers[4] || 'energy';
    const rec = recommendations[goal] || recommendations['energy'];

    const resultImage = document.getElementById('resultImage');
    const resultIcon = document.getElementById('resultIcon');

    if (rec.image) {
        resultImage.src = rec.image;
        resultImage.style.display = 'block';
        resultIcon.style.display = 'none';
        resultImage.alt = rec.name;
    } else {
        resultIcon.textContent = rec.icon;
        resultIcon.style.display = 'block';
        resultImage.style.display = 'none';
    }

    document.getElementById('resultJuice').textContent = rec.name;
    document.getElementById('resultPrice').textContent = rec.price;

    const benefitsHtml = rec.benefits.map(b =>
        `<div class="benefit-item"><span class="benefit-icon">${b.icon}</span><span>${b.text}</span></div>`
    ).join('');
    document.getElementById('resultBenefits').innerHTML = benefitsHtml;

    document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
    document.getElementById('quizNav').style.display = 'none';
    document.querySelector('.progress-bar').style.display = 'none';
    document.getElementById('resultScreen').classList.add('show');
}

function orderNow() {
    window.open('https://wa.me/919876543210', '_blank');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            selectOption(this);
        });
    });

    // Close modal on outside click
    document.getElementById('quizModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeQuiz();
        }
    });

    // Parallax effect
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax-side');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxElements.forEach(el => {
            const speed = el.classList.contains('parallax-left') ? -30 : 30;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        let delayCount = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animations for elements appearing together
                entry.target.style.transitionDelay = `${delayCount * 0.1}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                delayCount++;
            }
        });
    }, observerOptions);

    // Observe juice cards
    document.querySelectorAll('.juice-card').forEach((card) => {
        observer.observe(card);
    });

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
