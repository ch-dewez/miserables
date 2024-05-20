/** @type {import('./$types').PageLoad} */
export async function load( { params } ) {
    return {
        question: params.question,
        path: params.path
    };
};