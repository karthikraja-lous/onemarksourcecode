const quizData = [{
  question: "Sc( Z=21) is a transition element but Zinc (z=30) is not because",
  a: "both Sc³⁺ and Zn²⁺ ions are colourless and form white compounds.",
  b: "in case of Sc, 3d orbital are partially filled but in Zn these are completely filled",
  c: "last electron as assumed to be added to 4s level in case of zinc",
  d: "both Sc and Zn do not exhibit variable oxidation states",
  correct: "b",
},
 ];

let index = 0;
let correct = 0,
incorrect = 0,
total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");

const submitButton = document.querySelector("#submit");
submitButton.disabled = true; // Initially disable the submit button

// Add event listener to each input to enable/disable submit button
allInputs.forEach(input => {
input.addEventListener('change', () => {
  submitButton.disabled = !document.querySelector('input[type="radio"]:checked'); // Enable submit button if any radio button is checked
});
});

// Add event listener to submit button
submitButton.addEventListener('click', () => {
const ans = getAnswer();
if (ans) {
  const data = quizData[index];
  if (ans === data.correct) {
      correct++;
  } else {
      incorrect++;
  }
  index++;
  if (index < total) {
      loadQuestion();
  } else {
      quizEnd();
  }
  submitButton.disabled = true; // Disable submit button after submission
}
});

const loadQuestion = () => {
if (total === index) {
  return quizEnd();
}
reset();
const data = quizData[index];
if (data.question.includes('.jpg') || data.question.includes('.png') || data.question.includes('.jpeg')) {
  questionBox.innerHTML = `
      <div>
          <img src="${data.question}" alt="Question Image" />
      </div>
  `;
} else {
  questionBox.innerHTML = `${index + 1}) ${data.question}`;
}

// Handling options
if (data.a.includes('.jpg') || data.a.includes('.png') || data.a.includes('.jpeg')) {
  allInputs[0].nextElementSibling.innerHTML = `<img src="${data.a}" alt="Option A" />`;
} else {
  allInputs[0].nextElementSibling.innerText = data.a;
}

if (data.b.includes('.jpg') || data.b.includes('.png') || data.b.includes('.jpeg')) {
  allInputs[1].nextElementSibling.innerHTML = `<img src="${data.b}" alt="Option B" />`;
} else {
  allInputs[1].nextElementSibling.innerText = data.b;
}

if (data.c.includes('.jpg') || data.c.includes('.png') || data.c.includes('.jpeg')) {
  allInputs[2].nextElementSibling.innerHTML = `<img src="${data.c}" alt="Option C" />`;
} else {
  allInputs[2].nextElementSibling.innerText = data.c;
}

if (data.d.includes('.jpg') || data.d.includes('.png') || data.d.includes('.jpeg')) {
  allInputs[3].nextElementSibling.innerHTML = `<img src="${data.d}" alt="Option D" />`;
} else {
  allInputs[3].nextElementSibling.innerText = data.d;
}
};


const getAnswer = () => {
let ans;
allInputs.forEach(
  (inputEl) => {
      if (inputEl.checked) {
          ans = inputEl.value;
      }
  }
)
return ans;
}

const reset = () => {
allInputs.forEach(
  (inputEl) => {
      inputEl.checked = false;
  }
)
}

const quizEnd = () => {
document.getElementsByClassName("container")[0].innerHTML = `
  <div class="col">
      <h2> Total correct ${correct} from ${total} </h2>
      <a align="center" href="./">Home</a>
  </div>
`
}

loadQuestion(index);
