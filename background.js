// browser.webRequest.onHeadersReceived.addListener(
//     (details) => {
//         console.log('Request URL:', details.url);
//         console.log('Response Headers:', details.responseHeaders);
//     },
//     { urls: ["<all_urls>"] },
//     ["responseHeaders"]
// );


browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        console.log('ENTROU AQUI details');
        try {
            let filter = browser.webRequest.filterResponseData(details.requestId);
            console.log('ENTROU AQUI ');
            filter.ondata = event => {
                console.log('ENTROU AQUI ONDATA');
                let decoder = new TextDecoder("utf-8");
                let data = decoder.decode(event.data, { stream: true });
                console.log('Response data:', data);

                // Aqui você pode modificar a resposta se necessário
                filter.write(event.data);
            };

            filter.onstop = () => {
                console.log('ENTROU AQUI ONSTOP');
                filter.disconnect();
            };

        } catch (error) {
            console.error("Error capturing response:", error);
        }
    },
    { urls: ["https://api-flip.ojc.com.br/edicao/por-produtos*"] },
    ["blocking"]
);

//https://api-flip.ojc.com.br/edicao/por-produtos?dataCirculacao=2024-08-19&idProduto=4
