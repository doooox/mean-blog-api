import { createApp } from "./app/app.js";

const app = createApp();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
