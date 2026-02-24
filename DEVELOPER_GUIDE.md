# 🔧 FrogFocus Developer Guide

## Architecture Overview

FrogFocus uses a **Context API** state management pattern with **Supabase** for the backend.

```
User Interface (React Components)
     ↓
React Router (Page Navigation)
     ↓
Context Providers (TimerContext, UserContext)
     ↓
Supabase Client (Backend & Database)
```

---

## State Management

### TimerContext
Manages the focus timer state and logic.

**State:**
- `timeLeft` - Seconds remaining in current session
- `totalDuration` - Original session duration
- `isRunning` - Boolean for timer active state
- `isBreak` - Boolean for break vs focus time

**Methods:**
- `startTimer()` - Start the timer
- `pauseTimer()` - Pause the timer
- `resetTimer(duration)` - Reset to a duration
- `setDuration(minutes)` - Set timer to X minutes
- `completeSession(userId)` - Save session to database

**Usage:**
```jsx
import { useTimer } from '../context/TimerContext'

function MyComponent() {
  const { timeLeft, isRunning, startTimer } = useTimer()
  // Use the timer context
}
```

### UserContext
Manages user authentication and study data.

**State:**
- `user` - Current user object (from Supabase Auth)
- `userStats` - User totals (minutes, streak)
- `sessions` - Array of study sessions
- `rewards` - Array of earned rewards
- `loading` - Loading state

**Methods:**
- `signUpWithEmail(email, password)` - Create account
- `signInWithEmail(email, password)` - Sign in
- `signOut()` - Sign out
- `refreshUserData()` - Reload user data from Supabase

**Usage:**
```jsx
import { useUser } from '../context/UserContext'

function MyComponent() {
  const { user, userStats, sessions } = useUser()
  // Use the user context
}
```

---

## Component Structure

### Timer.jsx
The focus timer component with presets and controls.

**Props:**
- `onSessionComplete` - Callback when session finishes

**Features:**
- 25/45/60 minute presets
- Start/Pause/Reset buttons
- Real-time countdown
- Persistent timing

**Key Functions:**
- `formatTime(seconds)` - Convert seconds to MM:SS format
- `handlePresetClick(minutes)` - Set timer duration

### Frog.jsx
Animated frog companion that changes based on study state.

**States:**
- `idle` - Calm breathing (not studying)
- `studying` - Reading with book 📚
- `resting` - Drinking coffee ☕
- `celebrate` - Jumping with sparkles 🎉

**Animations:**
- Breathing keyframe (3s cycle)
- Reading keyframe (2s cycle)
- Resting keyframe (2.5s cycle)
- Celebrate keyframe (0.6s cycle)

### RewardModal.jsx
Modal popup for displaying earned rewards and reward collection.

**Props:**
- `isOpen` - Boolean to show/hide modal
- `onClose` - Callback when modal closes
- `rewards` - Array of user's rewards
- `newReward` - Object with newly earned reward

**Features:**
- Confetti animation on new reward
- Reward type icons and descriptions
- Collection view of all rewards

### WeeklyChart.jsx
Recharts bar chart showing weekly study progress.

**Props:**
- `sessions` - Array of study sessions

**Features:**
- Shows Mon-Sun study minutes
- Highlights best study day
- Calculates weekly total
- Responsive design

---

## Pages

### Home.jsx
Main page with timer and frog companion.

**Features:**
- Timer component
- Frog animation
- User stats (total minutes, streak)
- Session reward triggering
- Motivational messages

### Progress.jsx
Analytics and study tracking page.

**Features:**
- Total minutes and sessions
- Average session duration
- Current streak
- Weekly chart
- Recent sessions list (last 10)

### Rewards.jsx
Reward collection and achievements page.

**Features:**
- Groups rewards by type (books, coffee, backgrounds)
- Achievement tracking
- Unlock progress indicators
- Reward counts

### Settings.jsx
User authentication and preferences page.

**Features:**
- Anonymous/Email authentication
- Account management
- User preferences (sound, notifications, vibration)
- App information

---

## Database Operations

### Saving a Study Session

```javascript
// In TimerContext.completeSession()
const { error } = await supabase
  .from('study_sessions')
  .insert([{
    user_id: userId,
    duration: duration,
    study_date: new Date().toISOString().split('T')[0],
  }])
```

### Loading User Sessions

```javascript
// In UserContext.loadUserData()
const { data: sessionsData } = await supabase
  .from('study_sessions')
  .select('*')
  .eq('user_id', userId)
  .order('study_date', { ascending: false })
```

### Awarding a Reward

```javascript
// In Home.jsx handleSessionComplete()
const { error } = await supabase
  .from('rewards')
  .insert([{
    user_id: user.id,
    type: randomType, // 'book', 'coffee', or 'background'
    name: `Reward ${rewards.length + 1}`,
    unlocked_at: new Date().toISOString(),
  }])
```

