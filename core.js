// Variabel
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let plaintext, key, chipertext, vigenereKey

// Component
let algo = $('#algoritma')
let btnProses = $('#btn-proses')
let btnBatal = $('#btn-batal')

// Function
let toDecimal = arr => {
    return arr.map((val, i) => {
        if(val == ' '){
            return val
        }else{
            return alphabet.indexOf(val)
        }
    })
}

let generateVigenerKey = inputKey => {
    vigenereKey = []
    inputKey = inputKey.toUpperCase().split('')
    plaintext = $('#input-plaintext').val().toUpperCase()
    let tempPlaintext = plaintext.split('')

    let counter = 0
    for(let i = 0; i < tempPlaintext.length; i++){
        if(tempPlaintext[i] === ' '){
            vigenereKey.push(' ')
        }else{
            if(counter >= inputKey.length){
                counter = 0
            }

            vigenereKey.push(inputKey[counter])
            counter += 1
        }
    }

    return vigenereKey
}

let getKey = () => {
    if (algo.val() == 'caesar') {
        key = parseInt($('#input-kunci-caesar').val())
    }else if(algo.val() == 'vigenere'){
        key = $('#input-kunci-vigenere').val()
    }
}

let enkripsi = () => {
    $('#table-encode').show()
    let tempHtml = ''
    let tempPlaintext = plaintext.split('')
    let decimal = toDecimal(tempPlaintext)
    let sumDecimalKey = decimal.map(val => val === ' ' ? val : val + key)
    let modDecimal = sumDecimalKey.map(val => val === ' ' ? ' ' : val > 25 ? val % 26 : val)
    chipertext = modDecimal.map(val => val === ' ' ? ' ' : alphabet[val])

    // Title
    $('#encode-title').attr('colspan', plaintext.length + 1)
    
    // Plaintext
    $('#encode-p').append(`<td>Plaintext</td>`)
    tempPlaintext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-p').append(tempHtml)
    tempHtml = ''

    // Desimal
    $('#encode-d').append(`<td>Desimal</td>`)
    decimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-d').append(tempHtml)
    tempHtml = ''

    // Sum Desimal
    $('#encode-sum-d').append(`<td>Ditambah Key = ${key}</td>`)
    sumDecimalKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-sum-d').append(tempHtml)
    tempHtml = ''

    // Mod
    $('#encode-mod-result').append(`<td>Mod 26</td>`)
    modDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-mod-result').append(tempHtml)
    tempHtml = ''

    // Chipertext
    $('#encode-c').append(`<td>Chipertext</td>`)
    chipertext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-c').append(tempHtml)
    tempHtml = ''
}

let enkripsiVigenere = () => {
    $('#table-encode-vigenere').show()
    let tempHtml = ''
    let tempPlaintext = plaintext.split('')
    let vigenereKey = generateVigenerKey(key)
    let decimal = toDecimal(tempPlaintext)
    let decimalKey = toDecimal(vigenereKey)
    let sumDecimal = decimal.map((val, i) => val === ' ' ? ' ' : val + decimalKey[i])
    let modSumDecimal = sumDecimal.map(val => val === ' ' ? ' ' : val > 25 ? val % 26 : val)
    chipertext = modSumDecimal.map(val => val === ' ' ? ' ' : alphabet[val])

    console.log(vigenereKey)
    console.log(decimalKey)

    // Title
    $('#encode-vigenere-title').attr('colspan', plaintext.length + 1)

    // Plaintext
    $('#encode-vigenere-p').append(`<td>Plaintext</td>`)
    tempPlaintext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })
    
    $('#encode-vigenere-p').append(tempHtml)
    tempHtml = ''

    // Kunci
    $('#encode-vigenere-k').append(`<td>Kunci</td>`)
    vigenereKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })
    
    $('#encode-vigenere-k').append(tempHtml)
    tempHtml = ''

    // Desimal
    $('#encode-vigenere-d').append(`<td>Des. Plaintext</td>`)
    decimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-vigenere-d').append(tempHtml)
    tempHtml = ''

    // Kunci Desimal
    $('#encode-vigenere-dk').append(`<td>Des. Kunci</td>`)
    decimalKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-vigenere-dk').append(tempHtml)
    tempHtml = ''

    // Sum Desimal
    $('#encode-vigenere-sum-d').append(`<td>Ditambah</td>`)
    sumDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-vigenere-sum-d').append(tempHtml)
    tempHtml = ''

    // Mod
    $('#encode-vigenere-mod-result').append(`<td>Mod 26</td>`)
    modSumDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-vigenere-mod-result').append(tempHtml)
    tempHtml = ''

    // Chipertext
    $('#encode-vigenere-c').append(`<td>Chipertext</td>`)
    chipertext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#encode-vigenere-c').append(tempHtml)
    tempHtml = ''
}

