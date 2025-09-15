# Digital Business Card Website

A modern, conference-ready digital business card website built with Next.js and Tailwind CSS. Features selfie exchange, contact sharing, and seamless networking capabilities.

## ✨ Features

- **Digital Business Card**: Clean, professional profile with instant contact saving
- **vCard Download**: One-click contact saving compatible with all devices
- **Selfie Exchange**: Take photos together and exchange contact details
- **Conference Mode**: Toggle banner for conference networking
- **Quick Connect**: Direct links to SMS, WhatsApp, email, and social platforms
- **Analytics Tracking**: Monitor interactions and engagement
- **Mobile-First**: Optimized for all devices
- **CRM Integration Ready**: Built for Notion, Attio, and other tools

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd personal-site
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your information
   ```

3. **Add Assets**
   - Add `avatar.png` to `/public` (your profile photo)
   - Add `qrcode.png` to `/public` (QR code to your site)

4. **Customize Content**
   - Update contact information in components
   - Modify the resources in `ResourceGrid.tsx`
   - Customize social links in `Footer.tsx`

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📝 Configuration

### Environment Variables

```bash
# Conference Mode
NEXT_PUBLIC_CONFERENCE_MODE=false          # Enable conference banner
NEXT_PUBLIC_CONFERENCE_NAME="TechConf 2024"
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/yourname"

# Contact Information
NEXT_PUBLIC_CONTACT_NAME="Your Name"
NEXT_PUBLIC_CONTACT_EMAIL="your.email@example.com"
NEXT_PUBLIC_CONTACT_PHONE="+1 (555) 123-4567"
NEXT_PUBLIC_CONTACT_COMPANY="Your Company"
NEXT_PUBLIC_CONTACT_TITLE="Digital Strategist"
NEXT_PUBLIC_CONTACT_WEBSITE="https://yourwebsite.com"
```

### Customization Points

1. **Personal Information** (`src/components/Hero.tsx`)
   - Name, tagline, and description
   - Profile picture

2. **Resources** (`src/components/ResourceGrid.tsx`)
   - Add your templates, guides, and services
   - Update links and descriptions

3. **Social Links** (`src/components/Footer.tsx`)
   - Update social media profiles
   - Add or remove platforms

4. **Contact Details** (`src/components/ContactButtons.tsx`)
   - Phone numbers, email, social handles
   - WhatsApp, LinkedIn, and other quick connect links

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Integrations

The API routes are set up for easy integration with:

### CRM Systems
- **Attio**: Customer relationship management
- **Notion**: Database for contact tracking

### Email Services
- **Resend**: Automated follow-up emails
- **SendGrid**: Email delivery

### Storage Services
- **Supabase**: File storage for selfies
- **AWS S3**: Cloud storage

### Analytics
- **Google Analytics**: Website tracking
- **Custom Analytics**: Built-in tracking API

## 📱 Mobile Features

- **Camera Access**: Take selfies directly in browser
- **Native Sharing**: Uses Web Share API with clipboard fallback
- **Touch Optimized**: Large buttons and touch targets
- **PWA Ready**: Can be installed as app

## 🎨 Design System

- **Colors**: Black/white with blue accent
- **Typography**: Inter font family
- **Spacing**: Generous padding and margins
- **Components**: Reusable, consistent design

## 🔐 Privacy & Security

- No tracking without consent
- Selfie data handled securely
- Environment variables for sensitive data
- HTTPS required for camera access

## 📊 Analytics Events

The app tracks these events:
- `save_contact`: vCard downloads
- `share_card`: Card sharing actions
- `form_submission`: Contact form completions
- `conference_connect`: Conference banner interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

For questions or issues:
- Check the documentation
- Review environment variables
- Ensure camera permissions are granted
- Verify assets are properly sized

---

Built with ❤️ for seamless networking and professional connections.# personal-site
