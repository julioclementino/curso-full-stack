import { Router } from 'express';
import * as produtoController from '../controllers/produto.Controller';

const router = Router();

router.get("/", produtoController.listar);
router.get("/disponiveis", produtoController.disponiveis);
router.get("/:id", produtoController.buscarPorId);
router.post("/", produtoController.cadastrar);
router.post("/:id/desconto", produtoController.aplicarDesconto);
router.post("/:id/vender", produtoController.venderProduto);

export default router;