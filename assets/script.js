/* SMOOTH SCROLL */
document.querySelectorAll(".scroll-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(btn.getAttribute("href"));
        window.scrollTo({
            top: target.offsetTop - 60,
            behavior: "smooth"
        });
    });
});

/* NAVBAR INDICATOR */
const indicator = document.querySelector(".nav-indicator");
const navLinks = document.querySelectorAll("nav a");

function updateIndicator(el) {
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
}

navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => updateIndicator(link));
});

/* SCROLL REVEAL */
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* DISCORD WEBHOOK */
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const discord = document.getElementById("discord").value;
    const message = document.getElementById("message").value;

    const webhookURL = "https://discord.com/api/webhooks/1459959229518581904/v10vwHAfCML7l6mrtiwopbaoYxe73JUPIGQKb8OHAIZPNoWKDjekC5TkTENDYW7L2asX";

    const payload = {
        content: `📩 **New Contact Form Submission**\n\n**Name:** ${name}\n**Discord:** ${discord}\n**Message:**\n${message}`
    };

    const status = document.getElementById("status");

    try {
        const res = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            status.textContent = "Message sent successfully! We will recontact you as soon as possible.";
            status.style.color = "lightgreen";
            document.getElementById("contactForm").reset();
        } else {
            status.textContent = "Failed to send message.";
            status.style.color = "red";
        }
    } catch (err) {
        status.textContent = "Error sending message.";
        status.style.color = "red";
    }
});
