# 🐸 FrogFocus - Study with Your Frog Companion

A full-stack web app that helps students maintain consistent study habits with an adorable animated frog companion. Track your study sessions, earn rewards, and watch your progress with beautiful visualizations.

## ✨ Features

- **📱 Focus Timer**: 25/45/60-minute presets with start/pause/reset controls
- **🐸 Animated Frog Companion**: Changes animations based on your study state
- **📊 Study Tracking**: Automatically tracks study sessions and displays weekly insights
- **🎁 Reward System**: Earn rewards for completed sessions with streak bonuses
- **💾 Data Persistence**: All data synced to Supabase across devices
- **🎨 Beautiful UI**: Calm, nature-inspired design with Tailwind CSS
- **📞 Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **🔐 Secure Auth**: Anonymous or email-based authentication

## 🛠 Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS
- React Router DOM
- Recharts for analytics
- Lottie for animations
- Lucide React for icons

**Backend:**
- Supabase (PostgreSQL, Auth, Storage)
- Row Level Security (RLS)
- Real-time database

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- A Supabase account (free at https://supabase.com)

### Installation

1. **Clone and navigate to the project**
```bash
cd FrogFocus
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Go to https://supabase.com and create a new project
   - Copy your project URL and anonymous key
   - Create a `.env.local` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Create Supabase tables** (see Database Schema below)

5. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 💾 Database Schema

Run these SQL commands in your Supabase dashboard:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  total_minutes INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_study_date DATE
);

-- Study sessions table
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  study_date DATE NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rewards table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for study_sessions
CREATE POLICY "Users can view their own sessions" ON study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create sessions" ON study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for rewards
CREATE POLICY "Users can view their own rewards" ON rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create rewards" ON rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 📂 Project Structure

```
FrogFocus/
├── src/
│   ├── components/
│   │   ├── Timer.jsx           # Focus timer with presets
│   │   ├── Frog.jsx            # Animated frog companion
│   │   ├── RewardModal.jsx      # Reward popup display
│   │   ├── WeeklyChart.jsx      # Weekly study analytics
│   │   └── Navigation.jsx       # Bottom navigation
│   ├── pages/
│   │   ├── Home.jsx            # Main timer page
│   │   ├── Progress.jsx        # Study statistics
│   │   ├── Rewards.jsx         # Reward collection
│   │   └── Settings.jsx        # User settings & auth
│   ├── context/
│   │   ├── TimerContext.jsx    # Timer state management
│   │   └── UserContext.jsx     # User & data management
│   ├── lib/
│   │   └── supabase.js         # Supabase client config
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## 🎨 Design System

### Colors
- **Primary Green**: `#4CAF50` - Main accent color
- **Soft Green**: `#A5D6A7` - Secondary/hover states
- **Background**: `#F1F8E9` - Light, calm background
- **Brown Accent**: `#6D4C41` - Text and details
- **Reward Gold**: `#FFD54F` - Achievements and rewards

### Typography
- Font: Poppins (Google Fonts)
- Rounded corners for a friendly feel
- Soft shadows for depth

## 🐸 Frog Companion States

The frog changes animations based on what you're doing:

| State | Animation | Emoji |
|-------|-----------|-------|
| Idle | Breathing | 🐸 |
| Studying | Reading with book | 📚 |
| Break | Drinking coffee | ☕ |
| Complete | Celebrating with jump | 🎉 |

## 🎁 Reward System

### How to Earn Rewards
- **1 reward** per completed study session (≥5 minutes)
- **Bonus rewards** for streaks:
  - 3-day streak unlocks special reward
  - 7-day streak unlocks special reward

### Reward Types
- 📖 **Books** - New reading materials for your frog
- ☕ **Coffee Styles** - Different beverages for breaks
- 🌲 **Backgrounds** - Nature environment themes

## 📊 Study Tracking

The app automatically tracks:
- Study session duration
- Study date
- Weekly totals by day
- Best study day of the week
- Current streak count

## 🔐 Authentication

### Anonymous (Default)
- No account needed
- Data stored locally in browser
- Sign in anytime to sync to account

### Email Authentication
- Create account with email + password
- Sync data across devices
- Secure with Supabase Auth

## 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **Touch Friendly**: Large buttons and tap targets
- **Mobile Features**: Vibration feedback available

## 🚀 Building for Production

```bash
npm run build
npm run preview
```

## 📝 License

MIT License - Feel free to use this project for learning and personal use!

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

## 💡 Future Enhancements

- Offline mode with local storage
- Leaderboards
- AI study tips
- Cloud sync across devices
- Dark mode
- Custom timer presets
- Study groups

## 📧 Support

For issues or questions, please create an issue in the repository.

---

Built with 💚 for students who want to focus and succeed.
