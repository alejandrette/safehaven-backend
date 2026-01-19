import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { validate } from "../middleware/auth";

const router = Router();

router.post('/create-user',
    body('email').isEmail().withMessage('Invalid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createUser
);

router.post('/confirm-email',
    body('token').notEmpty().withMessage('Token is required'),
    handleInputErrors,
    AuthController.confirmEmail
);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.login
)

router.get('/user',
    validate,
    AuthController.getUser
)

export default router;