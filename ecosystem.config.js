module.exports = {
  apps: [
    {
      name: "chat-service",
      script: "dist/src/main.js",
      instances: 1,
      cwd: "apps/chat-service",
      exec_mode: "fork",
      env_file: ".env",
      autorestart: true,
    },
    {
      name: "email-service",
      script: "dist/main.js",
      cwd: "apps/email-service",
      instances: 1,
      exec_mode: "fork",
      env_file: ".env",
      autorestart: true,
    },
    {
      name: "user-service",
      script: "dist/src/main.js",
      instances: 1,
      cwd: "apps/user-service",
      exec_mode: "fork",
      env_file: ".env",
      autorestart: true,
    },
  ],
};
