import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", usuarioController.cadastrar);
router.post("/login", usuarioController.login);
router.get("/me", usuarioController.me);
router.post("/logout", usuarioController.logout);

export default router;