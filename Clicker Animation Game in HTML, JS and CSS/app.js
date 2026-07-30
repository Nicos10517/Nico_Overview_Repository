let petButton = document.getElementById("petButton")
let affectionAmount = document.getElementById("affectionAmount")
let treatUpgrade = document.getElementById("treatUpgrade")
let petImg = document.getElementById("petImg")
let progressSection = document.getElementById("progress-section")

let petActionTimer;

let affection = 100

let treat = 0
let treatCost = 100

let bondLevel = 0
let bondCost = 300
let moving = false;

let LevelingUp = false;

let title = "Strangers";
let nextMilestone = 1;
let prevMilestone = 0;
let currentLevelNum = 0;
let currentHeartMultipliers = 1;

let milestones = [0, 1, 4, 9, 12, 20]
let titles = ["Strangers", "Acquaintances", "Buddies", "Best Friends", "Companions", "Soulmates"]

//Affection Amount

function updateAffectionAmount (){
    affectionAmount.innerText = "You have " + affection + " affection!"
}

//Pet Button Settings and Animation

function imageSwap(newImageSrc, animationType = ""){
    petImg.src = newImageSrc
    moving = true

    petButton.classList.remove("bouncing","bounce-and-shake");
    void petButton.offsetWidth; 

    if (animationType == "shaking"){
        petButton.classList.add("bounce-and-shake");
    } else {
        petButton.classList.add("bouncing");
    }
}

function clickPet(){    
    clearTimeout(petActionTimer)
    affection++
    updateAffectionAmount()

    imageSwap("bcatPet.png", "shaking")

    petActionTimer = setTimeout(function() {
        imageSwap("bcatNorm.png")
    }, 500)

}

function purchaseTreat(){
    if (affection >= treatCost){
        clearTimeout(petActionTimer)

        affection -= treatCost
        treatCost *= 1.25
        treatCost = Math.round(treatCost)

        treat++

        if (currentLevelNum < titles.length - 1 && treat === milestones[currentLevelNum + 1]){
            levelUp();
        } else {
            updateLoveLevel();
        }

        imageSwap("bcatTreat.png", "shaking")

        void petButton.offsetWidth;

        updateAffectionAmount()
        treatUpgrade.innerHTML = "Give a Treat! <br><span id='textCost'>" + treatCost + " affection</span>";

        petActionTimer= setTimeout(function() {
        imageSwap("bcatNorm.png")
        }, 500)
        moving = false;
    }
}

//Love Progress Bar

function updateLoveLevel(){
    let progress;
    const maxLevelIdx = titles.length - 1;

    if (LevelingUp) {
        progress = 100;
    } else if (currentLevelNum >= maxLevelIdx) {
        progress = 100;
        document.getElementById("nextLevelMax").innerText = "Max";
    } else {
        let currentProgress = treat - milestones[currentLevelNum];
        let goalNeeded = milestones[currentLevelNum + 1] - milestones[currentLevelNum];
        progress = (currentProgress / goalNeeded) * 100;
        document.getElementById("nextLevelMax").innerText = currentLevelNum + 1;
    }

    document.getElementById("currentLevelMin").innerText = currentLevelNum;

    title = titles[currentLevelNum];
    document.getElementById("loveTitle").innerText = title;
    
    document.getElementById("loveProgressBar").style.width = progress + "%";

    const bg = document.querySelector('.heart-background');
    
    const originalHearts = [
        { left: '10%', delay: '0s' },
        { left: '30%', delay: '2s' },
        { left: '55%', delay: '4s' },
        { left: '80%', delay: '1s' }
    ];

    let targetMultipliers = Math.pow(2, currentLevelNum);


    if (targetMultipliers > currentHeartMultipliers) {
        let setsToAdd = targetMultipliers - currentHeartMultipliers;

        for (let i = 0; i < setsToAdd; i++) {
            originalHearts.forEach(data => {
                let heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerText = '❤';
                
                let offset = (Math.random() * 15 - 7.5); 
                heart.style.left = `calc(${data.left} + ${offset}%)`;
            
                heart.style.animationDelay = (Math.random() * 8) + 's';
                
                bg.appendChild(heart);
            });
        }
        currentHeartMultipliers = targetMultipliers;
    }
}

function levelUp() {
    LevelingUp = true;
    updateLoveLevel(); // This starts the 0.4s transition to 100%

    // 1. Wait 400ms (matching your CSS transition) so the bar hits the end first
    setTimeout(function() {
        if (progressSection) {
            progressSection.classList.add("barShake"); // Now start the shake
        }

        // 2. Let it shake for 500ms
        setTimeout(function() {
            currentLevelNum++;
            prevMilestone = milestones[currentLevelNum];
            if (currentLevelNum < milestones.length - 1) {
                nextMilestone = milestones[currentLevelNum + 1];
            }

            let bar = document.getElementById("loveProgressBar");
            bar.classList.add("no-transition"); // Prevent sliding backward
            
            if (progressSection) {
                progressSection.classList.remove("barShake");
            }
            
            LevelingUp = false;
            updateLoveLevel(); // Reset bar to 0%
            
            void bar.offsetWidth; // Force a style refresh
            bar.classList.remove("no-transition");
        }, 500); 
    }, 400); // This delay is the key!
}

//Set Interval

setInterval(function() {
    affection += treat
    updateAffectionAmount()
}, 1000)

//Idle Animation

if (!moving) {
    setInterval(function idleAnimation(){
    petImg.src = "bcatSquintT.png"
    setTimeout(function(){
        petImg.src = "bcatBlink.png"
        petButton.classList.add("blinking");
        setTimeout(function(){
            petImg.src= "bcatNorm.png"
            petButton.classList.remove("blinking");
        },25)
    }, 150)
}, 5000)
}

