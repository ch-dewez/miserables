<script>
    import { goto } from "$app/navigation";
    import jsonData from "$lib/data.json"
    import { onMount, tick } from "svelte"

    let questionNb = 0
    let path = 0
    let showOptions = true
    let showText = true
    
   // @ts-ignore
     $: currentData = jsonData[questionNb][path]

    onMount(async () => {
        console.log(currentData);
        typeIt(currentData.text, document.getElementById("text"))
        if (currentData.hasOptions) {
            typeIt(currentData.option1, document.getElementById("option1"))
            typeIt(currentData.option2, document.getElementById("option2"))
        }else {
            showOptions = false
            await tick()
            typeIt("continuer", document.querySelector("#continue"))
        }
    })

    function removeIt(target, callback) {
        let hold = target.textContent.split('');
        var step = 1;

        var interval = setInterval(function() {
            if(hold.length == 0) { clearInterval(interval); callback()};
            hold.pop();
            step += 1;

            target.innerHTML = hold.join('');
        }, 500/hold.length);
    }

    // @ts-ignore
    async function typeIt(text, target) {
         
        if (text == "" && target == document.querySelector("#text")) {
            target.parentElement.style.opacity = 0
            return
        }else {
            target.parentElement.style.opacity = 1
        }
        if (target.classList.contains("underline")){
            target.parentElement.style.opacity = 0
            await new Promise(resolve => setTimeout(resolve, 3000)) 
            target.parentElement.style.opacity = 1
        }
        let hold = []
        let step = 0

        var interval = setInterval(function() {
            if(hold.length == text.length) { clearInterval(interval) };
            hold.push(text.slice(step - 1, step));
            step += 1;

            target.innerHTML = hold.join('');
        }, 500/text.length);
        
    }


    // @ts-ignore
    async function onClick(answerIdx) {

        if (currentData.hasRedirection){
            questionNb = parseInt(currentData.redirections[0])
            path = parseInt(currentData.redirections[1])
        }else {
            path += answerIdx * (2 ** questionNb)
            questionNb += 1
        }

        if (questionNb >= jsonData.length || !jsonData[questionNb]?.hasOwnProperty(path)) {
            goto(`add/${questionNb}/${path}`)
            return
        }

        await tick()
        removeIt(document.querySelector('#text'), () => typeIt(currentData.text, document.querySelector('#text')))
        if (showOptions && currentData.hasOptions) {
            removeIt(document.querySelector('#option1'), () => typeIt(currentData.option1, document.querySelector('#option1')))
            removeIt(document.querySelector('#option2'), () => typeIt(currentData.option2, document.querySelector('#option2')))
        }else if(showOptions && !currentData.hasOptions) {
            removeIt(document.querySelector("#option1"), () => {})
            removeIt(document.querySelector("#option2"), async () => {
                showOptions = false
                await tick()
                typeIt("continuer", document.querySelector("#continue"))
            })
        }else if (!showOptions && currentData.hasOptions) {
            removeIt(document.querySelector("#continue"), async () => {
                showOptions = true
                await tick()
                typeIt(currentData.option1, document.querySelector("#option1"))
                typeIt(currentData.option2, document.querySelector("#option2"))
            })
        }
        
    }
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<img src="images/{currentData.image}" alt="current image">
{#if currentData.isEnd}
    <div class="end">
        <p>Fin</p>
    </div>
{:else}
    <div class="speech">
            <!-- svelte-ignore a11y-missing-content -->
            <h5 id="text"></h5>
    </div>
    {#if showOptions}
        <div class=answers>
            <div class="background">
            <button class="underline" id="option1" on:click={() => onClick(0)}></button>
            </div>
            <div class="background">
            <button class="underline" id="option2" on:click={() => onClick(1)}></button>
            </div>
        </div>
    {:else}
        <div class="answers">
            <div class="background">

            <button class="underline" id="continue" on:click={() => onClick(0)}></button>
            </div>
        </div>
    {/if}
{/if}

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');


*{
    font-family: Roboto;
    font-weight: 400;
    font-style: normal;
}

.end{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    color:white
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.answers {
    position:absolute;
    border-radius: 10px;
    padding:10px;
    width: 80%;
    height: 20%;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);

    
    button {
        background: none;
        border: none;
        font-size: 2rem; 
        color: white;
    }

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .background{
        max-width: 50%;
        border-radius: 10px;
        padding: 15px;
        background: rgba($color: #000000, $alpha: 0.5);
        backdrop-filter: blur(5px);
        margin-left: 20px;
    
    .underline {
        display: inline-block;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 3px;
            bottom: 0;
            left: 0;
            background-color: white;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
        }
        &:hover::after{
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
}
    
}
.speech {

    position:absolute;
    border-radius: 10px;
    padding:10px;
    width: 80%;
    height: 20%;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);

    h5 {

    border-radius: 10px;
    padding: 15px;
    background: rgba($color: #000000, $alpha: 0.5);
    backdrop-filter: blur(5px);
        color: white;
        font-size: 2rem; 
    }
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
