import{_ as n,p as s,q as a,a1 as t}from"./framework-5866ffd3.js";const p={},o=t(`<h1 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h1><p>Context is an API that can be used but is optional.<br> It provides a place for developers to store some information between different rules.</p><p>Both <code>RouterRuleBuilder</code> and <code>RouterRule</code> have a generic type <code>ContextType</code>, which can be specified when using <code>RouterRuleBuilder.create</code>.</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">MyContext</span> <span class="token punctuation">{</span>
    username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    shouldGetUnicorn<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Builder <span class="token operator">=</span> RouterRuleBuilder<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">create</span><span class="token generic class-name"><span class="token operator">&lt;</span>MyContext<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>By doing so, you can use this Context during the creation of <code>RouterRule</code>.<br> You may want to initialize the content of the Context at the beginning and then use it in the subsequent <code>RouterRule</code> to create conditions.</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token function">defineRule</span><span class="token punctuation">(</span>
    router<span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Initialize context&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">do</span><span class="token punctuation">(</span>initializeContext<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;GO TO UNICORN PAGE&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span>to <span class="token operator">=&gt;</span> to<span class="token punctuation">.</span>path <span class="token operator">!==</span> <span class="token string">&#39;/unicorn&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withContext</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span>shouldGetUnicorn<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/unicorn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Accept all navigation&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">initializeContext</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> context <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>username <span class="token operator">=</span> piniaStore<span class="token punctuation">.</span>username<span class="token punctuation">,</span>
    context<span class="token punctuation">.</span>shouldGetUnicorn <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span>
<span class="token punctuation">}</span>
</code></pre></div><p>You can also modify the contents of the Context midway through the process.<br> However, please note that you should not directly modify the entire Context object.</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// ...</span>
<span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Re-get username&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">do</span><span class="token punctuation">(</span>renewUsername<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// ...</span>
<span class="token keyword">const</span> <span class="token function-variable function">renewUsername</span> <span class="token operator">=</span> <span class="token keyword">async</span><span class="token punctuation">(</span><span class="token punctuation">{</span> context <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    piniaStore<span class="token punctuation">.</span>username <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">api</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span>username <span class="token operator">=</span> piniaStore<span class="token punctuation">.</span>username
    <span class="token comment">// context = { username: piniaStore.username } // DO NOT DO THIS</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),e=[o];function c(u,i){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","context.html.vue"]]);export{r as default};
