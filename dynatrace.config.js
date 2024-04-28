module.exports = {
    react : {
        debug : true,

        lifecycle : {
            /**
             * Decide if you want to see Update Cycles as well
             */
            includeUpdate: false,

            /**
             * Filter for Instrumenting Lifecycle of Components / True = Will be instrumented
             */
            instrument: (filename) => {
                return false;
            }
        },

        input : {
            /**
             * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
             * True = Will be instrumented
             */
            instrument: (filename) => {
                return true;
            }
        }
    },
    android : {
        // Those configs are copied 1:1
        config : `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId 'a0299a68-e245-42e0-85a8-f2c61d5d2857'
                        beaconUrl 'https://bf07731ogr.bf.dynatrace.com/mbeacon'
                    }
                    userOptIn true
                    agentBehavior.startupLoadBalancing true
                }
            }
        }
        `
    },
    ios : {
        // Those configs are copied 1:1
        config : `
        <key>DTXApplicationID</key>
        <string>a0299a68-e245-42e0-85a8-f2c61d5d2857</string>
        <key>DTXBeaconURL</key>
        <string>https://bf07731ogr.bf.dynatrace.com/mbeacon</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <true/>
        <key>DTXStartupLoadBalancing</key>
        <true/>
        `
    }
}
