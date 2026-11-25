import { Router } from "express";
import * as produtoController from "../controllers/produtoController.js";

const router = Router();

router.get("/", produtoController.listar);
router.get("/disponiveis", produtoController.disponiveis);
router.get("/categorias", produtoController.categorias);
router.get("/:id", produtoController.buscarPorId);
router.post("/", produtoController.cadastrar);
router.post("/:id/desconto", produtoController.aplicarDesconto);
router.post("/:id/vender", produtoController.vender);
router.post("/:id/repor", produtoController.repor);
router.put("/:id", produtoController.atualizar);
router.delete("/:id", produtoController.excluir);

export default router;