const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');
const editButtons = document.getElementsByClassName('edit-buttons');
const postButtons = document.getElementsByClassName("post-buttons");

const baseUrl = 'http://localhost:3000/default'


//Checks when dropdown menus have been updated
dbDropdown.addEventListener('change', function() {
    const selectedValue = dbDropdown.value;
    console.log('Dropdown selection changed to: ' + selectedValue);
});

//Adding event listeners to every edit button
for(let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(e) {
        const textID = e.target.id.split("-")[0];
        const btnID = e.target.id;
        toggleEdit(textID, btnID);
    });
}

//Adding event listeners to every post button
for(let btn = 0; btn < postButtons.length; btn++) {
    postButtons[btn].addEventListener('click', function(e) {
        const id = e.target.id;
        const btnID = id;
        const textID = id.split("-")[0];
        postEdit(textID, btnID);
    })
}

//Functions
function toggleEdit(id, btnID) {
    console.log("Text ID: " + id);

    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    for(let parent = 0; parent < editParent.length - 4; parent++) {
        console.log(editParent[parent]); 
        const editChild = editParent[parent].children;
        for(let child = 0; child < editChild.length; child++) {
            console.log(editChild[child]);
            const btn = document.getElementById(btnID);
            if(editChild[child].isContentEditable) {
                editChild[child].contentEditable = false;
                btn.style.backgroundColor = 'teal';
            } else {
                editChild[child].contentEditable = true;
                btn.style.backgroundColor = 'red';
            }
        }
    }
}

function postEdit(id, btnID) {
    // console.log(`Button '${btnID}' was pressed for textbox '${id}'`);
    var editableText = document.getElementById(id);
    let posted = false;
    const editParent = editableText.children;
    for(let parent = 0; parent < editParent.length - 4; parent++) {
        // console.log(editParent[parent]); 
        const editChild = editParent[parent].children;
        for(let child = 0; child < editChild.length; child++) {
            // console.log(editChild[child]);
            const btn = document.getElementById(btnID);3
            if(posted) { // FIX CONDITION *******************************
                btn.style.backgroundColor = 'teal';
            } else {
                btn.style.backgroundColor = 'rgb(' + 62 + ',' + 121 + ',' + 62 + ')';;
            } 
        }
    }
}