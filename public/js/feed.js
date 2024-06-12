async function testing() {
    console.log('i work')
    const response = await fetch('/api/posts', {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    const returnedResponse = await response.json();
    console.log(returnedResponse)

}

testing()