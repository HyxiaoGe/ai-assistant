import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Proxy request received:", req.url);
  return httpProxyMiddleware(req, res, {
    target: "http://localhost:8888",
    pathRewrite: {
      "^/api/proxy": "/v1/news",
    },
    changeOrigin: true,
  });
}
