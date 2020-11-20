console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.errorMessage) {
//             return console.log(data.errorMessage)
//         }
//         console.log(data.location, data.forecast, data.address)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.errorMessage) {
                console.log(data.errorMessage)
                messageOne.textContent = data.errorMessage
            } else {
                console.log('Location: ' + data.location)
                console.log('Forecast: ' + data.forecast) 
                console.log('Address: ' + data.address)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    console.log(location)
})