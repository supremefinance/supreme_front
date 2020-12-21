module.exports = {
    apps: [{
        name: 'XHYPE',
        script: 'export PORT=3001 && ./node_modules/react-scripts/bin/react-scripts.js start',
        watch: false,
        env: {
            COMMON_VARIABLE: 'true',
            NODE_ENV: 'develop'
        },
        env_prod: {
            COMMON_VARIABLE: 'true',
            NODE_ENV: 'production'
        }
    }
    ]
}