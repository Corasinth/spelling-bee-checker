// ============================= VARIABLES =============================

// Global scope for the solution object
let solutionObject

// HTML Variables
let puzzleLettersForm = document.getElementById('puzzleLettersForm')
let searchCompleteMessageEl = document.getElementById('searchCompleteMessage')
let wordsFoundEl = document.getElementById('wordsFound')

let outerLetters = document.getElementById("outerLetters").value
let centerLetter = document.getElementById("centerLetter").value


let revealAllEl = document.getElementById('revealAll')
let revealWordsEl = document.getElementById('revealWords')
let revealPanagramsEl = document.getElementById('revealPanagrams')

let wordsListEl = document.getElementById('wordsList')

// ============================= EVENT LISTENERS =============================
puzzleLettersForm.addEventListener("submit", (e) => {
    e.preventDefault();

    outerLetters = document.getElementById("outerLetters").value
    centerLetter = document.getElementById("centerLetter").value



    let errorTracker = {}

    for(let letter of outerLetters){

        if(letter === centerLetter){
            // Duplicate letters
            console.log('Duplicate letter between outer and center letters')
            return
        }

        if(errorTracker[letter]){
            // Duplicate letters
            console.log('Duplicate letters in boxr')
            return
        }

        errorTracker[letter] = true
    
    }
    
    if (Object.keys(errorTracker).length < 6){
        // Too few letters
        console.log('Too few letters in outer letters')
        return
    }
    


    
    solutionObject = wordSearch(outerLetters, centerLetter)
    let panagramPlural = 'panagrams'

    if (solutionObject.pangramWords.length === 1) {
        panagramPlural = 'panagram'
    }

    // Set compelete message
    wordsFoundEl.textContent = `${solutionObject.words.length} words and ${solutionObject.pangramWords.length} ${panagramPlural} found.`

    searchCompleteMessageEl.style = 'display: initial;'
});

revealAllEl.addEventListener("click", (e) => {
    e.preventDefault();
    displayWords(solutionObject.words.concat(solutionObject.pangramWords).sort())
});

revealWordsEl.addEventListener("click", (e) => {
    e.preventDefault();
    displayWords(solutionObject.words)
});

revealPanagramsEl.addEventListener("click", (e) => {
    e.preventDefault();
    displayWords(solutionObject.pangramWords)
});


// ============================= FUNCTIONS =============================

// Generates a list of words that are acceptable for a given puzzle
function wordSearch(outerLetters, centerLetter) {
    // Reference alphabet string and case matching input letters
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    outerLetters = outerLetters.toLowerCase()
    centerLetter = centerLetter.toLowerCase()

    // Arrays to distinguish the list of words and the list of words that use every letter
    let wordsList = []
    let pangramWordList = []


    // Create an alphabet excluding the acceptable letters for the pattern matching logic
    let outerLettersReg = new RegExp(`[${outerLetters}]`, "i")
    let unacceptableLetters = ""

    for (let letter of alphabet) {
        if (letter.match(outerLettersReg) || letter === centerLetter) {
            continue
        }
        unacceptableLetters += letter
    }

    // Creating regexes for matching the center letter and ensuring no unacceptable letters are present
    let centerLetterReg = new RegExp(`${centerLetter}`, "i")
    let unacceptableLettersReg = new RegExp(`[${unacceptableLetters}]`, "i")
    // Regex uses positive lookahead to ensure the following conditions are met: that there is, for every letter passed into the function, at least one instance of any character followed by that letterg
    let pangramWordReg = new RegExp(`(?=.*${outerLetters[0]})(?=.*${outerLetters[1]})(?=.*${outerLetters[2]})(?=.*${outerLetters[3]})(?=.*${outerLetters[4]})(?=.*${outerLetters[5]})(?=.*${centerLetter}).+`)



    // Loop through 4-letter word dictionary and find all words that have the center letter at least once and which don't contain any unacceptable letters
    // Also keep track of words that contain every letter
    // Dictionary variable comes from words.js
    for (let word of dictionary) {
        if (word.match(centerLetterReg) && !word.match(unacceptableLettersReg)) {
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

function displayWords(wordArr) {
    let pangramWordReg = new RegExp(`(?=.*${outerLetters[0]})(?=.*${outerLetters[1]})(?=.*${outerLetters[2]})(?=.*${outerLetters[3]})(?=.*${outerLetters[4]})(?=.*${outerLetters[5]})(?=.*${centerLetter}).+`)

    let wordsListHTML = ""

    for (let word of wordArr) {
        if (word.match(pangramWordReg)) {
            // Adds special class for panagrams
            wordsListHTML += `<li class= "pangram"><a href="https://duckduckgo.com/?t=ffab&q=${word}+defintion&ia=web">${word}</a></li>`
            continue
        }

        wordsListHTML += `<li><a href="https://duckduckgo.com/?t=ffab&q=${word}+defintion&ia=web">${word}</a></li>`
    }

    wordsListEl.innerHTML = wordsListHTML
}