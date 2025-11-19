const taskInput = document.getElementById("task-input");
const luckBtn = document.getElementById("luck-btn");
const sageText = document.getElementById("sage-text");
const sageStatus = document.getElementById("sage-status");
const historySection = document.getElementById("history-section");
const historyList = document.getElementById("history-list");

function pickVerdict() {
  const rnd = Math.random() * 100; // 0–100

  if (rnd < 1) {
    return "Сделаю сейчас";
  } else if (rnd < 3) {
    return "Сделаю через неделю";
  } else if (rnd < 6) {
    return "Сделаю через месяц";
  } else {
    return "Иди нахуй";
  }
}

function formatAnswer(task, verdict) {
  const prefix = task
    ? `По задаче «${task.trim()}» мудрец говорит:\n`
    : "Мудрец говорит:\n";

  let emoji = "🖕";
  if (verdict === "Сделаю сейчас") emoji = "⚡️";
  else if (verdict === "Сделаю через неделю") emoji = "📅";
  else if (verdict === "Сделаю через месяц") emoji = "🌙";

  return `${prefix}${emoji} ${verdict}`;
}

function addToHistory(task, verdict) {
  const li = document.createElement("li");
  li.classList.add("appear");

  const taskSpan = document.createElement("span");
  taskSpan.classList.add("history-task");
  taskSpan.textContent = task ? task : "Безымянная задача";

  const resultSpan = document.createElement("span");
  resultSpan.classList.add("history-result");

  if (verdict === "Сделаю сейчас") {
    resultSpan.classList.add("ok");
  } else if (
    verdict === "Сделаю через неделю" ||
    verdict === "Сделаю через месяц"
  ) {
    resultSpan.classList.add("maybe");
  } else {
    resultSpan.classList.add("nope");
  }

  resultSpan.textContent = verdict;

  li.appendChild(taskSpan);
  li.appendChild(resultSpan);

  // Добавляем в начало списка
  if (historyList.firstChild) {
    historyList.insertBefore(li, historyList.firstChild);
  } else {
    historyList.appendChild(li);
  }

  historySection.hidden = false;
}

function startThinkingState() {
  sageStatus.classList.remove("hidden");
  luckBtn.disabled = true;
  luckBtn.textContent = "Мудрец думает…";
}

function stopThinkingState() {
  sageStatus.classList.add("hidden");
  luckBtn.disabled = false;
  luckBtn.textContent = "Испытать удачу";
}

function handleLuckClick() {
  const taskValue = taskInput.value.trim();

  startThinkingState();

  // "Думать" 1.2–1.8 секунды
  const thinkingTime = 1200 + Math.random() * 600;

  setTimeout(() => {
    const verdict = pickVerdict();
    const answer = formatAnswer(taskValue, verdict);

    sageText.textContent = answer;
    sageText.parentElement.classList.remove("appear");
    void sageText.parentElement.offsetWidth; // перезапуск анимации
    sageText.parentElement.classList.add("appear");

    addToHistory(taskValue, verdict);
    stopThinkingState();
  }, thinkingTime);
}

luckBtn.addEventListener("click", handleLuckClick);

// Нажатие Enter в инпуте
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    luckBtn.click();
  }
});
