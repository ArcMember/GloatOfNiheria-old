let mode = "coins"

function changeMode(modeName) {
    mode = modeName

    let panes = document.getElementsByClassName("pane")
    for (let i = 0; i < panes.length; i++) {
        if (panes[i].id == mode) {
            panes[i].style.display = "block";
        }
        else {
            panes[i].style.display = "none";
        }
    } 
}

function parseCoinInt(value) {
    try {
        if (!isNaN(math.evaluate(value)))
            return math.evaluate(value);
        else return 0
    } catch (error) {
        return 0
    }
}


//....CCCCCCC...............iiii.......................
//...CCCCCCCCC..............iiii.......................
//..CCCCCCCCCCC........................................
//..CCCC...CCCCC...oooooo...iiii.nnnnnnnn...sssssss....
//.CCCC.....CCC..ooooooooo..iiii.nnnnnnnnn.sssssssss...
//.CCCC..........oooo.ooooo.iiii.nnnn.nnnnnssss.ssss...
//.CCCC.........oooo...oooo.iiii.nnnn..nnnnsssss.......
//.CCCC.........oooo...oooo.iiii.nnnn..nnnn.ssssss.....
//.CCCC.....CCC.oooo...oooo.iiii.nnnn..nnnn..sssssss...
//..CCCC...CCCCCoooo...oooo.iiii.nnnn..nnnn......ssss..
//..CCCCCCCCCCC..oooo.ooooo.iiii.nnnn..nnnnssss..ssss..
//...CCCCCCCCCC..ooooooooo..iiii.nnnn..nnnnsssssssss...
//....CCCCCCC......oooooo...iiii.nnnn..nnnn..ssssss....

let coins = [
    [0, 0, 0],
    [0, 0, 0]
]

function changeCoins(pane) {
    writeCoins();
    calculateCoins(pane);
    readCoins();
}

function calculateCoins(pane) {    
    let target = 1-pane

    for (let i = 0; i < coins[target].length; i++) {
        coins[target][i] = coins[pane][i]
    }

    coins[target][1] += Math.floor(coins[target][0] / 100)
    coins[target][0] = coins[target][0] % 100

    coins[target][2] += Math.floor(coins[target][1] / 100)
    coins[target][1] = coins[target][1] % 100
}

function writeCoins() {
    coins = [
        [0, 0, 0],
        [0, 0, 0]
    ]
    for (let i = 0; i < 2; i++) {
        for (let y = 0; y < 3; y++) {
            coins[i][y] = parseCoinInt(document.getElementById(`coins${i}-input${y}`).value)
            document.getElementById(`coins${i}-input${y}`).value = coins[i][y]
        }
    }    
}

function readCoins() {
    for (let i = 0; i < 2; i++) {
        for (let y = 0; y < 3; y++) {
            document.getElementById(`coins${i}-input${y}`).value = coins[i][y]
        }
    }
}

//.TTTTTTTTTTT.........ookk......................................
//.TTTTTTTTTTT.........ookk......................................
//.TTTTTTTTTTT.........ookk......................................
//....TTTT....oooooo...ookk.kkkkk..keeeee..eeennnnnn...nnsssss...
//....TTTT...Toooooooo.ookkkkkkk..kkeeeeee.eeennnnnnn.nnnssssss..
//....TTTT..TTooo.oooo.ookkkkkk..kkke.eeee.eeenn.nnnnnnnns.ssss..
//....TTTT..TToo...ooooookkkkk...kkke..eeeeeeenn..nnnnnnnss......
//....TTTT..TToo...ooooookkkkk...kkkeeeeeeeeeen...nnnnnnnssss....
//....TTTT..TToo...ooooookkkkkk..kkkeeeeeeeeeen...nnnn..nssssss..
//....TTTT..TToo...ooooookkkkkkk.kkke......eeen...nnnn.....ssss..
//....TTTT..TTooo.oooo.ookk.kkkk.kkke.eeee.eeen...nnnnnnns..sss..
//....TTTT...Toooooooo.ookk..kkkk.kkeeeeee.eeen...nnnnnnnssssss..
//....TTTT....oooooo...ookk..kkkk..keeeee..eeen...nnnn..nsssss...

let money = [
    [0, 0, 0, 0],
    [0, 0, 0]
]

function changeTokens(pane) {
    writeTokens();
    calculateTokens(pane);
    readTokens();
}

