import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddleClientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
if (!paddleClientToken) {
    throw new Error("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not defined");
}

export const paddle = new Paddle(paddleClientToken, {
    environment: Environment.sandbox
});