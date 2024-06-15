function popupHeader(headerText) {
    const header = document.createElement('p')
    console.log(headerText)
    header.innerHTML = headerText
    header.setAttribute('class', 'text-2xl font-bold text-vibes-dark-green mb-4')
    return header
}

function popupBackground() {
    const whiteBox = document.createElement('div')
    whiteBox.setAttribute('class', 'bg-white p-8 rounded-md')
    return whiteBox
}

function cancelButton() {
    const button = document.createElement('button')
    button.innerHTML = "Cancel"
    button.setAttribute('class', 'px-4 py-2 border bg-vibes-light-green rounded-md text-white hover:bg-vibes-medium-green focus:bg-vibes-dark-green mr-2')
    button.setAttribute('onClick', "clearModal()")
    return button
}

async function updateUsername() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')

    const whiteBox = popupBackground()

    const usernameHeader = popupHeader("Update Username")

    const usernameInput = document.createElement('input')
    usernameInput.setAttribute('class', 'w-full p-2 border border-vibes-light-green rounded-md mb-4')
    usernameInput.placeholder = "New Username"

    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton()

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(usernameHeader, usernameInput, buttonBox)
    blurBox.appendChild(whiteBox)

}

function updatePassword() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')


    const whiteBox = popupBackground()

    const passwordHeader = popupHeader("Update Password")

    const passwordInput = document.createElement('input')
    passwordInput.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")
    passwordInput.type = "password"
    passwordInput.placeholder = "New password"

    const passwordInputConfirm = document.createElement('input')
    passwordInputConfirm.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")
    passwordInputConfirm.type = "password"
    passwordInputConfirm.placeholder = "Confirm new password"

    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton()

    updateButton1.addEventListener('click', async () => {
        const newPassword = passwordInput.value;
        const confirmPassword = passwordInputConfirm.value;
     
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const data = await sendPasswordUpdate(newPassword);
            alert(data.success);
            blurBox.remove();
        } catch (error) {
            alert(error.message);
        }
    });

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(passwordHeader, passwordInput, passwordInputConfirm, buttonBox)
    blurBox.append(whiteBox)
}

function userLocation() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')


    const whiteBox = popupBackground()

    const locationHeader = popupHeader("Where are you from?")

    const locationInput = document.createElement('input')
    locationInput.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")
    locationInput.placeholder = "City, State"


    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton()

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(locationHeader, locationInput, buttonBox)
    blurBox.append(whiteBox)
}

function userBirthday() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')


    const whiteBox = popupBackground()

    const birthdayHeader = popupHeader("When is your birthday?")

    const birthdayInput = document.createElement('input')
    birthdayInput.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")
    birthdayInput.placeholder = "MM-DD-YY"


    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton()

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(birthdayHeader, birthdayInput, buttonBox)
    blurBox.append(whiteBox)
}

function userBio() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')


    const whiteBox = popupBackground()

    const BioHeader = popupHeader("Tell us about yourself.")

    const BioInput = document.createElement('input')
    BioInput.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")



    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton()

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(BioHeader, BioInput, buttonBox)
    blurBox.append(whiteBox)
}

function popupBackground() {
    const whiteBox = document.createElement('div')
    whiteBox.setAttribute('class', 'bg-white p-8 rounded-md')
    return whiteBox
}

function cancelButton() {
    const button = document.createElement('button')
    button.innerHTML = "Cancel"
    button.setAttribute('class', 'px-4 py-2 border bg-vibes-light-green rounded-md text-white hover:bg-vibes-medium-green focus:bg-vibes-dark-green mr-2')
    button.setAttribute('onClick', "clearModal()")
    return button
}

function clearModal() {
    const blurBox = document.getElementById('blurBox')
    blurBox.remove()
}

function updateButton() {
    const button = document.createElement('button')
    button.innerHTML = "Update"
    button.setAttribute('class', 'px-4 py-2 border bg-vibes-light-green rounded-md text-white hover:bg-vibes-medium-green focus:bg-vibes-dark-green')
    button.addEventListener('click', async () => {
        updatePassword(); 
    });
    return button
}

async function sendPasswordUpdate(newPassword) {
    try {
        const response = await fetch('/api/users/updatePassword', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // Assuming you're using sessions, you might want to include credentials here
            credentials: 'include', 
            body: JSON.stringify({ newPassword })
        });

        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
            throw new Error("Failed to update password");
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating the password.");
    }
}
