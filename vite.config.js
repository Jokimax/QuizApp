import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/Pages/homepage.jsx',
                'resources/css/homepage.css',
                'resources/js/Pages/createQuiz.jsx',
                'resources/css/createQuiz.css',
                'resources/js/Pages/editor.jsx',
                'resources/css/editor.css',
                'resources/js/Pages/quiz.jsx',
                'resources/css/quiz.css',
            ],
            refresh: true,
        })
    ],
});
