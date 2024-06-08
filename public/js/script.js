const homeBtn = document.getElementById('submit');

  async function handleSubmit(event) {
    event.preventDefault(); 

    const formData = {
        Name: document.getElementById('name').value,
        Passowrd: document.getElementById('pass').value,
        
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        window.location.href = '../../views/layouts/social.handlebars';
 
    } catch (err) {
        console.error(err);
    }
}

