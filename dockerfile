# Dev container for Vue
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose Vite dev server port
EXPOSE 3000

# Run Vue dev server
CMD ["npx", "vite", "--host=0.0.0.0", "--port=3000"]
