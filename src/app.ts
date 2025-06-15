import express from "express";
import * as path from "path";
// types
import type {Express, Request, Response} from "express";

// 建立 Express 应用
const app: Express = express();

// 模板引擎设定
app.set("views", path.resolve(process.cwd(), "views")); // 指定專案根目錄的 views 資料夾
app.set("view engine", "ejs"); // 指定模板引擎為 ejs

// 中间件设定
app.use(express.json()); // 解析 JSON 請求
app.use(express.urlencoded({extended: false})); // 解析 URL-encoded 請求
app.use(express.static(path.resolve(process.cwd(), "public"))); // 設定專案根目錄的 public 資料夾作為靜態資料夾

// 路由设定 首頁
app.get("/", (req: Request, res: Response) => {
    // 設定 ejs 全域變數 locals.title 和 locals.message 的值
    res.render("index", {title: "Express", message: "Welcome to Express"});
});

// 路由设定 api 返回现在时间
app.get("/api/now", (req: Request, res: Response) => {
    try {
        const now = new Date().toISOString();
        res.status(200).json({success: true, data: now});
    } catch (error: any) {
        res.status(500).json({success: false, message: error?.message ?? "Unknown Error"});
    }
});

// 404 错误处理;
app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        res.status(404).json({
            success: false,
            message: "API endpoint not found"
        });
    } else {
        res.status(404).render("index", {
            title: "404 Not Found",
            message: "找不到您请求的页面"
        });
    }
});

export default app;
