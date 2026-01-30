function analyze() {
    const syllabus = parseInt(document.getElementById("syllabus").value);
    const hours = parseInt(document.getElementById("hours").value);
    const days = parseInt(document.getElementById("days").value);
    const result = document.getElementById("result");

    if (isNaN(syllabus) || isNaN(hours) || isNaN(days)) {
        result.innerHTML = "⚠️ Please fill all fields";
        result.style.color = "#ff4c4c";
        return;
    }

    let score = 0;
    score += (syllabus >= 80) ? 2 : (syllabus >= 50 ? 1 : 0);
    score += (hours >= 4) ? 2 : (hours >= 2 ? 1 : 0);
    score += (days >= 10) ? 2 : (days >= 5 ? 1 : 0);

    let message = "";
    let color = "";

    if (score >= 5) {
        message = "🌟 Excellent! You're ready! 🎉 Keep up the good work!";
        color = "#00ff7f";
    } else if (score >= 3) {
        message = "⚠️ Almost there! 😅 Focus on key topics & plan wisely 💡";
        color = "#ffd700";
    } else {
        message = "❌ Not ready 😟 Start small, create a daily plan, and stay positive! 💪";
        color = "#ff4c4c";
    }

    result.style.color = color;
    result.innerHTML = message;
}
