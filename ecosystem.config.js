module.exports = {
  apps: [
    {
      name: "backend",
      script: "dist/main.js",
      cwd: "/home/ustaadji/version26/backend_v26",
      exec_mode: "fork",
      node_args: "--max-old-space-size=512",
      watch: false,

      // Smart restart configuration
      autorestart: true,
      max_restarts: 5, // Maximum 5 restarts
      restart_delay: 5000, // Wait 5 seconds before restart
      exp_backoff_restart_delay: 100, // Exponential backoff starting at 100ms
      min_uptime: 10000, // App must run for 10 seconds to be considered "stable"
      max_memory_restart: "500M", // Restart if memory exceeds 500MB

      // Kill timeout - if app doesn't start in 30 seconds, give up
      kill_timeout: 30000,
      listen_timeout: 30000,

      // Add cron restart for daily cleanup (optional)
      cron_restart: "0 3 * * *", // Restart daily at 3 AM

      error_file: "/home/ustaadji/deploy/pm2_logs/backend-error.log",
      out_file: "/home/ustaadji/deploy/pm2_logs/backend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,

      env: {
        NODE_ENV: "production",
        PORT: 3333,
      },

      // Environment-specific overrides
      env_production: {
        NODE_ENV: "production",
        PORT: 3333,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3333,
      },
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start:prod", // Changed from "start" to "run start:prod"
      cwd: "/home/ustaadji/version26/frontend_v26",
      exec_mode: "fork",
      node_args: "--max-old-space-size=512",
      watch: false,

      // Smart restart configuration
      autorestart: true,
      max_restarts: 5,
      restart_delay: 5000,
      min_uptime: 15000, // Frontend might need more time
      max_memory_restart: "400M",

      error_file: "/home/ustaadji/deploy/pm2_logs/frontend-error.log",
      out_file: "/home/ustaadji/deploy/pm2_logs/frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