let dekripsi = () => {
    $('#table-decode').show()
    plaintext = $('#input-plaintext').val().toUpperCase()
    let tempHtml = ''
    let tempChipertext = chipertext
    let decimal = toDecimal(tempChipertext)
    let substracDecimalKey = decimal.map(val => val === ' ' ? val : val - key)
    let modDecimal = substracDecimalKey.map(val => val === ' ' ? ' ' : val < 0 ? val + 26 : val)
    let resultPlaintext = modDecimal.map(val => val === ' ' ? ' ' : alphabet[val])

    // Title
    $('#decode-title').attr('colspan', plaintext.length + 1)
    
    // Chipertext
    $('#decode-c').append(`<td>Chipertext</td>`)
    tempChipertext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-c').append(tempHtml)
    tempHtml = ''

    // Desimal
    $('#decode-d').append(`<td>Desimal</td>`)
    decimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-d').append(tempHtml)
    tempHtml = ''

    // Substract Desimal
    $('#decode-substract-d').append(`<td>Dikurang Key = ${key}</td>`)
    substracDecimalKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-substract-d').append(tempHtml)
    tempHtml = ''

    // Mod
    $('#decode-mod-result').append(`<td>Mod 26</td>`)
    modDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-mod-result').append(tempHtml)
    tempHtml = ''

    // Plaintext
    $('#decode-p').append(`<td>Plaintext</td>`)
    resultPlaintext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-p').append(tempHtml)
    tempHtml = ''
}

let dekripsiVigenere = () => {
    $('#table-decode-vigenere').show()
    let tempHtml = ''
    let tempChipertext = chipertext
    let vigenereKey = generateVigenerKey(key)
    let decimal = toDecimal(tempChipertext)
    let decimalKey = toDecimal(vigenereKey)
    let substractDecimal = decimal.map((val, i) => val === ' ' ? ' ' : val - decimalKey[i])
    let modSubstractDecimal = substractDecimal.map(val => val === ' ' ? ' ' : val < 0 ? val + 26 : val)
    let resultPlaintext = modSubstractDecimal.map(val => val === ' ' ? ' ' : alphabet[val])

    // Title
    $('#decode-vigenere-title').attr('colspan', plaintext.length + 1)

    // Chipertext
    $('#decode-vigenere-c').append(`<td>Chipertext</td>`)
    chipertext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-vigenere-c').append(tempHtml)
    tempHtml = ''

    // Kunci
    $('#decode-vigenere-k').append(`<td>Kunci</td>`)
    vigenereKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })
    
    $('#decode-vigenere-k').append(tempHtml)
    tempHtml = ''

    // Desimal
    $('#decode-vigenere-d').append(`<td>Des. Chipertext</td>`)
    decimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-vigenere-d').append(tempHtml)
    tempHtml = ''

    // Kunci Desimal
    $('#decode-vigenere-dk').append(`<td>Des. Kunci</td>`)
    decimalKey.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-vigenere-dk').append(tempHtml)
    tempHtml = ''

    // Substract Desimal
    $('#decode-vigenere-substract-d').append(`<td>Dikurang</td>`)
    substractDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-vigenere-substract-d').append(tempHtml)
    tempHtml = ''

    // Mod
    $('#decode-vigenere-mod-result').append(`<td>Mod 26</td>`)
    modSubstractDecimal.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })

    $('#decode-vigenere-mod-result').append(tempHtml)
    tempHtml = ''

    // Plaintext
    $('#decode-vigenere-p').append(`<td>Plaintext</td>`)
    resultPlaintext.forEach(item => {
        tempHtml += `<td class='text-center'>${item}</td>` 
    })
    
    $('#decode-vigenere-p').append(tempHtml)
    tempHtml = ''
}

