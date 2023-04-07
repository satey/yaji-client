/** @type {import('tailwindcss').Config} */
module.exports = {
    // separator: '__',
    corePlugins: {
        preflight: false,
    },

    // 指定要处理的文件
    content: [
        './pages/**/*.{vue,js}',
        './components/**/*.{vue,js}',
        './main.js',
        './App.vue'
    ],
    theme: {},
    plugins: [],
}