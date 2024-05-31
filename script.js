const { log } = require('console')
const fs = require('fs')

// Generates a list of words that are acceptable for a given puzzle
function wordSearch(acceptableLetters, centerLetter){
    // Reference alphabet string and case matching input letters
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    acceptableLetters = acceptableLetters.toLowerCase()
    centerLetter = centerLetter.toLowerCase()
    
    // Putting words in memory
    const dict = JSON.parse(fs.readFileSync('./words.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        return data
    }))

    
    // Create an alphabet excluding the acceptable letters for the pattern matching logic
    let acceptableLettersReg = new RegExp (`[${acceptableLetters}]`, "i")
    let unacceptableLetters = ""

    for(let letter of alphabet){
        if(letter.match(acceptableLettersReg) || letter === centerLetter){
            continue
        }
        unacceptableLetters += letter
    }    

    // Creating regexes for matching the center letter and ensuring no unacceptable letters are present
    let centerLetterReg = new RegExp(`${centerLetter}`, "i")
    let unacceptableLettersReg = new RegExp (`[${unacceptableLetters}]`,"i")

    console.log(unacceptableLetters);
    
    // Loop through 4-letter word dictionary and find all words that have the center letter at least once and which don't contain any unacceptable letters
    for (let word of dict) {
        if (word.match(centerLetterReg) && !word.match(unacceptableLettersReg)) {
            // list.push(word)
           console.log(word)
        }
        
    }

    // fs.writeFileSync("./words.json", JSON.stringify(list))

}
wordSearch('craonv', "d")
