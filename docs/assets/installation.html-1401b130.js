import{_ as a,p as n,q as s,a1 as e}from"./framework-5866ffd3.js";const t={},o=e(`<h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h1><p>Here&#39;s the guide for a very simple setup</p><h2 id="install-package" tabindex="-1"><a class="header-anchor" href="#install-package" aria-hidden="true">#</a> Install package</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i vue-router-rule
</code></pre></div><h2 id="create-guard-js" tabindex="-1"><a class="header-anchor" href="#create-guard-js" aria-hidden="true">#</a> Create guard.js</h2><p>For example in file <code>@/router/guard.js</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineRule<span class="token punctuation">,</span> RouterRuleBuilder <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router-rule&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span> <span class="token comment">// Import your Vue Router instance here</span>

<span class="token keyword">const</span> Builder <span class="token operator">=</span> RouterRuleBuilder<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// A example of all-accept routing</span>
<span class="token function">defineRule</span><span class="token punctuation">(</span>
    router<span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre></div><h2 id="import-into-main-js" tabindex="-1"><a class="header-anchor" href="#import-into-main-js" aria-hidden="true">#</a> Import into main.js</h2><p>Import to your project entry script<br> For example <code>@/main.js</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Must import after your Vue Router created</span>
<span class="token keyword">import</span> <span class="token string">&#39;@/router/guard&#39;</span>
</code></pre></div><h2 id="done" tabindex="-1"><a class="header-anchor" href="#done" aria-hidden="true">#</a> Done</h2><p>Open your dev environment to see it work 😃</p>`,12),p=[o];function c(r,i){return n(),s("div",null,p)}const l=a(t,[["render",c],["__file","installation.html.vue"]]);export{l as default};
