//Advanced warning, a lot of the bits in this file are AI generated

//Random Key generation
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailySeed() {
  const now = new Date();
  return (
    now.getUTCFullYear() * 10000 +
    (now.getUTCMonth() + 1) * 100 +
    now.getUTCDate()
  );
}
function getSeedlyDate(seed) {
  const year = Math.floor(seed / 10000);
  const month = Math.floor((seed % 10000) / 100);
  const day = seed % 100;

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });
}

const rand = mulberry32(getDailySeed());

function randomWord() {
  return cipherKeyWords[Math.floor(rand() * cipherKeyWords.length)];
}

//Encryption
//These functions are completely AI generated and I have no idea how they work
function numericalEncode(text, key) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => {
          if (char >= "a" && char <= "z") return char.charCodeAt(0) - 96;
          if (char >= "1" && char <= "9")
            return String.fromCharCode(96 + Number(char)); // '1'->'a', '2'->'b', etc.
          return char;
        })
        .join("-"),
    )
    .join(" ");
}

function atbashEncode(text, key) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(219 - char.charCodeAt(0));
      }
      return char;
    })
    .join("");
}

function polybiusEncode(text, key) {
  const square = [
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "k"],
    ["l", "m", "n", "o", "p"],
    ["q", "r", "s", "t", "u"],
    ["v", "w", "x", "y", "z"],
  ];

  return text
    .toLowerCase()
    .replace(/j/g, "i")
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => {
          if (char >= "a" && char <= "z") {
            for (let row = 0; row < 5; row++) {
              const col = square[row].indexOf(char);
              if (col !== -1) return `${row + 1}${col + 1}`;
            }
          }
          return char;
        })
        .join(""),
    )
    .join(" ");
}

function caesarEncode(text, key) {
  return text
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + key) % 26) + 97);
      }
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
      }
      if (char >= "0" && char <= "9") {
        return String.fromCharCode(((char.charCodeAt(0) - 48 + key) % 10) + 48);
      }
      return char;
    })
    .join("");
}
function caeserKey() {
  return Math.floor(rand() * 24 + 1);
}

function rot13Encode(text) {
  return caesarEncode(text, 13);
}

function baconianEncode(text, key) {
  return text
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => {
          const lower = char.toLowerCase();
          if (lower >= "a" && lower <= "z") {
            const index = lower.charCodeAt(0) - 97;
            return index
              .toString(2)
              .padStart(5, "0")
              .replace(/0/g, "A")
              .replace(/1/g, "B");
          }
          return char;
        })
        .join(""),
    )
    .join(" ");
}

function scytaleEncode(text, key) {
  const numCols = Math.ceil(text.length / key);
  const padded = text.padEnd(numCols * key, " ");
  let result = "";

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < key; row++) {
      result += padded[row * numCols + col];
    }
  }

  return result;
}
function scytaleKey() {
  return Math.floor(rand() * 9 + 2);
}

function affineEncode(text, key) {
  const [a, b] = key;

  return text
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(
          ((a * (char.charCodeAt(0) - 97) + b) % 26) + 97,
        );
      }
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(
          ((a * (char.charCodeAt(0) - 65) + b) % 26) + 65,
        );
      }
      return char;
    })
    .join("");
}
function affineKey() {
  let possibleKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  return [possibleKeys[Math.floor(rand() * possibleKeys.length)], caeserKey()];
}

function railfenceEncode(text, key) {
  const rails = Array.from({ length: key }, () => []);
  let rail = 0;
  let direction = 1;

  text.split("").forEach((char) => {
    rails[rail].push(char);
    if (rail === 0) direction = 1;
    if (rail === key - 1) direction = -1;
    rail += direction;
  });

  return rails.flat().join("");
}
function railfenceKey() {
  return scytaleKey();
}

function substitutionEncode(text, key) {
  if (!text) return "";

  return text
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(key[char.charCodeAt(0) - 97] + 97);
      }
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(key[char.charCodeAt(0) - 65] + 65);
      }
      return char;
    })
    .join("");
}
function substitutionKey() {
  const arr = Array.from({ length: 26 }, (_, i) => i); // [0, 1, 2, ..., 25]

  // Fisher-Yates shuffle
  for (let i = 25; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }

  return arr;
}

function playfairEncode(text, key) {
  if (!text) return "";

  const pos = {};
  for (let i = 0; i < 25; i++) pos[key[i]] = [Math.floor(i / 5), i % 5];
  const getAt = (r, c) => key[r * 5 + c];

  const letters = text.split("").reduce((acc, char) => {
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      acc.push(char === "j" ? "i" : char === "J" ? "I" : char);
    }
    return acc;
  }, []);

  const pairs = [];
  let i = 0;
  while (i < letters.length) {
    const a = letters[i].toLowerCase();
    if (i + 1 >= letters.length) {
      pairs.push([a, "x"]);
      i++;
    } else {
      const b = letters[i + 1].toLowerCase();
      if (a === b) {
        pairs.push([a, "x"]);
        i++;
      } else {
        pairs.push([a, b]);
        i += 2;
      }
    }
  }

  return pairs
    .flatMap(([a, b]) => {
      const [ar, ac] = pos[a.charCodeAt(0) - 97];
      const [br, bc] = pos[b.charCodeAt(0) - 97];
      let ea, eb;
      if (ar === br) {
        ea = getAt(ar, (ac + 1) % 5);
        eb = getAt(br, (bc + 1) % 5);
      } else if (ac === bc) {
        ea = getAt((ar + 1) % 5, ac);
        eb = getAt((br + 1) % 5, bc);
      } else {
        ea = getAt(ar, bc);
        eb = getAt(br, ac);
      }
      return [String.fromCharCode(ea + 97), String.fromCharCode(eb + 97)];
    })
    .join("");
}
function playfairKey() {
  const arr = Array.from({ length: 25 }, (_, i) => i); // [0, 1, 2, ..., 25]

  for (let k = 9; k < 25; k++) {
    arr[k] = arr[k] + 1;
  }

  // Fisher-Yates shuffle
  for (let i = 24; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }

  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let string = "";
  for (k = 0; k < arr.length; k++) {
    string += alphabet[arr[k]];
  }
  console.log(string);

  return arr;
}

