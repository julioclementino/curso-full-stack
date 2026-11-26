import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", usuarioController.cadastrar);

export default router;