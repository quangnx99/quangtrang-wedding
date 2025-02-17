
const apiUrl = 'https://wedding-api-leu-leu.quangit.tech/api/wishes';

async function loadWishes() {
    const response = await fetch(apiUrl);
    const wishes = await response.json();

    const messages = wishes.map(wish => `<b>${wish.name}</b> gửi lời chúc: ${wish.message}`);
    createMarquee(messages);
}

document.getElementById('wishForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value
    const phone = document.getElementById('phone')?.value
    const message = document.getElementById('message')?.value
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value
    const wish = {
        name,
        phoneNumber: phone,
        message,
        attendance: attendance === "1"
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wish)
    });

    e.target.reset();
    loadWishes();

    Swal.fire({
        title: 'Cảm ơn lời chúc phúc của bạn nha!',
        icon: 'success',
        timer: 3000
    });
};

loadWishes();

function createMarquee(messages) {
    const marqueeContent = document.getElementById('marqueeContent');
    const messagesHtml = messages.map(msg =>
        `<span class="message">★ ${msg}</span>`
    ).join('');
    const totalMessages = messages.length;
    const animationDuration = totalMessages * 30;
    marqueeContent.style.animation = `marquee ${animationDuration}s linear infinite`;
    marqueeContent.innerHTML = messagesHtml + messagesHtml;
}