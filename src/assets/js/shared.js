export default {
    authorsClean(authors) { 
        if(authors !== undefined && authors.length) {
            return authors.toString().replace(/[[\]'"]+/g,'').replace(/[,]+/g,', ');
        } else {
            return 'No authors provided';
        }
    }
}