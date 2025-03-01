module.exports = {
  apps: [
    {
      name: "DIY-Tutorials", // name of repo
      script: "./node_modules/next/dist/bin/next",
      // node_args: "--max-http-header-size=40000", // can add this to increase header size if getting errors
      args: "start -p " + (process.env.PORT || 3000),
      watch: true,
      autorestart: true,
    },
  ],
};

