const dbDropdown = document.getElementById('database-dropdown');
const colDropdown = document.getElementById('collection-dropdown');
const editButtons = document.getElementsByClassName('edit-buttons');
const postButtons = document.getElementsByClassName("post-buttons");
const deleteButtons = document.getElementsByClassName("delete-buttons");
const addButton = document.getElementById("add-btn");

const baseUrl = 'http://localhost:3000/default'


//Checks when dropdown menus have been updated
// dbDropdown.addEventListener('change', function() {
//     const selectedValue = dbDropdown.value;
//     console.log('Dropdown selection changed to: ' + selectedValue);
// });

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

//Adding event listeners to every delete button
for(let btn = 0; btn < deleteButtons.length; btn++) {
    deleteButtons[btn].addEventListener('click', function(e) {
        const id = e.target.id;
        const btnID = id;
        const textID = id.split("-")[0];
        console.log(`id: ${id}\nbtnID: ${btnID}\ntextID: ${textID}`);
        deleteDoc(textID, btnID)
    })
}

//Adding event listener to the add button
addButton.addEventListener('click', function(e) {
    CreateNewDoc();
});

//Functions
function toggleEdit(id, btnID) {
    // console.log("Text ID: " + id);

    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    for(let parent = 0; parent < editParent.length - 4; parent++) {
        // console.log(editParent[parent]); 
        const editChild = editParent[parent].children;
        for(let child = 0; child < editChild.length; child++) {
            // console.log(editChild[child]);
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

async function postEdit(id, btnID) {
    // console.log(`Button '${btnID}' was pressed for textbox '${id}'`);
    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    const data = {
        assetTag : editParent[1].textContent,
        serialNumber : editParent[2].textContent,
        deviceType : editParent[3].textContent,
        assignedTo : editParent[4].textContent,
        id : editParent[5].textContent,
        // mongoDataBase : dbDropdown.value,
        // mongoCol : colDropdown.value
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(data)
    }
    const res = await fetch(baseUrl, options);
    const response = await res.json();
    console.log(response);
}

async function deleteDoc(id, btnID) {
    const editableText = document.getElementById(id);
    const editParent = editableText.children;
    const data = {
        id : editParent[5].textContent,
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }
    const res = await fetch(baseUrl + '/delete', options);
    const response = await res.json();
    console.log(response);
}

async function CreateNewDoc() {
    const _assetTag = prompt("What is the assest tag?");
    const _serialNumber = prompt("What is the serial number?"); 
    const _deviceType = prompt("What is the device type?"); 
    const _assignedTo = prompt("Who is this assigned to?"); 

    const data = {
        assetTag : _assetTag,
        serialNumber : _serialNumber,
        deviceType : _deviceType,
        assignedTo : _assignedTo
    }

    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }

    const res = await fetch(baseUrl + '/add', options)
    const response = await res.json();
    console.log(response); 
}