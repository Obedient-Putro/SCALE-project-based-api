import express from "express";
import { getUrl, getFilePath } from "../api/middleware/getUrl.js";
import { homePage, checkLoggedIn } from "../api/middleware/verifyLogin.js";
import { editWorkspace } from "../api/controllers/workspaces.js";
import { verifyToken } from "../api/middleware/verifyToken.js";


export const viewRouter = express();

viewRouter.get("/", homePage, getUrl ,function (req, res) {
    res.render("../views/index.ejs", { 
        apiURL : req.sendUrl,
        nextPath : "dashboard"
    });
});

viewRouter.get("/home", homePage, getUrl ,function (req, res) {
    res.render("../views/index.ejs", { 
        apiURL : req.sendUrl,
        nextPath : "dashboard"
    });
});

viewRouter.get("/dashboard", checkLoggedIn, getUrl, function (req, res) {
    const data = res.getUserData;
    res.render("../views/dashboard.ejs", {
        apiURL : req.sendUrl,
        userId: data.userId,
        name: data.username,
        email: data.email,
        nextPath : "home"
    });
});

viewRouter.get("/workspace", checkLoggedIn, getUrl, editWorkspace, function (req, res) {
    console.log(req.WSdata);
    res.render("../views/workspace.ejs", { 
        apiURL : req.sendUrl, 
        name: req.WSinfo.workspaceName, 
        id: req.WSinfo.id, 
    });
});

//viewRouter.get("/workspace", verifyToken, getFilePath, getUrl, async function (req, res) {
//    await editWorkspace(req, res);
//    const wsInfo = req.WSinfo[0].dataValues;
//    const wsID = wsInfo.id;
//    const wsName = wsInfo.workspaceName;
//    const wsData = req.WSdata;
//    res.render("../views/workspace.ejs", { apiURL : req.sendUrl, name: wsName, id: wsID, wsData: wsData });
//});

