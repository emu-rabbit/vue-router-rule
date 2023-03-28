# FAQ

---

### Is Vue Router Rule developed to replace the `beforeEach` guard?  
Not really, Vue Router Rule is developed just to provide a new style of writing guards.  
The goal of Vue Router Rule is to provide better debugging methods and a flatter guard writing style.  
In fact, if your guard is very simple and doesn't even have any redirection, you don't need Vue Router Rule at all.

---

### When will Vue Router Rule be released in a stable version?
As you can see, the current major version of Vue Router Rule is still 0, indicating that it is in the development stage, and everything is unstable and lacking in testing and feedback.  
Currently, the main features are completely developed, and now we are collecting feedback, bug issues, and feature requests while completing automated testing.  

Once the automated testing coverage reaches a certain level, and after community feedback adjustment and bug fixing, it will be released as the stable version 1.  
If there are any bugs, feedback, or feature requests, please submit them on [Github Issue](https://github.com/emu-rabbit/vue-router-rule/issues).  

---

### I am not familiar with the way Vue Router Rule handles nesting and asynchronous operations.
Flattening and nesting are completely contradictory concepts and cannot coexist at the same time.  

I also thought about adding methods like `#child` or `#else` in the past, but eventually decided not to include them as they didn't fit with the design principles of the package.   However, I did add `#save` and `#load` to some extent to reduce the inconvenience and performance degradation caused by flattening.

If it's an asynchronous operation, the [Context](./guides/context.md) feature is used to determine the success or failure.  
In addition, all methods support asynchronous operations, and if your parameter function returns a Promise, Vue Router Rule will wait for it, but please do not reject the Promise as it will break chaining.

---

### U....Unicorn?
Yes, this is the <span style="background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);-webkit-background-clip: text;color: transparent;">RAINBOW UNICORN</span> that I drew for someone.
![unicorn](images/unicorn.png)