const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "Pernah nggak sih kamu merasa khawatir berlebihan tentang sesuatu, bahkan hal yang sebenarnya belum tentu kejadian?",
    answers: [
      { text: "Sering banget, hampir tiap hari", points: 4 },
      { text: "Kadang-kadang, kalau lagi kepikiran aja", points: 3 },
      { text: "Jarang, biasanya nggak kepikiran sih", points: 2 },
      { text: "Nggak pernah, santai aja orangnya", points: 1 },
    ],
  },
  {
    question: "Kalau besok ada presentasi di depan kelas, apa yang paling kamu rasain?",
    answers: [
      { text: "Deg-degan parah sampai susah tidur", points: 4 },
      { text: "Cemas, tapi masih bisa dihandle", points: 3 },
      { text: "Agak grogi sih, tapi nggak sampai kepikiran terus", points: 2 },
      { text: "Biasa aja, malah pengen cepet-cepet maju", points: 1 },
    ],
  },
  {
    question: "Pernah nggak kamu tiba-tiba ngerasa jantung berdebar, keringetan, atau gemetar pas lagi cemas?",
    answers: [
      { text: "Sering, dan itu lumayan bikin nggak nyaman", points: 4 },
      { text: "Kadang-kadang aja sih", points: 3 },
      { text: "Jarang banget", points: 2 },
      { text: "Nggak pernah ngalamin yang kayak gitu", points: 1 },
    ],
  },
  {
    question: "Kalau ada masalah, biasanya pikiran kamu gimana?",
    answers: [
      { text: "Langsung mikir skenario terburuk dan susah berhenti mikirin", points: 4 },
      { text: "Cemas di awal, tapi lama-lama bisa tenang", points: 3 },
      { text: "Kadang kepikiran, tapi nggak sampai bikin stres", points: 2 },
      { text: "Santai aja, toh masalah pasti bisa diselesaikan", points: 1 },
    ],
  },
  {
    question: "Pernah nggak sih kecemasan bikin kamu susah fokus belajar atau jadi males ketemu orang?",
    answers: [
      { text: "Iya, sering banget", points: 4 },
      { text: "Kadang-kadang, apalagi pas lagi banyak tugas", points: 3 },
      { text: "Jarang, cuma kalau lagi capek aja", points: 2 },
      { text: "Nggak pernah, nggak ngaruh ke aktivitasku  ", points: 1 },
    ],
  },
  {
    question: "Seberapa sering Anda merasa khawatir atau cemas tentang berbagai hal dalam hidup Anda?",
    answers: [
      { text: "Hampir setiap hari", points: 4 },
      { text: "Beberapa kali dalam seminggu", points: 3 },
      { text: "Sesekali, tetapi jarang", points: 2 },
      { text: "Hampir tidak pernah", points: 1 },
    ],
  },
  {
    question: "Apakah Anda merasa sulit untuk mengendalikan rasa khawatir atau cemas Anda?",
    answers: [
      { text: "Ya, saya hampir selalu merasa tidak bisa mengendalikannya", points: 4 },
      { text: "Kadang-kadang sulit, tetapi masih bisa diatasi", points: 3 },
      { text: "Jarang merasa sulit mengendalikannya", points: 2 },
      { text: "Tidak, saya bisa mengendalikannya dengan baik", points: 1 },
    ],
  },
  {
    question: "Apakah rasa khawatir atau cemas Anda mengganggu aktivitas sehari-hari Anda, seperti pekerjaan, sekolah, atau hubungan sosial?",
    answers: [
      { text: "Sangat mengganggu, hingga saya kesulitan menjalankan aktivitas", points: 4 },
      { text: "Cukup mengganggu, tetapi saya masih bisa beraktivitas", points: 3 },
      { text: "Kadang-kadang mengganggu, tetapi tidak terlalu signifikan", points: 2 },
      { text: "Tidak mengganggu sama sekali", points: 1 },
    ],
  },
  {
    question: "Apakah Anda mengalami gejala fisik seperti jantung berdebar, sesak napas, gemetar, atau sakit perut ketika merasa cemas?",
    answers: [
      { text: "Sering, tetapi tidak selalu", points: 4 },
      { text: "Cemas di awal, tapi lama-lama bisa tenang", points: 3 },
      { text: "Kadang-kadang, tetapi tidak terlalu parah", points: 2 },
      { text: "Tidak pernah atau sangat jarang", points: 1 },
    ],
  },
  {
    question: "Apakah Anda cenderung menghindari situasi atau aktivitas tertentu karena takut atau cemas?",
    answers: [
      { text: "Ya, saya sering menghindari banyak situasi karena kecemasan", points: 4 },
      { text: "Kadang-kadang saya menghindari beberapa situasi", points: 3 },
      { text: "Jarang, hanya dalam situasi tertentu", points: 2 },
      { text: "Tidak, saya tidak menghindari situasi apa pun karena cemas", points: 1 },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    score += shuffledQuestions[currentQuestionIndex].answers[answerIndex].points;
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  let resultMessage = `<p>Total poin anda: ${score} / ${shuffledQuestions.length * 4}</p>`;
  resultMessage += `<p>Terima kasih telah mengikuti kuis! Berdasarkan skor Anda, berikut adalah beberapa rekomendasi:</p>`;

  if (score <= 10) {
    resultMessage += `
      <p>
        Jika skor Anda 10: Anda tampaknya cukup santai dan tidak mudah cemas.
      </p>
    `;
  } else if (score <= 20) {
    resultMessage += `
      <p>
        Jika skor Anda antara 11-20: Anda mungkin mengalami sedikit kecemasan, tetapi tampaknya dapat dikelola.
      </p>
    `;
  } else if (score <= 30) {
    resultMessage += `
      <p>
        Jika skor Anda antara 21-30: Anda mungkin mengalami kecemasan sedang. Pertimbangkan untuk berbicara dengan seseorang tentang hal ini.
      </p>
    `;
  } else {
    resultMessage += `
      <p>
        Jika skor Anda antara 31-40: Anda mungkin mengalami kecemasan tinggi. Mencari nasihat profesional bisa sangat membantu.</li>
      </p>
    `;
  }

  resultMessage += `<p>Ingat, selalu baik untuk berbicara dengan seseorang jika Anda merasa terbebani.</p>`;

  resultDiv.innerHTML = resultMessage;
}
