const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully, authentication cookie set
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: JWT token set as HTTP-only cookie
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Server error during registration
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, authentication cookie set
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: JWT token set as HTTP-only cookie
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error during login
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful, authentication cookie cleared
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Token cookie cleared
 */
router.post("/logout", authController.logout);

module.exports = router;
