import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const dataFilePath = join(currentDir, '..', 'lib', 'data.json');


export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        let question = data.get('question');
        let path = data.get('path');
        let text = data.get('text');
        let option1 = data.get('option 1');
        let option2 = data.get('option 2');
        let image = data.get('image');
    
        // TODO add to json file

        // Read existing data from JSON file
        let jsonData = readFileSync(dataFilePath, 'utf8');
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


        dataArray[parseInt(question)] = Object.assign({[path]:{text, option1, option2, image}}, dataArray[parseInt(question)])


        // Write the updated data back to the JSON file
        writeFileSync(dataFilePath, JSON.stringify(dataArray, null, 2));
    },

}

export async function load(  ) {
    let jsonData = readFileSync(dataFilePath, 'utf8');
    let dataArray = await JSON.parse(jsonData);
    // Return the data as JSON
    return {dataArray}
};