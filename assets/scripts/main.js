// ============================= VARIABLES =============================

// Global scope for the solution object
let solutionObject

// HTML Variables
let puzzleLettersForm = document.getElementById('puzzleLettersForm')
let searchCompleteMessageEl = document.getElementById('searchCompleteMessage')
let wordsFoundEl = document.getElementById('wordsFound')


// ============================= EVENT LISTENERS =============================
puzzleLettersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const outerLetters = document.getElementById("outerLetters").value
    const centerLetter = document.getElementById("centerLetter").value

    let solutionObject = wordSearch(outerLetters, centerLetter)

    let panagramPlural = 'panagrams'

    if (solutionObject.pangramWords.length === 1){
        panagramPlural = 'panagram'
    }

    // Set compelete message
    wordsFoundEl.textContent = `${solutionObject.words.length} words and ${solutionObject.pangramWords.length} ${panagramPlural} found.`

    searchCompleteMessageEl.style = 'display: initial;'
  });

  puzzleLettersForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  puzzleLettersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
  });


// ============================= FUNCTIONS =============================

// Generates a list of words that are acceptable for a given puzzle
function wordSearch(OuterLetters, centerLetter) {
    // Reference alphabet string and case matching input letters
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    OuterLetters = OuterLetters.toLowerCase()
    centerLetter = centerLetter.toLowerCase()

    // Arrays to distinguish the list of words and the list of words that use every letter
    let wordsList = []
    let pangramWordList = []


    // Create an alphabet excluding the acceptable letters for the pattern matching logic
    let OuterLettersReg = new RegExp(`[${OuterLetters}]`, "i")
    let unOuterLetters = ""

    for (let letter of alphabet) {
        if (letter.match(OuterLettersReg) || letter === centerLetter) {
            continue
        }
        unOuterLetters += letter
    }

    // Creating regexes for matching the center letter and ensuring no unacceptable letters are present
    let centerLetterReg = new RegExp(`${centerLetter}`, "i")
    let unOuterLettersReg = new RegExp(`[${unOuterLetters}]`, "i")
    // Regex uses positive lookahead to ensure the following conditions are met: that there is, for every letter passed into the function, at least one instance of any character followed by that letterg
    let pangramWordReg = new RegExp(`(?=.*${OuterLetters[0]})(?=.*${OuterLetters[1]})(?=.*${OuterLetters[2]})(?=.*${OuterLetters[3]})(?=.*${OuterLetters[4]})(?=.*${OuterLetters[5]})(?=.*${centerLetter}).+`)


    // Loop through 4-letter word dictionary and find all words that have the center letter at least once and which don't contain any unacceptable letters
    // Also keep track of words that contain every letter
    // Dictionary variable comes from words.js
    for (let word of dictionary) {
        if (word.match(centerLetterReg) && !word.match(unOuterLettersReg)) {
            // If a pangram word match is found we skip this iteration so it doesn't get added to both lists
            if (word.match(pangramWordReg)) {
                pangramWordList.push(word)
                continue
            }
            wordsList.push(word)
        }
    }
    return {
        words: wordsList,
        pangramWords: pangramWordList
    }
}
// wordSearch('craonv', "d")
