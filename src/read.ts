import * as fs from 'fs'
import * as readline from 'readline'

const readInterface = readline.createInterface({
	input: fs.createReadStream('messages.txt'),
})

readInterface.on('line', line => {
    let regex = new RegExp('".*"', 'g')
    if(regex.test(line)) {
        fs.writeFileSync('quotes.txt', `${line}\n`, { encoding:'utf8', flag:'a'})
    }
})
