// https://www.w3schools.com/howto/howto_css_menu_icon.asp
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementsByTagName("NAV")[0].classList.toggle("change");
}

// add header and footer to each page
document.getElementsByTagName("HEADER")[0].innerHTML = `<!-- https://www.w3schools.com/howto/howto_css_menu_icon.asp -->
<div class="menuIcon" onclick="myFunction(this)">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div>

<h1>the header</h1>

<nav>
    <ul>
        <li><a href="./index.html">HOME</a></li>
        <li class="dropdownOuter"><a href="./issue1.html">ISSUES</a>
            <ul class="dropdownInner">
                <li><a href="./issue1.html">Issue 1</a></li>
            </ul>
        </li>
        <li><a href="./submissions.html">SUBMISSIONS</a></li>
        <li><a href="./team.html">MEET THE TEAM</a></li>
        <li><a href="./faqs.html">FAQs</a></li>
    </ul>
</nav>`;
/*document.getElementsByTagName("BODY")[0].innerHTML += `<footer>
    <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/lucaswselby/zine" target="_blank">Zine</a> &copy; 2024 by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/lucaswselby" target="_blank">Lucas Selby</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
</footer>`;*/