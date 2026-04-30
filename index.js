//30/04/2026

const levels = [
  ["numerical", "atbash", "rot", "polybius"],
  ["caeser", "bacon", "scytale", "bifid"],
  ["affine", "railfence", "colum", "sub"],
  ["playfair", "four", "vigenere", "adfgvx"],
];

const difficulties = ["Easy", "Medium", "Hard", "Very Hard"];
const diffColours = ["#6aab5e", "#c9a96e", "#c45f5f", "#8b3a3a"];
const completed = "#d4ae19";
const completedToday = "#a020f0";

const grid = document.getElementById("levelGrid");
let currentDiff = null;

let data;

for (let i = 0; i < 4; i++) {
  const heading = document.createElement("h3");
  heading.textContent = difficulties[i];
  heading.style.width = "100%";
  grid.appendChild(heading);

  for (let j = 0; j < levels[i].length; j++) {
    cipherIndex = cipherNameSystem[levels[i][j]];
    data = localStorage.getItem("cipher" + cipherIndex);
    console.log(data);
    cipherName = cipherHeadings[cipherIndex];

    const btn = document.createElement("button");
    let icon = "";
    btn.textContent = cipherName;
    btn.style.backgroundColor = diffColours[i];
    if (data != null) {
      btn.style.filter += "opacity(60%)";
    }

    btn.onclick = () =>
      (window.location.href = `level.html?cipher=${levels[i][j]}`);
    grid.appendChild(btn);
  }
}