let clearTable = () => {
    $("#encode-p").empty()
    $("#encode-d").empty()
    $("#encode-sum-d").empty()
    $("#encode-mod-result").empty()
    $("#encode-c").empty()
    $("#decode-p").empty()
    $("#decode-d").empty()
    $("#decode-substract-d").empty()
    $("#decode-mod-result").empty()
    $("#decode-c").empty()

    $("#encode-vigenere-p").empty()
    $("#encode-vigenere-k").empty()
    $("#encode-vigenere-d").empty()
    $("#encode-vigenere-dk").empty()
    $("#encode-vigenere-sum-d").empty()
    $("#encode-vigenere-mod-result").empty()
    $("#encode-vigenere-c").empty()

    $("#decode-vigenere-p").empty()
    $("#decode-vigenere-k").empty()
    $("#decode-vigenere-d").empty()
    $("#decode-vigenere-dk").empty()
    $("#decode-vigenere-substract-d").empty()
    $("#decode-vigenere-mod-result").empty()
    $("#decode-vigenere-c").empty()
}

// Event Listener
algo.on('change', () => {
    $('#kunci').empty()
    if(algo.val() == 'caesar'){
        $('#kunci').append(`
        <label for="input-kunci-caesar" class="form-label">Kunci Caesar</label>
        <input type="number" class="form-control" id="input-kunci-caesar">
        `)
    }else if(algo.val() == 'vigenere'){
        $('#kunci').append(`
        <label for="input-kunci-caesar" class="form-label">Kunci Vigenere</label>
        <input type="text" class="form-control" id="input-kunci-vigenere">
        `)
    }
})

btnProses.on('click', () => {
    let mode = $("input[type='radio']:checked").val()
    plaintext = $('#input-plaintext').val().toUpperCase()
    tempHtml = ''
    clearTable()
    getKey()

    if($('#input-plaintext').val() == ''){
        alert('Masukkan Plaintext!')
        return
    }

    if (algo.val() == 'caesar' && $('#input-kunci-caesar').val() == '') {
        alert('Masukkan Kunci Caesar!')
        return
    }
    
    if(algo.val() == 'vigenere' && $('#input-kunci-vigenere').val() == ''){
        alert('Masukkan Kunci Vigenere!')
        return
    }

    if(mode == 'all'){
        if(algo.val() == 'caesar'){
            enkripsi()
            dekripsi()
        }else{
            enkripsiVigenere()
            dekripsiVigenere()
        }
    }else if(mode == 'encode'){
        if(algo.val() == 'caesar'){
            enkripsi()
            $('#table-decode').hide()
        }else{
            enkripsiVigenere()
            $('#table-decode-vigenere').hide()
        }
    }else if(mode == 'decode'){
        if(algo.val() == 'caesar'){
            dekripsi()
            $('#table-encode').hide()
        }else{
            dekripsiVigenere()
            $('#table-encode-vigenere').hide()
        }
    }
})

btnBatal.on('click', () => {
    tempHtml = ''
    clearTable()
    $('#table-encode').hide()
    $('#table-decode').hide()
    $('#table-encode-vigenere').hide()
    $('#table-decode-vigenere').hide()
    $('#input-plaintext').val('')

    if (algo.val() == 'caesar') {
        $('#input-kunci-caesar').val('')
    }else if(algo.val() == 'vigenere'){
        $('#input-kunci-vigenere').val('')
    }
})

$(document).ready(() => {
    $('#table-encode').hide()
    $('#table-decode').hide()
    $('#table-encode-vigenere').hide()
    $('#table-decode-vigenere').hide()
})