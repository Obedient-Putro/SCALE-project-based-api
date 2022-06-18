import express from "express";
import { getUsers, Register, Login, Logout } from "../api/controllers/users.js";
import { addWorkspace, getWorkspaceList, deleteWorkspace, getWorkspaceJSON, saveWorkspaceJSON } from "../api/controllers/workspaces.js";
import { verifyToken } from "../api/middleware/verifyToken.js";
import { refreshToken  } from "../api/controllers/refreshToken.js";

export const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.post('/workspace/add', verifyToken, addWorkspace);
router.get('/workspace/list', verifyToken, getWorkspaceList);
router.delete('/workspace/delete', verifyToken, deleteWorkspace);
router.get('/workspace/json', verifyToken, getWorkspaceJSON); 
router.post('/workspace/save', verifyToken, saveWorkspaceJSON);