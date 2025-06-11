import express from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";
const app =  express();

const isURlValid = (url) => {
    try{
        new URL(url)
        return true;
    }catch(err){
        return false;
    }
}
 
const urls = {
    plmhZUt : "https://www.moneycontrol.com/world/tesla-investors-push-for-musk-to-return-full-time-as-ceo-amid-sales-slump-and-political-distractions-article-13066540.html"
}

app.use(express.urlencoded());

app.get("/" , (req, res) => {
    res.sendFile(import.meta.dirname + "/index.html");
});

app.post("/shorten" , (req, res) => {
    if(!isURlValid(req.body.longUrl)){
        res.status(400).json({
            success: false,
            message: "INvalid URL"
        });
        return;
    }
    // console.log(req.body.longUrl);
    const shortURl = nanoid(8);
    urls[shortURl] = req.body.longUrl;
    // console.log(urls);
    const filedata = fs.readFileSync("urls.json");
    const urlsfromfile = JSON.parse(filedata.toString());
    urlsfromfile[shortURl] = req.body.longUrl;
    fs.writeFileSync("urls.json",JSON.stringify(urlsfromfile));

    console.log(urlsfromfile);
    // fs.appendFileSync();
    res.json({
        success: true,
        shortURl : `http://localhost:8084/${shortURl}`
    });

})

app.get("/:shortUrl",(req,res) => {
    // console.log(req.params.shortUrl);


    const filedata = fs.readFileSync("urls.json");
    const urlsfromfile = JSON.parse(filedata.toString());
     const longUrl = urlsfromfile[req.params.shortUrl];
    

    // console.log(longUrl);
    res.redirect(longUrl);
})
app.listen(8084, () => console.log("server  is up and "))