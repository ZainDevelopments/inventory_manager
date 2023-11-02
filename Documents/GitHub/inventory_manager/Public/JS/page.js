const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");
const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');

const baseUrl = 'http://localhost:3000/'

getBtn.addEventListener('click', getInfo);
postBtn.addEventListener('click', postInfo);

async function getInfo(e) {
    e.preventDefault();
    const res = await fetch(baseUrl + 'data', {
        method : 'GET'
    })
    console.log(res);
}

async function postInfo(e) {
    e.preventDefault();

    const res = await fetch(baseUrl + 'default', 
    {
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({
            db : dbDropdown.value,
            col : colDropdown.value
        })
    });
}