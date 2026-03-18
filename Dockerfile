# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app/src

# Install all dependencies
COPY src/package.json src/package-lock.json ./
RUN npm ci

# Copy source files
COPY src/ ./

# Build client (Vite) and server (tsc)
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/src/package.json /app/src/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/src/dist ./dist

USER appuser

EXPOSE 3000

CMD ["node", "dist/index.js"]
