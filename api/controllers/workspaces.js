import { Users, Workspace } from "../models/userModel.js";
import { randomUUID } from "crypto";
import fs from "fs";

export const addWorkspace = async (req, res) => {
    const sendName  = req.body.wsName;

    let filePath = randomUUID();

    let dummyData = fs.readFileSync('./data/dummy/wsDataDummy.json');
    let getData = JSON.parse(dummyData);
    let data = JSON.stringify(getData, null, 2);

    fs.writeFile('./data/' + filePath + '.json', data, (err) => {
        if (err) return res.status(400).json({ msg: "Problem set file, please try again later" });
    });

    try {
        await Workspace.create({
            email: req.email,
            workspaceName: sendName,
            workspacePath: filePath
        });
        const workspaces = await Workspace.findAll({
            attributes: ['id', 'workspaceName', 'workspacePath', 'createdAt'],
            where: {
                workspacePath: filePath
            }
        });
        res.json(workspaces);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getWorkspaceList = async (req, res) => {
    const getEmail = req.email;
    try {
        const workspaces = await Workspace.findAll({
            attributes: ['id', 'workspaceName', 'workspacePath', 'createdAt'],
            where: {
                email: getEmail
            }
        });
        res.json(workspaces);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const deleteWorkspace = async (req, res) => {
    const wsID = req.query.id; 
    const filePath = req.query.filePath;
    console.log(wsID, filePath);

    try {
        fs.unlinkSync('./data/' + filePath + '.json');
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }

    try {
        await Workspace.destroy({
            where: {
                id:wsID
            }
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
};

export const getWorkspaceJSON = async (req, res) => {
    const filePath = req.query.path;
    let getJson = fs.readFileSync('./data/' + filePath + '.json');
    if(!getJson) return res.sendStatus(404);
    let wsData = JSON.parse(getJson);
    res.json({
        path: filePath,
        WSjson: wsData
    });
};

export const saveWorkspaceJSON = async (req, res) => {
    const getEmail = req.email;
    const filePath = req.body.path;
    const getData = req.body.jsonFile;
    let data = JSON.stringify(getData, null, 2);
    fs.writeFile('./data/' + filePath + '.json', data, (err) => {
        if (err) return res.status(400).json({ msg: "Problem set file, please try again later" });
    });
    try {
        await Workspace.update({ workspacePath: filePath }, {
            where:{
                email: getEmail,
                workspacePath: filePath
            }
        });
    } catch (error) {
        console.log(error)
    }
    res.sendStatus(200);
};

export const editWorkspace = async (req, res, next) => {
    const userID = req.query.id;
    const filePath = req.query.edit;
    const userEmail = res.getUserData.email;

    const userValid = await Users.findAll({
        attributes: ['id', 'email'],
        where: {
            id: userID,
            email: userEmail
        }
    });
    if(!userValid[0]) return res.redirect("/");

    const workspaceInfo = await Workspace.findAll({
        attributes: ['id', 'workspaceName'],
        where: {
            workspacePath: filePath,
            email: userEmail
        }
    });
    if(!workspaceInfo[0]) return res.redirect("/");
    req.WSinfo = workspaceInfo[0].dataValues;
    next();
}
