const str = "<p>While on campus you are likely to break up your day by getting coffee and chatting with friends. Studying from home should be no different. Regular breaks are essential for memory consolidation and overall wellbeing. Try a Zoom coffee date with your friends, practice mindfulness or get outdoors for a walk in the fresh air. Remember, social distancing does not equal social isolation.</p><img src='https://th.bing.com/th/id/OIP.evIZKR9l2CYNobkqFp9M4AHaE8?w=243&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='f' style='height: 100px;width: auto'/><p>Hihi</p><figure><figure><img src='https://th.bing.com/th/id/OIP.evIZKR9l2CYNobkqFp9M4AHaE8?w=243&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='f' style='height: 100px;width: auto'/></figure></figure>";
let str_no_figure = str.replace(/(<figure>|<\/figure>)/g, '');
// console.log(str_no_figure);
const match_pattern = /<img src=.*\/>$/;
let match = match_pattern.exec(str_no_figure);
console.log(match)
// target = "<figure>" + match[0] + "</figure>"
// console.log(str_no_figure.replace(match[0], target));