# 🧩 Exercise 01 – Reading & Writing Post Meta with Core APIs

In this exercise, you’ll learn how to read and write **post meta** using the **Block Editor** APIs by recreating a classic **meta box** using modern Gutenberg components and data APIs.

---

## 📂 Setup

### Step 1: Activate the Plugin

Activate the plugin named:

```
01 - Reading/Writing Meta with Core APIs
```

### Step 2: Install Dependencies

In your terminal, run:

```bash
cd plugins/01-reading-writing-meta
npm install
```

---

## 📝 Post Setup

### Step 3: Open or Create the Exercise Post

Create a new post titled **"Exercise 01"** or open an existing one with that title.

### Step 4: Review the Classic Meta Box

Look at the **Guest Author** meta box in the post sidebar. It contains:

- **Three input fields**: Name, Email, Title
- **One textarea**: Biography

This is the layout you’ll recreate in the Block Editor.

---

## 🧱 Component Exploration

### Step 5: Browse Gutenberg Components

Visit the [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page) to explore available components like `TextControl`, `TextareaControl`, `ColorPicker`, and `DatePicker`.

---

## ⚙️ Build Process

### Step 6: Start the Build Process

In the plugin directory, run:

```bash
npm start
```

Then, refresh the editor page in your browser.

---

## 🧩 Code Setup

### Step 7: Examine `src/index.js`

Open `src/index.js` and review how the plugin uses `registerPlugin()` with a custom `SlotFill` to inject UI into the post editor.

---

## 🛠️ UI Components

### Step 8: Import `TextControl` and `TextareaControl`

In `src/index.js`, import components from `@wordpress/components`:

```js
import { TextControl, TextareaControl } from "@wordpress/components";
```

### Step 9: Add Hardcoded Inputs

Add the following JSX to render static fields:

```js
<TextControl label="Name" value="Jane Doe" />
<TextControl label="Email" value="jane@example.com" />
<TextControl label="Title" value="Guest Author" />
<TextareaControl label="Biography" value="Lorem ipsum dolor sit amet." />
```

---

## 🔗 Meta Handling

### Step 10: Import `useEntityProp`

Add the following import:

```js
import { useEntityProp } from "@wordpress/core-data";
```

### Step 11: Define `meta` and `setMeta` Using Array Destructuring

Add this line inside your component:

```js
const [meta, setMeta] = useEntityProp("postType", "post", "meta");
```

### Step 12: Bind Inputs to Meta

Replace hardcoded values with dynamic ones:

```js
<TextControl
	label="Name"
	value={meta?.author_name}
	onChange={(author_name) => setMeta({ ...meta, author_name })}
/>
```

Repeat for `author_email`, `author_title`, and `author_bio`.

---

## 🧠 Dynamic Post Type

### Step 13: Confirm Meta is Saving

Create a test post, enter values, and verify they're saved and restored.

### Step 14: Remove Hardcoded `post`

Replace the hardcoded `'post'` value in `useEntityProp` to make it dynamic.

### Step 15: Import `useSelect` and Alias the Store

Add these imports:

```jsx
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
```

### Step 16: Get Current Post Type

Use `useSelect` to get the current post type:

```jsx
const currentPostType = useSelect(
	(select) => select(editorStore).getCurrentPostType(),
	[]
);
```

### Step 17: Update `useEntityProp` to Use `currentPostType`

Modify the hook:

```jsx
const [meta, setMeta] = useEntityProp("postType", currentPostType, "meta");
```

### Step 18: Add Post Type Check

Prevent rendering for other post types:

```jsx
if (currentPostType !== "post") {
	return null;
}
```

---

## 🎨 Additional Fields

### Step 19: Add Fields for Favorite Color and Birthday

Add two more `TextControl` components:

```js
<TextControl label="Favorite Color" value={ meta?.author_favorite_color } />
<TextControl label="Birthday" value={ meta?.author_birthday } />
```

### Step 20: Search for Better Components

Go back to the [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page) and search for better UI components like `ColorPicker` and `DatePicker`.

### Step 21: Replace with Better UI Components

Update the fields using `ColorPicker` and `DatePicker`:

```jsx
import { BaseControl, ColorPicker, DatePicker } from '@wordpress/components';

<BaseControl label={ __( 'Birthday' ) }>
	<DatePicker
		currentDate={ meta?.author_birthday }
		onChange={ ( author_birthday ) => {
			updateMeta( {
				...meta,
				author_birthday,
			} );
		} }
	/>
</BaseControl>
<BaseControl label={ __( 'Favorite Color' ) }>
	<ColorPicker
		color={ meta?.author_favorite_color }
		onChange={ ( author_favorite_color ) => {
			setMeta( {
				...meta,
				author_favorite_color,
			} );
		} }
		copyFormat="hex"
		defaultValue="#000"
	/>
</BaseControl>
```

---

## ✅ Step 22: Done!

You’ve successfully recreated a classic meta box in the Block Editor using:

- Gutenberg UI components
- The WordPress data layer
- `useEntityProp` and `useSelect`

---

## 🔗 Resources

- [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page)
- [SlotFills Reference](https://developer.wordpress.org/block-editor/reference-guides/slotfills/)
- [Data & Meta Docs](https://developer.wordpress.org/block-editor/reference-guides/data/data-core/)

---

Would you like this exported as a downloadable `README.md` file?