function vernamEncode(text, key) {
  if (!text) return "";

  return text
    .split("")
    .map((char, i) => {
      const keyChar = key[i % key.length];
      const textVal = char.charCodeAt(0) - 32;
      const keyVal = keyChar.charCodeAt(0) - 32;
      return String.fromCharCode(((textVal ^ keyVal) % 96) + 32);
    })
    .join("");
}
function vernamEncodeFull(text, key) {
  if (!text) return "";

  return text
    .split("")
    .map((char, i) => {
      const keyChar = key[i % key.length];
      const textVal = char.charCodeAt(0);
      const keyVal = keyChar.charCodeAt(0);
      return String.fromCharCode((textVal ^ keyVal) % 128);
    })
    .join("");
}
// function vernamKey() {
//   let key = "";
//   for (let i = 0; i < Math.floor(rand() * 5) + 3; i++) {
//     key = key + String.fromCharCode(Math.floor(rand() * 96) + 32);
//   }
//   return key;
// }

function vigenereEncode(text, key) {
  if (!text) return "";

  const normalizedKey = key.toLowerCase();
  let keyIndex = 0;

  return text
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        const shift =
          normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97,
        );
      }
      if (char >= "A" && char <= "Z") {
        const shift =
          normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65,
        );
      }
      if (char >= "0" && char <= "9") {
        const shift =
          normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 48 + shift) % 10) + 48,
        );
      }
      return char;
    })
    .join("");
}
// function vigenereKey() {
//   let key = "";
//   for (let i = 0; i < Math.floor(rand() * 5) + 3; i++) {
//     key = key + String.fromCharCode(Math.floor(rand() * 25) + 65);
//   }
//   return key;
// }

function bifidEncode(text, key) {
  if (!text) return "";

  const square = [
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "k"],
    ["l", "m", "n", "o", "p"],
    ["q", "r", "s", "t", "u"],
    ["v", "w", "x", "y", "z"],
  ];

  const toCoords = (char) => {
    for (let r = 0; r < 5; r++) {
      const c = square[r].indexOf(char);
      if (c !== -1) return [r, c];
    }
  };

  // Strip non-letters, remembering their positions
  const saved = [];
  const letters = [];
  text.split("").forEach((char) => {
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      letters.push(
        char === "j" ? "i" : char === "J" ? "I" : char.toLowerCase(),
      );
    } else {
      saved.push({ afterLetters: letters.length, char });
    }
  });

  // Get all rows then all cols
  const coords = letters.map(toCoords);
  const rows = coords.map(([r]) => r);
  const cols = coords.map(([, c]) => c);
  const combined = [...rows, ...cols];

  // Re-pair and convert back to letters
  const encrypted = [];
  for (let i = 0; i < combined.length; i += 2) {
    encrypted.push(square[combined[i]][combined[i + 1]]);
  }

  // Reinsert non-letters
  let offset = 0;
  saved.forEach(({ afterLetters, char }) => {
    encrypted.splice(afterLetters + offset, 0, char);
    offset++;
  });

  return encrypted.join("");
}

function columnarEncode(text, key) {
  if (!text) return "";

  const numCols = key.length;
  const numRows = Math.ceil(text.length / numCols);
  const padded = text.padEnd(numRows * numCols, " ");

  // Build column order by sorting key letters alphabetically
  // If two letters are the same, the one appearing first in the key goes first
  const order = key
    .split("")
    .map((char, i) => ({ char, i }))
    .sort((a, b) => a.char.localeCompare(b.char) || a.i - b.i)
    .map(({ i }) => i);

  // Read off columns in sorted order
  let result = "";
  for (const col of order) {
    for (let row = 0; row < numRows; row++) {
      result += padded[row * numCols + col];
    }
  }

  return result;
}

function adfgvxEncode(text, key) {
  if (!text) return "";

  const [gridKey, transKey] = key;
  const headers = ["A", "D", "F", "G", "V", "X"];

  // Build lookup: character index -> ADFGVX pair
  const charToADFGVX = {};
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    charToADFGVX[gridKey[i]] = headers[row] + headers[col];
  }

  const charToIndex = (char) => {
    if (char >= "a" && char <= "z") return char.charCodeAt(0) - 97;
    if (char >= "0" && char <= "9") return char.charCodeAt(0) - 48 + 26;
    return -1;
  };

  // Step 1: substitute each letter/digit with its ADFGVX pair, strip everything else
  const substituted = text
    .toLowerCase()
    .split("")
    .filter(
      (char) => (char >= "a" && char <= "z") || (char >= "0" && char <= "9"),
    )
    .map((char) => charToADFGVX[charToIndex(char)])
    .join("");

  // Step 2: columnar transposition on the substituted text

  // console.log(
  //   gridKey
  //     .map((i) =>
  //       i < 26 ? String.fromCharCode(i + 97) : String.fromCharCode(i - 26 + 48),
  //     )
  //     .join(""),
  // );
  return columnarEncode(substituted, transKey);
}
function adfgvxKey() {
  const arr = Array.from({ length: 36 }, (_, i) => i); // [0, 1, 2, ..., 35]

  // Fisher-Yates shuffle
  for (let i = 35; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }

  return [arr, randomWord()];
}

