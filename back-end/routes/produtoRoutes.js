import { Router } from "express";
import * as produtoController from "../controllers/produtoController.js";
import { estaLogado } from "../middlewares/auth.js";

const router = Router();

router.get("/", produtoController.listar);
router.get("/disponiveis", produtoController.disponiveis);
router.get("/categorias", produtoController.categorias);
router.get("/:id", produtoController.buscarPorId);

router.post("/", estaLogado, produtoController.cadastrar);
router.post("/:id/desconto", estaLogado, produtoController.aplicarDesconto);
router.post("/:id/vender", estaLogado, produtoController.vender);
router.post("/:id/repor", estaLogado, produtoController.repor);
router.put("/:id", estaLogado, produtoController.atualizar);
router.delete("/:id", estaLogado, produtoController.excluir);

export default router;