// https://www.w3schools.com/howto/howto_css_menu_icon.asp
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementsByTagName("NAV")[0].classList.toggle("change");
}

document.getElementsByTagName("HEADER")[0].innerHTML = `<!-- https://www.w3schools.com/howto/howto_css_menu_icon.asp -->
<div class="menuIcon" onclick="myFunction(this)">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div>

<h1>header</h1>

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