function fourSquareEncode(text, key) {
  if (!text) return "";

  const [key1, key2] = key;
  console.log(
    key1
      .map((i) =>
        i < 9 ? String.fromCharCode(i + 97) : String.fromCharCode(i + 98),
      )
      .join(""),
  );
  console.log(
    key2
      .map((i) =>
        i < 9 ? String.fromCharCode(i + 97) : String.fromCharCode(i + 98),
      )
      .join(""),
  );

  // Convert letter to 0-24 index (i/j merged, k-z shifted down)
  const letterToIdx = (char) => {
    let idx = char.charCodeAt(0) - 97;
    if (idx === 9)
      idx = 8; // j -> i
    else if (idx > 9) idx--; // k-z shift down
    return idx;
  };

  // Convert 0-24 index back to letter
  const idxToLetter = (idx) => {
    if (idx < 9) return String.fromCharCode(idx + 97);
    return String.fromCharCode(idx + 98); // skip j
  };

  // Standard plain square is just 0-24 in order
  const plain = Array.from({ length: 25 }, (_, i) => i);
  const getPos = (square, idx) => {
    const pos = square.indexOf(idx);
    return [Math.floor(pos / 5), pos % 5];
  };
  const getAt = (square, r, c) => square[r * 5 + c];

  // Strip non-letters and build letter array
  const letters = text
    .toLowerCase()
    .split("")
    .reduce((acc, char) => {
      if (char >= "a" && char <= "z") acc.push(letterToIdx(char));
      return acc;
    }, []);

  // Build digraphs, inserting x(22) for doubles or odd length
  const pairs = [];
  let i = 0;
  while (i < letters.length) {
    const a = letters[i];
    if (i + 1 >= letters.length) {
      pairs.push([a, 22]); // pad odd length with x
      i++;
    } else {
      pairs.push([a, letters[i + 1]]);
      i += 2;
    }
  }

  // Encrypt each pair
  return pairs
    .map(([a, b]) => {
      const [r1, c1] = getPos(plain, a);
      const [r2, c2] = getPos(plain, b);
      const ea = idxToLetter(getAt(key1, r1, c2));
      const eb = idxToLetter(getAt(key2, r2, c1));
      return ea + eb;
    })
    .join("");
}
function fourSquareKey() {
  const arr1 = Array.from({ length: 25 }, (_, i) => i); // [0, 1, 2, ..., 24]
  const arr2 = Array.from({ length: 25 }, (_, i) => i); // [0, 1, 2, ..., 24]

  // Fisher-Yates shuffle
  for (let i = 24; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const k = Math.floor(rand() * (i + 1));
    [arr1[i], arr1[j]] = [arr1[j], arr1[i]]; // swap
    [arr2[i], arr2[k]] = [arr2[k], arr2[i]]; // swap
  }

  return [arr1, arr2];
}

//Now we get into stuff I actually wrote
const cipherNameSystem = {
  numerical: 0,
  atbash: 1,
  polybius: 2,
  caeser: 3,
  bacon: 4,
  scytale: 5,
  affine: 6,
  railfence: 7,
  sub: 8,
  playfair: 9,
  vernam: 10,
  vernamFull: 11,
  vigenere: 12,
  rot: 13,
  bifid: 14,
  colum: 15,
  adfgvx: 16,
  four: 17,
};

const cipherFunctions = {
  0: numericalEncode,
  1: atbashEncode,
  2: polybiusEncode,
  3: caesarEncode,
  4: baconianEncode,
  5: scytaleEncode,
  6: affineEncode,
  7: railfenceEncode,
  8: substitutionEncode,
  9: playfairEncode,
  10: vernamEncode,
  11: vernamEncodeFull,
  12: vigenereEncode,
  13: rot13Encode,
  14: bifidEncode,
  15: columnarEncode,
  16: adfgvxEncode,
  17: fourSquareEncode,
};

const cipherKeyFunctions = {
  3: caeserKey,
  5: scytaleKey,
  6: affineKey,
  7: railfenceKey,
  8: substitutionKey,
  9: playfairKey,
  10: randomWord,
  12: randomWord,
  15: randomWord,
  16: adfgvxKey,
  17: fourSquareKey,
};
cipherKeyFunctions[11] = cipherKeyFunctions[10];

const cipherTechnicalities = {
  0: [
    "All digits will be seperated by a dash, so it can be read more easily",
    "Single digit numbers will be swapped out for their letters because I thought it was funny",
  ],
  2: ["I and J have been merged"],
  5: [
    "It always assumes you have the perfect length of band for your message. Therefore, the key is not the number of turns on the band, but the length of the word divided by the number of letters per turn of the band",
  ],
  9: [
    "If a double letter appears, an x will be inserted between the double letters to ensure it can be encrypted properly (so make sure to remove any unnecessary x's in your answer)",
    "If the plaintext has an odd number of characters, an x is added on the end",
  ],
  12: [
    "The encryption algorithm removes all spaces and punctutation before encrypting, then adds them in later, therefore any non-encryptable characters will not increment the index looping through the key",
  ],
  14: [
    "The square used in the bifid cipher is the regular ordered polybius square (as seen in the polybius square level)",
    "I and J have been merged",
    "The message is not split up into blocks or periods",
  ],
  15: [
    "If two letters in the key are the same, the column read first is the one that appears first in the keyword itself",
  ],
  17: [
    "I and J have been merged",
    "The top left and bottom right squares are regular plaintext polybius squares, the other two are unique and random squares",
    "If the plaintext has an odd number of characters, an x is added on the end (so make sure to remove any unnecessary x's in your answer)",
  ],
};

const cipherChallenges = {
  0: "You just solved your first cipher!",
  1: "Do geese see God? thats a palindrome like this cipher",
  2: "J have replaced all the i wjth j to confuse your solver",
  3: "Caeser snipped his sniffer, seized his knee and sneezed",
  4: "Do you have a kevin bacon number?",
  5: "This is madness... THIS IS SPARTA",
  6: "This is such a fine cipher",
  7: "This is about as secure as the actual fence keeping the neighbours out!",
  8: "I wanted to make a ciphertext that had a perfect one to one correlation with frequency analysis to make it really easy to solve, but couldn't come up with one",
  9: "Hi guys, Im John Kenedy whos lost becaus my PT boat sank please help",
  10: "Not particularly uncrackable, reminds me of an egg!",
  12: "Wow this thing is french or something!",
  13: "Julius Caeser had two younger sisters, Major Julia and Minor Julia. Yes they were actually called that. This cipher is just like the true caeser ciphers little brother!",
  14: "This wasn't hard at all, I've bi-fid-ling with ciphers like this for breakfast!",
  15: "My love life is just like a cipher: complicated, encoded and missing the key! (I'm ciphering in silence)",
  16: "dot dash pause dash dot dot pause dot dot dash dot pause dot dot dot dash pause dash dash dot pause dash dot dot dash end",
  17: "This is getting too much, I'm polybius-ed out!",
};
cipherChallenges[11] = cipherChallenges[10];