function calculateTokens(pane) {    
    let target = 1-pane

    if (target == 1) {
        let fratSum = money[0][3]*(10**2*100)+money[0][2]*(10*100)+money[0][1]*(100)+money[0][0];
        money[1] = [0, 0, 0]

        money[1][0] = fratSum*50;

        money[1][1] += Math.floor(money[1][0] / 100)
        money[1][0] = money[1][0] % 100

        money[1][2] += Math.floor(money[1][1] / 100)
        money[1][1] = money[1][1] % 100        
    }
    if (target == 0) {
        let copperSum = money[1][2]*(100**2)+money[1][1]*(100)+money[1][0]
        money[0] = [0, 0, 0, 0]

        money[0][0] = Math.floor(copperSum / 50);

        money[0][1] += Math.floor(money[0][0] / 100)
        money[0][0] = money[0][0] % 100

        money[0][2] += Math.floor(money[0][1] / 10)
        money[0][1] = money[0][1] % 10

        money[0][3] += Math.floor(money[0][2] / 10)
        money[0][2] = money[0][2] % 10   
    }
}

function writeTokens() {
    money = [
        [0, 0, 0, 0],
        [0, 0, 0]
    ]
    for (let i = 0; i < 4; i++) {
        money[0][i] = parseCoinInt(document.getElementById(`tokens-input${i}`).value)
        document.getElementById(`tokens-input${i}`).value = money[0][i]
    }
    for (let i = 0; i < 3; i++) {
        money[1][i] = parseCoinInt(document.getElementById(`coins-input${i}`).value)
        document.getElementById(`coins-input${i}`).value = money[1][i]
    }
}

function readTokens() {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`tokens-input${i}`).value = money[0][i]
    }
    for (let i = 0; i < 3; i++) {
        document.getElementById(`coins-input${i}`).value = money[1][i]
    }
}

//.BBBBBBBBBB.......................nnkk........
//.BBBBBBBBBBB......................nnkk........
//.BBBBBBBBBBB......................nnkk........
//.BBBB...BBBB...aaaaaa...annnnnnn..nnkk..kkkk..
//.BBBB...BBBB..aaaaaaaa..annnnnnnn.nnkk.kkkk...
//.BBBBBBBBBBB.Baaa.aaaaa.annn.nnnnnnnkkkkkk....
//.BBBBBBBBBB......aaaaaa.annn..nnnnnnkkkkk.....
//.BBBBBBBBBBB..aaaaaaaaa.annn..nnnnnnkkkkkk....
//.BBBB....BBBBBaaaaaaaaa.annn..nnnnnnkkkkkk....
//.BBBB....BBBBBaaa.aaaaa.annn..nnnnnnkkkkkkk...
//.BBBBBBBBBBBBBaaa.aaaaa.annn..nnnnnnkk.kkkk...
//.BBBBBBBBBBB.Baaaaaaaaa.annn..nnnnnnkk..kkkk..
//.BBBBBBBBBB...aaaaaaaaa.annn..nnnnnnkk..kkkk..

let bankMoney = [
    [0, 0, 0],
    [0, 0, 0]
]
const PERCENT = 1.15
let years = 0
let months = 0


function changeBank() {
    writeBank();
    calculateBank();
    readBank();
}

function writeBank() {
    bankMoney = [
        [0, 0, 0],
        [0, 0, 0]
    ]
    for (let i = 0; i < 3; i++) {
        bankMoney[0][i] = parseCoinInt(document.getElementById(`bank-input${i}`).value)
        document.getElementById(`bank-input${i}`).value = bankMoney[0][i]
    }
    years = parseCoinInt(document.getElementById(`bank-years`).value)
    months = parseCoinInt(document.getElementById(`bank-months`).value)

    years += math.floor(months / 12)
    months = months % 12

    document.getElementById(`bank-years`).value = years
    document.getElementById(`bank-months`).value = months
}

function calculateBank() {    
    bankMoney[1][0] = bankMoney[0][2]*(100**2)+bankMoney[0][1]*(100)+bankMoney[0][0]

    let time = years*12 + months
    for (let i = 0; i < time; i++) 
        bankMoney[1][0] *= PERCENT;

    bankMoney[1][0] = Math.floor(bankMoney[1][0])

    bankMoney[1][1] += Math.floor(bankMoney[1][0] / 100)
    bankMoney[1][0] = bankMoney[1][0] % 100

    bankMoney[1][2] += Math.floor(bankMoney[1][1] / 100)
    bankMoney[1][1] = bankMoney[1][1] % 100
}

function readBank() {
    document.getElementById("bank-input-debug").innerText = bankMoney[0][2]*(100**2)+bankMoney[0][1]*(100)+bankMoney[0][0]
    document.getElementById("bank-output-debug").innerText = bankMoney[1][2]*(100**2)+bankMoney[1][1]*(100)+bankMoney[1][0]
    for (let i = 0; i < 3; i++) {
        document.getElementById(`bank-output${i}`).value = bankMoney[1][i]
    }    
}