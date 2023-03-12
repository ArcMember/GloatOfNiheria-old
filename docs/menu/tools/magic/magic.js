branches = [
    {
        letter: "Б",
        name: "Белая магия", 
        runes: [
            {name: "Идеограмма Белой Магии", desc: ""},
            {name: "Идеограмма Жизни", desc: ""},
            {name: "Руна Воли", desc: ""},
            {name: "Руна Исцеления", desc: ""},
            {name: "Руна Выносливости", desc: ""},
            {name: "Идеограмма Крепости", desc: ""},
            {name: "Руна Легкости", desc: ""},
            {name: "Руна Гибкости", desc: ""},
            {name: "Руна Покоя", desc: ""},
        ]
    },
    {
        letter: "Ч",
        name: "Черная магия", 
        runes: [
            {name: "Идеограмма Черной Магии", desc: ""},
            {name: "Идеограмма Смерти", desc: ""},
            {name: "Руна Разрушения", desc: ""},
            {name: "Руна Несчастья", desc: ""},
            {name: "Руна Хаоса", desc: ""},
            {name: "Идеограмма Слабости", desc: ""},
            {name: "Руна Тяжести", desc: ""},
            {name: "Руна Жесткости", desc: ""},
            {name: "Руна Ярости", desc: ""},
        ]
    },
    {
        letter: "С",
        name: "Магия созидания", 
        runes:[
            {name: "Идеограмма Созидания", desc: ""},
            {name: "Идеограмма Звука", desc: ""},
            {name: "Руна Воздуха", desc: ""},
            {name: "Руна Молнии", desc: ""},
            {name: "Идеограмма Пелены", desc: ""},
            {name: "Руна Огня", desc: ""},
            {name: "Руна Воды", desc: ""},
            {name: "Идеограмма Силы", desc: ""},
            {name: "Руна Земли", desc: ""},
            {name: "Руна Льда", desc: ""},
        ]
    },
    {
        letter: "В",
        name: "Магия влияния", 
        runes: [
            {name: "Идеограмма Влияния", desc: ""},
            {name: "Идеограмма Внимания", desc: ""},
            {name: "Руна Духа", desc: ""},
            {name: "Руна Истока", desc: ""},
            {name: "Руна Притока", desc: ""},
            {name: "Идеограмма Единства", desc: ""},
            {name: "Руна Пути", desc: ""},
            {name: "Руна Фокуса", desc: ""},
            {name: "Руна Вмешательства", desc: ""},

            {name: "Руна Вести", desc: ""},
            {name: "Руна Роста", desc: ""},
        ]
    },
]

spells = [
    {
        name: "Мерзкая Опухоль",
        runes: `Ч И Черной Магии|Ч Р Хаоса+|В Р Роста|`
    },
    {
        name: "Сильное исцеление",
        runes: "Б И Белой Магии|Б Р Исцеления+|Б Р Исцеления|Б Р Исцеления|"
    },
    {
        name: "Заклятие деликатного сокрытия",
        runes: "В И Единства|В И Внимания|В Р Притока+|В Р Фокуса|"
    },
    {
        name: "Заклинание кошмарной гибели",
        runes: "Ч И Смерти|Ч Р Несчастья+|С И Силы|"
    },
]

let menuRunes = document.getElementById("menuRunes")
let menuSpells = document.getElementById("menuSpells")

document.getElementById("buttonRunes").onclick = function () {
    if (!menuRunes.classList.contains("open"))
        menuRunes.classList.add("open")
    else 
        menuRunes.classList.remove("open")
    menuSpells.classList.remove("open")
}
document.getElementById("buttonSpells").onclick = function () {
    menuRunes.classList.remove("open")
    if (!menuSpells.classList.contains("open"))
        menuSpells.classList.add("open")
    else 
        menuSpells.classList.remove("open")
}

function makeRunesList() {
    for (let i = 0; i < branches.length; i++) {
        let branch = branches[i]
        let branchNode = document.createElement('div')
        branchNode.id = `${branch.letter}-branch`
        branchNode.innerHTML = `<h2>${branch.name}</h2>`
        
        let list = document.createElement('div')
        list.setAttribute("runes-list", "")
        list.id = `${branch.letter}-list`

        for (let j = 0; j < branch.runes.length; j++) {  
            let rune = branch.runes[j].name
            let runeFile = `${branch.letter} ${rune.replace("Руна", "Р").replace("Идеограмма", "И")}`
            list.innerHTML +=
            `<div onclick="listClicked(this)" runes-rune class="runes-rune" id="${runeFile}">                
                <img src="../magic/branches/runes/${decodeURI(runeFile)}.png">
                <div>${rune}</div>
                <img magnifier="false" src="../magic/branches/runes/magnifier.png"                
            </div>`
        }
        branchNode.appendChild(list)
        menuRunes.appendChild(branchNode)
    }
}

