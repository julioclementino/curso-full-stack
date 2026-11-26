import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Rouuter();

router.post("/usuarios", usuarioController.cadastrar);

export default router;