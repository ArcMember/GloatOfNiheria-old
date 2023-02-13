let alph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

function MakePlayerList() {
    let letters = document.getElementById("letters")
    letters.innerHTML = ""
    for (var i = 0; i < alph.length; i++) {
        let c = alph.charAt(i)
        letters.innerHTML += `<span onclick="ChangePlayerList('${c}')" id="${c}">${c}</span>`;
    }
}

function ChangePlayerList(letter) {
    let letters = document.getElementById("letters").children
    for (var i = 0; i < letters.length; i++) {
        letters[i].classList.remove("selected")
        if (letters[i].id == letter) 
            letters[i].classList.add("selected")
    }

    let list = document.getElementById("list").children
    for (var i = 0; i < list.length; i++) {
        list[i].classList.add("hidden")
        if (list[i].id == letter) 
            list[i].classList.remove("hidden")
    }
}

let racesList = [
    "Бестиец", "Дворф", "Кхарфир", "Редрехан", "Человек",
    "Мерия", "Ламах-виден", "Ламах-ибэ", "Бестиарный", "Проклятый"
]
let sexList = [
    "Мужчина", "Женщина"
]

function MakeCompletePlayerList() {
    let sex = document.getElementById("sex")
    sex.innerHTML = ""
    for (var i = 0; i < sexList.length; i++) {
        let s = sexList[i]
        sex.innerHTML += `<span onclick="Filter_Sex('${s}')" id="${s}">${s}</span>`;
    }

    let races = document.getElementById("races")
    races.innerHTML = ""
    for (var i = 0; i < racesList.length; i++) {
        let r = racesList[i]
        races.innerHTML += `<span onclick="Filter_Race('${r}')" id="${r}">${r}</span>`;
    }

    let letters = document.getElementById("letters")
    letters.innerHTML = ""
    for (var i = 0; i < alph.length; i++) {
        let c = alph.charAt(i)
        letters.innerHTML += `<span onclick="Filter_Alphabetical('${c}')" id="${c}">${c}</span>`;
    }
}

function Filter_Sex(sex) {
    let sexes = document.getElementById("sex").children
    for (var i = 0; i < sexes.length; i++) {
        if (sexes[i].classList.contains("selected") && sexes[i].id == sex) {
            sexes[i].classList.remove("selected")
            filtersList.sex = "def"
        }
        else if (sexes[i].id == sex) {
            sexes[i].classList.add("selected")
            filtersList.sex = sex
        }
        else sexes[i].classList.remove("selected")
        
    }
    ChangeCompletePlayerList()
}

function Filter_Race(race) {
    let races = document.getElementById("races").children
    for (var i = 0; i < races.length; i++) {
        if (races[i].classList.contains("selected") && races[i].id == race) {
            races[i].classList.remove("selected")
            filtersList.race = "def"
        }
        else if (races[i].id == race) {
            races[i].classList.add("selected")
            filtersList.race = race
        }   
        else races[i].classList.remove("selected")
    }
    ChangeCompletePlayerList()
}

function Filter_Alphabetical(letter) {
    let letters = document.getElementById("letters").children
    for (var i = 0; i < letters.length; i++) {
        if (letters[i].classList.contains("selected") && letters[i].id == letter) {
            letters[i].classList.remove("selected")
            filtersList.letter = "def"
        }
        else if (letters[i].id == letter) {
            letters[i].classList.add("selected")
            filtersList.letter = letter
        }   
        else letters[i].classList.remove("selected")
    }
    ChangeCompletePlayerList()
}

let filtersList = {
    sex: "def",
    race: "def",
    letter: "def",
}
function ChangeCompletePlayerList() {
    let characters = document.getElementById("list").children
    for (var i = 0; i < characters.length; i++) {
        let ch = characters[i]
        
        if (filtersList.sex != "def" || filtersList.race != "def" || filtersList.letter != "def")
            ch.classList.add("hidden")

        if (ch.classList.contains(filtersList.sex) &&
            ch.classList.contains(filtersList.race) &&
            ch.classList.contains(filtersList.letter))
            ch.classList.remove("hidden")
    }
}

let stateList = [
    "Реабор-Тхаес", "Тейель", "Афитра", "Луат", "Коркафт",
    "Мордвин", "Флатрия", "Сикстинна", "Секри", "Кланы",
    "Хельгеран"
]

function MakeCanonsList() {
    let states = document.getElementById("states")
    states.innerHTML = ""
    for (var i = 0; i < stateList.length; i++) {
        let s = stateList[i]
        states.innerHTML += `<span onclick="Filter_State('${s}')" id="${s}">${s}</span>`;
    }

    let letters = document.getElementById("letters")
    letters.innerHTML = ""
    for (var i = 0; i < alph.length; i++) {
        let c = alph.charAt(i)
        letters.innerHTML += `<span onclick="СFilter_Alphabetical('${c}')" id="${c}">${c}</span>`;
    }
}

function Filter_State(state) {
    let states = document.getElementById("states").children
    for (var i = 0; i < states.length; i++) {
        if (states[i].classList.contains("selected") && states[i].id == state) {
            states[i].classList.remove("selected")
            canonsFilters.state = "def"
        }
        else if (states[i].id == state) {
            states[i].classList.add("selected")
            canonsFilters.state = state
        }
        else states[i].classList.remove("selected")
        
    }
    ChangeCanonsList()
}

function СFilter_Alphabetical(letter) {
    let letters = document.getElementById("letters").children
    for (var i = 0; i < letters.length; i++) {
        if (letters[i].classList.contains("selected") && letters[i].id == letter) {
            letters[i].classList.remove("selected")
            canonsFilters.letter = "def"
        }
        else if (letters[i].id == letter) {
            letters[i].classList.add("selected")
            canonsFilters.letter = letter
        }   
        else letters[i].classList.remove("selected")
    }
    ChangeCanonsList()
}

let canonsFilters = {
    state: "def",
    letter: "def",
}
function ChangeCanonsList() {
    let characters = document.getElementById("list").children
    for (var i = 0; i < characters.length; i++) {
        let ch = characters[i]
        
        if (canonsFilters.state != "def" || canonsFilters.letter != "def")
            ch.classList.add("hidden")

        if (ch.classList.contains(canonsFilters.state) &&
            ch.classList.contains(canonsFilters.letter))
            ch.classList.remove("hidden")
    }
}