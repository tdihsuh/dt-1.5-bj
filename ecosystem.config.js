module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'hncredit',
            script: "server.js",
            instances: "max",
            node_args: "--harmony",
            watch: true,
            exec_mode: "cluster",
            env: {
                "PORT": 8000,
                "NODE_ENV": "production",
            }
        }
    ]
};
