const quizData = [
  {
    name: "Order of Lenin",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/SU_Order_of_Lenin_ribbon.svg",
  },
  {
    name: "Order of the Red Banner",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/SU_Order_of_the_Red_Banner_ribbon.svg",
  },
  {
    name: "Order of the October Revolution",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Order_october_revolution_rib.png",
  },
  {
    name: "Order of the Red Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/SU_Order_of_the_Red_Star_ribbon.svg",
  },
  {
    name: "Order of the Patriotic War 1st Class",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/94/SU_Order_of_the_Patriotic_War_1st_class_ribbon.svg",
  },
  {
    name: "Order of the Patriotic War 2nd Class",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/SU_Order_of_the_Patriotic_War_2nd_class_ribbon.svg",
  },
  {
    name: "Order of Glory",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Order_of_Glory_Ribbon_Bar.svg",
  },
  {
    name: "Medal for Courage",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/SU_Medal_For_Courage_ribbon.svg",
  },
  {
    name: "Medal for Battle Merit",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/SU_Medal_For_Battle_Merit_ribbon.svg",
  },
  {
    name: "Medal for the Defence of Leningrad",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/SU_Medal_For_the_Defence_of_Leningrad_ribbon.svg",
  },
  {
    name: "Medal for the Defence of Moscow",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/SU_Medal_For_the_Defence_of_Moscow_ribbon.svg",
  },
  {
    name: "Medal for the Defence of Stalingrad",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/SU_Medal_For_the_Defence_of_Stalingrad_ribbon.svg",
  },
  {
    name: "Medal for the Defence of Sevastopol",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/SU_Medal_For_the_Defence_of_Sevastopol_ribbon.svg",
  },
  {
    name: "Medal for the Defence of the Caucasus",
    image: "https://commons.wikimedia.org/wiki/File:SU_Medal_For_the_Defence_of_the_Caucasus_ribbon.svg",
  },
  {
    name: "Medal for the Defence of the Soviet Transarctic",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/SU_Medal_For_the_Defence_of_the_Soviet_Transarctic_ribbon.svg",
  },
  {
    name: "Medal for the Victory over Germany in the Great Patriotic War 1941–1945",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/SU_Medal_For_the_Victory_over_Germany_in_the_Great_Patriotic_War_1941-1945_ribbon.svg",
  },
  {
    name: "Medal for the Victory over Japan",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/SU_Medal_For_the_Victory_over_Japan_ribbon.svg",
  },
  {
    name: "Medal for the Capture of Budapest",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/SU_Medal_For_the_Capture_of_Budapest_ribbon.svg",
  },
  {
    name: "Medal for the Capture of Königsberg",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/SU_Medal_For_the_Capture_of_Koenigsberg_ribbon.svg",
  },
  {
    name: "Medal for the Capture of Vienna",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/SU_Medal_For_the_Capture_of_Vienna_ribbon.svg",
  },
  {
    name: "Medal for the Capture of Berlin",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Caputureberlin_rib.png",
  },
  {
    name: "Medal for the Liberation of Belgrade",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/SU_Medal_For_the_Liberation_of_Belgrade_ribbon.svg",
  },
  {
    name: "Medal for the Liberation of Prague",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/SU_Medal_For_the_Liberation_of_Prague_ribbon.svg",
  },
  {
    name: "Medal for the Liberation of Warsaw",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/SU_Medal_For_the_Liberation_of_Warsaw_ribbon.svg",
  },
];

let currentQuestion = 0;
let score = 0;
let usedQuestions = [];

const ribbonImage = document.getElementById("ribbon-image");
const optionButtons = document.querySelectorAll(".option-btn");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (usedQuestions.length === 5) {
    endQuiz();
    return;
  }

  let question;
  do {
    question = quizData[Math.floor(Math.random() * quizData.length)];
  } while (usedQuestions.includes(question));

  usedQuestions.push(question);
  ribbonImage.src = question.image;

  const options = [question];

  while (options.length < 4) {
    const option = quizData[Math.floor(Math.random() * quizData.length)];
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  shuffle(options);

  optionButtons.forEach((button, index) => {
    button.textContent = options[index].name;
    button.dataset.correct = options[index].name === question.name;
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  feedback.textContent = "";
  nextButton.style.display = "none";
}

function selectOption(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    feedback.textContent = "Correct!";
    score++;
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Wrong! The correct answer is: ${quizData.find(q => q.name === selectedButton.dataset.correctAnswer).name}`;
    optionButtons.forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
  }

  optionButtons.forEach((button) => (button.disabled = true));
  nextButton.style.display = "block";
}

function loadQuestion() {
  if (usedQuestions.length === 10) {
    endQuiz();
    return;
  }

  let question;
  do {
    question = quizData[Math.floor(Math.random() * quizData.length)];
  } while (usedQuestions.includes(question));

  usedQuestions.push(question);
  ribbonImage.src = question.image;

  const options = [question];

  while (options.length < 4) {
    const option = quizData[Math.floor(Math.random() * quizData.length)];
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  shuffle(options);

  optionButtons.forEach((button, index) => {
    button.textContent = options[index].name;
    button.dataset.correct = options[index].name === question.name;
    button.dataset.correctAnswer = question.name;
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  feedback.textContent = "";
  nextButton.style.display = "none";
}
function endQuiz() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreDisplay.textContent = score;
}

function restartQuiz() {
  score = 0;
  usedQuestions = [];
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  loadQuestion();
}

optionButtons.forEach((button) => {
  button.addEventListener("click", selectOption);
});

nextButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartQuiz);

// Initialize Quiz
loadQuestion();
