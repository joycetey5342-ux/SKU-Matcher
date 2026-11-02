# Booklist SKU Matcher (free version)

A small website for the shop counter. Upload a school booklist, tap the ticked items, and get the SKU/ISBN for each one. It works on any phone, tablet or computer with a browser. **It costs nothing to run**: no API keys, no paid services.

**How it finds each SKU:**

1. **Saved SKUs**: ones your team clicked **Remember** on before. It starts with the 18 South View P1 SKUs.
2. **Your catalogue**: your own stock list, if you upload one (optional).
3. **Anything new**: tap **Popular** to search Popular's site, or **Google** to search the whole web (school booklists on moe.edu.sg often print the ISBN). Copy the ISBN, paste it in, and click **Remember**. Next time that title fills in automatically on every device.

The catalogue and saved SKUs are stored on Netlify (free), so every device sees the same data.

---

## What you need

- A free **GitHub** account: https://github.com
- A free **Netlify** account: https://app.netlify.com. Sign up with your GitHub account, which makes step 3 easier.

---

## Setup (about 10 minutes)

### 1. Unzip the files
Unzip `booklist-sku-matcher.zip`. You'll get a folder containing `public`, `netlify`, `netlify.toml`, `package.json`, `package-lock.json` and `README.md`.

### 2. Put the code on GitHub
1. Sign in at https://github.com and click **+** (top right) → **New repository**.
2. Name it `booklist-sku-matcher`, choose **Private**, and click **Create repository**.
3. On the next page, click the link **uploading an existing file**.
4. Open the unzipped folder, select **everything inside it** (not the folder itself), and drag it into the browser window. The `public` and `netlify` folders must upload as folders.
5. Click **Commit changes**.

### 3. Deploy on Netlify
1. Sign in at https://app.netlify.com.
2. Click **Add new project** (or **Add new site**) → **Import an existing project** → **GitHub**. Allow Netlify to see your repositories if asked.
3. Pick `booklist-sku-matcher`.
4. Leave every build setting as it is (they come from `netlify.toml`) and click **Deploy**.
5. Wait about a minute until it says **Published**. Your link looks like `https://random-name-123.netlify.app`.

> Netlify's drag-and-drop deploy will **not** work for this site, because the storage part needs building. Use the GitHub import above.

### 4. Set a staff passcode (recommended)
Without a passcode, anyone who finds the link could change your saved SKUs.

1. In Netlify, open your site → **Site configuration** (or **Project configuration**) → **Environment variables** → **Add a variable**.
2. Key: `APP_PASSCODE`. Value: a passcode for staff, e.g. `southview2027`. Save.
3. Go to **Deploys** → **Trigger deploy** → **Deploy site** so the passcode takes effect.

### 5. Optional: a nicer link
**Site configuration → General → Change site name**, e.g. `myshop-booklists` gives `https://myshop-booklists.netlify.app`.

### 6. Open it on each device
Open the link on each phone, tablet or computer and enter the passcode (once per device). On a phone, use the browser's **Add to Home Screen** to make it open like an app.

---

## Using the site

1. **Catalogue (optional, once):** upload your stock export (Excel/CSV). Choose which column is the SKU and which is the title, then click **Save catalogue**. Upload again whenever your stock list changes.
2. **Booklist:** upload the school's list.
   - **Excel / CSV:** read exactly. If the file has a Tick column, ticked rows are selected for you.
   - **PDF** from a school website: read exactly. Scanned PDFs are read like photos.
   - **Photo or screenshot:** read on the device. Use a clear, straight-on, well-lit photo. If the titles include Chinese characters, tick **Photo has Chinese text** first. This downloads extra language data once, so it's slower the first time.
3. **Tap the ticked items** in the list that appears, then press **Match selected**. Fix any misread title by typing over it.
4. **Check the results:**
   - **Saved:** confirmed before.
   - **Catalogue:** a strong match from your stock list.
   - **Check:** a likely match. Confirm it, or pick another from the dropdown.
   - **No match:** tap **Popular**, find the book, copy its ISBN (shown as the SKU on Popular's product page), paste it into the SKU box, then click **Remember**.
5. **Export:** **Download Excel** or **Copy table** (paste into Excel/Sheets).

Every **Remember** makes the next booklist faster. After a few schools, most titles fill in by themselves.

---

## Troubleshooting

- **The site asks for a passcode and it doesn't work:** check `APP_PASSCODE` in Netlify (it's case-sensitive), then redeploy.
- **"Couldn't reach the server":** the site wasn't deployed through the GitHub import (step 3), or the deploy failed. Check the **Deploys** tab.
- **A photo reads badly:** retake it straight-on in good light, crop to the table, or ask the school for the PDF/Excel version.
- **Popular's search finds nothing:** try the **Google** button. It searches all sites, and school booklist PDFs often list the ISBN next to the title. You can also shorten the title in the row (e.g. remove "& Reading Passport") and search again.

## Updating the site later
Edit or replace files in your GitHub repository (**Add file → Upload files**). Netlify redeploys automatically within a minute.

## Files

```
public/index.html            the website (reads files, matching, export)
netlify/functions/data.mjs   stores the catalogue and saved SKUs (/api/data)
netlify/lib/                 shared code and the starting SKUs
netlify.toml, package.json   Netlify build settings
```
