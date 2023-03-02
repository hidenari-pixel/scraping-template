require("dotenv").config();
const puppeteer = require("puppeteer");
const { parse } = require("node-html-parser");
const fs = require("fs").promises;

(async () => {
    const browser = await puppeteer.launch({
      headless: true, // ウィンドウを表示する場合は false
      slowMo: 400, // 遅延具合
    });
    const page = await browser.newPage();
  
    /** 対象のページへ遷移 */
    await page.goto(process.env.URL);

    /** テキスト入力用 */
    await page.type([""], "some text")

    /** ボタン押下用 */
    const btn = await page.$([""].join(" "))
    await btn.click();

    /** 対象のタグ部分を丸ごと抽出 */
    const target = await page.evaluate(() => document.querySelector([""].join(" "))?.outerHTML)

    /** オブジェクトに変換 */
    const html = parse(target)
    /** タグ毎の処理 */
    const elms = html.querySelectorAll([].join(" ")).map((elm) => {
      /** 何らかの処理 */
      return elm.outerHTML
    })

    /** 外部ファイルへのエクスポート */
    await fs.writeFile("./any.txt", elms.join("\n") , "utf-8");
  
    await browser.close();
  })();