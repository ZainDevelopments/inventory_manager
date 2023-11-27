const getBtn = document.getElementById("getBtn");
const postBtn = document.getElementById("postBtn");
const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');
const editButtons = document.getElementsByClassName('edit-buttons');
if(editButtons) {
    console.log(editButtons);
}else {
    console.log("NOPE");
}
const baseUrl = 'http://localhost:3000/'


document.addEventListener('DOMContentLoaded', function() {
    
}) 

//Checks when dropdown menus have been updated
dbDropdown.addEventListener('change', function() {
    const selectedValue = dbDropdown.value;
    console.log('Dropdown selection changed to: ' + selectedValue);
});


for(let i = 0; i < editButtons.length; i++) {
    const btnID = editButtons[i].id.split("-")[0];
    editButtons[i].addEventListener('click', toggleEdit(btnID));
}


//Assigning Event listeners
getBtn.addEventListener('click', getInfo);
postBtn.addEventListener('click', postInfo);


//Get and Post methods
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


//Functions
function toggleEdit(id) {
    console.log("Changed edit");
    var editableText = document.getElementsByClassName('inner-text');
    editableText.contentEditable = !editableText.isContentEditable;
}