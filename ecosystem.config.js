module.exports = {
  apps: [
    {
      name: "student-management",
      script: "./src/server.js", // Adjust this path to where your server's entry point is
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "dev",
      },
    },
  ],
};
