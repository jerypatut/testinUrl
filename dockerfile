# Gunakan image Node.js versi 20 sebagai base image
FROM node:20-slim

# Atur working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json untuk menginstal dependencies
# Ini adalah langkah yang efisien karena Docker akan melakukan caching
COPY package*.json ./

# Instal semua dependencies
RUN npm install
# Pastikan semua file yang diperlukan ada di sini, termasuk folder 'app'
COPY . .

# Generate Prisma client agar bisa digunakan saat runtime
RUN npx prisma generate

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi dalam mode development
CMD ["npm", "run", "dev"]
