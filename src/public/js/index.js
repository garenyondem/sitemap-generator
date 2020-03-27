window.addEventListener("load", () => {
    const generateBtn = document.getElementById("generate-btn");

    generateBtn.onclick = async () => {
        const sitemapUrl = document.getElementById("sitemap-url").value;
        if (!sitemapUrl) {
            return alert("Missing URL");
        } else if (!isAbsoluteUrl(sitemapUrl)) {
            return alert("Invalid URL");
        }
        const generatedSitemap = await getSitemap(sitemapUrl);
        renderSitemap(generatedSitemap);
    };

    function renderSitemap(generatedSitemap) {
        const sitemap = document.getElementById("sitemap");
        clearChildren(sitemap);
        const renderer = getRenderer();
        sitemap.appendChild(renderer(generatedSitemap));
    }

    function getRenderer() {
        return renderjson.set_show_to_level(1).set_icons('+', '-');
    }

    function clearChildren(element) {
        element.childNodes.forEach((x) => x.remove());
    }

    async function getSitemap(url) {
        const result = await fetch(`/api/sitemap?fromUrl=${url}`);
        return result.json();
    }

    function isAbsoluteUrl(url) {
        return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
    }
});