import { readFileSync, writeFileSync } from 'fs';
export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        let question = data.get('question');
        let path = data.get('path');
        let text = data.get('text');
        let option1 = data.get('option 1');
        let option2 = data.get('option 2');
        let image = data.get('image');
        let isEnd = data.get("isEnd")
        let hasOptions = data.get("hasOptions")
        let hasRedirection = data.get("hasRedirection")
        let redirection1 = data.get("redirection 1")
        let redirection2 = data.get("redirection 2")

        console.log(isEnd, hasRedirection, redirection1, redirection2)
    
        // TODO add to json file

        // Read existing data from JSON file
        let jsonData = readFileSync("src/lib/data.json", 'utf8');
        let dataArray;
        if (jsonData) {
            dataArray = JSON.parse(jsonData);
        } else {
            dataArray = [];
        }
        // Add new data to the array
        
        if (!dataArray[parseInt(question)]){
            for (let i = 0; i <= parseInt(question)+1-dataArray.length; i++) {
                dataArray.push({})
            }
        }


        dataArray[parseInt(question)] = Object.assign({[path]:{text, option1, option2, image, isEnd, hasOptions, hasRedirection, redirections:[redirection1, redirection2]}}, dataArray[parseInt(question)])


        // Write the updated data back to the JSON file
        writeFileSync("src/lib/data.json", JSON.stringify(dataArray, null, 2));
    },

}