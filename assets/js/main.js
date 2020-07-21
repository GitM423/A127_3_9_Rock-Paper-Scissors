function checkRounds() {
    if (document.getElementById("five").checked == true) {
        console.log('selected: \n\t"five"')
        document.getElementById("custom-rounds").innerHTML = ""
    }
    else if (document.getElementById("ten").checked == true) {
        console.log('selected: \n\t"ten"')
        document.getElementById("custom-rounds").innerHTML = ""
    }
    else if (document.getElementById("fifteen").checked == true) {
        console.log('selected: \n\t"fifteen"')
        document.getElementById("custom-rounds").innerHTML = ""
    }
    else if (document.getElementById("twenty").checked == true) {
        console.log('selected: \n\t"twenty"')
        document.getElementById("custom-rounds").innerHTML = ""
    }
    else if (document.getElementById("custom").checked == true) {
        console.log('selected: \n\t"custom"')
        document.getElementById("custom-rounds").innerHTML = '<input type="number" name="" id="custom-number">'
    }
}

function rndComPick() {
    let comPick = Math.floor((Math.random() * 5) + 1);
    if (comPick == 1) {
        return 'Rock'
    }
    else if (comPick == 2) {
        return 'Paper'
    }
    else if (comPick == 3) {
        return 'Scissors'
    }
    else if (comPick == 4) {
        return 'Lizard'
    }
    else if (comPick == 5) {
        return 'Spock'
    }
}

function winLose(userPick, compPick) {
    if (userPick == compPick) {
        return "draw"
    }
    else if (userPick == "Rock") {
        if (compPick == "Scissors" || compPick == "Lizard") {
            return 'win'
        }
        else {
            return 'lose'
        }
    }
    else if (userPick == "Paper") {
        if (compPick == "Rock" || compPick == "Spock") {
            return 'win'
        }
        else {
            return 'lose'
        }
    }
    else if (userPick == "Scissors") {
        if (compPick == "Paper" || compPick == "Lizard") {
            return 'win'
        }
        else {
            return 'lose'
        }
    }
    else if (userPick == "Lizard") {
        if (compPick == "Spock" || compPick == "Paper") {
            return 'win'
        }
        else {
            return 'lose'
        }
    }
    else if (userPick == "Spock") {
        if (compPick == "Scissors" || compPick == "Rock") {
            return 'win'
        }
        else {
            return 'lose'
        }
    }
    else {
        return 'error'
    }
}

function resetImgColors() {
    var elems = document.querySelectorAll('.image-btn label');
    var index = 0, length = elems.length;
    for (i = 0; i < elems.length; i++) {
        elems[i].style.transition = "borderColor 0.5s, background 0.5s"
        elems[i].style.background = 'none'
        elems[i].style.borderColor = '#000000'
    }
}

let index = 0
let random
let rounds
let userWins = 0
let compWins = 0

function sendData(pick) {

    let result = document.getElementById("result")

    if (index == 0 && (document.getElementById("custom").checked == true) && (document.getElementById("custom-number").value == "")) {
        console.log("ERROR: \n\tnumber of rounds missing")
        document.getElementById("result").innerHTML += "<br>ERROR: \n\tnumber of rounds missing"
    }
    else {
        index++

        if (index == 1) {
            if (document.getElementById("five").checked == true) {
                rounds = 5
            }
            else if (document.getElementById("ten").checked == true) {
                rounds = 10
            }
            else if (document.getElementById("fifteen").checked == true) {
                rounds = 15
            }
            else if (document.getElementById("twenty").checked == true) {
                rounds = 20
            }
            else if (document.getElementById("custom").checked == true) {
                rounds = document.getElementById("custom-number").value
            }
        }

        if (index <= rounds) {

            resetImgColors()

            console.log("Your Pick: ", pick)

            let compPick = rndComPick()
            console.log("Comp Pick: ", compPick)

            let outcome = winLose(pick, compPick)
            console.log("Outcome: ", outcome)

            // Output
            if (outcome == 'win') {
                result.innerHTML = `${pick} beats ${compPick}. <b style="color:#28A745">You win the round!</b>`
                userWins++
                document.getElementById(pick + "-label").style.transition = "borderColor 0.5s, background 0.5s"
                document.getElementById(pick + "-label").style.borderColor = "#28A745"
                document.getElementById(pick + "-label").style.background = "#28A74566"

            }
            else if (outcome == 'lose') {
                result.innerHTML = `${compPick} beats ${pick}. <b style="color:#DC3545">You lose the round!</b>`
                compWins++
                document.getElementById(pick + "-label").style.transition = "borderColor 0.5s, background 0.5s"
                document.getElementById(pick + "-label").style.borderColor = "#DC3545"
                document.getElementById(pick + "-label").style.background = "#DC354566"
            }
            else if (outcome == 'draw') {
                result.innerHTML = `<b style="color:#005CC8">It's a draw!</b> Both of you chose ${pick}.`
                document.getElementById(pick + "-label").style.transition = "borderColor 0.5s, background 0.5s"
                document.getElementById(pick + "-label").style.borderColor = "#005CC8"
                document.getElementById(pick + "-label").style.background = "#005CC866"
            }

            document.getElementById("radio").innerHTML = `<b>${index}/${rounds}</b>`
            document.getElementById("radio").style.fontSize = "1.6rem"

            document.getElementById("score").innerHTML = `${userWins} : ${compWins}`
            document.getElementById("score").style.fontSize = "1.6rem"

            if (userWins > compWins) {
                document.getElementById("player1").style.background = "#28A745"
                document.getElementById("player2").style.background = "#DC3545"
            }
            else if (userWins == compWins) {
                document.getElementById("player1").style.background = "#005CC8"
                document.getElementById("player2").style.background = "#005CC8"
            }
            else if (userWins < compWins) {
                document.getElementById("player1").style.background = "#DC3545"
                document.getElementById("player2").style.background = "#28A745"
            }


            if (index == rounds) {
                if (userWins > compWins) {
                    result.innerHTML += '<br><b style="color:#28A745">You win the game!</b>'
                }
                else if (userWins == compWins) {
                    result.innerHTML += '<br><b style="color:#005CC8">The game ends in a draw!</b>'
                }
                else if (userWins < compWins) {
                    result.innerHTML += '<br><b style="color:#DC3545">You lose the game!</b>'
                }
                document.querySelectorAll('#buttons input').disabled = true
            }
        }
    }
}