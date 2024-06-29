import { Router } from 'express'
import { uploadImage } from '../../../utils/imageUploader.js';
import { addProduct, getAllProduct, getSpacificProduct } from './product.controller.js';

const router = Router();
const upload = uploadImage()
router.post("/addProduct", upload.single('image'),addProduct);

router.get('/allProducts' , getAllProduct)

router.get('/product/:id', getSpacificProduct)

export default router