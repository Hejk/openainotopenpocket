/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','Segoe UI','Helvetica Neue','PingFang SC','Hiragino Sans GB','Microsoft YaHei UI','Microsoft YaHei','Noto Sans SC','sans-serif'],
        mono: ['SF Mono','SFMono-Regular','ui-monospace','Consolas','Menlo','monospace'],
        serif: ['Georgia','Times New Roman','Songti SC','SimSun','serif'],
      },
    },
  },
  plugins: [],
};
