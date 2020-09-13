
const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

// Disable/Enable button
function ToggleButton() {
    button.disabled = !button.disabled;
}
// passing joke to voiceRss
function tellMe(joke) {
    VoiceRSS.speech({
        key: '25c15d4b7cdf4a04becfd6df35f3500d',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
// Get joke API
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart';
    let joke =''
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup}...${data.delivery}`
        }else {
            joke = data.joke
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        ToggleButton();
    } catch(error) {
        console.log('whooops', error)
    }
}
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',ToggleButton);
