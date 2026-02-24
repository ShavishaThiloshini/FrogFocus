# 🐸 FrogFocus - Quick Reference Card

## 🚀 Start Here

```bash
cd FrogFocus
npm install              # Install dependencies (1st time only)
npm run dev             # Start development server
# Open http://localhost:5173 in your browser
```

## ⚙️ Initial Setup (First Time)

1. **Get Supabase Credentials**
   - Go to https://supabase.com and create a free project
   - Copy Project URL and Anon Key

2. **Add to .env.local**
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```

3. **Run Database Setup**
   - Go to Supabase Dashboard → SQL Editor
   - Copy all SQL from [SETUP_GUIDE.md](SETUP_GUIDE.md)
   - Run each query

4. **Enable Anonymous Auth**
   - Supabase → Authentication → Providers
   - Enable "Anonymous Login"

5. **Done!** 🎉
   - The app is ready to use

## 📱 App Features

| Page | What It Does |
|------|-------------|
| **Home** | Set focus timer, watch frog, earn rewards |
| **Progress** | View stats, weekly chart, session history |
| **Rewards** | Collect reward items, track achievements |
| **Settings** | Sign up/in email, toggle preferences |

## ⏱️ How to Use

1. **Start a Session**
   - Click 25/45/60 min button
   - Click Play button
   - Watch the countdown

2. **Complete Session**
   - When timer reaches 0, you earn a reward
   - Reward automatically added to your collection
   - Start another session when ready

3. **Check Progress**
   - Click Progress page
   - See your weekly stats
   - View previous sessions

4. **Sync Data (Optional)**
   - Click Settings
   - Sign up with email
   - Your data syncs across devices

## 🎨 Design Colors

```
🟢 Primary Green (#4CAF50)    ← Main buttons
🟢 Soft Green (#A5D6A7)       ← Hover effects
🟫 Brown Accent (#6D4C41)     ← Text
⭐ Gold (#FFD54F)             ← Rewards
⚪ Light Background (#F1F8E9) ← Page bg
```

## 📁 File Organization

```
src/
├── components/      # 5 reusable UI components
├── pages/          # 4 full pages
├── context/        # 2 state providers
├── lib/            # Supabase config
└── App.jsx         # Main app file
```

## 🔧 Common Tasks

### Modify Timer Presets
**File**: `src/components/Timer.jsx` → Line 8-12
```jsx
const presets = [
  { label: '25 min', minutes: 25 },  // Change these values
  { label: '45 min', minutes: 45 },
  { label: '60 min', minutes: 60 },
]
```

### Change Colors
**File**: `tailwind.config.js` → Line 12-17
```js
colors: {
  'primary-green': '#NEW_COLOR',    // Change hex codes
  'soft-green': '#NEW_COLOR',
  // ... etc
}
```

### Add New Reward Type
**File**: `src/pages/Home.jsx` → Line 20
```jsx
const rewardTypes = ['book', 'coffee', 'background', 'NEW']
```

Then add config in `src/components/RewardModal.jsx` → Line 7

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "VITE_SUPABASE_URL is missing" | Add `.env.local` file with credentials |
| "Cannot connect to Supabase" | Check URL/key in `.env.local` |
| "RLS policy denied" error | Run all SQL setup queries from SETUP_GUIDE.md |
| Port 5173 in use | Run `npm run dev -- --port 3000` |
| Build errors | Run `npm install` again |

## 📚 Documentation

- **README.md** - Feature overview
- **SETUP_GUIDE.md** - Complete setup (30+ minutes setup)
- **DEVELOPER_GUIDE.md** - Code architecture
- **PROJECT_COMPLETION.md** - What was built

## 🚢 Deploy to Production

### 1. Build for Production
```bash
npm run build
```

### 2. Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### 3. Set Environment Variables
In Vercel Dashboard:
- Add `VITE_SUPABASE_URL`
- Add `VITE_SUPABASE_ANON_KEY`

### 4. Done!
Your app is live on the internet! 🌍

## 💡 Key Points

✓ App works immediately with anonymous login  
✓ No account creation required  
✓ Can sign up anytime in Settings  
✓ All data persists to Supabase  
✓ RLS ensures users can only see their own data  
✓ Building from production is simple

## 🎯 What's Included

- ✅ 5 React components
- ✅ 4 full pages with routing
- ✅ State management with Context API
- ✅ Supabase integration
- ✅ Tailwind CSS styling
- ✅ Recharts analytics
- ✅ Real-time timer countdown
- ✅ Reward system with animations
- ✅ Weekly progress analytics
- ✅ Mobile-responsive design
- ✅ Complete documentation
- ✅ Production-ready code

## 🎓 Learning Resources

- **React**: https://react.dev
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Recharts**: https://recharts.org

## 📞 Help

1. Check the relevant documentation file
2. Try npm install again if something breaks
3. Check browser console (F12) for errors
4. Review Supabase dashboard for database issues

---

**That's it! You're all set to start coding! 🐸💚**

*For detailed setup, see SETUP_GUIDE.md*
