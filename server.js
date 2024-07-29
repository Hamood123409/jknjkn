const express = require('express')
const Yahya = express()

Yahya.get('/', (Yahya, yahya) => {
  yahya.send('dev by: Ahmed , Amr')
})

Yahya.listen(3030, () => {
  
  console.log("\033[1;34m Support Snow Team")
})
