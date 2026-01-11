# EmailJS Template Configuration

## Template Setup Instructions

1. Go to https://www.emailjs.com/ → **Email Templates**
2. Click **"Create New Template"** or edit existing template
3. Use the template below

---

## EmailJS Template Configuration

### Template Settings:
- **Template Name:** Portfolio Contact Form
- **To Email:** `abuzar.sial24@gmail.com` ⚠️ **CRITICAL: Set this here**
- **From Name:** Portfolio Contact Form
- **Reply To:** `{{email}}` (so you can reply directly to the visitor)

### Subject Line:
```
New Contact Form Message from {{name}}
```

### Email Body (Copy and paste this exactly):
```
Hello,

You have received a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{name}}

Email: {{email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email Source Information:
Website: {{website_url}}
Submitted: {{timestamp}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio website.
You can reply directly to this email to respond to {{name}} at {{email}}.
```

---

## Important Notes

### Variable Mapping:
The React form uses these `name` attributes:
- `name="name"` → Maps to `{{name}}` in EmailJS template
- `name="email"` → Maps to `{{email}}` in EmailJS template
- `name="message"` → Maps to `{{message}}` in EmailJS template
- `website_url` → Maps to `{{website_url}}` (automatically added - shows website URL)
- `timestamp` → Maps to `{{timestamp}}` (automatically added - shows submission time)

### Security:
- ✅ Your email (`abuzar.sial24@gmail.com`) is **NOT visible** to visitors
- ✅ It's configured in EmailJS template settings (server-side)
- ✅ Visitors cannot see or access your email address

### After Creating Template:
1. **Save** the template
2. **Copy the Template ID** (e.g., `template_xxxxxxx`)
3. **Get your Public Key** from Account → General → API Keys
4. Update `Contact.jsx` with these values

---

## Alternative Template (HTML Format with Source Info)

If you prefer HTML formatting, use this:

**Subject:** `New Contact Form Message from {{name}}`

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #00d4ff; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #7b2cbf; margin: 15px 0; }
    .source-info { background: #e8f4f8; padding: 12px; border-radius: 6px; margin: 15px 0; font-size: 13px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> {{name}}
      </div>
      <div class="field">
        <span class="label">Email:</span> {{email}}
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <div>{{message}}</div>
      </div>
      <div class="source-info">
        <strong>Email Source:</strong><br>
        Website: {{website_url}}<br>
        Submitted: {{timestamp}}
      </div>
      <div class="footer">
        This message was sent from your portfolio website.<br>
        Reply to this email to respond to {{name}} at {{email}}.
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Testing

After setting up:
1. Fill out the contact form on your website
2. Submit the form
3. Check your email at `abuzar.sial24@gmail.com`
4. Verify that:
   - Name is displayed correctly
   - Email is displayed correctly
   - Message is displayed correctly
   - Website URL is shown (where email came from)
   - Timestamp is shown (when it was submitted)
   - You can reply directly to the visitor's email
