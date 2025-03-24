import { create, router as _router, defaults, bodyParser } from "json-server";
// eslint-disable-next-line no-undef
import { join } from "path";

const server = create();
// eslint-disable-next-line no-undef
const router = _router(join(__dirname, "db.json")); // Adjust path
const middlewares = defaults();

server.use(bodyParser);
server.use(middlewares);

// Custom Login API
server.post("/login", (req, res) => {
  const { name, email } = req.body;
  const users = router.db.get("users").value(); // Get users from db.json

  // Check if user exists
  const user = users.find((u) => u.name === name && u.email === email);

  if (user) {
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: `fake-jwt-token-${user.id}`,
      },
    });
  } else {
    res.status(401).json({ error: "Invalid name or email" });
  }
});

// Use default JSON Server routes
server.use(router);

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server running at http://localhost:${PORT}`);
});
