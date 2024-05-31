const { log, Console } = require('console')
const fs = require('fs')

// Generates a list of words that are acceptable for a given puzzle
function wordSearch(acceptableLetters, centerLetter) {
    // Reference alphabet string and case matching input letters
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    acceptableLetters = acceptableLetters.toLowerCase()
    centerLetter = centerLetter.toLowerCase()

    // Arrays to distinguish the list of words and the list of words that use every letter
    let wordsList = []
    let superWordList = []

    // Putting words in memory
    const dict = JSON.parse(fs.readFileSync('./words.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        return data
    }))


    // Create an alphabet excluding the acceptable letters for the pattern matching logic
    let acceptableLettersReg = new RegExp(`[${acceptableLetters}]`, "i")
    let unacceptableLetters = ""

    for (let letter of alphabet) {
        if (letter.match(acceptableLettersReg) || letter === centerLetter) {
            continue
        }
        unacceptableLetters += letter
    }

    // Creating regexes for matching the center letter and ensuring no unacceptable letters are present
    let centerLetterReg = new RegExp(`${centerLetter}`, "i")
    let unacceptableLettersReg = new RegExp(`[${unacceptableLetters}]`, "i")
    // Regex uses positive lookahead to ensure the following conditions are met: that there is, for every letter passed into the function, at least one instance of any character followed by that letterg
    let superWordReg = new RegExp(`(?=.*${acceptableLetters[0]})(?=.*${acceptableLetters[1]})(?=.*${acceptableLetters[2]})(?=.*${acceptableLetters[3]})(?=.*${acceptableLetters[4]})(?=.*${acceptableLetters[5]})(?=.*${centerLetter}).+`)


    // Loop through 4-letter word dictionary and find all words that have the center letter at least once and which don't contain any unacceptable letters
    // Also keep track of words that contain every letter
    for (let word of dict) {
        if (word.match(centerLetterReg) && !word.match(unacceptableLettersReg)) {
            // If a super word match is found we skip this iteration so it doesn't get added to both lists
            if (word.match(superWordReg)) {
                superWordList.push(word)
                continue
            }
            wordsList.push(word)
        }
    }
    return {
        words: wordsList,
        superWords: superWordList
    }
}
wordSearch('craonv', "d")
