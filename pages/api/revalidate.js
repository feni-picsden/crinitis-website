import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig()

export default async function handler(req, res) {
    if (req.query.secret !== serverRuntimeConfig.PAGE_REVALIDATE_SECRETE) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    if (req.query.path === '') {
        return res.status(401).json({ message: 'Something going wrong' })
    }

    res.clearPreviewData();
    res.setHeader(
        "Cache-Control",
        `private, no-cache, no-store, max-age=0, must-revalidate`
    );
    res.setHeader("x-nextjs-cache", "STALE");
    res.setHeader("x-vercel-cache", "STALE");

    try {
        console.log("cache clear for ", req.query.path)
        await res.revalidate(req.query.path)
        return res.json({ revalidated: true })    
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error revalidating')
    }
}