<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="UTF-8">
        <title>Загрузка...</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="/css/app.css">
        <style>
        </style>
    </head>
    <body>
        <div id="app">
            <div>
                <headbar v-if="user"></headbar>
                <router-view></router-view>
            </div>
        </div>
    </body>
    <script src="/js/app.js?v.0.001" charset="utf-8"></script>
    <script src="/assets/js/scripts-dist.js"></script>
</html>
