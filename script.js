
const questions = [
  { id: 1, text: "I always find new and interesting aspects in my work.", reverse: true, group: 'disengagement' },
  { id: 2, text: "There are days when I feel tired before I arrive at work.", reverse: false, group: 'exhaustion' },
  { id: 3, text: "It happens more and more often that I talk about my work in a negative way.", reverse: false, group: 'disengagement' },
  { id: 4, text: "After work, I tend to need more time than in the past in order to relax and feel better.", reverse: false, group: 'exhaustion' },
  { id: 5, text: "I can tolerate the pressure of my work very well.", reverse: true, group: 'exhaustion' },
  { id: 6, text: "Lately, I tend to think less at work and do my job almost mechanically.", reverse: false, group: 'disengagement' },
  { id: 7, text: "I find my work to be a positive challenge.", reverse: true, group: 'disengagement' },
  { id: 8, text: "During my work, I often feel emotionally drained.", reverse: false, group: 'exhaustion' },
  { id: 9, text: "Over time, one can become disconnected from this type of work.", reverse: false, group: 'disengagement' },
  { id: 10, text: "After working, I have enough energy for my leisure activities.", reverse: true, group: 'exhaustion' },
  { id: 11, text: "Sometimes I feel sickened by my work tasks.", reverse: false, group: 'disengagement' },
  { id: 12, text: "After my work, I usually feel worn out and weary.", reverse: false, group: 'exhaustion' },
  { id: 13, text: "This is the only type of work that I can imagine myself doing.", reverse: true, group: 'disengagement' },
  { id: 14, text: "Usually, I can manage the amount of my work well.", reverse: true, group: 'exhaustion' },
  { id: 15, text: "I feel more and more engaged in my work.", reverse: true, group: 'disengagement' },
  { id: 16, text: "When I work, I usually feel energized.", reverse: true, group: 'exhaustion' },
];

const questionsContainer = document.getElementById("questions");

questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <label>${q.id}. ${q.text}</label><br>
    <div class="options">
      ${[1, 2, 3, 4].map(value => `
        <label>
          <input type="radio" name="q${q.id}" value="${value}" required> ${value}
        </label>
      `).join('')}
    </div>
  `;
  questionsContainer.appendChild(div);
});

document.getElementById("burnout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let disengagement = 0;
  let exhaustion = 0;

  questions.forEach(q => {
    const selected = document.querySelector(`input[name=q${q.id}]:checked`);
    let score = parseInt(selected.value);
    if (q.reverse) score = 5 - score;

    if (q.group === "disengagement") disengagement += score;
    else exhaustion += score;
  });

  const total = disengagement + exhaustion;

  document.getElementById("disengagement-score").textContent = disengagement;
  document.getElementById("exhaustion-score").textContent = exhaustion;
  document.getElementById("total-score").textContent = total;

  let interpretation = "";

  if (disengagement >= 22) interpretation += "⚠️ High Disengagement. ";
  if (exhaustion >= 23) interpretation += "⚠️ High Exhaustion. ";
  if (!interpretation) interpretation = "✅ No significant signs of burnout detected.";

  document.getElementById("interpretation").textContent = interpretation;
  document.getElementById("results").classList.remove("hidden");
});
