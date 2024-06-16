async function getUsersProfile() {

    const response = await fetch(`/api/users/${username}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
}


  

