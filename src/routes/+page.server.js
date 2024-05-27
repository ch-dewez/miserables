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
        let hasRedirection = data.get("hasRedirection")
        let redirection = data.get("redirection")
    
        // TODO add to json file

        // Read existing data from JSON file
        let jsonData = readFileSync("$lib/data.json", 'utf8');
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


        dataArray[parseInt(question)] = Object.assign({[path]:{text, option1, option2, image, isEnd, hasRedirection, redirection}}, dataArray[parseInt(question)])


        // Write the updated data back to the JSON file
        writeFileSync("$lib/data.json", JSON.stringify(dataArray, null, 2));
    },

}