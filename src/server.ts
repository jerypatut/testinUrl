import '@config/modulAlias';
import app from './app';
import { CONFIG } from '@config/index';

app.listen(CONFIG.port, () => {
  console.log(`Server running on port ${CONFIG.port} in ${CONFIG.env} mode`);
});
