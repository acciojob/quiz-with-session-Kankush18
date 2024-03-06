//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
      },
      {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
      },
      {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
      },
      {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
      },
    ];

    const questionsElement = document.getElementById("questions");
    const submitButton = document.getElementById("submit");

    // Display the quiz questions and choices
    function renderQuestions() {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
          const choice = question.choices[j];
          const choiceElement = document.createElement("input");
          choiceElement.setAttribute("type", "radio");
          choiceElement.setAttribute("name", `question-${i}`);
          choiceElement.setAttribute("value", choice);
          const choiceText = document.createTextNode(choice);
          questionElement.appendChild(choiceElement);
          questionElement.appendChild(choiceText);
        }
        questionsElement.appendChild(questionElement);
      }
    }

    // Retrieve saved progress from session storage
    function retrieveProgress() {
      const progress = JSON.parse(sessionStorage.getItem("progress")) || [];
      for (let i = 0; i < progress.length; i++) {
        const answer = progress[i];
        const radio = document.querySelector(`input[name="question-${answer.index}"][value="${answer.choice}"]`);
        if (radio) {
          radio.checked = true;
        }
      }
    }

    // Save progress to session storage
    function saveProgress() {
      const radios = document.querySelectorAll("input[type=radio]:checked");
      const progress = [];
      radios.forEach(radio => {
        progress.push({
          index: parseInt(radio.getAttribute("name").split("-")[1]),
          choice: radio.value
        });
      });
      sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    // Calculate and display the user's score
    function calculateScore() {
      const radios = document.querySelectorAll("input[type=radio]:checked");
      const score = Array.from(radios).reduce((acc, radio) => {
        const questionIndex = parseInt(radio.getAttribute("name").split("-")[1]);
        const answer = questions[questionIndex].answer;
        return radio.value === answer ? acc + 1 : acc;
      }, 0);
      const scoreElement = document.createElement("div");
      scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
      questionsElement.appendChild(scoreElement);

      // Store score in local storage
      localStorage.setItem("score", score);
    }

    // Event listener for form submission
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      saveProgress();
      calculateScore();
      submitButton.disabled = true;
    });

    // Initial rendering and progress retrieval
    renderQuestions();
    retrieveProgress();
