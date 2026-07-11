async function sendEmail({ to, subject, text, html }) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
            sender: {
                name: 'My App',
                email: process.env.EMAIL_USER
            },
            to: [{ email: to }],
            subject,
            textContent: text,
            htmlContent: html
        })
    });

    const responseBody = await response.text();

    if (!response.ok) {
        throw new Error(`Brevo email failed with status ${response.status}: ${responseBody}`);
    }

    return responseBody ? JSON.parse(responseBody) : {};
}

module.exports = { sendEmail };
