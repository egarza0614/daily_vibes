async function showFeed() {
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
showFeed()

async function createPost() {
    const data = {
        title: document.getElementById('userTitle').value,
        content: document.getElementById('userInput').value
    }

    console.log('testing')
    const response = await fetch('/api/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    const returnedResponse = await response.json()
    console.log(returnedResponse)
    return returnedResponse
}