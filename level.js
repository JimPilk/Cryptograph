function getCipher() {
  const parameters = new URLSearchParams(window.location.search);
  const cipherIndex = cipherNameSystem[parameters.get("cipher")];
  return cipherIndex;
}

function loadInfo(cipherIndex) {
  const title = document.getElementById("title");
  const heading = document.getElementById("heading");
  const description = document.getElementById("description");
  const challenge = document.getElementById("code");
  const characterList = document.getElementById("characterList");
  const specs = [
    document.getElementById("brain"),
    document.getElementById("paper"),
    document.getElementById("computer"),
    document.getElementById("online"),
  ];
  const values = ["○", "●"];

  title.innerHTML = cipherHeadings[cipherIndex];
  heading.innerHTML = cipherHeadings[cipherIndex];
  description.innerHTML = cipherDescriptions[cipherIndex];
  challenge.innerHTML = showControlSymbols(
    cipherFunctions[cipherIndex](cipherChallenges[cipherIndex], key),
  );

  let currentList = cipherCharacters[cipherIndex];
  characterList.innerHTML = currentList[0];

  if (currentList[1] == true) {
    document.getElementById("preserved").hidden = false;
  } else {
    document.getElementById("not preserved").hidden = false;
  }

  let spec, currentString, j;
  for (let i = 0; i < 4; i++) {
    spec = cipherDetails[cipherIndex][i];
    currentString = "";

    for (let j = 0; j < spec; j++) {
      currentString += values[1];
    }
    for (j = spec; j < 5; j++) {
      currentString += values[0];
    }

    specs[i].innerHTML = currentString;
  }

  if (cipherTechnicalities[cipherIndex] != undefined) {
    document.getElementById("technicalities").hidden = false;
    const technicalityList = document.getElementById("technicalityList");

    let li;
    for (let k = 0; k < cipherTechnicalities[cipherIndex].length; k++) {
      li = document.createElement("li");
      li.innerText = cipherTechnicalities[cipherIndex][k];
      technicalityList.appendChild(li);
    }
  }

  let solved = localStorage.getItem("cipher" + cipherIndex);
  if (solved != undefined) {
    levelComplete(false);
  }
}

function generateKey(cipherIndex) {
  for (let i = cipherIndex; i > 0; i--) {
    rand();
  }

  cipherKeyFunction = cipherKeyFunctions[cipherIndex];
  if (cipherKeyFunction != undefined) {
    let key = cipherKeyFunction();
    console.log("Key = ", key);
    return key;
  }
}

function cleanseAnswer(inputString) {
  return inputString.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

function showControlSymbols(str) {
  // Regex finds characters in range 0-31 (0x00-0x1F) and character 127 (0x7F)
  return str.replace(/[\x00-\x1F\x7F]/g, (char) => {
    // Offset char code to the "Control Pictures" block (starting at U+2400)
    return String.fromCharCode(0x2400 + char.charCodeAt(0));
  });
}

function encodeText() {
  const plaintext = document.getElementById("plaintext");
  const ciphertextDisplay = document.getElementById("ciphertext");

  if (
    cleanseAnswer(plaintext.value) ==
    cleanseAnswer(cipherChallenges[cipherIndex])
  ) {
    levelComplete();
  }

  var cipherText = cipherFunctions[cipherIndex](plaintext.value, key);
  ciphertextDisplay.innerHTML = cipherText;
}

function levelComplete(showDiaglog = true) {
  if (showDiaglog) {
    localStorage.setItem("cipher" + cipherIndex, seed);
    document.getElementById("successDialog").showModal();
  }

  let previousKey = localStorage.getItem("cipher" + cipherIndex);
  document.getElementById("heading").innerHTML =
    cipherHeadings[cipherIndex] +
    " - Last solved on " +
    getSeedlyDate(previousKey);

  const intro = document.getElementById("introduction");
  intro.classList.add("solved");

  // Build the solved badge
  const badge = document.createElement("div");
  badge.id = "solvedBadge";

  const label = document.createElement("span");
  label.textContent = "SOLVED";

  const dateSpan = document.createElement("span");
  dateSpan.id = "solvedDate";
}

//Ai generated function to copy text to the clipboard why isn't this easier to implement??
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

function copyCode() {
  copyToClipboard(
    cipherFunctions[cipherIndex](cipherChallenges[cipherIndex], key),
  );
}

//Silly code editor got confused in the html so I shoved it here :)
document.getElementById("plaintext").innerHTML = "Hello World";

const cipherIndex = getCipher();
console.log("This cipher has cipher index", cipherIndex);

if (cipherIndex != undefined) {
  var seed = getDailySeed();
  var key = generateKey(cipherIndex);
  loadInfo(cipherIndex);
} else {
  window.location.href = "/";
}
