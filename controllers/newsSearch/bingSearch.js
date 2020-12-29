const axios = require('axios');
const BING_API_KEY = process.env.BING_API_KEY;

module.exports = async (req, res) => {
    const [q, offset] = [req.body.q, req.body.scrolls * 20];
    const searchURL = `https://api.bing.microsoft.com/v7.0/news/search?cc=ko-KR&count=20&safeSearch=moderate&originalImg=true&offset=${offset}&q=${encodeURI(q)}`;

    try {
        const searchResult = (await axios.get(searchURL, {
            headers: {
                'Ocp-Apim-Subscription-Key': BING_API_KEY
            }
        })).data;  
        let refinedSearchResult = [];
        for (let news of searchResult.value) {
            refinedSearchResult.push({
                title: news.name,
                url: news.url,
                imageURL: news.image ? news.image.contentUrl : 'no image',
                description: news.description,
                datePublished: news.datePublished,
                provider: news.provider[0].name
            })
        }
        res.send({ data: refinedSearchResult, message: 'search ok' });
    } catch (err) {
        res.status(400).send({ data: err, message: 'search error' });
    }
}