---

## Routing

React Router configuration in App.jsx:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/progress" element={<Progress />} />
  <Route path="/rewards" element={<Rewards />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
```

Bottom navigation (Navigation.jsx) shows current page with active indicator.

---

## Styling

### Tailwind CSS Classes Used

**Colors:**
- `text-primary-green` - #4CAF50
- `bg-soft-green` - #A5D6A7
- `bg-bg-light` - #F1F8E9
- `text-brown-accent` - #6D4C41
- `bg-reward-gold` - #FFD54F

**Shadows:**
- `shadow-soft` - Light shadow
- `shadow-soft-lg` - Larger shadow

**Sizing:**
- `rounded-xl` - Extra large border radius
- `rounded-2xl` - Extra extra large
- `rounded-full` - Fully rounded

**Responsive:**
- `md:` prefix for medium screens and up
- `grid grid-cols-2 md:grid-cols-3` - 2 cols on mobile, 3 on desktop

### Global Animations

Defined in `index.css`:
- `fadeIn` - Opacity and slide in effect
- `slideInFromLeft` - Slide from left
- `animate-in` - Apply fade in animation
- `transition-all` - Smooth property transitions

---

## Authentication Flow

### Anonymous Login (Default)
1. User opens app
2. Supabase signs them in anonymously
3. Data saved to database
4. No account creation required

### Email Signup/Login
1. User navigates to Settings
2. Clicks "Sign Up or Sign In"
3. Enters email and password
4. Supabase creates/finds account
5. User data synced to account

### Sign Out
1. User clicks "Sign Out" in Settings
2. Supabase.auth.signOut() called
3. User context reset
4. Next visit creates new anonymous session

---

## Common Tasks

### Add a New Study Session Type

In `TimerContext.jsx`, modify `setDuration()`:

```javascript
const handleNewPreset = () => {
  const newMinutes = 90 // Add 90 minute preset
  setDuration(newMinutes)
}
```

### Add a New Reward Type

1. Add to reward types array in `Home.jsx`:
```javascript
const rewardTypes = ['book', 'coffee', 'background', 'newType']
```

2. Add configuration in `RewardModal.jsx`:
```javascript
const rewardConfig = {
  newType: {
    icon: '🎨',
    name: 'New Type',
    description: 'Description here',
  },
  // ... other types
}
```

### Change the Design Colors

Update `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'primary-green': '#NEW_COLOR',
      // ... other colors
    },
  },
}
```

Then use the new color classes everywhere.

### Add a New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add navigation item in `Navigation.jsx`
4. Create page component

---

## Performance Considerations

### Timer Accuracy
The timer uses `setInterval` which may drift slightly over long periods. For critical timing, consider:
- Storing start time and calculating elapsed time
- Using higher precision timestamps
- Syncing with server time regularly

### Data Loading
- User data is loaded once on app mount
- Use `refreshUserData()` after changes
- Sessions are fetched in descending order for performance

### Bundle Size
Current bundle is ~750KB (gzipped to ~213KB). To reduce:
- Code split pages with React.lazy()
- Defer loading of Lottie animations
- Use tree-shaking for unused dependencies

---

## Testing

### To Test Locally

1. Timer functionality:
   - Start a session, verify countdown
   - Check that time stops when paused
   - Verify reset functionality

2. Data saving:
   - Complete a session
   - Check Supabase dashboard
   - Verify in Progress page

3. Rewards:
   - Complete a session
   - Check for reward modal
   - Verify in Rewards page

4. Authentication:
   - Test anonymous login
   - Sign up with email
   - Sign in with existing account

---

## Deployment

### To Supabase (Free Tier)
1. Supabase automatically hosts your database
2. No additional deployment needed for backend
3. Deploy frontend to Vercel, Netlify, or GitHub Pages

### To Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy automatically.

### Environment Variables

In deployment platform, set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Debugging Tips

### Check Supabase Logs
In Supabase dashboard → Logs to see database queries and errors.

### Browser DevTools
1. Open console (F12)
2. Check for JavaScript errors
3. Check Network tab for API calls
4. Use React Developer Tools extension

### Add Console Logs
```javascript
console.log('Timer:', timeLeft, isRunning)
console.log('User:', user)
```

### Check RLS Policies
If getting "RLS policy denied" errors:
1. Go to Supabase → Authentication → Policies
2. Verify policies exist for each table
3. Check policy conditions with `auth.uid()`

---

## Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **React Router**: https://reactrouter.com
- **Recharts**: https://recharts.org
- **Vite**: https://vitejs.dev

---

**Happy coding! 🐸💚**
