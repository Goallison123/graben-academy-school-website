# 📋 School Website Image Assets: Naming Guide

To make your school's images immediately visible on this website, upload your photo files into the `/assets/` directory of the project workspace, and rename them to match the exact names below.

Our custom Vite pipeline will automatically serve them during development and bundle them into the static production output folder (`dist/assets/`).

---

## 📸 1. General & Brand Assets
These are the main logo and key credentials for the school:

| Image Description | Required File Name | Expected Format | Path Reference |
| :--- | :--- | :---: | :--- |
| **School Logo / Crest** | `logo.png` | **PNG** (Transparent) | `/assets/logo.png` |
| **Principal's Welcome Photo** | `welcome_principal.jpg` | **JPG** / **JPEG** | `/assets/welcome_principal.jpg` |
| **Sports Academy Hero Cover** | `sports_academy.jpg` | **JPG** / **JPEG** | `/assets/sports_academy.jpg` |

---

## 🖼️ 2. Main Hero Slides
These images display in the sliding header carousel at the top of the homepage:

| Slide Placement | Description | Required File Name | Expected Format | Path Reference |
| :---: | :--- | :--- | :---: | :--- |
| **Slide 1** | O-Level / Advanced Level Academic Classrooms | `hero_academic.jpg` | **JPG** / **JPEG** | `/assets/hero_academic.jpg` |
| **Slide 2** | Student Life, Boarding Dormitories or Corridor Life | `hero_student_life.jpg` | **JPG** / **JPEG** | `/assets/hero_student_life.jpg` |
| **Slide 3** | Football Academy Fields, Training, or Athletics | `hero_sports.jpg` | **JPG** / **JPEG** | `/assets/hero_sports.jpg` |

---

## 🎒 3. Interactive Gallery lightbox Items
These are the grid items rendered inside the **Campus Moments Gallery** section:

| Grid Placement | Title & Subject | Required File Name | Expected Format | Path Reference |
| :---: | :--- | :--- | :---: | :--- |
| **Item 1** | Boarding School Corridor Life | `gallery_corridor.jpg` | **JPG** | `/assets/gallery_corridor.jpg` |
| **Item 2** | Football Academy Squad and Bus | `gallery_squad.jpg` | **JPG** | `/assets/gallery_squad.jpg` |
| **Item 3** | General Assembly Gathering in Rugerero | `gallery_assembly.jpg` | **JPG** | `/assets/gallery_assembly.jpg` |
| **Item 4** | Leadership meeting (Directors/Principal) | `gallery_leadership.jpg` | **JPG** | `/assets/gallery_leadership.jpg` |
| **Item 5** | High-Quality School Crest / Emblem | `gallery_crest.png` | **PNG** / **JPG** | `/assets/gallery_crest.png` |

---

## 💡 Quick Tips for High Quality
1. **Dimensions**: For Hero Slides, use landscape-oriented photos with a resolution of at least `1920x1080` pixels for sharp rendering.
2. **File Size**: Compress images (e.g., using online tools like TinyJPG) to keep files under `500KB` for blazing-fast static website loading speeds.
3. **Automatic Fallback**: If an image is not uploaded yet, the website's visual cards are engineered with premium dark **Bleu Nuit (Deep Blue)** linear gradients, ensuring a stunning and fully functional layout in the meantime!
