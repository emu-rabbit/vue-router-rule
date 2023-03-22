# Installation
Here's the guide for a very simple setup

## Install package
```shell
npm i vue-router-rule
```

## Create guard.js
For example in file `@/router/guard.js`
```js
import { defineRule, RouterRuleBuilder } from 'vue-router-rule'
import router from './router' // Import your Vue Router instance here

const Builder = RouterRuleBuilder.create()

// A example of all-accept routing
defineRule(
    router,
    [
        Builder()
            .any()
            .accept()
    ]
)
```

## Import into main.js
Import to your project entry script  
For example `@/main.js`
```js
// Must import after your Vue Router created
import '@/router/guard'
```

## Done
Open your dev environment to see it work :)