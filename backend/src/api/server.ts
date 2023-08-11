import app from './app';
import * as crypto from 'crypto';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));