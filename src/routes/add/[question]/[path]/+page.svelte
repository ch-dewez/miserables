<script>
    export let data

    let questionNb = data.question
    let path = data.path

    let options = ["", ""]
</script>

<form method="POST" action="/?/add">
    <div class="container">
        <div>
            <p>Question</p>
            <input type="number" name="question" bind:value={questionNb}>
        </div>
        <div>
            <p>path</p>
            <input type="number" name="path" bind:value={path}>
        </div>

        <div>
            <p>Text</p>
            <input type="text" name="text">
        </div>

        <div>
            <p>image name</p>
            <input type="text" name="image">
        </div>
        
        {#each options as option, i}
            <div>
                <p>Option {i+1}</p>
                <input type="text" name="option {i+1}">
            </div>
        {/each}
        <div>
            <button>Submit</button>
        </div>
    </div>


</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;

        .container {
            width: 50%;
            div {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: center;
                align-items: center;

                * {
                    margin: 10px;
                }
            }
        }

    }
</style>