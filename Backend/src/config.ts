export const allowedOrigins = [
    `http://localhost:${process.env.CLIENT_SIDE_PORT}`
]

export const serverPort = 4000


export const noteContentSettings = {
    minLength: 0,
    maxLength: 50000
}

export const noteTitleSettings = {
    minLength: 1,
    maxLength: 50
}

export const rateLimitConfig = {
    windowMs: 1 * 60 * 1000,
    maxRequests: 60,
}