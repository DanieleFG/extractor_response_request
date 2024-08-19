(function() {
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const response = await originalFetch.apply(this, args);
        
        const url = args[0];
        
        const headers = args[1] ? args[1].headers : {};
        
        console.log('Fetch URL:', url);
        console.log('Fetch Headers:', headers);
        
        return response;
    };

    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.addEventListener('load', function() {
            console.log('XHR URL:', url);
            console.log('XHR Response Headers:', this.getAllResponseHeaders());
        });
        
        return originalXHROpen.apply(this, arguments);
    };
})();
