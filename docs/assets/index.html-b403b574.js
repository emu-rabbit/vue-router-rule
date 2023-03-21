import{_ as p,M as o,p as e,q as c,R as s,t as n,N as t,a1 as u}from"./framework-5866ffd3.js";const l={},i=s("h1",{id:"introduction",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#introduction","aria-hidden":"true"},"#"),n(" Introduction")],-1),k={href:"https://router.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},r=s("br",null,null,-1),d={href:"https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards",target:"_blank",rel:"noopener noreferrer"},h=s("br",null,null,-1),g=u(`<h1 id="what-will-change" tabindex="-1"><a class="header-anchor" href="#what-will-change" aria-hidden="true">#</a> What will change?</h1><p>For example a original beforeEach guard</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> whiteList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/auth-redirect&#39;</span><span class="token punctuation">]</span> <span class="token comment">// no redirect whitelist</span>

router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> hasToken <span class="token operator">=</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// determine whether the user has logged in</span>
    <span class="token keyword">const</span> hasRoles <span class="token operator">=</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>roles <span class="token operator">&amp;&amp;</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>roles<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token comment">// determine whether the user has obtained his permission roles through getInfo</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>hasToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>hasRoles<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// get user info</span>
                    <span class="token keyword">await</span> store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">&#39;user/getInfo&#39;</span><span class="token punctuation">)</span>
                    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// remove token and go to login page to re-login</span>
                    <span class="token keyword">await</span> store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">&#39;user/resetToken&#39;</span><span class="token punctuation">)</span>
                    <span class="token function">next</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/login?redirect=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>to<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>whiteList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// in the free login whitelist, go directly</span>
            <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// other pages that do not have permission to access are redirected to the login page.</span>
            <span class="token function">next</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/login?redirect=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>to<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>With Vue Router Rule</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
    hasToken<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    hasRoles<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Builder <span class="token operator">=</span> RouterRuleBuilder<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">create</span><span class="token generic class-name"><span class="token operator">&lt;</span>Context<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">defineRule</span><span class="token punctuation">(</span>
    router<span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;User with token will redirect to root from login page&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withContext</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span>hasToken<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token string">&#39;hasToken&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Accept user when role already cached&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&#39;hasToken&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withContext</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span>hasRoles<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Cache user role&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&#39;hasToken&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">do</span><span class="token punctuation">(</span>cacheRole<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Accept user on cache success&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&#39;hasToken&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withContext</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span>hasRoles<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Logout on cache failed&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&#39;hasToken&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Accept user without token but want to whitelist&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">withContext</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> <span class="token operator">!</span>c<span class="token punctuation">.</span>hasToken<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span>to <span class="token operator">=&gt;</span> whiteList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token string">&#39;Redirect user without token to login&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    initialContextProvider
<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">initialContextProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        hasToken<span class="token operator">:</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        hasRoles<span class="token operator">:</span> <span class="token operator">!</span><span class="token operator">!</span>store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>roles <span class="token operator">&amp;&amp;</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>roles<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">cacheRole</span><span class="token punctuation">(</span><span class="token punctuation">{</span> context <span class="token punctuation">}</span><span class="token operator">:</span> ConditionParams<span class="token operator">&lt;</span>ContextType<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">&#39;user/getInfo&#39;</span><span class="token punctuation">)</span>
        context<span class="token punctuation">.</span>hasRoles <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span>hasRoles <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5);function f(m,w){const a=o("ExternalLinkIcon");return e(),c("div",null,[i,s("p",null,[n("Vue Router Rule is a "),s("a",k,[n("Vue Router"),t(a)]),n(" addon."),r,n(" For some complex router navigation rules (usually with authorization, business needed), the guard "),s("a",d,[n("beforeEach"),t(a)]),n(" become huge, unreadable and hard to debug or maintains."),h,n(" This addon provide another way to define rules for more readable and maintainable coding.")]),g])}const y=p(l,[["render",f],["__file","index.html.vue"]]);export{y as default};
