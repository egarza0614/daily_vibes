

function updateUsername() {
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
    locationInput.setAttribute('id', "userLocationInput")


    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()

    const updateButton1 = updateButton("location")

    const alertDiv = document.createElement('div')
    alertDiv.setAttribute("id", "alertDiv")

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(locationHeader, locationInput, alertDiv, buttonBox)
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
    birthdayInput.setAttribute('id', "userBirthdayInput")
    birthdayInput.placeholder = "MM-DD-YY"


    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()
    const updateButton1 = updateButton("birthday")

    const alertDiv = document.createElement('div')
    alertDiv.setAttribute("id", "alertDiv")

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(birthdayHeader, birthdayInput, alertDiv, buttonBox)
    blurBox.append(whiteBox)
}

function userBio() {
    const mainBody = document.getElementById('mainBody')
    const blurBox = document.createElement('div')
    blurBox.setAttribute('class', 'absolute fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50')
    blurBox.setAttribute('id', 'blurBox')

    const whiteBox = popupBackground()

    const bioHeader = popupHeader("Tell us about yourself.")

    const bioInput = document.createElement('input')
    bioInput.setAttribute('id', "userBioInput")
    bioInput.setAttribute('class', "w-full p-2 border border-vibes-light-green rounded-md mb-4")


    const buttonBox = document.createElement('div')
    buttonBox.setAttribute('class', 'flex justify-end')

    const cancelButton1 = cancelButton()

    const updateButton1 = updateButton("bio")

    const alertDiv = document.createElement('div')
    alertDiv.setAttribute("id", "alertDiv")

    mainBody.appendChild(blurBox)
    buttonBox.append(cancelButton1, updateButton1)
    whiteBox.append(bioHeader, bioInput, alertDiv, buttonBox)
    blurBox.append(whiteBox)
}

function popupBackground() {
    const whiteBox = document.createElement('div')
    whiteBox.setAttribute('class', 'bg-white p-8 rounded-md')
    whiteBox.setAttribute('id', "whiteBox")
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

function updateButton(type) {
    const button = document.createElement('button')
    button.innerHTML = "Update"
    button.setAttribute(`onclick`, `updateUser("${type}")`)
    button.setAttribute('class', 'px-4 py-2 border bg-vibes-light-green rounded-md text-white hover:bg-vibes-medium-green focus:bg-vibes-dark-green')
    return button
}

function popupHeader(headerText) {
    const header = document.createElement('p')
    console.log(headerText)
    header.innerHTML = headerText
    header.setAttribute('class', 'text-2xl font-bold text-vibes-dark-green mb-4')
    return header
}


async function updateUser(type) {
    let formData
    if (type === "bio") {
        formData = {
            bio: document.getElementById("userBioInput").value
        }
    }
    if (type === "location") {
        formData = {
            location: document.getElementById("userLocationInput").value
        }
        console.log(formData.location)
    }
    if (type === "birthday") {
        formData = {
            birthday: document.getElementById("userBirthdayInput").value
        }
    }
    const response = await fetch('/api/users/', {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        const alertDiv = document.getElementById('alertDiv')
        const error = document.createElement('p')
        error.innerHTML = "Something went wrong!"
        error.setAttribute('class', 'text-center text-vibes-alert-red font-bold pb-2')
        alertDiv.appendChild(error)
        return
    }
    clearModal()
}