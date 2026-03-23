import { createApp } from "./server/app.js";

const app = createApp();
const port = process.env.PORT || 3033;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
