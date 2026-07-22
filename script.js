const messages = [];
const usernames = {};
let currentUsername = '';

document.addEventListener('DOMContentLoaded', () => {

    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', theme === 'dark');


    const smileyButtons = document.querySelectorAll('.smile');
    smileyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const smileyText = e.target.textContent;
            const messageInput = document.getElementById('message-input');
            messageInput.value += smileyText;
        });
    });


    const themeToggleButton = document.querySelector('#theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.body.classList.toggle('dark-mode', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        });
    }


    const form = document.getElementById('message-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentUsername = document.getElementById('username-input').value.trim() || 'Гость';
        usernames[currentUsername] = true;

        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value.trim();

        if (messageText) {

            messages.push({
                text: messageText,
                username: currentUsername,
                timestamp: new Date()
            });
            

            displayMessage(messageText, currentUsername);
            
  
            messageInput.value = '';
        }
    });
});


function displayMessage(text, username) {
    const messagesContainer = document.getElementById('messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message`;
    
    
    if (username === currentUsername) {
        messageDiv.classList.add('user');
    } else {
        messageDiv.classList.add('other');
    }
    
    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = `@${username}: `;
    
    const messageTextSpan = document.createElement('span');
    messageTextSpan.textContent = text;
    
    messageDiv.appendChild(usernameSpan);
    messageDiv.appendChild(messageTextSpan);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


const smileyHTML = "<div class='smiley-container'>" +
    "  <span class='smile' title='Смех'>😀</span> " +
    "  <span class='smile' title='Улыбка'>😊</span> " +
    "  <span class='smile' title='Радость'>😍</span> " +
    "  <span class='smile' title='Сердитость'>😠</span>" + 
    "</div>";

const form = document.getElementById('message-form');
form.insertAdjacentHTML('beforeend', smileyHTML);