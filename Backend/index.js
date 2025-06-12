require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const aiRoutes = require('./routes/aiRoutes'); // ✅ Import AI Routes

const app = express();
const PORT = 5000;

const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests, please try again after a minute"
});

// Configure CORS with options to allow all origins
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Apply CORS middleware with the options
app.use(cors(corsOptions));
app.use(express.json());

app.use(limiter);

// Handle OPTIONS preflight requests explicitly
app.options('*', cors(corsOptions));

app.use('/api/ai', aiRoutes);

app.get('/api/wake', (req, res) => {
    res.send("🚀 Cheat-Sheet API is running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