let spellRunes = document.getElementById("spellRunes")
let spellFormula = document.getElementById("spellFormula")
let spellDescription = document.getElementById("spellDescription")

document.getElementById("buttonClear").onclick = clear

let adminCombination = false
document.getElementById("buttonCopy").onclick = function () {
    navigator.clipboard.writeText(spellFormula.innerText)

    if (adminCombination) {
        let saveString = ""
        for (let i = 0; i < spellRunes.children.length; i++) {
            let runes = spellRunes.children
            if (runes[i].nodeName === "DIV") {
                if (runes[i].children[2].getAttribute('magnifier') === 'true')
                    saveString += `${runes[i].id}+|`
                else 
                    saveString += `${runes[i].id}|`
            }
        }
        navigator.clipboard.writeText(saveString)
    }
}
window.onkeyup = function(e) { if (e.shiftKey || e.altKey) adminCombination = false; }
window.onkeydown = function(e) { if (e.shiftKey && e.altKey) adminCombination = true; }

function listClicked(rn) {
    addRune(rn)    
}

function saveRunes() {
    window.localStorage.setItem("spellRunes", spellRunes.innerHTML)
}

function addRune(rn) {
    if (spellRunes.innerHTML == runesTooltip) spellRunes.innerHTML = ""

    let rune = document.createElement('div')
    rune.setAttribute('spell-rune', '')
    rune.innerHTML = rn.innerHTML
    rune.id = rn.id

    let removeButton = document.createElement('div')
    removeButton.setAttribute('rune-remove', '')
    removeButton.setAttribute('onclick', 'runeRemove(this);')
    removeButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`
    rune.appendChild(removeButton)

    rune.setAttribute("onclick", "runeClicked(this);")

    rune.innerHTML += '<div plus><i class="fa fa-plus" aria-hidden="true"></i></div>'

    spellRunes.appendChild(rune)    
    makeFormula()
    saveRunes()
}

function runeClicked(rn) {
    let mark = rn.children[2]
    if (mark.getAttribute("magnifier") === "false") {
        if (rn.id.includes("Р")) {
            for (let i = 0; i < spellRunes.children.length; i++) {
                if (spellRunes.children[i].nodeName === "DIV") 
                    spellRunes.children[i].children[2].setAttribute("magnifier", false)
            }
            mark.setAttribute("magnifier", true)     
        }   
    }
    else mark.setAttribute("magnifier", false)
    makeFormula()
    saveRunes()
}

function runeRemove(btn) {
    let rn = btn.parentElement
    rn.remove()
}

function makeSpellsList() {
    for (let i = 0; i < spells.length; i++) {
        let spell = spells[i]
        let spellNode = document.createElement('div')
        spellNode.id = `${spell.name}-branch`
        spellNode.innerHTML = `<h2>${spell.name}</h2>`
        spellNode.setAttribute('onclick', `setSpell("${spell.runes}")`)

        menuSpells.appendChild(spellNode)
    }
}


const lengthDefault = 10
const lengthIdeo = 20

const maxRunes = 5
const extendedSpellMult = 4

function makeFormula() {
    spellFormula.innerHTML = ""
    runes = spellRunes.children

    // Make formula
    for (let i = 0; i < runes.length; i++) {
        if (runes[i].nodeName === "DIV") {
            let name = runes[i].children[1].innerHTML            
            if (runes[i].children[2].getAttribute("magnifier") === "true")
                spellFormula.innerHTML += `<i>[${name}]</i>✨`
            else 
                spellFormula.innerHTML += `[${name}]`
            
            if (i < runes.length-1) spellFormula.innerHTML += "<br> + "
        }
    }
    
    spellFormula.innerHTML += "<br><br>Длительность заклинания:<br>"

    // Calculate duration
    let duration = 0
    let magnifiedBranch = ""
    let ideos = []
    let runesCount = 0
    let penalty = 1
    // Get magnifier
    for (let i = 0; i < runes.length; i++)
        if (runes[i].nodeName === "DIV") {
            if (runes[i].children[2].getAttribute("magnifier") === "true")
                magnifiedBranch = runes[i].id.charAt(0)
            // Count runes
            if (runes[i].id.includes("Р"))
                runesCount += 1
            if (runes[i].id.includes("И"))
                runesCount += 2
        }

    // Calculation
    for (let i = 0; i < runes.length; i++) {
        if (runes[i].nodeName === "DIV") {
            let magn = 1
            if (magnifiedBranch == runes[i].id.charAt(0)) magn = 0.5

            let id = runes[i].id.split(' ').slice(0, 2).join()
            if (i == 0) {
                if (id.includes("Р"))
                    duration += lengthDefault/magn
                if (id.includes("И"))
                    duration += lengthIdeo/magn
                    ideos.push(runes[i].id.charAt(0))
            }
            else {
                if (id.includes("Р")) 
                    if (runes[i].children[2].getAttribute("magnifier") !== "true")
                        duration -= lengthDefault*magn
                if (id.includes("И")) 
                    if (ideos.includes(runes[i].id.charAt(0)))
                        duration += lengthIdeo/magn
                    else 
                        duration -= lengthIdeo*magn                
            }            
        }
    }
    /* if (runesCount > maxRunes) {
        penalty = (maxRunes/runesCount).toFixed(2)        
    } */
    if (duration >= 0)
        spellFormula.innerHTML += `${Math.round(duration*penalty)} сек`
    else 
        spellFormula.innerHTML += `<span style="color: var(--red)">${Math.round(duration*penalty)} сек</span>`

    if (penalty != 1)
        spellFormula.innerHTML += `<br>Коэффициент штрафа из-за количества рун: ${penalty}`
    
    if (runesCount == 1)
        spellDescription.innerHTML = "Одиночная руна.<br><b>Сила:</b> условные 20%; <b>Дальность:</b> 3-10м;<br><b>Сложность:</b> новичок. <b>Каст:</b> быстрый."
    else if (runesCount <= Math.ceil(maxRunes/2))
        spellDescription.innerHTML = "Сложное заклинание.<br><b>Сила:</b> условные 30-50%; <b>Дальность:</b> до 50м;<br><b>Сложность:</b> ученик. <b>Каст:</b> недолгий."
    else if (runesCount <= maxRunes)
        spellDescription.innerHTML = "Сложное заклинание.<br><b>Сила:</b> условные 50-80%; <b>Дальность:</b> до 100м;<br><b>Сложность:</b> умелец. <b>Каст:</b> длительный."
    else if (runesCount > maxRunes )
        spellDescription.innerHTML = "Расширенное заклятие.<br><b>Сила:</b> условные 100% и больше; <b>Дальность:</b> до 500м;<br><b>Сложность:</b> мастер. <b>Каст:</b> очень долгий."    
}

let runesTooltip = "Создайте заклинание из рун в меню слева"
let formulaTooltip = "Формула и время действия заклинания появятся, когда появятся руны"
let descriptionTooltip = "Начните создавать заклинание, чтобы увидеть его характеристики"
function clear(clearData = true) {
    spellRunesData = []
    spellRunes.innerHTML = runesTooltip
    spellFormula.innerHTML = formulaTooltip
    spellDescription.innerHTML = descriptionTooltip

    if (clearData) window.localStorage.setItem("spellRunes", "")
}

function setSpell(formula) {
    clear()
    let runes = formula.split('|')
    let listRunes = document.getElementsByClassName("runes-rune")
    for (let i = 0; i < runes.length; i++) {
        let magn = false
        if (runes[i].includes('+'))
            magn = true
        runes[i] = runes[i].replace("+", "")

        for (let j = 0; j < listRunes.length; j++)            
            if (listRunes[j].id == runes[i]) {
                let rn = listRunes[j].cloneNode(true)
                if (magn) rn.children[2].setAttribute("magnifier", "true")
                listClicked(rn)
            }
    }
}

function init() {
    clear(false)
    makeRunesList()
    makeSpellsList()
    if (window.localStorage.getItem("spellRunes") !== "") {
        spellRunes.innerHTML = window.localStorage.getItem("spellRunes")
        makeFormula()
    }
}
init()