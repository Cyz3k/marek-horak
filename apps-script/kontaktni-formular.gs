// Backend for the contact form on marekhorak.cz.
// Deploy as a web app: Execute as "Me", Who has access "Anyone".
const RECIPIENT = 'info@marekhorak.cz';
const MAX_LENGTHS = { name: 100, email: 200, message: 5000 };

function doPost(e) {
  const params = e.parameter || {};
  // Honeypot field is invisible to people, so a filled value means a bot.
  if (params.website) return respond_(true);

  const name = String(params.name || '').replace(/[\r\n]+/g, ' ').trim();
  const email = String(params.email || '').trim();
  const message = String(params.message || '').trim();

  const isValid = name && message
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && name.length <= MAX_LENGTHS.name
    && email.length <= MAX_LENGTHS.email
    && message.length <= MAX_LENGTHS.message;
  if (!isValid) return respond_(false);

  try {
    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: email,
      subject: 'Dotaz z webu: ' + name,
      body: 'Jméno: ' + name + '\nE-mail: ' + email + '\n\n' + message
    });
    return respond_(true);
  } catch (err) {
    console.error(err);
    return respond_(false);
  }
}

function respond_(ok) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}
