# 🚀 API Documentation for React Native (Expo) Integration

## 🔐 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register (สมัครสมาชิก)

- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "password"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "user_0001",
    "username": "test",
    "email": "test@gmail.com"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email is already in use"
  }
}
```

---

### 1.2 Login (เข้าสู่ระบบ)

- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
  "email": "test@gmail.com",
  "password": "password"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": "user_0001",
      "username": "test",
      "email": "test@gmail.com",
      "role": "user"
    }
  }
}
```

---

### 1.3 Get Current Profile (ดึงข้อมูลส่วนตัว)

- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Headers:**
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user_id": "user_0001",
    "username": "test",
    "email": "test@gmail.com",
    "role": "user",
    "created_at": "2026-08-06T12:00:00.000Z"
  }
}
```

---

## 🏷️ 2. Category Endpoints (`/api/category`)

### 2.1 Get All Categories (ดึงรายการหมวดหมู่ทั้งหมด)

- **Method:** `GET`
- **URL:** `/api/category`

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "cate_id": "cate_0001",
      "cate_name": "Electronics"
    },
    {
      "cate_id": "cate_0002",
      "cate_name": "Clothing"
    }
  ]
}
```

---

## 📦 3. Product Endpoints (`/api/product`)

### 3.1 Get All Products (ดึงรายการสินค้าทั้งหมด)

- **Method:** `GET`
- **URL:** `/api/product/all`

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "prod_id": "prod_0001",
      "prod_name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 590.0,
      "currency": "THB",
      "category_name": "Electronics",
      "image_url": "https://example.com/mouse.jpg",
      "rating_rate": 4.5,
      "rating_count": 120,
      "in_stock": 1,
      "stock_count": 50,
      "discount_pct": 10
    }
  ]
}
```

---

### 3.2 Get Product By ID (ดึงข้อมูลสินค้าตาม ID)

- **Method:** `GET`
- **URL:** `/api/product/:id` (เช่น `/api/product/prod_0001`)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "prod_id": "prod_0001",
    "prod_name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "price": 590.0,
    "currency": "THB",
    "category_name": "Electronics",
    "image_url": "https://example.com/mouse.jpg",
    "rating_rate": 4.5,
    "rating_count": 120,
    "in_stock": 1,
    "stock_count": 50,
    "discount_pct": 10
  }
}
```

---

### 3.3 Create Product (เพิ่มสินค้าใหม่)

- **Method:** `POST`
- **URL:** `/api/product/add`
- **Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
  "prod_name": "Mechanical Keyboard",
  "description": "RGB Backlit Keyboard",
  "price": 1990,
  "currency": "THB",
  "cate_id": "cate_0001",
  "image_url": "https://example.com/keyboard.jpg",
  "rating_rate": 5,
  "rating_count": 10,
  "in_stock": true,
  "stock_count": 20,
  "discount_pct": 0
}
```

**Required Fields:** `prod_name`, `price`, `cate_id`

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "newProduct": {
      "prod_id": "prod_0002",
      "prod_name": "Mechanical Keyboard",
      "price": 1990,
      "cate_id": "cate_0001"
    }
  }
}
```

---

### 3.4 Update Product (แก้ไขสินค้า)

- **Method:** `PUT`
- **URL:** `/api/product/edit/:id` (เช่น `/api/product/edit/prod_0001`)
- **Headers:** `Content-Type: application/json`

**Request Body (ส่งเฉพาะฟิลด์ที่ต้องการแก้ไข):**

```json
{
  "price": 1790,
  "stock_count": 15
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "prod_0001",
    "price": 1790,
    "stock_count": 15
  }
}
```

---

### 3.5 Delete Product (ลบสินค้า)

- **Method:** `DELETE`
- **URL:** `/api/product/delete/:id` (เช่น `/api/product/delete/prod_0001`)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## ⚠️ Standard Error Response Format

เมื่อเกิดข้อผิดพลาด API จะตอบกลับด้วยโครงสร้างนี้เสมอ:

```json
{
  "success": false,
  "message": "Error description message"
}
```
