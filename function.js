

function toggleKeyVisibility() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function getUInviteID() {
    const buffer = new Uint16Array(2);
    window.crypto.getRandomValues(buffer);
    let uuid = "";
    for (let i = 0; i < buffer.length; i++) {
        if (i === 1 || i === 2) {
            uuid += "-";
        }
        let hex = buffer[i].toString(16).padStart(4, "0");
        uuid += hex;
    }
    return uuid
}

function getUUserID() {
    const buffer = new Uint16Array(3);
    window.crypto.getRandomValues(buffer);
    let uuid = "";
    for (let i = 0; i < buffer.length; i++) {
        if (i === 1 || i === 2 || i === 3) {
            uuid += "-";
        }
        let hex = buffer[i].toString(16).padStart(4, "0");
        uuid += hex;
    }
    return uuid
}

function getURoomID() {
    const buffer = new Uint16Array(2);
    window.crypto.getRandomValues(buffer);
    let uuid = "";
    for (let i = 0; i < buffer.length; i++) {
        if (i === 1 || i === 2) {
            uuid += "-";
        }
        let hex = buffer[i].toString(16).padStart(4, "0");
        uuid += hex;
    }
    return uuid
}

console.log("UUID: " + getUUserID());

console.log("UIID: " + getUInviteID());

console.log("URID: " + getURoomID());

function saveToUuidDb() {
    // Get the UUID from the getUUserID() function
    const uuid = getUUserID();

    // Get the name input value
    const name = document.querySelector('input[name="name"]').value;

    // Create the formatted string
    const blob = `${uuid} & ${name}`;
    console.log(blob);
    return blob;
}





// Get references to the input box and proceed buttons
const nameInput = document.getElementById('nameInputBox');


// Function to check if the input is valid
function validateInput() {
    const inputValue = nameInput.value;



    // Check if the input is empty, longer than 16 or contains spaces
    if ((inputValue.indexOf(' ') >= 0) || inputValue.length > 16 || inputValue.length < 5) {
        // Disable the proceed buttons
        console.log("err");
    } else {
        // Enable the proceed buttons
        window.location.href = "chats.html";
    }
}

function checkKeysMatch() {
    fetch('uuidDb.txt')
        .then(response => response.text())
        .then(uuidData => {
            fetch('uiidDb.txt')
                .then(response => response.text())
                .then(uiidData => {
                    fetch('uridDb.txt')
                        .then(response => response.text())
                        .then(uridData => {
                            const userInput = document.getElementById('myInput').value.toLowerCase();

                            if (uuidData.toLowerCase().includes(userInput)) {
                                console.log('Match found in uuidDb.txt!');
                            } else if (uiidData.toLowerCase().includes(userInput)) {
                                console.log('Match found in uiidDb.txt!');
                            } else if (uridData.toLowerCase().includes(userInput)) {
                                console.log('Match found in uridDb.txt!');
                            } else {
                                console.log('No match found.');
                            }
                        })
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}
