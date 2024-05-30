import { app, PORT, connectToDatabase } from './index';

app.listen(PORT, async () => {
  await connectToDatabase().then(() => {
    console.log(`\nctrl + click http://localhost:${PORT}\nctrl + c to stop server`);
  });
});
