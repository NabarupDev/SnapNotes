const axios = require('axios');

exports.getWikipediaContent = async (req, res) => {
    try {
        const { topic } = req.params;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;

        const response = await axios.get(url);

        if (response.data.extract) {
            return res.json({
                title: response.data.title,
                summary: response.data.extract,
                fullArticleUrl: response.data.content_urls.desktop.page
            });
        } else {
            return res.status(404).json({ error: "No content found for this topic" });
        }
    } catch (error) {
        console.error("Error fetching Wikipedia content:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