const cipherHeadings = {
  0: "The Numerical Cipher",
  1: "The Atbash Cipher",
  2: "The Polybius Square",
  3: "The Caeser Cipher",
  4: "The Baconian Cipher",
  5: "The Scytale Cipher",
  6: "The Affine Cipher",
  7: "The Rail Fence Cipher",
  8: "The Substitution Cipher",
  9: "The Playfair Cipher",
  10: "The Vernam Cipher",
  11: "The Vernam Cipher",
  12: "The Vigenère Cipher",
  13: "ROT13",
  14: "The Bifid Cipher",
  15: "Columnar Transposition",
  16: "The ADFVGX Cipher",
  17: "The Four Square Cipher",
};

const cipherDetails = {
  0: [4, 5, 3, 4],
  1: [4, 5, 3, 4],
  2: [4, 5, 3, 4],
  3: [3, 4, 5, 5],
  4: [2, 3, 5, 5],
  5: [2, 3, 5, 4],
  6: [1, 3, 4, 5],
  7: [2, 4, 5, 5],
  8: [0, 2, 3, 4],
  9: [1, 3, 4, 3],
  10: [2, 2, 4, 2],
  11: [1, 2, 4, 3],
  12: [1, 4, 3, 4],
  13: [4, 5, 5, 5],
  14: [2, 4, 4, 5],
  15: [2, 2, 4, 4],
  16: [0, 1, 3, 4],
  17: [0, 1, 4, 3],
};

//Presets
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const allChars = "All Characters";
const ascii = "All Displayable ASCII Characters (32 to 127)";
// [array: characters encrypted, bool: preserve other characters?]
const cipherCharacters = {
  0: [alphabet + numbers, true],
  1: [alphabet, true],
  2: [alphabet, true],
  3: [alphabet + numbers, true],
  4: [alphabet, true],
  5: [allChars, true],
  6: [alphabet, true],
  7: [allChars, true],
  8: [alphabet, true],
  9: [alphabet, false],
  10: [ascii, false],
  11: ["All ASCII Characters", false],
  12: [alphabet + numbers, true],
  13: [alphabet + numbers, true],
  14: [alphabet, true],
  15: [allChars, true],
  16: [alphabet + numbers, false],
  17: [alphabet, false],
};

