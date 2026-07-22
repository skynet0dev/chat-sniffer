#!/usr/bin/env node
// Скрипт для обработки сообщений в чате

const messages = [];
const usernames = {};
let currentUsername = '';

// Переключение тем и адаптивность
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем текущую тему из localStorage
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', theme === 'dark');

    // Инициализация смайликов
    const smileyButtons = document.querySelectorAll('.smile');
    smileyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const smileyText = e.target.textContent;
            const messageInput = document.getElementById('message-input');
            messageInput.value += smileyText;
        });
    });

    // Кнопка для переключения тем
    const themeToggleButton = document.querySelector('#theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.body.classList.toggle('dark-mode', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        });
    }

    // Форма для отправки сообщений
    const form = document.getElementById('message-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentUsername = document.getElementById('username-input').value.trim() || 'Гость';
        usernames[currentUsername] = true;

        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value.trim();

        if (messageText) {
            // Добавляем сообщение в список
            messages.push({
                text: messageText,
                username: currentUsername,
                timestamp: new Date()
            });
            
            // Отображаем сообщение на странице
            displayMessage(messageText, currentUsername);
            
            // Очищаем поле ввода
            messageInput.value = '';
        }
    });
});

// Функция для отображения сообщений
function displayMessage(text, username) {
    const messagesContainer = document.getElementById('messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message`;
    
    // Определяем класс в зависимости от того, кто отправил сообщение
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
    
    // Скорректируем высоту контейнера для прокрутки
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Добавим смайлики в HTML
const smileyHTML = "<div class='smiley-container'>" +
    "  <span class='smile' title='Смех'>😀</span> " +
    "  <span class='smile' title='Улыбка'>😊</span> " +
    "  <span class='smile' title='Радость'>😍</span> " +
    "  <span class='smile' title='Сердитость'>😠</span>" +
    "</div>";

// Вставляем смайлики в форму
const form = document.getElementById('message-form');
form.insertAdjacentHTML('beforeend', smileyHTML);
