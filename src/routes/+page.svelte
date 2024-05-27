<script>
    import { goto } from "$app/navigation";
    import jsonData from "$lib/data.json"


    let questionNb = 0
    let path = 0
    
    // automatically assign text imagesrc and option
    let currentText
    let hasOptions
    let isEnd
    let currentOptions = ["", ""]
    let imageSrc
    let hasRedirection
    let redirection
    
        
    onMount(() => {
        initVariables()
    })

    function initVariables() {
        currentText = jsonData[questionNb][path].text
        hasOptions = jsonData[questionNb][path].hasOptions
        isEnd = jsonData[questionNb][path].isEnd
        if (hasOptions){
            currentOptions = [jsonData[questionNb][path].option1, jsonData[questionNb][path].option2]
        }

        imageSrc = "images/" + jsonData[questionNb][path].image

        hasRedirection = jsonData[questionNb][path].hasRedirection
        redirection = jsonData[questionNb][path].redirection
    }

    function onClick(answerIdx) {
        if (isEnd) {
            
        }

        if (hasRedirection){
            questionNb = redirection[0]
            redirection = redirection[1]
        }else {
            path += answerIdx * (2 ** questionNb)
            questionNb += 1
        }

        if (questionNb >= jsonData.length || !jsonData[questionNb]?.hasOwnProperty(path)) {
            goto(`add/${questionNb}/${path}`)
        }
        initVariables()
    }
</script>

<!-- <enhanced:img src={images[imageIndex]} alt="" /> -->
<!-- svelte-ignore a11y-img-redundant-alt -->
<img src="{imageSrc}" alt="Description of the image">
<div class="container">
    <div class="speech">
        <h5>{currentText}</h5>
    </div>
    {#if hasOptions}
    <div class=answers>
        <button class="underline" on:click={() => onClick(0)}>{currentOptions[0]}</button>
        <button class="underline" on:click={() => onClick(1)}>{currentOptions[1]}</button>
    </div>
    {/if}
</div>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');


*{
    font-family: Roboto;
    font-weight: 400;
    font-style: normal;
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.container {
    position:absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    width: 80%;
    height: 20%;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);

    h5 {
        color: white;
        font-size: 2rem; 
    }
    
    button {
        background: none;
        border: none;
        font-size: 2rem; 
        color: white;
    }

    .speech {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        width: 100%;
    }
    .answers{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 50%;
        width: 100%;

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
</style>