//I'll be honest gang, some of these are AI generated too, edited by me for suitability
const cipherDescriptions = {
  0: "The numerical cipher (usually called the A1Z26 cipher) is one of the simplest and oldest substitution ciphers in existence, with roots stretching back thousands of years, versions of it appear in ancient Hebrew texts, where a similar system called 'Gematria' was used as far back as the 8th century BC to encode religious and mystical meanings in scripture. The concept is straightforward: every letter of the alphabet is replaced by its corresponding number, so: A = 1, B = 2, C = 3, and so on all the way to Z = 26, hence the name 'A1Z26'. To encode a message, you simply swap each letter for its number (e.g., 'CAT' becomes '3-1-20'), and to decode one, you reverse the process. In this implementation, we have seperated each encoded character with a dash (-) so it is more clear. While it's far too simple to offer any real security by modern standards, it has remained a popular puzzle cipher for centuries, frequently popping up in books, games, and TV shows. It's a fantastic starting point for learning about cryptography because it introduces the core idea behind all substitution ciphers: replacing one symbol with another according to a fixed rule.",
  1: "The Atbash cipher is an ancient substitution cipher with a history stretching back over 2,500 years, making it one of the oldest known encryption methods ever recorded, quite impressive for something so elegantly simple! Originally used in the Hebrew language, it works by reversing the alphabet entirely, so the first letter maps to the last, and the last maps to the first: A = Z, B = Y, C = X, and so on, meeting in the middle. To encode a message, you simply replace each letter with its mirror opposite (e.g., 'CAT' becomes 'XZG'), and decoding works in exactly the same way, because the cipher is its own inverse, the exact same process both encrypts and decrypts a message, which is a rather neat mathematical property! The name 'Atbash' itself comes from the first, last, second, and second-to-last letters of the Hebrew alphabet, reflecting the swap at the heart of the cipher. It was historically used to obscure sensitive names and phrases in important texts, and despite being trivially easy to crack today, it remained a trusted tool for hundreds of years simply because literacy and knowledge of such techniques were rare. Like the A1Z26 cipher, Atbash is a brilliant introduction to the world of cryptography, and as you'll soon discover, ciphers only get more clever and creative from here!",
  2: "The Polybius square is a fascinating cipher with roots in ancient Greece, invented around 150 BC by the historian and scholar Polybius, a man better known for writing history than making it, yet who left a surprisingly lasting mark on the world of secret communication! The cipher works by arranging the alphabet inside a 5x5 grid (with 'I' and 'J' typically sharing a cell to make the numbers work out), labelled with numbers 1 to 5 along both the top and side. To encode a letter, you find it in the grid and replace it with its row and column coordinates, so 'A' becomes '11', 'B' becomes '12', and 'CAT' becomes '13 11 44', turning words into pairs of numbers that look like map references. Decoding simply means finding the coordinates back in the grid and reading off the letters. One of the most fascinating uses of the Polybius square was in a method called the 'knock cipher', used by prisoners to tap messages through walls and pipes by knocking out the row number then the column number, a clever adaptation that required no pen, paper, or equipment whatsoever. Though the cipher offers little security on its own, its grid-based coordinate system laid important groundwork for more complex ciphers that came later. Like the ciphers you've already encountered, the Polybius square is another brilliant stepping stone into the world of cryptography, and there are plenty more ingenious methods still to come!",
  3: "The Caesar cipher is perhaps the most famous cipher in all of history, named after the Roman general and statesman Julius Caesar, who used it regularly to protect his military communications somewhere around 58 to 50 BC. The idea behind it is wonderfully simple: every letter in the message is shifted a fixed number of places along the alphabet, so with a shift of 3 (Caesar's personal favourite), 'A' becomes 'D', 'B' becomes 'E', 'Z' becomes 'B' as it loops around, and 'CAT' becomes 'FDW'. To decode the message, the recipient simply shifts each letter back by the same number, provided they know the agreed shift value in advance. That agreed number is called the 'key', and a key is essentially a secret piece of information that controls how a cipher locks and unlocks a message, without which the message remains unreadable. In the Caesar cipher, both the sender and the receiver must know and use the same key, which makes it an example of what is called 'symmetric encryption', meaning the same key is used to both encrypt and decrypt the message. This idea of a shared secret key is one that runs through a huge amount of cryptography, so it is well worth getting familiar with here! Because there are only 25 possible shifts in the English alphabet, the cipher is very easy to crack by simply trying every option, a technique known as 'brute force', though in Caesar's time even this basic level of encryption was enough to confuse many of his enemies. A Caesar cipher with a shift of 13 has a special modern descendant called ROT13, which you might have spotted hiding in online forums and puzzle games. Like every cipher you have studied so far, the Caesar cipher is a key building block in understanding how cryptography works, and from this point onwards keys will become an increasingly important part of the ciphers you encounter, growing more complex and clever with every step!",
  4: "The Baconian cipher is a clever and historically rich cipher invented by the English philosopher and scientist Francis Bacon in 1605, and it stands out from the ciphers you have studied so far in a rather exciting way. Instead of shifting or swapping letters, Bacon replaced each letter of the alphabet with a unique sequence of five A's and B's, so 'A' becomes 'AAAAA', 'B' becomes 'AAAAB', 'C' becomes 'AAABA', and so on through the alphabet. What makes this especially fascinating is that if you treat 'A' as a 0 and 'B' as a 1, each letter's code is actually its position in the alphabet written out in binary, the very same numerical system that underpins all modern computing and digital technology, meaning Bacon stumbled onto a profoundly important idea centuries before computers existed! With five positions each capable of being either 'A' or 'B', the system produces 32 possible combinations, which is more than enough to cover all 26 letters of the alphabet. Bacon also designed the cipher with steganography in mind, which is the art of hiding the fact that a secret message exists at all. He suggested encoding the A's and B's invisibly inside an innocent-looking piece of text by using two subtly different fonts or writing styles, so a spy reading the surface message would have no idea a hidden one was buried within it. It is a wonderful example of how creative and ingenious cipher design can be, and the ideas it introduces, especially that link to binary, will become increasingly relevant as the ciphers ahead grow more modern and mathematically sophisticated!",
  5: "The Scytale cipher is one of the oldest military ciphers ever recorded, used by the ancient Spartans as far back as 700 BC to send secret messages between generals and commanders in the field, making it a true veteran of the cryptographic world. The cipher works by taking a long strip of parchment or leather and wrapping it in a tight spiral around a cylindrical rod, then writing the message along the length of the rod so that each row of letters runs across one full turn of the band. When the strip is unwound, the letters appear as a jumbled, seemingly meaningless sequence, but when it is wrapped around a rod of exactly the same diameter, the message reappears perfectly. Therefore, instead of distributing codes and keys to military generals, the Spartans could distribute physical rods. In the context of how it is implemented here, the key is the number of letters that fit across each single turn of the band, which controls how the letters are rearranged and is the essential piece of information needed to unscramble the message. Without a rod of the correct size, or without knowing that key number, an intercepted strip would be difficult to decode by hand. Like the ciphers you have already encountered, the Scytale is a symmetric cipher, meaning both the sender and the receiver must share the same key, in this case the same rod size or the same number of letters per turn, in order to communicate securely. What makes the Scytale particularly interesting is that rather than substituting letters for other symbols or numbers, it simply rearranges the letters of the message itself, a technique known as transposition, which is a whole new category of cipher and a concept that will keep appearing as the methods ahead become ever more inventive and complex!",
  6: "The Affine cipher is a mathematical cipher that builds directly on ideas you have already encountered, combining two familiar concepts into something altogether more sophisticated and introducing a level of mathematical thinking that marks a real step forward in the story of cryptography. Like the Caesar cipher, it converts each letter into its numerical position in the alphabet starting from 0, but instead of simply adding a shift, it applies a short mathematical formula to each number: multiply it by one key value, add a second key value, and then wrap the result around, keeping everything within the range of the alphabet. Decoding this message, even with the keys is a lot harder due to the modular arithmetic involved, applying the mod function to a number is easy but the inverse is very hard (perfect for encryption). Because both the sender and receiver must know and share the same pair of keys to encrypt and decrypt the message, the Affine cipher is once again an example of symmetric encryption, continuing the pattern that has appeared throughout your cryptographic journey. It is worth noting that the Affine cipher is actually a generalisation of several ciphers you already know, as a Caesar cipher is simply an Affine cipher where the first key is set to 1, and an Atbash cipher can be expressed as an Affine cipher with specific key values too, showing how these systems are all quietly connected beneath the surface. The Affine cipher is a brilliant introduction to the role that mathematics plays in encryption, and from here the ciphers ahead will lean ever more heavily on mathematical ideas to achieve security that is genuinely difficult to break!",
  7: "The Rail Fence cipher is a transposition cipher with a history stretching back to ancient times, used across various civilisations including during the American Civil War where it saw practical military use, and it belongs to the same family of rearrangement-based ciphers as the Scytale, meaning it shuffles the letters of a message rather than replacing them with something else. The cipher works by writing the letters of a message in a zigzag pattern across a number of imaginary horizontal rows called 'rails', like the diagonal lines of a fence, and then reading off each rail from left to right one at a time to produce the encoded message. For example, with two rails the letters of 'Hello World' would be split so that every other letter sits on the top rail and the remaining letters sit on the bottom rail, and the two rows are then joined left to right to form the ciphertext. The key is simply the number of rails used, and as with the ciphers you have already studied, both the sender and receiver must agree on this key in advance, making it another example of symmetric encryption where the same key both scrambles and unscrambles the message. More rails means a more complex zigzag pattern and a harder message to crack by guesswork, though with only a small number of possible key values it remains vulnerable to brute force, much like the Caesar cipher. What is particularly pleasing about the Rail Fence cipher is how it demonstrates that simply changing the order of letters, with no substitution involved at all, can be enough to produce a convincingly unreadable message, a deceptively simple idea that will continue to appear in increasingly clever forms as the ciphers ahead combine transposition and substitution together for far greater security!",
  8: "The Simple Substitution cipher is in many ways the natural culmination of everything you have studied so far in the world of substitution ciphers, taking the core idea that has run through ciphers like Atbash and Caesar and stretching it to its fullest and most flexible form. Rather than following a fixed rule like reversing the alphabet or shifting by a set number, the Simple Substitution cipher allows any letter to be swapped for any other letter, so long as each letter maps to exactly one unique replacement, producing a completely scrambled alphabet of the sender's own design. This scrambled alphabet is itself the key, and because there are over 400 septillion possible ways to rearrange 26 letters, the number of potential keys is so astronomically large that brute force becomes practically impossible, making this cipher vastly more secure on paper than anything you have encountered before. Like all the substitution and transposition ciphers you have studied, it is a symmetric cipher, meaning the sender and receiver must share the same scrambled alphabet key in order to encrypt and decrypt messages between them. However, despite that enormous number of possible keys, the Simple Substitution cipher has a famous and rather humbling weakness called frequency analysis, which is the observation that certain letters appear far more often than others in any given language, with 'E' being the most common in English, allowing a clever codebreaker to make educated guesses by analysing patterns in the ciphertext without ever needing to try every possible key. This vulnerability, famously exploited by the ninth century Arab mathematician Al-Kindi, marked a turning point in cryptography and pushed cipher designers to think far more creatively about how to defeat pattern recognition, which is precisely the challenge that the fascinating ciphers still ahead will rise to meet!",
  9: "The Playfair cipher is a landmark in cryptographic history, invented in 1854 by the British scientist Charles Wheatstone but named after his friend Lord Lyon Playfair, who championed its use so enthusiastically that history attached his name to it instead, making Wheatstone one of cryptography's most underappreciated pioneers. It was notably used by the British military during the Boer War and the First World War, and famously by the United States Navy during the Second World War, including in the rescue of a young John F. Kennedy after his patrol boat was sunk in the Pacific. What makes the Playfair cipher special is that it was one of the first practical ciphers to encrypt two letters at a time rather than one, using pairs of letters called digraphs, which was a deliberate and clever response to the weakness of frequency analysis that brought down the Simple Substitution cipher. It works using a 5x5 grid, similar to the Polybius square you have already encountered, filled with a mixed alphabet arranged according to a keyword, but instead of encoding one letter at a time, we encode pairs of letters. Each pair of letters in the message is then encoded according to a set of geometric rules based on where the two letters appear in the grid relative to one another. The keyword used to arrange the grid is the key, and as with every cipher you have studied, both parties must share this key in advance, keeping the Playfair cipher firmly in the category of symmetric encryption. By encrypting digraphs rather than single letters, the cipher dramatically disrupts the letter frequency patterns that Al-Kindi's frequency analysis relied upon, making it significantly harder to crack and representing a genuine and important leap forward in cipher design. It was initially rejected by the British Foreign Office when it was developed because of its perceived complexity. Wheatstone offered to demonstrate that three out of four boys in a nearby school could learn to use it in 15 minutes, but the Under Secretary of the Foreign Office responded, 'That is very possible, but you could never teach it to attachés.' The Playfair cipher is a wonderful example of how codemakers responded creatively to the methods of codebreakers, and that ongoing battle of wits between the two sides is only going to intensify in the remarkable ciphers that lie ahead!",
  10: "The Vernam cipher is one of the most significant and mathematically remarkable ciphers ever devised, invented in 1917 by Gilbert Vernam, an engineer working for AT&T in the United States, originally designed for use with telegraph machines that transmitted messages as streams of electrical signals represented in a binary code called Baudot code. The cipher works by taking each letter of the message, converting it into its binary representation, and then combining it with a corresponding binary value from a separate random sequence called the key, using a simple logical operation where matching bits produce a 0 and differing bits produce a 1, a process known as XOR or exclusive or. The result is a completely scrambled ciphertext that can only be recovered by applying the exact same key in the exact same way, making it once again a symmetric cipher where both sender and receiver must share the same key to communicate securely. What truly sets the Vernam cipher apart from everything you have studied so far is what happens when the key is completely random, used only once, and is at least as long as the message itself, because under these strict conditions the cipher becomes what is known as a 'one time pad', which was later proven mathematically by Claude Shannon in 1949 to be the only cipher in existence that is completely and theoretically unbreakable, no matter how much computing power or mathematical skill an attacker possesses. However, this perfect security comes with a significant practical problem, as securely generating, sharing, and managing a key as long as every message you ever wish to send is extraordinarily difficult, and the key must never be reused or any hint of security evaporates entirely. The Vernam cipher and the one time pad represent a kind of peak for symmetric encryption, a perfect but impractical ideal, and the story of cryptography from this point forwards becomes very much about how to achieve strong security without the impossible burden of a perfectly random key as long as the message itself, which is the fascinating challenge that the ciphers and systems still to come will tackle in increasingly ingenious ways!",
  12: "The Vigenère cipher is one of the most celebrated and historically important ciphers ever created, developed in the sixteenth century and most completely described by the French diplomat Blaise de Vigenère in 1586, though it drew on earlier ideas from several Renaissance scholars including the Italian polymath Giovan Battista Bellaso. For an extraordinary three centuries it was widely considered completely unbreakable, earning the dramatic nickname 'le chiffre indéchiffrable', the indecipherable cipher, a reputation that made it one of the most trusted encryption methods in the world during that long period. The cipher works by applying multiple Caesar shifts to a message rather than just one, using a keyword to determine which shift is applied to each letter in turn, so if the keyword is 'KEY' then the first letter is shifted by the value of 'K', the second by 'E', the third by 'Y', and then the pattern repeats from the beginning for the rest of the message. This means that the same letter appearing multiple times in a message will be encoded differently each time depending on its position relative to the repeating keyword, which was precisely the property that made it so resistant to the frequency analysis techniques that had defeated the Simple Substitution cipher centuries earlier. The keyword is the key, and as with every cipher you have encountered, both sender and receiver must share this key in advance, keeping the Vigenère cipher in the family of symmetric encryption. Its legendary unbreakable reputation was eventually shattered in 1863 by a Prussian military officer named Friedrich Kasiski, who noticed that repeated sequences of letters in the ciphertext could reveal the length of the keyword, after which frequency analysis could be applied to each Caesar shift individually, bringing the mighty cipher to its knees through careful observation and mathematical reasoning. The Vigenère cipher is a brilliant illustration of how increasing the complexity of a key can dramatically improve security, and also of how even the most fearsome ciphers can fall to a determined and clever codebreaker, a tension that will drive the design of every remarkable cipher system still waiting to be discovered!",
  13: "The ROT13 cipher is a wonderfully simple cipher that, much like the Atbash cipher you have just encountered, belongs to the family of substitution ciphers where each letter is swapped for another according to a fixed rule. The name ROT13 is short for 'rotate by 13', and the rule could not be more straightforward: every letter in the alphabet is shifted exactly 13 places forward, so 'A' becomes 'N', 'B' becomes 'O', and 'CAT' becomes 'PNG'. Because the English alphabet has exactly 26 letters, shifting by 13 lands you perfectly at the halfway point, which produces a rather elegant and satisfying property: applying the cipher twice brings you right back to the original message, meaning the exact same process both encodes and decodes, just like Atbash. While ROT13 has no serious history as a military or diplomatic cipher, it found a fascinating and widespread modern life on early internet forums and bulletin boards from the 1980s onwards, where it was used as a lighthearted way to hide spoilers, punchlines, and puzzle answers from readers who had not yet chosen to look, a charming and low stakes use for a cipher that everyone knew how to crack instantly. It remains one of the most recognised ciphers in popular culture today and is a lovely example of how a simple substitution rule, even one offering no real security whatsoever, can still find a genuinely useful and enduring purpose. Like Atbash, ROT13 is a perfect stepping stone into the world of cryptography, and the ciphers still ahead will take these simple swapping ideas and develop them into something far more powerful and complex!",
  14: "The Bifid cipher is a clever and inventive cipher created by the French amateur cryptographer Félix Delastelle in 1901, and it stands out as one of the most creative combinations of ideas in the history of cryptography, weaving together two techniques you have already encountered into something genuinely new and more powerful than either on their own. The cipher works by first converting each letter of the message into its row and column coordinates using a Polybius square, exactly as you have already studied, but rather than immediately converting those coordinates back into letters, it does something far more interesting. The row coordinates of all the letters are written out in a line, followed by all the column coordinates, and the resulting sequence of numbers is then read off in pairs and looked back up in the Polybius square to produce the final encoded letters. This means that each letter in the ciphertext is determined by a combination of coordinates drawn from two different letters in the original message, thoroughly mixing the positional information together in a way that makes frequency analysis dramatically harder to apply than it would be against a simple substitution cipher. What makes the Bifid cipher particularly significant is that it is an example of what is called a 'fractionating' cipher, meaning it breaks letters down into smaller components before recombining them, a sophisticated idea that blurs the boundaries between transposition and substitution and represents a real leap in cryptographic thinking. It is a wonderful demonstration of how combining two relatively simple ideas, the coordinate system of the Polybius square and the rearrangement principle of transposition ciphers, can produce something considerably more resilient and ingenious than either could achieve alone, and that spirit of creative combination is one that will continue to inspire the remarkable cipher systems still to come!",
  15: "The Columnar Transposition cipher is a satisfyingly structured and historically well-travelled cipher that takes the core idea of rearranging letters rather than replacing them and organises it in a more deliberate and scalable way than anything you have encountered in that category so far. The cipher works by writing the message out in rows across a grid of a fixed number of columns, filling each row from left to right until the entire message is written out, and then reading the letters back off column by column rather than row by row, with the order in which the columns are read determined by the key. The key is typically a word, where the alphabetical order of the letters in that word determines the sequence in which the columns are collected, so a keyword of 'ZEBRA' would mean the columns are read in the order that those letters would fall if sorted alphabetically, producing a ciphertext that looks thoroughly scrambled to anyone who does not know the keyword. Because both sender and receiver must share the same keyword to correctly reconstruct the grid and recover the message, the Columnar Transposition cipher is another example of symmetric encryption, continuing the pattern that has run through so much of what you have studied. It saw serious practical use across several major conflicts, including the First World War where it was employed by multiple nations, and it was frequently combined with substitution ciphers to produce what are called 'product ciphers', where two different techniques are layered on top of one another to produce far greater security than either could offer alone. That idea of combining cipher techniques together to multiply their strength is one of the most important concepts in the whole of cryptography, and it is an idea that will become increasingly central as the systems and methods ahead grow ever more ambitious and sophisticated!",
  16: "The ADFGVX cipher is a fascinating and historically dramatic cipher created in 1918 by a German military officer named Fritz Nebel, designed for use on the battlefields of the First World War, and it represents one of the most direct and deliberate applications of the idea you have just encountered, that layering two cipher techniques together produces something far stronger than either could manage alone. The cipher takes its unusual name from the only six letters it uses in its output, A, D, F, G, V and X, which were specifically chosen because their Morse code representations sound distinctly different from one another, reducing the risk of a transmission error in the dots and dashes garbling a secret military message at a critical moment. The first stage of the cipher uses a 6x6 Polybius square, large enough to hold all 26 letters and all 10 digits, to convert each character of the message into a pair of those six letters, and the second stage then takes the resulting string of letters and scrambles them further using a Columnar Transposition with a keyword, exactly as you have just studied. Both the arrangement of the Polybius square and the transposition keyword must be shared between sender and receiver in advance, giving the cipher two layers of symmetric key material and making it considerably more complex to crack than anything built on a single technique. Despite its formidable design, the cipher was famously broken by a French cryptanalyst named Georges Painvin in a remarkable feat of mathematical endurance, cracking it under extreme pressure in a matter of days during a critical German offensive, a moment that demonstrated once again that no cipher is truly safe from a brilliant and determined codebreaker. The ADFGVX cipher is a brilliant example of how the ideas you have been building throughout your cryptographic journey can be combined and stacked together in purposeful and powerful ways, and the systems that lie ahead will take that principle of layering and combination to extraordinary new heights!",
  17: "The Four Square cipher is another brilliant invention from the remarkably creative mind of Félix Delastelle, the same French amateur cryptographer who gave us the Bifid cipher, and it represents a natural and elegant evolution of ideas you have already encountered, drawing together the digraph encryption of the Playfair cipher and the grid-based coordinate thinking of the Polybius square into a single and satisfyingly clever system. As its name suggests, the cipher uses four separate 5x5 grids arranged in a larger 2x2 formation, where the top left and bottom right grids contain the standard plain alphabet, and the top right and bottom left grids each contain a mixed alphabet randomly arranged, giving the cipher two keys and therefore considerably more flexibility and security than a single keyword cipher like Playfair. To encode a message, letters are taken in pairs just as in the Playfair cipher, and each pair is located in the two standard alphabet grids before being replaced by the letters found at the corresponding positions in the two keyword grids, a process that thoroughly mixes the coordinate information of both letters together in a way that is reminiscent of the fractionating spirit behind the Bifid cipher. Because two separate keywords govern the arrangement of the two mixed grids, both sender and receiver must share both keys in advance, making this a symmetric cipher with a richer and more layered key structure than most of what you have studied so far. The Four Square cipher is a wonderful example of how a single designer can take a collection of existing ideas, digraph encoding, mixed alphabet grids, coordinate substitution, and combine them into something that is more than the sum of its parts, and that instinct for creative synthesis is one that will continue to define the most ingenious cryptographic systems that won't be invented for a hundred years!",
};
cipherDescriptions[11] = cipherDescriptions[10];

