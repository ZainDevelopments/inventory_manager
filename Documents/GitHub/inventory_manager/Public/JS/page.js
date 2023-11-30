const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");
const baseUrl = 'http://localhost:3000/'



//Assigning Event listeners
getBtn.addEventListener('click', getInfo);
postBtn.addEventListener('click', postInfo);


//Get and Post methods
async function getInfo(e) {
    e.preventDefault();
    const res = await fetch(baseUrl + '?data=${dbDropdown}', {
        method : 'GET'
    })
    console.log(res);
}

async function postInfo(e) {
    e.preventDefault();

    const res = await fetch(baseUrl + `default`, 
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