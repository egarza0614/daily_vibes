
async function displayDate() {
    const postedDates = document.getElementsByClassName('displayDateBox')
    for (let i = 0; i < postedDates.length; i++) {
        const postDateEl = postedDates[i]
        const postDate = postedDates[i].innerHTML
        const date = new Date(postDate)
        postDateEl.innerHTML = date.toLocaleString()
        console.log(postedDates.innerHTML)
    }
    return
}

displayDate()
