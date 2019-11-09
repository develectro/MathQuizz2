//developer: https://github.com/develectro

//you can modify these cookies functions to use them when neede

var GameCookies = {
    setGameCookies: function(cookieName, cookieValue, cookieExpiration) {

        let date = new Date();
        date.setTime(date.getTime() + (cookieExpiration * 24 * 60 * 60 * 1000)); //1000 ms to sec.
        let expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    },
    getGameCookies: function(cookieName) {

        let name = cookieName + "=";
        let co = document.cookie.split(';');
        for (let i = 0; i < co.length; i++) {
            var c = co[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log("Score cookies: " + c.substring(name.length, c.length));
                for (let i = 0; i < scoreArrayLength; i++) {

                }
                return c.substring(name.length, c.length);

            }
        }
        return "";

    },
    getGameCookies: function(cookieName) {

        let name = cookieName + "=";
        let co = document.cookie.split(';');
        for (let i = 0; i < co.length; i++) {
            var c = co[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log("Score cookies: " + c.substring(name.length, c.length));
                for (let i = 0; i < scoreArrayLength; i++) {

                }
                return c.substring(name.length, c.length);

            }
        }
        return "";

    }

}

//here score is set using cookies inside $.gameOver();
GameCookies.setGameCookies("score", score + "", 365); //key , value , ex date
GameCookies.getGameCookies("score"); //score: cookieInteger