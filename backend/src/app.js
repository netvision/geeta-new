const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const chapterRoutes = require('./routes/chapter.routes');
const schoolRoutes = require('./routes/school.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const glossaryRoutes = require('./routes/glossary.routes');
const { sendError } = require('./utils/response.utils');

const app = express();

// Trust the first proxy (Nginx in prod, Vite dev proxy in dev)
// Required for express-rate-limit v7+ to correctly read client IPs
app.set('trust proxy', 1);

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

// ── Request parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Global rate limiter ──────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api', limiter);

// Auth routes get a stricter limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Geeta Portal API is running.', env: process.env.NODE_ENV });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/chapters', chapterRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/glossary', glossaryRoutes);

// Placeholder for routes to be added in upcoming phases
// app.use('/api/v1/progress',      progressRoutes);
// app.use('/api/v1/bookmarks',     bookmarkRoutes);
// app.use('/api/v1/discussions',   discussionRoutes);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  sendError(res, 404, `Route ${req.originalUrl} not found.`);
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  sendError(res, status, err.message || 'Internal server error.');
});

module.exports = app;
