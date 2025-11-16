# **📘 MT Specification (Version 1.0)**

**Matthew Tokens — Ultra-Compact Data Notation**

---

## **1. Overview**

MT (Matthew Tokens) is a minimal, column-oriented data format optimized for human readability and extremely low token usage.
It uses a single header line to define fields, followed by data rows where each field is separated by a pipe character (`|`).
MT enforces simplicity, rejects unnecessary syntax, and assumes sequential IDs by default.

---

## **2. File Structure**

An MT document consists of:

1. **Header Line** – defines field names
2. **Data Rows** – one record per line

Example:

```
(id|name|price)
Laptop|3999.90
Mouse|149.90
Headset|499.00
```

---

## **3. Header Line**

### **3.1 Format**

The header MUST:

* appear on the **first line**
* be enclosed in parentheses `(` `)`
* contain one or more field names
* separate fields using `|`

Example:

```
(id|name|price)
```

### **3.2 Field Rules**

* Field names are case-sensitive.
* Field order determines row parsing order.
* The **first field MUST be `id`**.

---

## **4. Data Rows**

Each row represents exactly one record.

### **4.1 Field separation**

Fields MUST be separated by pipe characters:

```
value1|value2|value3
```

### **4.2 Field count**

The number of fields in a row MUST match the number of fields in the header (excluding auto IDs).

### **4.3 Auto-assigned IDs**

If a row omits the first value (the `id` field):

* MT automatically assigns a sequential integer ID
* IDs begin at **1** unless otherwise explicitly provided
* Auto IDs increment by +1 for each row

Example (no IDs written):

```
(id|name|price)
Laptop|3999.90       → id = 1
Mouse|149.90         → id = 2
Headset|499.00       → id = 3
```

Example (mixed explicit + auto):

```
(id|name|price)
10|Laptop|3999.90    → id = 10 (explicit)
Mouse|149.90         → id = 11 (auto next)
Headset|499.00       → id = 12 (auto next)
```

---

## **5. Data Types**

MT infers types automatically:

### **5.1 String**

Any value not parseable as a number is treated as a string.

### **5.2 Number**

A value is numeric if it matches:

* Integer
* Decimal
* Negative number

Examples:

```
42
3.14
-9.5
```

### **5.3 No Boolean, null, or complex types**

MT intentionally does not define:

* boolean literals
* null
* arrays
* nested objects

Everything is flat.

---

## **6. Encoding Rules**

* UTF-8 recommended (but ASCII valid)
* No escape sequences
* No quoting allowed
* Whitespace inside fields is preserved literally

Examples of valid fields:

```
Gaming Laptop
  Mousepad
Headset Pro 2025
```

---

## **7. Forbidden Syntax**

The following MUST NOT appear in MT:

* commas `,`
* curly braces `{ }`
* brackets `[ ]`
* quotes `" "`
* semicolons `;`
* JSON-like nesting
* trailing delimiters (ex: `Laptop|3999.90|`)

---

## **8. Comments**

Comments are **not** part of MT 1.0.
Any comment system must be an extension (MT-C).

---

## **9. Error Handling**

Parsers must reject:

* rows with incorrect field counts
* header missing parentheses
* missing or non-first `id` field
* inconsistent auto-assignment (e.g., jumping backwards)
* malformed numbers
* empty header fields

Parsers MAY ignore trailing blank lines.

---

## **10. Example Document**

```
(id|name|price|category)
Laptop|3999.90|Electronics
Mouse|149.90|Accessories
Headset|499.00|Audio
```

Interpreted as:

| id | name    | price   | category    |
| -- | ------- | ------- | ----------- |
| 1  | Laptop  | 3999.90 | Electronics |
| 2  | Mouse   | 149.90  | Accessories |
| 3  | Headset | 499.00  | Audio       |

---

## **11. Design Principles**

1. **Compactness** – minimal tokens, zero noise
2. **Simplicity** – write by hand, read instantly
3. **Predictability** – fixed columns, no surprises
4. **Flat structure** – one row = one record
5. **Human-first** – treats whitespace literally, no escaping

---

## **12. MT Compliance Badge**

Software implementing this spec MAY display:

```
✓ MT-1.0 Compliant
```
