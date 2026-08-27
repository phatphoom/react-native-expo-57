# Product Management System — SRS Checklist

## 📱 Frontend — React Native / Expo

### Authentication
- [ ] Login
- [ ] JWT Token
- [ ] ส่ง `Authorization: Bearer <token>` ไปกับ API
- [ ] Token หมดอายุ / 401 → กลับหน้า Login

### Product List
- [ ] แสดงรายการสินค้า
- [ ] แสดงรูปสินค้า
- [ ] แสดงชื่อสินค้า
- [ ] แสดงราคา
- [ ] แสดง Stock
- [ ] แสดง Brand
- [ ] แสดง Product Code
- [ ] แสดง Status
- [ ] Pagination

### Search
- [ ] SearchBar
- [ ] ค้นหาสินค้าด้วย Keyword
- [ ] ส่ง Search ไป Backend เช่น `?search=adidas`
- [ ] Debounce ประมาณ 300ms
- [ ] Clear Search
- [ ] แสดงจำนวนผลลัพธ์

### Product Detail
- [ ] ดูรายละเอียดสินค้า
- [ ] แสดง Size
- [ ] แสดง Status
- [ ] แสดง Location / Store
- [ ] แสดงข้อมูลสินค้าอื่น ๆ ที่จำเป็น

### Product Management — Admin
- [ ] เพิ่มสินค้า
- [ ] แก้ไขสินค้า
- [ ] ลบสินค้า
- [ ] แสดงปุ่ม Edit/Delete เฉพาะ Admin
- [ ] Confirmation ก่อน Delete
- [ ] Disable ปุ่มระหว่าง Delete
- [ ] อัปเดตรายการทันทีหลัง Delete สำเร็จ

### UI States
- [ ] Loading State
- [ ] Empty State / ไม่พบสินค้า
- [ ] Error State
- [ ] Delete Loading State

---

## ⚙️ Backend — Express.js

### Product API
- [ ] `GET /api/products`
- [ ] `GET /api/products/:id`
- [ ] `POST /api/products`
- [ ] `PUT /api/products/:id`
- [ ] `DELETE /api/products/:id`

### Search & Pagination
- [ ] รองรับ `?search=...`
- [ ] Search หลาย Column
- [ ] รองรับ `page`
- [ ] รองรับ `limit`
- [ ] Response มี `items`
- [ ] Response มี `total`
- [ ] Response มี `page`
- [ ] Response มี `limit`

### Authentication & Authorization
- [ ] JWT Middleware
- [ ] ตรวจสอบ Token
- [ ] `401 Unauthorized` เมื่อ Token ไม่ถูกต้อง
- [ ] `requireAdmin` Middleware
- [ ] `403 Forbidden` เมื่อไม่มีสิทธิ์
- [ ] Admin เท่านั้นที่เพิ่ม/แก้ไข/ลบสินค้าได้

### Security
- [ ] ใช้ Prepared Statements / Parameterized Query
- [ ] ป้องกัน SQL Injection
- [ ] Validate Product ID
- [ ] ตรวจสอบว่าสินค้ามีอยู่ก่อน Delete
- [ ] Return `404 Not Found` เมื่อไม่พบสินค้า

---

## 🗄️ Database — MySQL

### Product Table
- [ ] `id`
- [ ] `productCode`
- [ ] `name`
- [ ] `description`
- [ ] `price`
- [ ] `stock`
- [ ] `category`
- [ ] `brand`
- [ ] `color`
- [ ] `size`
- [ ] `status`
- [ ] `location`
- [ ] `image`
- [ ] `lastUpdate`

### Database Performance
- [ ] Index `productCode`
- [ ] Index `name`
- [ ] Index `brand`
- [ ] Index `category`
- [ ] พิจารณา FULLTEXT Search หากจำเป็น

---

## 🔐 Role

| Feature | User | Admin |
|---|:---:|:---:|
| Login | ✅ | ✅ |
| ดูสินค้า | ✅ | ✅ |
| Search | ✅ | ✅ |
| ดูรายละเอียด | ✅ | ✅ |
| เพิ่มสินค้า | ❌ | ✅ |
| แก้ไขสินค้า | ❌ | ✅ |
| ลบสินค้า | ❌ | ✅ |

---

## 🎯 Core Requirement

- [ ] **Authentication** — Login + JWT
- [ ] **Product Listing** — ดูรายการสินค้า
- [ ] **Search** — ค้นหาสินค้า
- [ ] **Pagination** — แบ่งหน้า
- [ ] **Product Detail** — ดูรายละเอียด
- [ ] **CRUD** — เพิ่ม / ดู / แก้ไข / ลบ
- [ ] **Role-Based Access** — User / Admin
- [ ] **Security** — JWT + SQL Injection Prevention
- [ ] **MySQL Database**