const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");
const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');

const baseUrl = 'http://localhost:3000/'


//Checks when dropdown menus have been updated
dbDropdown.addEventListener('change', function() {
    const selectedValue = dbDropdown.value;
    console.log('Dropdown selection changed to: ' + selectedValue);
});


//Get and Post methods
getBtn.addEventListener('click', getInfo);
postBtn.addEventListener('click', postInfo);

async function getInfo(e) {
    e.preventDefault();
    const res = await fetch(baseUrl + 'data?dbName=${dbDropdown}', {
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