const cipherKeyWords = [
  // Maths
  "algebra",
  "angle",
  "arc",
  "area",
  "axis",
  "base",
  "binary",
  "bisect",
  "chord",
  "circle",
  "cosine",
  "cube",
  "decimal",
  "degree",
  "diameter",
  "digit",
  "edge",
  "equation",
  "factor",
  "fraction",
  "geometry",
  "gradient",
  "graph",
  "index",
  "integer",
  "line",
  "locus",
  "mean",
  "median",
  "mode",
  "modulo",
  "multiple",
  "negative",
  "normal",
  "obtuse",
  "origin",
  "parabola",
  "parallel",
  "perimeter",
  "plane",
  "polygon",
  "power",
  "prime",
  "prism",
  "proof",
  "pyramid",
  "quadrant",
  "radius",
  "random",
  "range",
  "ratio",
  "root",
  "rotation",
  "sequence",
  "series",
  "sine",
  "sketch",
  "sphere",
  "square",
  "subset",
  "surd",
  "symbol",
  "tangent",
  "triangle",
  "uniform",
  "union",
  "variable",
  "vector",
  "vertex",
  "volume",
  "zero",

  // Computer Science
  "algorithm",
  "array",
  "binary",
  "bit",
  "boolean",
  "buffer",
  "bug",
  "byte",
  "cache",
  "code",
  "compiler",
  "compress",
  "compute",
  "convert",
  "data",
  "database",
  "debug",
  "decode",
  "encode",
  "error",
  "file",
  "firewall",
  "firmware",
  "function",
  "hardware",
  "hash",
  "hex",
  "index",
  "input",
  "integer",
  "iterate",
  "kernel",
  "layer",
  "logic",
  "loop",
  "memory",
  "network",
  "node",
  "output",
  "overflow",
  "packet",
  "pixel",
  "pointer",
  "process",
  "program",
  "protocol",
  "query",
  "queue",
  "random",
  "register",
  "runtime",
  "server",
  "signal",
  "socket",
  "software",
  "sort",
  "stack",
  "storage",
  "string",
  "syntax",
  "system",
  "terminal",
  "thread",
  "token",
  "virus",
  "wifi",

  // Cryptography
  "cipher",
  "ciphertext",
  "code",
  "crack",
  "cryptogram",
  "decrypt",
  "encrypt",
  "enigma",
  "frequency",
  "hash",
  "intercept",
  "key",
  "keyspace",
  "message",
  "morse",
  "padlock",
  "password",
  "plaintext",
  "private",
  "public",
  "puzzle",
  "random",
  "secret",
  "secure",
  "seed",
  "shift",
  "signal",
  "steganography",
  "substitution",
  "trapdoor",
  "decipher",
  "encipher",
  "espionage",
  "sabotage",
  "intelligence",
  "intercept",
  "covert",
  "disguise",
  "forgery",
  "hacker",
  "spycraft",
  "invisible",
  "redacted",
  "classified",
  "scrambled",
  "enigmatic",
];
